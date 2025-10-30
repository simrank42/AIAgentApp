"""
Input validation and sanitization utilities
"""

import re
from typing import Any, Dict, List, Optional
from .constants import (
    EMAIL_PATTERN, USERNAME_PATTERN, SQL_INJECTION_PATTERNS, XSS_PATTERNS,
    WEAK_PASSWORDS, EMAIL_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH,
    PASSWORD_REQUIRE_UPPERCASE, PASSWORD_REQUIRE_LOWERCASE, PASSWORD_REQUIRE_NUMBERS,
    PASSWORD_REQUIRE_SPECIAL_CHARS, USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    ERROR_MESSAGES
)


class ValidationError(Exception):
    """Custom validation error"""
    def __init__(self, message: str, field: str = None):
        self.message = message
        self.field = field
        super().__init__(message)


def validate_email(email: str) -> str:
    """
    Validate and sanitize email address
    
    Args:
        email: Email address to validate
        
    Returns:
        Sanitized email address
        
    Raises:
        ValidationError: If email is invalid
    """
    if not email:
        raise ValidationError(ERROR_MESSAGES["INVALID_EMAIL"])
    
    email = email.strip().lower()
    
    if len(email) > EMAIL_MAX_LENGTH:
        raise ValidationError(ERROR_MESSAGES["EMAIL_TOO_LONG"])
    
    if not EMAIL_PATTERN.match(email):
        raise ValidationError(ERROR_MESSAGES["INVALID_EMAIL"])
    
    return email


def validate_password(password: str) -> str:
    """
    Validate password strength
    
    Args:
        password: Password to validate
        
    Returns:
        Validated password
        
    Raises:
        ValidationError: If password is invalid
    """
    if not password:
        raise ValidationError(ERROR_MESSAGES["PASSWORD_TOO_SHORT"])
    
    if len(password) < PASSWORD_MIN_LENGTH:
        raise ValidationError(ERROR_MESSAGES["PASSWORD_TOO_SHORT"])
    
    if len(password) > PASSWORD_MAX_LENGTH:
        raise ValidationError(ERROR_MESSAGES["PASSWORD_TOO_LONG"])
    
    # Check for weak passwords
    if password.lower() in WEAK_PASSWORDS:
        raise ValidationError(ERROR_MESSAGES["PASSWORD_COMMON"])
    
    # Check complexity requirements
    has_upper = bool(re.search(r'[A-Z]', password)) if PASSWORD_REQUIRE_UPPERCASE else True
    has_lower = bool(re.search(r'[a-z]', password)) if PASSWORD_REQUIRE_LOWERCASE else True
    has_number = bool(re.search(r'\d', password)) if PASSWORD_REQUIRE_NUMBERS else True
    has_special = bool(re.search(r'[!@#$%^&*(),.?":{}|<>]', password)) if PASSWORD_REQUIRE_SPECIAL_CHARS else True
    
    if not (has_upper and has_lower and has_number and has_special):
        raise ValidationError(ERROR_MESSAGES["PASSWORD_WEAK"])
    
    return password


def validate_username(username: str) -> str:
    """
    Validate and sanitize username
    
    Args:
        username: Username to validate
        
    Returns:
        Sanitized username
        
    Raises:
        ValidationError: If username is invalid
    """
    if not username:
        raise ValidationError(ERROR_MESSAGES["USERNAME_TOO_SHORT"])
    
    username = username.strip()
    
    if len(username) < USERNAME_MIN_LENGTH:
        raise ValidationError(ERROR_MESSAGES["USERNAME_TOO_SHORT"])
    
    if len(username) > USERNAME_MAX_LENGTH:
        raise ValidationError(ERROR_MESSAGES["USERNAME_TOO_LONG"])
    
    if not USERNAME_PATTERN.match(username):
        raise ValidationError(ERROR_MESSAGES["USERNAME_INVALID"])
    
    return username


def sanitize_string(text: str, max_length: int = None) -> str:
    """
    Sanitize string input by removing dangerous characters
    
    Args:
        text: Text to sanitize
        max_length: Maximum allowed length
        
    Returns:
        Sanitized text
    """
    if not text:
        return ""
    
    # Remove null bytes and control characters
    text = ''.join(char for char in text if ord(char) >= 32 or char in '\t\n\r')
    
    # Remove excessive whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    
    # Limit length if specified
    if max_length and len(text) > max_length:
        text = text[:max_length]
    
    return text


def detect_sql_injection(text: str) -> bool:
    """
    Detect potential SQL injection attempts
    
    Args:
        text: Text to check
        
    Returns:
        True if SQL injection pattern detected
    """
    if not text:
        return False
    
    text_lower = text.lower()
    
    for pattern in SQL_INJECTION_PATTERNS:
        if re.search(pattern, text_lower, re.IGNORECASE):
            return True
    
    return False


