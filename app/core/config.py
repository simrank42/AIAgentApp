import os
import secrets
from datetime import timedelta
from dotenv import load_dotenv
from typing import List

load_dotenv()

def get_bool(name: str, default: bool) -> bool:
    v = os.getenv(name)
    if v is None:
        return default
    return v.lower() in {"1", "true", "yes", "on"}

def get_int(name: str, default: int, min_val: int = None, max_val: int = None) -> int:
    v = os.getenv(name)
    if v is None:
        return default
    try:
        val = int(v)
        if min_val is not None and val < min_val:
            return min_val
        if max_val is not None and val > max_val:
            return max_val
        return val
    except ValueError:
        return default

def validate_secret_key(key: str, env: str) -> str:
    """Validate secret key for production"""
    if env == "prod" and key == "dev-insecure-secret-change-me":
        raise ValueError("SECRET_KEY must be changed in production environment")
    if len(key) < 32:
        raise ValueError("SECRET_KEY must be at least 32 characters long")
    return key

def validate_cors_origins(origins: List[str]) -> List[str]:
    """Validate CORS origins"""
    if not origins:
        return ["http://localhost:4200"]
    
    # Remove any wildcard origins in production
    if os.getenv("APP_ENV", "dev") == "prod":
        origins = [origin for origin in origins if origin != "*"]
    
    return origins

class Settings:
    APP_ENV: str = os.getenv("APP_ENV", "dev")
    SECRET_KEY: str = validate_secret_key(
        os.getenv("SECRET_KEY", secrets.token_urlsafe(32)), 
        os.getenv("APP_ENV", "dev")
    )

    # Token expiry with validation
    ACCESS_TOKEN_EXPIRE_MINUTES: int = get_int("ACCESS_TOKEN_EXPIRE_MINUTES", 15, 1, 1440)
    REFRESH_TOKEN_EXPIRE_DAYS: int = get_int("REFRESH_TOKEN_EXPIRE_DAYS", 7, 1, 365)

    # CORS with validation
    CORS_ORIGINS: List[str] = validate_cors_origins(
        [o.strip() for o in os.getenv("CORS_ORIGINS", "").split(",") if o.strip()]
    )

    # Database
    # Default path depends on environment: /data/app.db for Docker/Render, ./app.db for local dev
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./app.db")
    
    # Security headers
    ENABLE_SECURITY_HEADERS: bool = get_bool("ENABLE_SECURITY_HEADERS", True)
    ENABLE_CORS: bool = get_bool("ENABLE_CORS", True)
    
    # Cookie security
    COOKIE_DOMAIN: str | None = os.getenv("COOKIE_DOMAIN", None) or None
    COOKIE_SECURE: bool = get_bool("COOKIE_SECURE", APP_ENV == "prod")
    COOKIE_SAMESITE: str = os.getenv("COOKIE_SAMESITE", "lax" if APP_ENV == "dev" else "strict")

    # Rate limiting
    ENABLE_RATE_LIMITING: bool = get_bool("ENABLE_RATE_LIMITING", True)
    RATE_LIMIT_STORAGE_URL: str = os.getenv("RATE_LIMIT_STORAGE_URL", "memory://")

    # Logging
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
    LOG_FORMAT: str = os.getenv("LOG_FORMAT", "json")

    # Request limits
    MAX_REQUEST_SIZE: int = get_int("MAX_REQUEST_SIZE", 16 * 1024 * 1024, 1024, 100 * 1024 * 1024)
    MAX_UPLOAD_SIZE: int = get_int("MAX_UPLOAD_SIZE", 10 * 1024 * 1024, 1024, 50 * 1024 * 1024)

    # AI
    AI_PROVIDER: str = os.getenv("AI_PROVIDER", "mock")
    HF_API_KEY: str | None = os.getenv("HF_TOKEN") or os.getenv("HF_API_KEY") or None
    HF_MODEL: str = os.getenv("HF_MODEL", "meta-llama/Llama-3.1-8B-Instruct")
    
    # JWT
    ALGORITHM: str = "HS256"
    TOKEN_ISSUER: str = os.getenv("TOKEN_ISSUER", "chat-backend")
    TOKEN_AUDIENCE: str = os.getenv("TOKEN_AUDIENCE", "chat-frontend")

    # Password policy
    PASSWORD_MIN_LENGTH: int = get_int("PASSWORD_MIN_LENGTH", 8, 6, 128)
    PASSWORD_REQUIRE_UPPERCASE: bool = get_bool("PASSWORD_REQUIRE_UPPERCASE", True)
    PASSWORD_REQUIRE_LOWERCASE: bool = get_bool("PASSWORD_REQUIRE_LOWERCASE", True)
    PASSWORD_REQUIRE_NUMBERS: bool = get_bool("PASSWORD_REQUIRE_NUMBERS", True)
    PASSWORD_REQUIRE_SPECIAL_CHARS: bool = get_bool("PASSWORD_REQUIRE_SPECIAL_CHARS", True)

    # CSRF Protection
    CSRF_STRICT_IP: bool = get_bool("CSRF_STRICT_IP", False)
    CSRF_TOKEN_EXPIRE_HOURS: int = get_int("CSRF_TOKEN_EXPIRE_HOURS", 1, 1, 24)

    # Session management
    SESSION_TIMEOUT: int = get_int("SESSION_TIMEOUT", 3600, 300, 86400)
    MAX_CONCURRENT_SESSIONS: int = get_int("MAX_CONCURRENT_SESSIONS", 5, 1, 20)

    @property
    def access_delta(self):
        return timedelta(minutes=self.ACCESS_TOKEN_EXPIRE_MINUTES)

    @property
    def refresh_delta(self):
        return timedelta(days=self.REFRESH_TOKEN_EXPIRE_DAYS)
    
    @property
    def is_production(self) -> bool:
        return self.APP_ENV == "prod"
    
    @property
    def is_development(self) -> bool:
        return self.APP_ENV == "dev"
    
    def validate_secrets(self, logger=None) -> dict:
        """Validate required and recommended secrets, return warnings dict"""
        warnings = {}
        
        # Required secrets for production
        if self.is_production:
            if not self.SECRET_KEY or len(self.SECRET_KEY) < 32:
                warnings["SECRET_KEY"] = "SECRET_KEY must be at least 32 characters in production"
        
        # Recommended secrets (warnings only, app can degrade gracefully)
        if self.AI_PROVIDER == "huggingface" and not self.HF_API_KEY:
            warnings["HF_API_KEY"] = (
                "HF_API_KEY not set - AI features will use mock mode. "
                "Set HF_TOKEN in Render Dashboard → Environment Variables if using HuggingFace"
            )
        
        # Litestream credentials (optional but recommended for production)
        litestream_access_key = os.getenv("LITESTREAM_ACCESS_KEY_ID")
        litestream_secret_key = os.getenv("LITESTREAM_SECRET_ACCESS_KEY")
        if self.is_production:
            if not litestream_access_key or not litestream_secret_key:
                warnings["LITESTREAM"] = (
                    "Litestream credentials not configured - database backups disabled. "
                    "Set LITESTREAM_ACCESS_KEY_ID and LITESTREAM_SECRET_ACCESS_KEY "
                    "in Render Dashboard → Environment Variables for database persistence"
                )
        
        if logger:
            for key, message in warnings.items():
                logger.warning(f"⚠️  Warning: {message}")
        
        return warnings

settings = Settings()
