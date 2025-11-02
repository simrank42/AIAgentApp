import random
import string
import base64
import io
from datetime import datetime, timedelta
from PIL import Image, ImageDraw, ImageFont
import uuid
from typing import Dict, Tuple

class CaptchaGenerator:
    """Simple CAPTCHA generator for login protection"""
    
    def __init__(self):
        # In-memory storage for CAPTCHA data (in production, use Redis)
        self.captcha_storage: Dict[str, dict] = {}
        self.attempt_storage: Dict[str, dict] = {}  # IP-based attempt tracking
    
    def generate_captcha(self, ip_address: str) -> Tuple[str, str, str]:
        """
        Generate a new CAPTCHA challenge
        Returns: (captcha_id, base64_image, expires_at)
        """
        # Generate random text (4-6 characters)
        # Exclude confusing characters: 0 (zero), O (letter O), 1 (one), I (letter I), 5 (five), S (letter S)
        # This makes the captcha easier to read and reduces user errors
        chars = string.ascii_uppercase.replace('O', '').replace('I', '').replace('S', '') + \
                string.digits.replace('0', '').replace('1', '').replace('5', '')
        captcha_text = ''.join(random.choices(chars, k=random.randint(4, 5)))  # 4-5 chars for better readability
        captcha_id = str(uuid.uuid4())
        
        # Create image - larger size for better visibility
        width, height = 250, 100
        image = Image.new('RGB', (width, height), color=(245, 245, 245))  # Light gray background
        draw = ImageDraw.Draw(image)
        
        # Try to use a better font with fallbacks
        font_size = 48
        font = None
        font_paths = [
            "arial.ttf",
            "Arial.ttf",
            "/System/Library/Fonts/Supplemental/Arial.ttf",  # macOS
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",  # Linux
            "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",  # Linux
        ]
        
        for font_path in font_paths:
            try:
                font = ImageFont.truetype(font_path, font_size)
                break
            except:
                continue
        
        if font is None:
            # Fallback to default font
            font = ImageFont.load_default()
        
        # Draw text with proper spacing - clearer and more readable
        # Calculate total text width first
        char_spacing = 30
        text_width = char_spacing * len(captcha_text)
        text_x = (width - text_width) // 2
        text_y = (height - font_size) // 2 - 5  # Slightly higher for better visibility
        
        # Draw each character with better contrast
        for i, char in enumerate(captcha_text):
            # Calculate character position with proper spacing
            char_x = text_x + i * char_spacing + random.randint(-3, 3)
            char_y = text_y + random.randint(-2, 2)
            
            # Use darker, more contrasting colors for better visibility
            # Mix of dark blue, dark green, dark red for good contrast
            color_options = [
                (30, 60, 120),   # Dark blue
                (80, 40, 20),    # Dark brown
                (20, 80, 40),    # Dark green
                (100, 30, 30),   # Dark red
                (40, 40, 100),   # Dark purple
            ]
            color = random.choice(color_options)
            
            # Draw character with slight rotation effect
            draw.text((char_x, char_y), char, fill=color, font=font)
        
        # Add subtle noise in background (less distracting)
        for _ in range(50):  # Reduced noise
            x = random.randint(0, width)
            y = random.randint(0, height)
            # Light gray noise that doesn't interfere with text
            noise_color = (random.randint(220, 240), random.randint(220, 240), random.randint(220, 240))
            draw.point((x, y), fill=noise_color)
        
        # Add subtle lines (not too distracting)
        for _ in range(2):  # Reduced lines
            start_x = random.randint(0, width // 4)
            start_y = random.randint(0, height)
            end_x = random.randint(3 * width // 4, width)
            end_y = random.randint(0, height)
            # Light gray lines
            line_color = (random.randint(200, 220), random.randint(200, 220), random.randint(200, 220))
            draw.line([(start_x, start_y), (end_x, end_y)], fill=line_color, width=1)
        
        # Convert to base64
        buffer = io.BytesIO()
        image.save(buffer, format='PNG')
        image_data = base64.b64encode(buffer.getvalue()).decode()
        
        # Store CAPTCHA data (expires in 5 minutes)
        expires_at = datetime.utcnow() + timedelta(minutes=5)
        self.captcha_storage[captcha_id] = {
            'text': captcha_text,
            'expires_at': expires_at,
            'ip_address': ip_address,
            'attempts': 0
        }
        
        return captcha_id, image_data, expires_at.isoformat()
    
    def verify_captcha(self, captcha_id: str, answer: str, ip_address: str) -> Tuple[bool, str, int]:
        """
        Verify CAPTCHA answer
        Returns: (success, message, remaining_attempts)
        """
        # Check if CAPTCHA exists
        if captcha_id not in self.captcha_storage:
            return False, "Invalid CAPTCHA", 0
        
        captcha_data = self.captcha_storage[captcha_id]
        
        # Check if expired first
        if datetime.utcnow() > captcha_data['expires_at']:
            del self.captcha_storage[captcha_id]
            return False, "CAPTCHA expired", 0
        
        # Check IP address
        if captcha_data['ip_address'] != ip_address:
            del self.captcha_storage[captcha_id]
            return False, "Invalid CAPTCHA", 0
        
        # Check attempts limit
        max_attempts = 3
        if captcha_data['attempts'] >= max_attempts:
            del self.captcha_storage[captcha_id]
            return False, "Too many attempts", 0
        
        # Increment attempts
        captcha_data['attempts'] += 1
        
        # Normalize answer - remove all whitespace and compare case-insensitively
        # Also remove common confusing characters (0/O, 1/I, etc.)
        normalized_answer = ''.join(answer.strip().upper().split())
        normalized_captcha = captcha_data['text'].upper()
        
        # Check answer (case-insensitive, whitespace-insensitive)
        if normalized_answer == normalized_captcha:
            # Mark as verified but don't delete yet - will be deleted after successful login
            captcha_data['verified'] = True
            captcha_data['verified_at'] = datetime.utcnow()
            return True, "CAPTCHA verified", max_attempts - captcha_data['attempts']
        else:
            remaining = max_attempts - captcha_data['attempts']
            if remaining <= 0:
                del self.captcha_storage[captcha_id]
                return False, "Too many attempts", 0
            # Provide helpful error message
            return False, f"Invalid CAPTCHA. {remaining} attempt(s) remaining. Please check: O vs 0, I vs 1, etc.", remaining
    
    def is_captcha_verified(self, captcha_id: str, ip_address: str) -> bool:
        """
        Check if CAPTCHA is already verified and can be used for login
        Returns True if CAPTCHA exists, is verified, matches IP, and hasn't been consumed
        """
        if captcha_id not in self.captcha_storage:
            return False
        
        captcha_data = self.captcha_storage[captcha_id]
        
        # Check if expired
        if datetime.utcnow() > captcha_data['expires_at']:
            del self.captcha_storage[captcha_id]
            return False
        
        # Check IP address
        if captcha_data['ip_address'] != ip_address:
            return False
        
        # Check if verified AND not consumed
        return captcha_data.get('verified', False) and not captcha_data.get('consumed', False)
    
    def record_login_attempt_with_captcha(self, captcha_id: str, ip_address: str, success: bool) -> bool:
        """
        Record a login attempt using a specific CAPTCHA
        Returns True if attempt is allowed, False if rate limited
        """
        if captcha_id not in self.captcha_storage:
            return False
        
        captcha_data = self.captcha_storage[captcha_id]
        
        # Check if CAPTCHA is verified and not consumed
        if not self.is_captcha_verified(captcha_id, ip_address):
            return False
        
        # Initialize login attempts counter if not exists
        if 'login_attempts' not in captcha_data:
            captcha_data['login_attempts'] = 0
        
        # Check rate limiting (max 3 login attempts per CAPTCHA)
        max_login_attempts = 3
        if captcha_data['login_attempts'] >= max_login_attempts:
            # Mark as consumed after too many attempts
            captcha_data['consumed'] = True
            captcha_data['consumed_at'] = datetime.utcnow()
            return False
        
        # Increment login attempts
        captcha_data['login_attempts'] += 1
        
        # If successful, mark as consumed
        if success:
            captcha_data['consumed'] = True
            captcha_data['consumed_at'] = datetime.utcnow()
        
        return True

    def consume_verified_captcha(self, captcha_id: str, ip_address: str) -> bool:
        """
        Consume a verified CAPTCHA (mark as consumed after successful login)
        Returns True if CAPTCHA was verified and consumed
        """
        if captcha_id not in self.captcha_storage:
            return False
        
        captcha_data = self.captcha_storage[captcha_id]
        
        # Check if verified and not already consumed
        if (captcha_data.get('verified', False) and 
            not captcha_data.get('consumed', False) and
            captcha_data['ip_address'] == ip_address):
            captcha_data['consumed'] = True
            captcha_data['consumed_at'] = datetime.utcnow()
            return True
        return False

    def get_remaining_login_attempts(self, captcha_id: str, ip_address: str) -> int:
        """
        Get remaining login attempts for a CAPTCHA
        Returns number of remaining attempts (0 if consumed or invalid)
        """
        if captcha_id not in self.captcha_storage:
            return 0
        
        captcha_data = self.captcha_storage[captcha_id]
        
        # Check if CAPTCHA is verified and not consumed
        if not self.is_captcha_verified(captcha_id, ip_address):
            return 0
        
        login_attempts = captcha_data.get('login_attempts', 0)
        max_login_attempts = 3
        return max(0, max_login_attempts - login_attempts)

    def get_login_attempts(self, ip_address: str) -> dict:
        """Get login attempt data for IP address"""
        if ip_address not in self.attempt_storage:
            self.attempt_storage[ip_address] = {
                'count': 0,
                'last_attempt': None,
                'locked_until': None
            }
        
        return self.attempt_storage[ip_address]
    
    def record_login_attempt(self, ip_address: str, success: bool) -> dict:
        """Record a login attempt and return current status"""
        if ip_address not in self.attempt_storage:
            self.attempt_storage[ip_address] = {
                'count': 0,
                'last_attempt': None,
                'locked_until': None
            }
        
        attempt_data = self.attempt_storage[ip_address]
        now = datetime.utcnow()
        
        # Reset count if last attempt was more than 1 hour ago
        if attempt_data['last_attempt'] and (now - attempt_data['last_attempt']).total_seconds() > 3600:
            attempt_data['count'] = 0
        
        if success:
            # Reset on successful login
            attempt_data['count'] = 0
            attempt_data['locked_until'] = None
        else:
            # Increment failed attempts
            attempt_data['count'] += 1
            attempt_data['last_attempt'] = now
            
            # Lockout after 3 failed attempts for 5 minutes
            if attempt_data['count'] >= 3:
                attempt_data['locked_until'] = now + timedelta(minutes=5)
        
        return attempt_data
    
    def is_ip_locked(self, ip_address: str) -> Tuple[bool, str]:
        """Check if IP address is locked due to too many failed attempts"""
        attempt_data = self.get_login_attempts(ip_address)
        
        if attempt_data['locked_until'] and datetime.utcnow() < attempt_data['locked_until']:
            remaining_time = attempt_data['locked_until'] - datetime.utcnow()
            hours, remainder = divmod(remaining_time.total_seconds(), 3600)
            minutes, _ = divmod(remainder, 60)
            
            if hours > 0:
                message = f"Too many failed attempts. Try again in {int(hours)}h {int(minutes)}m"
            else:
                message = f"Too many failed attempts. Try again in {int(minutes)}m"
            
            return True, message
        
        return False, ""
    
    def cleanup_expired(self):
        """Clean up expired CAPTCHAs and old attempt data"""
        now = datetime.utcnow()
        
        # Clean expired CAPTCHAs
        expired_captchas = [cid for cid, data in self.captcha_storage.items() 
                           if now > data['expires_at']]
        for cid in expired_captchas:
            del self.captcha_storage[cid]
        
        # Clean old attempt data (older than 24 hours)
        expired_attempts = [ip for ip, data in self.attempt_storage.items()
                           if data['last_attempt'] and (now - data['last_attempt']).total_seconds() > 86400]
        for ip in expired_attempts:
            del self.attempt_storage[ip]

# Global instance
captcha_generator = CaptchaGenerator()
