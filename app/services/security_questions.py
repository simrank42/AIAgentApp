from __future__ import annotations

from datetime import datetime, timedelta
from sqlalchemy.orm import Session

from ..models.security_question import SecurityQuestion
from ..models.user import User
from ..core.security import pwd_context
from ..core.validation import ValidationError, validate_length

MAX_SECURITY_ANSWER_LENGTH = 255
MAX_SECURITY_ATTEMPTS = 3
SECURITY_ATTEMPT_WINDOW_HOURS = 24

DEFAULT_SECURITY_QUESTIONS: tuple[str, ...] = (
    "What is the name of your favorite pet?",
    "What is your mother's maiden name?",
    "What high school did you attend?",
    "What was the first concert you attended?",
    "In which city did you start your first full-time job?",
    "What was the mascot or motto of your school?",
    "What is the name of your favorite athlete or sports personality?",
    "What cuisine do you enjoy the most?"
)


def ensure_default_questions(db: Session) -> None:
    """Ensure the default question set exists in environments where seed migration didn't run."""
    existing_count = db.query(SecurityQuestion.id).count()
    if existing_count:
        return

    now = datetime.utcnow()
    questions = [
        SecurityQuestion(question=text, is_active=True, created_at=now, updated_at=None)
        for text in DEFAULT_SECURITY_QUESTIONS
    ]
    db.bulk_save_objects(questions)
    db.commit()


def _now() -> datetime:
    return datetime.utcnow()


def normalize_security_answer(answer: str) -> str:
    if not answer:
        raise ValidationError("Security answer is required", field="security_answer")

    cleaned = " ".join(answer.strip().lower().split())
    cleaned = validate_length(cleaned, MAX_SECURITY_ANSWER_LENGTH, "security_answer")
    if not cleaned:
        raise ValidationError("Security answer is required", field="security_answer")
    return cleaned


def hash_security_answer(answer: str) -> str:
    normalized = normalize_security_answer(answer)
    return pwd_context.hash(normalized)


def verify_security_answer(answer: str, stored_hash: str) -> bool:
    if not stored_hash:
        return False
    normalized = normalize_security_answer(answer)
    return pwd_context.verify(normalized, stored_hash)


def get_active_question(db: Session, question_id: int) -> SecurityQuestion | None:
    return (
        db.query(SecurityQuestion)
        .filter(SecurityQuestion.id == question_id, SecurityQuestion.is_active.is_(True))
        .first()
    )


def reset_attempts_if_window_expired(user: User, now: datetime | None = None) -> None:
    now = now or _now()

    if user.security_blocked_until and user.security_blocked_until <= now:
        user.security_attempts = 0
        user.security_blocked_until = None
        user.security_last_attempt_at = None
        return

    last_attempt = user.security_last_attempt_at
    if last_attempt and now - last_attempt >= timedelta(hours=SECURITY_ATTEMPT_WINDOW_HOURS):
        user.security_attempts = 0
        user.security_last_attempt_at = None


def record_failed_attempt(user: User, now: datetime | None = None) -> None:
    now = now or _now()
    attempts = (user.security_attempts or 0) + 1
    user.security_attempts = attempts
    user.security_last_attempt_at = now

    if attempts >= MAX_SECURITY_ATTEMPTS:
        user.security_blocked_until = now + timedelta(hours=SECURITY_ATTEMPT_WINDOW_HOURS)


def clear_security_lock(user: User) -> None:
    user.security_attempts = 0
    user.security_blocked_until = None
    user.security_last_attempt_at = None

