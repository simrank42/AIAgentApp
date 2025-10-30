"""
Structured logging configuration
"""

import json
import logging
import sys
from datetime import datetime
from typing import Any, Dict, Optional
from .config import settings


class JSONFormatter(logging.Formatter):
    """Custom JSON formatter for structured logging"""
    
    def format(self, record: logging.LogRecord) -> str:
        log_entry = {
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
            "module": record.module,
            "function": record.funcName,
            "line": record.lineno,
        }
        
        # Add exception info if present
        if record.exc_info:
            log_entry["exception"] = self.formatException(record.exc_info)
        
        # Add extra fields
        for key, value in record.__dict__.items():
            if key not in ('name', 'msg', 'args', 'levelname', 'levelno', 'pathname',
                          'filename', 'module', 'exc_info', 'exc_text', 'stack_info',
                          'lineno', 'funcName', 'created', 'msecs', 'relativeCreated',
                          'thread', 'threadName', 'processName', 'process', 'getMessage'):
                log_entry[key] = value
        
        return json.dumps(log_entry, default=str)


class SecurityLogger:
    """Security event logger"""
    
    def __init__(self):
        self.logger = logging.getLogger("security")
        self.logger.setLevel(logging.INFO)
        
        # Add handler if not already present
        if not self.logger.handlers:
            handler = logging.StreamHandler(sys.stdout)
            handler.setFormatter(JSONFormatter())
            self.logger.addHandler(handler)
    
    def log_auth_attempt(
        self,
        email: str,
        ip_address: str,
        success: bool,
        reason: str = None,
        user_id: Optional[int] = None
    ):
        """Log authentication attempt"""
        self.logger.info(
            "Authentication attempt",
            extra={
                "event_type": "auth_attempt",
                "email": email,
                "ip_address": ip_address,
                "success": success,
                "reason": reason,
                "user_id": user_id,
                "timestamp": datetime.utcnow().isoformat()
            }
        )
    
    def log_auth_failure(
        self,
        email: str,
        ip_address: str,
        reason: str,
        user_id: Optional[int] = None
    ):
        """Log authentication failure"""
        self.logger.warning(
            "Authentication failure",
            extra={
                "event_type": "auth_failure",
                "email": email,
                "ip_address": ip_address,
                "reason": reason,
                "user_id": user_id,
                "timestamp": datetime.utcnow().isoformat()
            }
        )
    
    def log_unauthorized_access(
        self,
        endpoint: str,
        method: str,
        ip_address: str,
        user_id: Optional[int] = None,
        reason: str = None
    ):
        """Log unauthorized access attempt"""
        self.logger.warning(
            "Unauthorized access attempt",
            extra={
                "event_type": "unauthorized_access",
                "endpoint": endpoint,
                "method": method,
                "ip_address": ip_address,
                "user_id": user_id,
                "reason": reason,
                "timestamp": datetime.utcnow().isoformat()
            }
        )
    
    def log_data_access(
        self,
        user_id: int,
        resource_type: str,
        resource_id: str,
        action: str,
        ip_address: str
    ):
        """Log data access"""
        self.logger.info(
            "Data access",
            extra={
                "event_type": "data_access",
                "user_id": user_id,
                "resource_type": resource_type,
                "resource_id": resource_id,
                "action": action,
                "ip_address": ip_address,
                "timestamp": datetime.utcnow().isoformat()
            }
        )
    
    def log_data_modification(
        self,
        user_id: int,
        resource_type: str,
        resource_id: str,
        action: str,
        ip_address: str,
        changes: Dict[str, Any] = None
    ):
        """Log data modification"""
        self.logger.info(
            "Data modification",
            extra={
                "event_type": "data_modification",
                "user_id": user_id,
                "resource_type": resource_type,
                "resource_id": resource_id,
                "action": action,
                "ip_address": ip_address,
                "changes": changes,
                "timestamp": datetime.utcnow().isoformat()
            }
        )
    
    def log_security_violation(
        self,
        violation_type: str,
        details: Dict[str, Any],
        ip_address: str,
        user_id: Optional[int] = None
    ):
        """Log security violation"""
        self.logger.error(
            "Security violation",
            extra={
                "event_type": "security_violation",
                "violation_type": violation_type,
                "details": details,
                "ip_address": ip_address,
                "user_id": user_id,
                "timestamp": datetime.utcnow().isoformat()
            }
        )
    
    def log_rate_limit_exceeded(
        self,
        endpoint: str,
        ip_address: str,
        limit: int,
        window: int
    ):
        """Log rate limit exceeded"""
        self.logger.warning(
            "Rate limit exceeded",
            extra={
                "event_type": "rate_limit_exceeded",
                "endpoint": endpoint,
                "ip_address": ip_address,
                "limit": limit,
                "window": window,
                "timestamp": datetime.utcnow().isoformat()
            }
        )


class RequestLogger:
    """Request logging utility"""
    
    def __init__(self):
        self.logger = logging.getLogger("requests")
        self.logger.setLevel(logging.INFO)
        
        # Add handler if not already present
        if not self.logger.handlers:
            handler = logging.StreamHandler(sys.stdout)
            handler.setFormatter(JSONFormatter())
            self.logger.addHandler(handler)
    
    def log_request(
        self,
        method: str,
        path: str,
        status_code: int,
        response_time: float,
        ip_address: str,
        user_id: Optional[int] = None,
        user_agent: str = None
    ):
        """Log HTTP request"""
        self.logger.info(
            "HTTP request",
            extra={
                "event_type": "http_request",
                "method": method,
                "path": path,
                "status_code": status_code,
                "response_time": response_time,
                "ip_address": ip_address,
                "user_id": user_id,
                "user_agent": user_agent,
                "timestamp": datetime.utcnow().isoformat()
            }
        )


# Global logger instances
security_logger = SecurityLogger()
request_logger = RequestLogger()


def setup_logging():
    """Setup application logging configuration"""
    # Configure root logger
    root_logger = logging.getLogger()
    root_logger.setLevel(logging.INFO)
    
    # Remove existing handlers
    for handler in root_logger.handlers[:]:
        root_logger.removeHandler(handler)
    
    # Add console handler with JSON formatter
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(JSONFormatter())
    root_logger.addHandler(console_handler)
    
    # Configure specific loggers
    logging.getLogger("uvicorn").setLevel(logging.INFO)
    logging.getLogger("uvicorn.access").setLevel(logging.INFO)
    logging.getLogger("sqlalchemy.engine").setLevel(logging.WARNING)
    logging.getLogger("sqlalchemy.pool").setLevel(logging.WARNING)
    
    # Set log level from settings
    if hasattr(settings, 'LOG_LEVEL'):
        root_logger.setLevel(getattr(logging, settings.LOG_LEVEL.upper()))


def get_logger(name: str) -> logging.Logger:
    """Get logger instance with JSON formatting"""
    logger = logging.getLogger(name)
    
    # Add handler if not already present
    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        handler.setFormatter(JSONFormatter())
        logger.addHandler(handler)
    
    return logger
