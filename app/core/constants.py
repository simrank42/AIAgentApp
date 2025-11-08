"""
Security and application constants
"""

import re
from typing import List

# Password Policy Constants
PASSWORD_MIN_LENGTH = 8
PASSWORD_MAX_LENGTH = 128
PASSWORD_REQUIRE_UPPERCASE = True
PASSWORD_REQUIRE_LOWERCASE = True
PASSWORD_REQUIRE_NUMBERS = True
PASSWORD_REQUIRE_SPECIAL_CHARS = True

# Common weak passwords to block
WEAK_PASSWORDS = {
    "password", "123456", "123456789", "qwerty", "abc123", "password123",
    "admin", "letmein", "welcome", "monkey", "1234567890", "password1",
    "qwerty123", "dragon", "123123", "baseball", "football", "1234567",
    "master", "hello", "welcome123", "monkey123", "dragon123", "111111",
    "password12", "12345", "pass", "shadow", "superman", "qazwsx",
    "michael", "jordan", "harley", "ranger", "hunter", "buster",
    "soccer", "hockey", "killer", "george", "sexy", "andrew",
    "charlie", "superman", "asshole", "fuckyou", "dallas", "jessica",
    "panties", "pepper", "1234", "zxcvbn", "thomas", "hockey",
    "ranger", "daniel", "hannah", "maggie", "jessica", "charlie"
}

# Rate Limiting Constants
RATE_LIMIT_DEFAULT_REQUESTS = 100
RATE_LIMIT_DEFAULT_WINDOW = 3600  # 1 hour
RATE_LIMIT_LOGIN_REQUESTS = 5
RATE_LIMIT_LOGIN_WINDOW = 300  # 5 minutes
RATE_LIMIT_REGISTER_REQUESTS = 3
RATE_LIMIT_REGISTER_WINDOW = 3600  # 1 hour
RATE_LIMIT_CAPTCHA_REQUESTS = 10
RATE_LIMIT_CAPTCHA_WINDOW = 60  # 1 minute

# Request Size Limits
MAX_REQUEST_SIZE = 16 * 1024 * 1024  # 16MB
MAX_UPLOAD_SIZE = 10 * 1024 * 1024  # 10MB
MAX_WEBSOCKET_MESSAGE_SIZE = 64 * 1024  # 64KB

# Input Validation Constants
EMAIL_MAX_LENGTH = 254
USERNAME_MIN_LENGTH = 3
USERNAME_MAX_LENGTH = 30
BIO_MAX_LENGTH = 500
MESSAGE_MAX_LENGTH = 10000
SESSION_NAME_MAX_LENGTH = 100
AGENT_NAME_MAX_LENGTH = 100
AGENT_DESCRIPTION_MAX_LENGTH = 500

# Security Headers
SECURITY_HEADERS = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=()"
}

# CORS Configuration
ALLOWED_HTTP_METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
ALLOWED_HTTP_HEADERS = [
    "Accept",
    "Accept-Language",
    "Content-Language",
    "Content-Type",
    "Authorization",
    "X-Requested-With"
]

# Token Configuration
TOKEN_ALGORITHM = "HS256"
TOKEN_ISSUER = "chat-backend"
TOKEN_AUDIENCE = "chat-frontend"

# Database Configuration
DB_CONNECTION_TIMEOUT = 30
DB_QUERY_TIMEOUT = 60
DB_POOL_SIZE = 10
DB_MAX_OVERFLOW = 20

# Logging Configuration
LOG_LEVEL = "INFO"
LOG_FORMAT = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
LOG_FILE_MAX_SIZE = 10 * 1024 * 1024  # 10MB
LOG_FILE_BACKUP_COUNT = 5

# Validation Patterns
EMAIL_PATTERN = re.compile(
    r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
)

USERNAME_PATTERN = re.compile(
    r'^[a-zA-Z0-9_-]+$'
)

