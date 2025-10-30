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
        captcha_text = ''.join(random.choices(string.ascii_uppercase + string.digits, k=random.randint(4, 6)))
        captcha_id = str(uuid.uuid4())
        
        # Create image
        width, height = 200, 80
        image = Image.new('RGB', (width, height), color='white')
        draw = ImageDraw.Draw(image)
        
        # Try to use a font, fallback to default if not available
        try:
            font_size = 32
            font = ImageFont.truetype("arial.ttf", font_size)
        except:
            font = ImageFont.load_default()
        
        # Add some noise/background
        for _ in range(100):
            x = random.randint(0, width)
            y = random.randint(0, height)
            draw.point((x, y), fill=(random.randint(100, 200), random.randint(100, 200), random.randint(100, 200)))
        
        # Draw text with some distortion
        text_width = draw.textlength(captcha_text, font=font)
        text_x = (width - text_width) // 2
        text_y = (height - font_size) // 2
        
        for i, char in enumerate(captcha_text):
            char_x = text_x + i * (text_width // len(captcha_text)) + random.randint(-5, 5)
            char_y = text_y + random.randint(-5, 5)
            
            # Random color for each character
            color = (random.randint(0, 100), random.randint(0, 100), random.randint(0, 100))
            draw.text((char_x, char_y), char, fill=color, font=font)
        
        # Add some lines for extra distortion
        for _ in range(3):
            start_x = random.randint(0, width)
            start_y = random.randint(0, height)
            end_x = random.randint(0, width)
            end_y = random.randint(0, height)
            draw.line([(start_x, start_y), (end_x, end_y)], fill=(random.randint(100, 200), random.randint(100, 200), random.randint(100, 200)), width=2)
        
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
        
        # Check answer (trim whitespace and compare case-insensitively)
        if answer.strip().upper() == captcha_data['text'].upper():
            # Mark as verified but don't delete yet - will be deleted after successful login
            captcha_data['verified'] = True
            captcha_data['verified_at'] = datetime.utcnow()
            return True, "CAPTCHA verified", max_attempts - captcha_data['attempts']
        else:
            remaining = max_attempts - captcha_data['attempts']
            if remaining <= 0:
                del self.captcha_storage[captcha_id]
                return False, "Too many attempts", 0
            return False, f"Invalid CAPTCHA. {remaining} attempts remaining", remaining
    
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
