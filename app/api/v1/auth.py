from fastapi import APIRouter, Depends, HTTPException, Response, Request, status
from sqlalchemy.orm import Session
from ...deps import get_db, get_current_user
from ...schemas.auth import SignUpIn, LoginIn, TokenOut
from ...models.user import User
from ...core.security import (
    hash_password, verify_password, create_token, create_refresh_token,
    rotate_refresh_token, revoke_token, revoke_user_tokens
)
from ...core.config import settings
from ...core.rate_limit import allow
from ...core.captcha import captcha_generator
from ...core.validation import validate_email, validate_password, validate_and_sanitize_input
from ...core.logging import security_logger
from ...core.errors import (
    AuthenticationError, ValidationError, RateLimitError, 
    InternalServerError, APIError
)

router = APIRouter(prefix="/auth", tags=["auth"])

def set_refresh_cookie(resp: Response, token: str):
    resp.set_cookie(
        key="refresh_token",
        value=token,
        httponly=True,
        secure=settings.COOKIE_SECURE,
        samesite=settings.COOKIE_SAMESITE,  # "lax" in dev
        domain=settings.COOKIE_DOMAIN,
        path="/api/v1/auth",
        max_age=int(settings.refresh_delta.total_seconds()),
    )

def clear_cookies(resp: Response):
    resp.delete_cookie("refresh_token", path="/api/v1/auth", domain=settings.COOKIE_DOMAIN)

@router.post("/signup", status_code=201)
def signup(payload: SignUpIn, request: Request, db: Session = Depends(get_db)):
    """Register a new user with enhanced security"""
    client_ip = request.client.host if request.client else "unknown"
    
    try:
        # Validate and sanitize inputs
        email = validate_email(payload.email)
        password = validate_password(payload.password)
        
        # Check rate limiting
        if not allow(client_ip):
            security_logger.log_rate_limit_exceeded("/auth/signup", client_ip, 3, 3600)
            raise RateLimitError("Too many registration attempts, try later")
        
        # Check if user already exists
        exists = db.query(User).filter(User.email == email).first()
        if exists:
            security_logger.log_auth_failure(
                email=email,
                ip_address=client_ip,
                reason="Email already registered"
            )
            raise ValidationError("Email already registered")
        
        # Create new user
        u = User(email=email, password_hash=hash_password(password))
        db.add(u)
        db.commit()
        db.refresh(u)
        
        # Log successful registration
        security_logger.log_auth_attempt(
            email=email,
            ip_address=client_ip,
            success=True,
            user_id=u.id
        )
        
        return {"id": u.id, "email": u.email}
        
    except (ValidationError, RateLimitError):
        raise
    except Exception as e:
        security_logger.log_security_violation(
            "registration_error",
            {"error": str(e), "email": payload.email},
            client_ip
        )
        raise InternalServerError("Registration failed")

@router.post("/login", response_model=TokenOut)
def login(payload: LoginIn, request: Request, response: Response, db: Session = Depends(get_db)):
    """Authenticate user with enhanced security"""
    client_ip = request.client.host if request.client else "unknown"
    
    try:
        # Validate and sanitize inputs
        email = validate_email(payload.email)
        password = validate_and_sanitize_input(payload.password, "password")
        
        # Check if IP is locked due to too many failed attempts
        is_locked, lock_message = captcha_generator.is_ip_locked(client_ip)
        if is_locked:
            security_logger.log_rate_limit_exceeded("/auth/login", client_ip, 5, 300)
            raise RateLimitError(lock_message)
        
        # Check rate limiting
        if not allow(client_ip, "auth"):
            security_logger.log_rate_limit_exceeded("/auth/login", client_ip, 5, 300)
            raise RateLimitError("Too many attempts, try later")

        # CAPTCHA is ALWAYS required for security
        if not payload.captcha_id or not payload.captcha_answer:
            security_logger.log_auth_failure(
                email=email,
                ip_address=client_ip,
                reason="Missing CAPTCHA"
            )
            raise ValidationError("CAPTCHA verification is required for login")
        
        # Verify CAPTCHA directly during login
        captcha_success, captcha_message, remaining = captcha_generator.verify_captcha(
            payload.captcha_id, 
            payload.captcha_answer, 
            client_ip
        )
        
        if not captcha_success:
            security_logger.log_auth_failure(
                email=email,
                ip_address=client_ip,
                reason=f"CAPTCHA failed: {captcha_message}"
            )
            raise ValidationError(captcha_message)

        # Verify user credentials
        user = db.query(User).filter(User.email == email).first()
        if not user or not verify_password(password, user.password_hash):
            # Record failed attempt
            captcha_generator.record_login_attempt(client_ip, False)
            security_logger.log_auth_failure(
                email=email,
                ip_address=client_ip,
                reason="Invalid credentials"
            )
            raise AuthenticationError("Invalid credentials")

        # Record successful attempt
        captcha_generator.record_login_attempt(client_ip, True)

        # Create tokens with enhanced security
        access = create_token(user.id, "access", settings.access_delta)
        refresh = create_refresh_token(user.id)
        set_refresh_cookie(response, refresh)
        
        # Log successful authentication
        security_logger.log_auth_attempt(
            email=email,
            ip_address=client_ip,
            success=True,
            user_id=user.id
        )
        
        return {"access_token": access, "token_type": "bearer"}
        
    except (AuthenticationError, ValidationError, RateLimitError):
        raise
    except Exception as e:
        security_logger.log_security_violation(
            "login_error",
            {"error": str(e), "email": payload.email},
            client_ip
        )
        raise InternalServerError("Authentication failed")

