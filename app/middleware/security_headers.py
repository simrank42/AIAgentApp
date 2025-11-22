"""
Security Headers Middleware
Adds essential security headers to all responses following OWASP best practices
"""

from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from typing import Callable


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """Adds security headers to all responses"""
    
    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        response = await call_next(request)
        
        # Content Security Policy - Balanced policy for Angular SPA
        # Note: Angular requires 'unsafe-inline' for both styles and event handlers
        # This is the standard approach for Angular applications with CSP
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline'; "  # Required for Angular event handlers
            "style-src 'self' 'unsafe-inline'; "  # Required for Angular component styles
            "img-src 'self' data: https:; "
            "font-src 'self' data:; "
            "connect-src 'self' ws: wss: https:; "
            "frame-ancestors 'none'; "
            "base-uri 'self'; "
            "form-action 'self'; "
            "object-src 'none'; "
            "upgrade-insecure-requests"
        )
        
        # Prevent MIME type sniffing
        response.headers["X-Content-Type-Options"] = "nosniff"
        
        # Enable XSS protection (kept as requested by user)
        response.headers["X-XSS-Protection"] = "1; mode=block"
        
        # Prevent clickjacking
        response.headers["X-Frame-Options"] = "DENY"
        
        # Referrer Policy - Control referrer information
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        
        # Permissions Policy - Control browser features (updated syntax)
        response.headers["Permissions-Policy"] = (
            "geolocation=(), "
            "microphone=(), "
            "camera=(), "
            "payment=(), "
            "usb=(), "
            "magnetometer=(), "
            "gyroscope=(), "
            "accelerometer=(), "
            "ambient-light-sensor=(), "
            "autoplay=(), "
            "battery=(), "
            "display-capture=(), "
            "document-domain=(), "
            "encrypted-media=(), "
            "fullscreen=(), "
            "gamepad=(), "
            "picture-in-picture=(), "
            "publickey-credentials-get=(), "
            "screen-wake-lock=(), "
            "speaker-selection=(), "
            "sync-xhr=(), "
            "web-share=()"
        )
        
        # Cross-Origin-Opener-Policy - Protects against Spectre-like attacks
        response.headers["Cross-Origin-Opener-Policy"] = "same-origin"
        
        # Cross-Origin-Embedder-Policy - Use unsafe-none for compatibility
        # Note: 'require-corp' or 'credentialless' may break external resources
        # For SPA applications serving their own resources, this is acceptable
        response.headers["Cross-Origin-Embedder-Policy"] = "unsafe-none"
        
        # Cross-Origin-Resource-Policy - Prevents resource leaks
        response.headers["Cross-Origin-Resource-Policy"] = "same-origin"
        
        # X-Permitted-Cross-Domain-Policies - Restrict Adobe Flash and PDF
        response.headers["X-Permitted-Cross-Domain-Policies"] = "none"
        
        # X-Download-Options - Prevent IE from executing downloads
        response.headers["X-Download-Options"] = "noopen"
        
        # Strict Transport Security (only for HTTPS)
        if request.url.scheme == "https":
            response.headers["Strict-Transport-Security"] = (
                "max-age=31536000; includeSubDomains; preload"
            )
        
        # Cache Control for sensitive endpoints
        if request.url.path.startswith("/api/v1/auth") or request.url.path.startswith("/api/v1/users"):
            response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, private"
            response.headers["Pragma"] = "no-cache"
            response.headers["Expires"] = "0"
        
        return response