from pydantic import BaseModel
from typing import Optional

class CaptchaRequest(BaseModel):
    """Request for generating a new CAPTCHA"""
    pass

class CaptchaResponse(BaseModel):
    """Response containing CAPTCHA data"""
    captcha_id: str
    captcha_image: str  # Base64 encoded image
    expires_at: str

class CaptchaVerification(BaseModel):
    """CAPTCHA verification request"""
    captcha_id: str
    answer: str

class CaptchaVerificationResponse(BaseModel):
    """CAPTCHA verification response"""
    success: bool
    message: str
    remaining_attempts: Optional[int] = None