def detect_xss(text: str) -> bool:
    """
    Detect potential XSS attempts
    
    Args:
        text: Text to check
        
    Returns:
        True if XSS pattern detected
    """
    if not text:
        return False
    
    for pattern in XSS_PATTERNS:
        if re.search(pattern, text, re.IGNORECASE):
            return True
    
    return False


def validate_and_sanitize_input(
    text: str,
    field_name: str = "input",
    max_length: int = None,
    allow_html: bool = False
) -> str:
    """
    Comprehensive input validation and sanitization
    
    Args:
        text: Input text to validate
        field_name: Name of the field for error messages
        max_length: Maximum allowed length
        allow_html: Whether to allow HTML tags
        
    Returns:
        Sanitized text
        
    Raises:
        ValidationError: If input is invalid
    """
    if not text:
        return ""
    
    # Check for SQL injection
    if detect_sql_injection(text):
        raise ValidationError(ERROR_MESSAGES["SQL_INJECTION_DETECTED"], field_name)
    
    # Check for XSS (unless HTML is allowed)
    if not allow_html and detect_xss(text):
        raise ValidationError(ERROR_MESSAGES["XSS_DETECTED"], field_name)
    
    # Sanitize the text
    sanitized = sanitize_string(text, max_length)
    
    return sanitized


def validate_length(text: str, max_length: int, field_name: str = "field") -> str:
    """
    Validate text length
    
    Args:
        text: Text to validate
        max_length: Maximum allowed length
        field_name: Name of the field for error messages
        
    Returns:
        Validated text
        
    Raises:
        ValidationError: If text is too long
    """
    if not text:
        return ""
    
    if len(text) > max_length:
        raise ValidationError(f"{field_name} must be less than {max_length} characters")
    
    return text


def validate_file_extension(filename: str, allowed_extensions: set = None) -> str:
    """
    Validate file extension
    
    Args:
        filename: Filename to validate
        allowed_extensions: Set of allowed extensions
        
    Returns:
        Validated filename
        
    Raises:
        ValidationError: If extension is not allowed
    """
    if not filename:
        raise ValidationError("Filename is required")
    
    # Extract extension
    if '.' not in filename:
        raise ValidationError("File must have an extension")
    
    extension = '.' + filename.split('.')[-1].lower()
    
    if allowed_extensions and extension not in allowed_extensions:
        raise ValidationError(f"File extension {extension} is not allowed")
    
    return filename


def sanitize_filename(filename: str) -> str:
    """
    Sanitize filename by removing dangerous characters
    
    Args:
        filename: Filename to sanitize
        
    Returns:
        Sanitized filename
    """
    if not filename:
        return ""
    
    # Remove dangerous characters
    filename = re.sub(r'[<>:"/\\|?*\x00-\x1f]', '', filename)
    
    # Remove leading/trailing dots and spaces
    filename = filename.strip('. ')
    
    # Limit length
    if len(filename) > 255:
        name, ext = filename.rsplit('.', 1) if '.' in filename else (filename, '')
        filename = name[:255-len(ext)-1] + ('.' + ext if ext else '')
    
    return filename


def validate_json_payload(data: Dict[str, Any], required_fields: List[str] = None) -> Dict[str, Any]:
    """
    Validate JSON payload structure
    
    Args:
        data: JSON data to validate
        required_fields: List of required field names
        
    Returns:
        Validated data
        
    Raises:
        ValidationError: If validation fails
    """
    if not isinstance(data, dict):
        raise ValidationError("Payload must be a JSON object")
    
    if required_fields:
        for field in required_fields:
            if field not in data:
                raise ValidationError(f"Missing required field: {field}")
    
    return data


def sanitize_dict(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Recursively sanitize dictionary values
    
    Args:
        data: Dictionary to sanitize
        
    Returns:
        Sanitized dictionary
    """
    if not isinstance(data, dict):
        return data
    
    sanitized = {}
    for key, value in data.items():
        # Sanitize key
        sanitized_key = sanitize_string(str(key))
        
        # Sanitize value
        if isinstance(value, str):
            sanitized_value = sanitize_string(value)
        elif isinstance(value, dict):
            sanitized_value = sanitize_dict(value)
        elif isinstance(value, list):
            sanitized_value = [sanitize_dict(item) if isinstance(item, dict) else 
                             sanitize_string(item) if isinstance(item, str) else item 
                             for item in value]
        else:
            sanitized_value = value
        
        sanitized[sanitized_key] = sanitized_value
    
    return sanitized
