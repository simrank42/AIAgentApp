from sqlalchemy import String, Float, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column
from ..db.base import Base

class Agent(Base):
    __tablename__ = "agents"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)  # Added id as primary key
    key: Mapped[str] = mapped_column(String(64), unique=True, index=True, nullable=False)  # Changed to unique index
    name: Mapped[str] = mapped_column(String(128), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)  # Changed to Text for longer prompts
    temperature: Mapped[float] = mapped_column(Float, nullable=False, default=0.7)
    model_id: Mapped[str] = mapped_column(String(128), nullable=False)
