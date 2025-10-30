from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ProfileUpdate(BaseModel):
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    bio: Optional[str] = None

class PasswordChange(BaseModel):
    currentPassword: str
    newPassword: str

class UserProfile(BaseModel):
    id: int
    email: str
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    bio: Optional[str] = None
    createdAt: datetime
    updatedAt: Optional[datetime] = None  # Added updatedAt field, nullable initially
    totalConversations: int = 0
    totalMessages: int = 0

class UserStats(BaseModel):
    totalConversations: int
    totalMessages: int
    memberSince: str
