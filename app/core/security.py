import secrets
from datetime import datetime, timezone, timedelta
from typing import Any, Literal, Optional
from passlib.context import CryptContext
from jose import jwt, JWTError
from .config import settings
from .validation import validate_password
from .logging import security_logger


# Enhanced password context with stronger parameters for production
pwd_context = CryptContext(
    schemes=["argon2"],
    deprecated="auto",
    argon2__memory_cost=65536,  # 64 MB
    argon2__parallelism=4,
    argon2__rounds=3,
    argon2__salt_len=16
)

# Token blacklist (in production, use Redis or database)
_token_blacklist: set[str] = set()

def hash_password(password: str) -> str:
    """Hash password with validation"""
    validate_password(password)
    return pwd_context.hash(password)

def verify_password(password: str, password_hash: str) -> bool:
    """Verify password against hash"""
    return pwd_context.verify(password, password_hash)

def create_token(
    subject: str | int,
    token_type: Literal["access", "refresh"],
    expires_delta: timedelta,
    jti: Optional[str] = None
) -> str:
    """Create JWT token with enhanced security"""
    now = datetime.now(timezone.utc)
    payload: dict[str, Any] = {
        "sub": str(subject),
        "type": token_type,
        "iat": int(now.timestamp()),
        "exp": int((now + expires_delta).timestamp()),
        "iss": settings.TOKEN_ISSUER,
        "aud": settings.TOKEN_AUDIENCE,
    }
    
    # Add JWT ID for tracking
    if jti:
        payload["jti"] = jti
    else:
        payload["jti"] = secrets.token_urlsafe(16)
    
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

def decode_token(token: str) -> dict[str, Any]:
    """Decode and validate JWT token"""
    try:
        payload = jwt.decode(
            token, 
            settings.SECRET_KEY, 
            algorithms=[settings.ALGORITHM],
            audience=settings.TOKEN_AUDIENCE,
            issuer=settings.TOKEN_ISSUER
        )
        
        # Check if token is blacklisted
        jti = payload.get("jti")
        if jti and jti in _token_blacklist:
            raise JWTError("Token has been revoked")
        
        return payload
    except JWTError as e:
        security_logger.log_security_violation(
            "invalid_token",
            {"error": str(e), "token_type": "unknown"},
            "unknown"
        )
        raise

def revoke_token(token: str) -> bool:
    """Revoke a token by adding it to blacklist"""
    try:
        payload = decode_token(token)
        jti = payload.get("jti")
        if jti:
            _token_blacklist.add(jti)
            return True
        return False
    except JWTError:
        return False

def revoke_user_tokens(user_id: int) -> int:
    """Revoke all tokens for a user (in production, implement with database)"""
    # This is a simplified implementation
    # In production, you would store token metadata in database
    # and revoke based on user_id
    return 0

def verify_token(token: str):
    """Verify token and return user object"""
    try:
        payload = decode_token(token)
        user_id = int(payload.get("sub"))
        
        # Validate token type
        token_type = payload.get("type")
        if token_type != "access":
            raise JWTError("Invalid token type")
        
        # Return a simple object with id attribute for WebSocket compatibility
        class User:
            def __init__(self, user_id: int):
                self.id = user_id
        return User(user_id)
    except JWTError:
        raise

def verify_token_with_db(token: str, db):
    """Verify token and return user from database for WebSocket use"""
    try:
        payload = decode_token(token)
        user_id = int(payload.get("sub"))
        
        # Validate token type
        token_type = payload.get("type")
        if token_type != "access":
            raise JWTError("Invalid token type")
        
        from ..models.user import User
        user = db.get(User, user_id)
        if not user:
            raise JWTError("User not found")
        
        # Log successful authentication
        security_logger.log_data_access(
            user_id=user_id,
            resource_type="user",
            resource_id=str(user_id),
            action="authenticate",
            ip_address="websocket"
        )
        
        return user
    except JWTError:
        raise
    except Exception as e:
        security_logger.log_security_violation(
            "authentication_error",
            {"error": str(e), "user_id": "unknown"},
            "unknown"
        )
        raise JWTError(f"Authentication error: {e}")

def generate_password_reset_token(user_id: int) -> str:
    """Generate password reset token"""
    expires_delta = timedelta(hours=1)  # 1 hour expiry
    return create_token(
        subject=user_id,
        token_type="password_reset",
        expires_delta=expires_delta
    )

def verify_password_reset_token(token: str) -> int:
    """Verify password reset token and return user ID"""
    try:
        payload = decode_token(token)
        
        # Validate token type
        token_type = payload.get("type")
        if token_type != "password_reset":
            raise JWTError("Invalid token type")
        
        return int(payload.get("sub"))
    except JWTError:
        raise

def create_refresh_token(user_id: int) -> str:
    """Create refresh token with rotation"""
    return create_token(
        subject=user_id,
        token_type="refresh",
        expires_delta=settings.refresh_delta
    )

def rotate_refresh_token(old_token: str, user_id: int) -> str:
    """Rotate refresh token (revoke old, create new)"""
    # Revoke old token
    revoke_token(old_token)
    
    # Create new token
    return create_refresh_token(user_id)

