"""
Custom exception handlers and error utilities
"""

from typing import Any, Dict, Optional
from fastapi import HTTPException, Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
import logging

from .constants import ERROR_MESSAGES


class APIError(HTTPException):
    """Custom API error with additional context"""
    
    def __init__(
        self,
        status_code: int,
        detail: str,
        error_code: str = None,
        context: Dict[str, Any] = None
    ):
        super().__init__(status_code=status_code, detail=detail)
        self.error_code = error_code
        self.context = context or {}


class ValidationError(APIError):
    """Validation error"""
    
    def __init__(self, detail: str, field: str = None, context: Dict[str, Any] = None):
        super().__init__(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=detail,
            error_code="VALIDATION_ERROR",
            context={"field": field} if field else context
        )


class AuthenticationError(APIError):
    """Authentication error"""
    
    def __init__(self, detail: str = ERROR_MESSAGES["UNAUTHORIZED"]):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=detail,
            error_code="AUTHENTICATION_ERROR"
        )


class AuthorizationError(APIError):
    """Authorization error"""
    
    def __init__(self, detail: str = ERROR_MESSAGES["FORBIDDEN"]):
        super().__init__(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=detail,
            error_code="AUTHORIZATION_ERROR"
        )


class NotFoundError(APIError):
    """Resource not found error"""
    
    def __init__(self, detail: str = ERROR_MESSAGES["NOT_FOUND"]):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=detail,
            error_code="NOT_FOUND"
        )


class RateLimitError(APIError):
    """Rate limit exceeded error"""
    
    def __init__(self, detail: str = ERROR_MESSAGES["RATE_LIMIT_EXCEEDED"]):
        super().__init__(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=detail,
            error_code="RATE_LIMIT_EXCEEDED"
        )


class InternalServerError(APIError):
    """Internal server error"""
    
    def __init__(self, detail: str = ERROR_MESSAGES["INTERNAL_ERROR"]):
        super().__init__(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=detail,
            error_code="INTERNAL_SERVER_ERROR"
        )


def create_error_response(
    status_code: int,
    detail: str,
    error_code: str = None,
    context: Dict[str, Any] = None
) -> JSONResponse:
    """Create standardized error response"""
    
    error_data = {
        "error": {
            "code": error_code or "UNKNOWN_ERROR",
            "message": detail,
            "status_code": status_code
        }
    }
    
    if context:
        error_data["error"]["context"] = context
    
    return JSONResponse(
        status_code=status_code,
        content=error_data
    )


async def http_exception_handler(request: Request, exc: HTTPException) -> JSONResponse:
    """Handle HTTP exceptions"""
    
    # Log the error
    logger = logging.getLogger("errors")
    logger.warning(
        f"HTTP exception: {exc.status_code} - {exc.detail}",
        extra={
            "status_code": exc.status_code,
            "detail": exc.detail,
            "path": request.url.path,
            "method": request.method,
            "client_ip": request.client.host if request.client else None
        }
    )
    
    # Create error response
    error_code = None
    if hasattr(exc, 'error_code'):
        error_code = exc.error_code
    
    context = None
    if hasattr(exc, 'context'):
        context = exc.context
    
    return create_error_response(
        status_code=exc.status_code,
        detail=exc.detail,
        error_code=error_code,
        context=context
    )


async def validation_exception_handler(
    request: Request, 
    exc: RequestValidationError
) -> JSONResponse:
    """Handle validation exceptions"""
    
    # Log the error
    logger = logging.getLogger("errors")
    logger.warning(
        f"Validation error: {exc.errors()}",
        extra={
            "errors": exc.errors(),
            "path": request.url.path,
            "method": request.method,
            "client_ip": request.client.host if request.client else None
        }
    )
    
    # Format validation errors
    formatted_errors = []
    for error in exc.errors():
        field = ".".join(str(x) for x in error["loc"]) if error["loc"] else "unknown"
        formatted_errors.append({
            "field": field,
            "message": error["msg"],
            "type": error["type"]
        })
    
    return create_error_response(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        detail="Validation failed",
        error_code="VALIDATION_ERROR",
        context={"errors": formatted_errors}
    )


async def general_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """Handle general exceptions"""
    
    # Log the error
    logger = logging.getLogger("errors")
    logger.error(
        f"Unhandled exception: {str(exc)}",
        exc_info=True,
        extra={
            "exception_type": type(exc).__name__,
            "exception_message": str(exc),
            "path": request.url.path,
            "method": request.method,
            "client_ip": request.client.host if request.client else None
        }
    )
    
    # Return generic error in production, detailed error in development
    from .config import settings
    
    if settings.APP_ENV == "dev":
        detail = f"Internal server error: {str(exc)}"
    else:
        detail = ERROR_MESSAGES["INTERNAL_ERROR"]
    
    return create_error_response(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail=detail,
        error_code="INTERNAL_SERVER_ERROR"
    )


def handle_database_error(exc: Exception, operation: str) -> APIError:
    """Handle database errors"""
    
    logger = logging.getLogger("database")
    logger.error(
        f"Database error during {operation}: {str(exc)}",
        exc_info=True
    )
    
    # Map common database errors to API errors
    error_message = str(exc).lower()
    
    if "unique constraint" in error_message or "duplicate key" in error_message:
        return ValidationError("Resource already exists")
    elif "foreign key constraint" in error_message:
        return ValidationError("Referenced resource does not exist")
    elif "not null constraint" in error_message:
        return ValidationError("Required field is missing")
    elif "check constraint" in error_message:
        return ValidationError("Invalid data provided")
    else:
        return InternalServerError("Database operation failed")


def handle_authentication_error(exc: Exception, operation: str) -> APIError:
    """Handle authentication errors"""
    
    logger = logging.getLogger("authentication")
    logger.warning(
        f"Authentication error during {operation}: {str(exc)}"
    )
    
    if "invalid token" in str(exc).lower():
        return AuthenticationError("Invalid or expired token")
    elif "token expired" in str(exc).lower():
        return AuthenticationError("Token has expired")
    elif "user not found" in str(exc).lower():
        return AuthenticationError("Invalid credentials")
    else:
        return AuthenticationError("Authentication failed")


def handle_authorization_error(exc: Exception, operation: str) -> APIError:
    """Handle authorization errors"""
    
    logger = logging.getLogger("authorization")
    logger.warning(
        f"Authorization error during {operation}: {str(exc)}"
    )
    
    return AuthorizationError("Access denied")


def sanitize_error_message(message: str, is_production: bool = False) -> str:
    """Sanitize error messages for production"""
    
    if is_production:
        # Remove sensitive information from error messages
        sensitive_patterns = [
            r'password',
            r'token',
            r'key',
            r'secret',
            r'hash',
            r'database',
            r'sql',
            r'connection',
            r'file',
            r'path'
        ]
        
        for pattern in sensitive_patterns:
            message = message.replace(pattern, "[REDACTED]")
    
    return message
