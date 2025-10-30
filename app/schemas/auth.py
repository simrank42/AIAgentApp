from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class SignUpIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)

class LoginIn(BaseModel):
    email: EmailStr
    password: str
    captcha_id: Optional[str] = None
    captcha_answer: Optional[str] = None

class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
