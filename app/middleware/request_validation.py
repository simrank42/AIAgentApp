"""
Request validation middleware
"""

import time
from fastapi import Request, Response, HTTPException, status
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.types import ASGIApp
from typing import Set

from ..core.config import settings
from ..core.constants import ALLOWED_HTTP_METHODS, ALLOWED_HTTP_HEADERS
from ..core.logging import request_logger


class RequestValidationMiddleware(BaseHTTPMiddleware):
    """Middleware to validate requests and add logging"""
    
    def __init__(self, app: ASGIApp):
        super().__init__(app)
        self.allowed_methods: Set[str] = set(ALLOWED_HTTP_METHODS)
        self.allowed_headers: Set[str] = set(ALLOWED_HTTP_HEADERS)
    
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        
        # Validate HTTP method
        if request.method not in self.allowed_methods:
            raise HTTPException(
                status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
                detail=f"Method {request.method} not allowed"
            )
        
        # Check request size
        content_length = request.headers.get("content-length")
        if content_length:
            try:
                size = int(content_length)
                if size > settings.MAX_REQUEST_SIZE:
                    raise HTTPException(
                        status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                        detail="Request too large"
                    )
            except ValueError:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Invalid content-length header"
                )
        
        # Validate Content-Type for POST/PUT/PATCH requests
        if request.method in ["POST", "PUT", "PATCH"]:
            content_type = request.headers.get("content-type", "")
            if not content_type.startswith(("application/json", "multipart/form-data", "application/x-www-form-urlencoded")):
                raise HTTPException(
                    status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
                    detail="Unsupported media type"
                )
        
        # Process request
        response = await call_next(request)
        
        # Log request
        response_time = time.time() - start_time
        client_ip = request.client.host if request.client else "unknown"
        user_agent = request.headers.get("user-agent", "")
        
        # Extract user ID from request if available
        user_id = None
        if hasattr(request.state, "user") and request.state.user:
            user_id = getattr(request.state.user, "id", None)
        
        request_logger.log_request(
            method=request.method,
            path=request.url.path,
            status_code=response.status_code,
            response_time=response_time,
            ip_address=client_ip,
            user_id=user_id,
            user_agent=user_agent
        )
        
        return response
