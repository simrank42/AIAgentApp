from datetime import datetime
from sqlalchemy import Integer, String, Boolean, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..db.base import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .user import User


class SecurityQuestion(Base):
    __tablename__ = "security_questions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    question: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    users = relationship("User", back_populates="security_question")

