"""
CSRF Token endpoint for frontend protection
"""

from fastapi import APIRouter, Depends, Request
from fastapi.responses import JSONResponse
import secrets
from datetime import datetime, timedelta
from ...core.logging import security_logger
from ...core.config import settings

router = APIRouter(prefix="/csrf", tags=["csrf"])

# In-memory CSRF token storage (use Redis in production)
csrf_tokens: dict[str, dict] = {}

@router.get("/token")
async def get_csrf_token(request: Request):
    """Generate CSRF token for form protection"""
    client_ip = request.client.host if request.client else "unknown"
    
    try:
        # Generate secure random token
        token = secrets.token_urlsafe(32)
        
        # Store token with metadata
        csrf_tokens[token] = {
            "created_at": datetime.utcnow(),
            "expires_at": datetime.utcnow() + timedelta(hours=1),
            "ip_address": client_ip,
            "used": False
        }
        
        # Log token generation
        security_logger.log_security_event(
            "csrf_token_generated",
            {"token_length": len(token)},
            client_ip
        )
        
        return JSONResponse(
            content={"csrf_token": token},
            headers={
                "Cache-Control": "no-store, no-cache, must-revalidate",
                "Pragma": "no-cache",
                "Expires": "0"
            }
        )
        
    except Exception as e:
        security_logger.log_security_violation(
            "csrf_token_error",
            {"error": str(e)},
            client_ip
        )
        return JSONResponse(
            content={"error": "Failed to generate CSRF token"},
            status_code=500
        )

def validate_csrf_token(token: str, client_ip: str) -> bool:
    """Validate CSRF token"""
    if not token or token not in csrf_tokens:
        return False
    
    token_data = csrf_tokens[token]
    
    # Check if token is expired
    if datetime.utcnow() > token_data["expires_at"]:
        del csrf_tokens[token]
        return False
    
    # Check if token was already used
    if token_data["used"]:
        del csrf_tokens[token]
        return False
    
    # Check IP address (optional, can be disabled for load balancers)
    if settings.CSRF_STRICT_IP and token_data["ip_address"] != client_ip:
        return False
    
    # Mark token as used
    token_data["used"] = True
    
    return True

def cleanup_expired_tokens():
    """Clean up expired CSRF tokens"""
    current_time = datetime.utcnow()
    expired_tokens = [
        token for token, data in csrf_tokens.items()
        if current_time > data["expires_at"]
    ]
    
    for token in expired_tokens:
        del csrf_tokens[token]
