from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from ...deps import get_db
from ...schemas.captcha import CaptchaRequest, CaptchaResponse, CaptchaVerification, CaptchaVerificationResponse
from ...core.captcha import captcha_generator

router = APIRouter(prefix="/captcha", tags=["captcha"])

@router.post("/generate", response_model=CaptchaResponse)
def generate_captcha(request: Request):
    """Generate a new CAPTCHA challenge"""
    try:
        # Get client IP address
        client_ip = request.client.host
        
        # Check if IP is locked
        is_locked, lock_message = captcha_generator.is_ip_locked(client_ip)
        if is_locked:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=lock_message
            )
        
        # Generate CAPTCHA
        captcha_id, image_data, expires_at = captcha_generator.generate_captcha(client_ip)
        
        return CaptchaResponse(
            captcha_id=captcha_id,
            captcha_image=image_data,
            expires_at=expires_at
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate CAPTCHA"
        )

@router.post("/verify", response_model=CaptchaVerificationResponse)
def verify_captcha(
    verification: CaptchaVerification,
    request: Request
):
    """Verify CAPTCHA answer"""
    try:
        client_ip = request.client.host
        
        # Check if IP is locked
        is_locked, lock_message = captcha_generator.is_ip_locked(client_ip)
        if is_locked:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=lock_message
            )
        
        # Verify CAPTCHA
        success, message, remaining = captcha_generator.verify_captcha(
            verification.captcha_id,
            verification.answer,
            client_ip
        )
        
        return CaptchaVerificationResponse(
            success=success,
            message=message,
            remaining_attempts=remaining if not success else None
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to verify CAPTCHA"
        )

@router.get("/status")
def get_captcha_status(request: Request):
    """Get CAPTCHA status for current IP"""
    client_ip = request.client.host
    attempt_data = captcha_generator.get_login_attempts(client_ip)
    is_locked, lock_message = captcha_generator.is_ip_locked(client_ip)
    
    # CAPTCHA is ALWAYS required for maximum security
    requires_captcha = True
    
    return {
        "ip_address": client_ip,
        "failed_attempts": attempt_data['count'],
        "is_locked": is_locked,
        "lock_message": lock_message if is_locked else None,
        "requires_captcha": requires_captcha
    }

@router.post("/cleanup")
def cleanup_expired_captchas():
    """Clean up expired CAPTCHAs and old attempt data"""
    captcha_generator.cleanup_expired()
    return {"message": "Cleanup completed"}

# Reset endpoint removed for security - attempts can only be reset on successful login