# SQL Injection Prevention Patterns
SQL_INJECTION_PATTERNS = [
    r'\bselect\s+.+\s+from\b',
    r'\binsert\s+into\s+\w+',
    r'\bupdate\s+\w+\s+set\b',
    r'\bdelete\s+from\s+\w+',
    r'\b(drop|create|alter)\s+(table|database|index)\b',
    r'\bunion\s+select\b',
    r'\bexec\s+(sp_|xp_)?\w+',
    r'\b(or|and)\s+\d+\s*=\s*\d+\b',
    r'\b(or|and)\s+[\'"][^\'"]*[\'"]\s*=\s*[\'"][^\'"]*[\'"]',
    r'\b(or|and)\s+[\'"][^\'"]*[\'"]\s*like\s*[\'"][^\'"]*[\'"]',
    r';',
    r'--',
    r'/\*',
    r'\*/',
]

# XSS Prevention Patterns
XSS_PATTERNS = [
    r'<script[^>]*>.*?</script>',
    r'javascript:',
    r'on\w+\s*=',
    r'<iframe[^>]*>.*?</iframe>',
    r'<object[^>]*>.*?</object>',
    r'<embed[^>]*>.*?</embed>',
    r'<form[^>]*>.*?</form>',
    r'<input[^>]*>',
    r'<link[^>]*>',
    r'<meta[^>]*>',
]

# File Upload Security
ALLOWED_FILE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.pdf', '.txt', '.doc', '.docx'}
ALLOWED_MIME_TYPES = {
    'image/jpeg', 'image/png', 'image/gif', 'application/pdf',
    'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
}

# Session Configuration
SESSION_TIMEOUT = 3600  # 1 hour
MAX_CONCURRENT_SESSIONS = 5
SESSION_CLEANUP_INTERVAL = 300  # 5 minutes

# CAPTCHA Configuration
CAPTCHA_EXPIRY_TIME = 300  # 5 minutes
CAPTCHA_MAX_ATTEMPTS = 3
CAPTCHA_LOCKOUT_TIME = 1800  # 30 minutes

# Error Messages
ERROR_MESSAGES = {
    "INVALID_EMAIL": "Invalid email format",
    "EMAIL_TOO_LONG": f"Email must be less than {EMAIL_MAX_LENGTH} characters",
    "PASSWORD_TOO_SHORT": f"Password must be at least {PASSWORD_MIN_LENGTH} characters",
    "PASSWORD_TOO_LONG": f"Password must be less than {PASSWORD_MAX_LENGTH} characters",
    "PASSWORD_WEAK": "Password does not meet complexity requirements",
    "PASSWORD_COMMON": "Password is too common, please choose a stronger one",
    "USERNAME_INVALID": "Username can only contain letters, numbers, underscores, and hyphens",
    "USERNAME_TOO_SHORT": f"Username must be at least {USERNAME_MIN_LENGTH} characters",
    "USERNAME_TOO_LONG": f"Username must be less than {USERNAME_MAX_LENGTH} characters",
    "BIO_TOO_LONG": f"Bio must be less than {BIO_MAX_LENGTH} characters",
    "MESSAGE_TOO_LONG": f"Message must be less than {MESSAGE_MAX_LENGTH} characters",
    "SESSION_NAME_TOO_LONG": f"Session name must be less than {SESSION_NAME_MAX_LENGTH} characters",
    "AGENT_NAME_TOO_LONG": f"Agent name must be less than {AGENT_NAME_MAX_LENGTH} characters",
    "AGENT_DESCRIPTION_TOO_LONG": f"Agent description must be less than {AGENT_DESCRIPTION_MAX_LENGTH} characters",
    "INVALID_INPUT": "Invalid input detected",
    "SQL_INJECTION_DETECTED": "Invalid input detected",
    "XSS_DETECTED": "Invalid input detected",
    "RATE_LIMIT_EXCEEDED": "Too many requests, please try again later",
    "UNAUTHORIZED": "Authentication required",
    "FORBIDDEN": "Access denied",
    "NOT_FOUND": "Resource not found",
    "INTERNAL_ERROR": "Internal server error"
}