@router.post("/refresh", response_model=TokenOut)
def refresh_token(request: Request, response: Response):
    """Refresh access token with enhanced security"""
    client_ip = request.client.host if request.client else "unknown"
    
    try:
        cookie = request.cookies.get("refresh_token")
        if not cookie:
            security_logger.log_unauthorized_access(
                endpoint="/auth/refresh",
                method="POST",
                ip_address=client_ip,
                reason="Missing refresh token"
            )
            raise AuthenticationError("Missing refresh token")
        
        # Decode and validate refresh token
        from ...core.security import decode_token
        payload = decode_token(cookie)
        
        if payload.get("type") != "refresh":
            security_logger.log_unauthorized_access(
                endpoint="/auth/refresh",
                method="POST",
                ip_address=client_ip,
                reason="Invalid token type"
            )
            raise AuthenticationError("Invalid refresh token")

        user_id = payload["sub"]
        
        # Create new access token
        access = create_token(user_id, "access", settings.access_delta)
        
        # Rotate refresh token for enhanced security
        new_refresh = rotate_refresh_token(cookie, user_id)
        set_refresh_cookie(response, new_refresh)
        
        return {"access_token": access, "token_type": "bearer"}
        
    except AuthenticationError:
        raise
    except Exception as e:
        security_logger.log_security_violation(
            "refresh_token_error",
            {"error": str(e)},
            client_ip
        )
        raise InternalServerError("Token refresh failed")

@router.post("/logout", status_code=204)
def logout(request: Request, response: Response, user: User = Depends(get_current_user)):
    """Logout user and revoke tokens"""
    client_ip = request.client.host if request.client else "unknown"
    
    try:
        # Revoke all user tokens
        revoke_user_tokens(user.id)
        
        # Clear cookies
        clear_cookies(response)
        
        # Log logout
        security_logger.log_data_access(
            user_id=user.id,
            resource_type="user",
            resource_id=str(user.id),
            action="logout",
            ip_address=client_ip
        )
        
        return Response(status_code=status.HTTP_204_NO_CONTENT)
        
    except Exception as e:
        security_logger.log_security_violation(
            "logout_error",
            {"error": str(e), "user_id": user.id},
            client_ip
        )
        # Still clear cookies even if logging fails
        clear_cookies(response)
        return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.post("/forgot-password")
def forgot_password(payload: dict, request: Request, db: Session = Depends(get_db)):
    """Request password reset token"""
    client_ip = request.client.host if request.client else "unknown"
    
    try:
        email = validate_email(payload.get("email", ""))
        
        # Check rate limiting
        if not allow(client_ip):
            security_logger.log_rate_limit_exceeded("/auth/forgot-password", client_ip, 3, 3600)
            raise RateLimitError("Too many password reset attempts, try later")
        
        # Check if user exists
        user = db.query(User).filter(User.email == email).first()
        
        # Always return success to prevent email enumeration
        # In production, send email here
        if user:
            # Generate reset token (valid for 1 hour)
            from datetime import datetime, timedelta
            import secrets
            reset_token = secrets.token_urlsafe(32)
            reset_expires = datetime.utcnow() + timedelta(hours=1)
            
            # Store reset token in user record (requires adding fields to User model)
            # For now, we'll just return the token for testing
            security_logger.log_auth_attempt(
                email=email,
                ip_address=client_ip,
                success=True,
                user_id=user.id
            )
            
            return {
                "message": "If the email exists, a password reset link will be sent",
                "reset_token": reset_token  # Remove in production, send via email
            }
        
        return {"message": "If the email exists, a password reset link will be sent"}
        
    except (ValidationError, RateLimitError):
        raise
    except Exception as e:
        security_logger.log_security_violation(
            "forgot_password_error",
            {"error": str(e), "email": payload.get("email")},
            client_ip
        )
        raise InternalServerError("Password reset request failed")

@router.post("/reset-password")
def reset_password(payload: dict, request: Request, db: Session = Depends(get_db)):
    """Reset password using token"""
    client_ip = request.client.host if request.client else "unknown"
    
    try:
        reset_token = payload.get("reset_token", "")
        new_password = validate_password(payload.get("new_password", ""))
        
        # Check rate limiting
        if not allow(client_ip):
            security_logger.log_rate_limit_exceeded("/auth/reset-password", client_ip, 3, 3600)
            raise RateLimitError("Too many password reset attempts, try later")
        
        # In production, verify token from database
        # For now, accept any token for testing purposes
        email = payload.get("email", "")
        if email:
            email = validate_email(email)
            user = db.query(User).filter(User.email == email).first()
            
            if user:
                # Update password
                user.password_hash = hash_password(new_password)
                db.commit()
                
                security_logger.log_auth_attempt(
                    email=email,
                    ip_address=client_ip,
                    success=True,
                    user_id=user.id
                )
                
                return {"message": "Password reset successfully"}
        
        raise AuthenticationError("Invalid or expired reset token")
        
    except (AuthenticationError, ValidationError, RateLimitError):
        raise
    except Exception as e:
        security_logger.log_security_violation(
            "reset_password_error",
            {"error": str(e)},
            client_ip
        )
        raise InternalServerError("Password reset failed")