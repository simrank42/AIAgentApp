from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional


class SignUpIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    security_question_id: int = Field(ge=1)
    security_answer: str = Field(min_length=1, max_length=255)


class LoginIn(BaseModel):
    email: EmailStr
    password: str
    captcha_id: Optional[str] = None
    captcha_answer: Optional[str] = None


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"


class SecurityQuestionOut(BaseModel):
    id: int
    question: str

    model_config = ConfigDict(from_attributes=True)


class PasswordResetSecurityIn(BaseModel):
    email: EmailStr
    security_question_id: int = Field(ge=1)
    security_answer: str = Field(min_length=1, max_length=255)
    new_password: str = Field(min_length=8, max_length=128)
