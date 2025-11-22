"""add security questions table and user security fields

Revision ID: b8d6ec10bf36
Revises: a042899caf75
Create Date: 2025-11-20 10:00:00.000000
"""

from datetime import datetime
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import table, column

revision = "b8d6ec10bf36"
down_revision = "a042899caf75"
branch_labels = None
depends_on = None

FK_NAME = "fk_users_security_question_id_security_questions"


def upgrade() -> None:
    op.create_table(
        "security_questions",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("question", sa.String(length=255), nullable=False, unique=True),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
    )

    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.add_column(sa.Column("security_question_id", sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column("security_answer_hash", sa.String(length=512), nullable=True))
        batch_op.add_column(
            sa.Column(
                "security_attempts",
                sa.Integer(),
                nullable=False,
                server_default="0",
            )
        )
        batch_op.add_column(sa.Column("security_blocked_until", sa.DateTime(), nullable=True))
        batch_op.add_column(sa.Column("security_last_attempt_at", sa.DateTime(), nullable=True))
        batch_op.create_foreign_key(
            FK_NAME,
            "security_questions",
            ["security_question_id"],
            ["id"],
            ondelete="SET NULL",
        )

    seed_security_questions()

    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.alter_column("security_attempts", server_default=None)


def seed_security_questions() -> None:
    questions = [
        "What is the name of your favorite pet?",
        "What is your mother's maiden name?",
        "What high school did you attend?",
        "What was the first concert you attended?",
        "In which city did you start your first full-time job?",
        "What was the mascot or motto of your school?",
        "What is the name of your favorite athlete or sports personality?",
        "What cuisine do you enjoy the most?"
    ]

    questions_table = table(
        "security_questions",
        column("question", sa.String(length=255)),
        column("is_active", sa.Boolean()),
        column("created_at", sa.DateTime()),
        column("updated_at", sa.DateTime()),
    )

    now = datetime.utcnow()
    op.bulk_insert(
        questions_table,
        [{"question": q, "is_active": True, "created_at": now, "updated_at": None} for q in questions],
    )


def downgrade() -> None:
    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.drop_constraint(FK_NAME, type_="foreignkey")
        batch_op.drop_column("security_last_attempt_at")
        batch_op.drop_column("security_blocked_until")
        batch_op.drop_column("security_attempts")
        batch_op.drop_column("security_answer_hash")
        batch_op.drop_column("security_question_id")

    op.drop_table("security_questions")

