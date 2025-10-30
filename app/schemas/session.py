from datetime import datetime
from pydantic import BaseModel, Field
from typing import Literal

class SessionCreateIn(BaseModel):
    name: str = Field(default="New Chat", max_length=200)  # Changed from title to name
    agent_id: int  # Changed from agent_key to agent_id

class SessionOut(BaseModel):
    id: int
    name: str | None = None  # Changed from title to name, nullable initially
    title: str  # Keep for backward compatibility
    agent_id: int  # Changed from agent_key to agent_id
    agent_key: str  # Keep for backward compatibility
    created_at: datetime
    updated_at: datetime
    message_count: int = 0  # Add message count for frontend

class MessageOut(BaseModel):
    id: int
    role: Literal["user", "assistant", "system"]
    content: str
    tokens: int
    created_at: datetime
