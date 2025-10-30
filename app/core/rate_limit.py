import time
from typing import Dict, List, Optional
from functools import wraps
from fastapi import Request, HTTPException
from .logging import security_logger

# Enhanced rate limiting with different limits for different endpoints
_ATTEMPTS: Dict[str, Dict[str, List[float]]] = {}

# Rate limiting configurations
RATE_LIMITS = {
    "auth": {"window": 300, "max_attempts": 5},  # 5 attempts per 5 minutes
    "api": {"window": 60, "max_attempts": 100},  # 100 requests per minute
    "websocket": {"window": 60, "max_attempts": 200},  # 200 messages per minute
    "captcha": {"window": 60, "max_attempts": 10},  # 10 captcha requests per minute
}

def allow(ip: str, endpoint_type: str = "api") -> bool:
    """Check if request is allowed based on rate limiting"""
    now = time.time()
    config = RATE_LIMITS.get(endpoint_type, RATE_LIMITS["api"])
    
    # Initialize bucket for this IP and endpoint type
    if ip not in _ATTEMPTS:
        _ATTEMPTS[ip] = {}
    if endpoint_type not in _ATTEMPTS[ip]:
        _ATTEMPTS[ip][endpoint_type] = []
    
    bucket = _ATTEMPTS[ip][endpoint_type]
    
    # Remove old attempts outside the window
    while bucket and (now - bucket[0]) > config["window"]:
        bucket.pop(0)
    
    # Check if limit exceeded
    if len(bucket) >= config["max_attempts"]:
        security_logger.log_rate_limit_exceeded(
            endpoint_type, 
            ip, 
            config["max_attempts"], 
            config["window"]
        )
        return False
    
    # Add current attempt
    bucket.append(now)
    return True

def update_rate_limit(ip: str, endpoint_type: str = "api") -> None:
    """Update rate limiting for successful requests"""
    allow(ip, endpoint_type)

def get_rate_limit_info(ip: str, endpoint_type: str = "api") -> Dict:
    """Get current rate limit status for an IP"""
    config = RATE_LIMITS.get(endpoint_type, RATE_LIMITS["api"])
    
    if ip not in _ATTEMPTS or endpoint_type not in _ATTEMPTS[ip]:
        return {
            "remaining": config["max_attempts"],
            "reset_time": int(time.time() + config["window"]),
            "limit": config["max_attempts"]
        }
    
    bucket = _ATTEMPTS[ip][endpoint_type]
    now = time.time()
    
    # Clean old attempts
    while bucket and (now - bucket[0]) > config["window"]:
        bucket.pop(0)
    
    remaining = max(0, config["max_attempts"] - len(bucket))
    reset_time = int(bucket[0] + config["window"]) if bucket else int(now + config["window"])
    
    return {
        "remaining": remaining,
        "reset_time": reset_time,
        "limit": config["max_attempts"]
    }

def rate_limit_middleware(endpoint_type: str = "api"):
    """Decorator for rate limiting endpoints"""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Extract request from args
            request = None
            for arg in args:
                if isinstance(arg, Request):
                    request = arg
                    break
            
            if request:
                client_ip = request.client.host if request.client else "unknown"
                if not allow(client_ip, endpoint_type):
                    raise HTTPException(
                        status_code=429,
                        detail=f"Rate limit exceeded. Try again later."
                    )
            
            return await func(*args, **kwargs)
        return wrapper
    return decorator
