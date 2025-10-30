from pydantic import BaseModel

class ChatClientIn(BaseModel):
    content: str

class StreamDelta(BaseModel):
    delta: str | None = None
    done: bool | None = None
    usage: dict | None = None
