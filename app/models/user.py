from datetime import datetime
from sqlalchemy import String, Integer, DateTime, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..db.base import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .session import ChatSession
    from .security_question import SecurityQuestion

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String(320), unique=True, index=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(512), nullable=False)
    first_name: Mapped[str | None] = mapped_column(String(100), nullable=True)
    last_name: Mapped[str | None] = mapped_column(String(100), nullable=True)
    bio: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)  # Added updated_at
    security_question_id: Mapped[int | None] = mapped_column(
        ForeignKey("security_questions.id", ondelete="SET NULL"), nullable=True
    )
    security_answer_hash: Mapped[str | None] = mapped_column(String(512), nullable=True)
    security_attempts: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    security_blocked_until: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    security_last_attempt_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    sessions = relationship("ChatSession", back_populates="user", cascade="all, delete-orphan")
    security_question = relationship("SecurityQuestion", back_populates="users", lazy="joined")
