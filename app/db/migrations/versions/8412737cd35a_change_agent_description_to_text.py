"""change_agent_description_to_text

Revision ID: 8412737cd35a
Revises: 14f74bb4566d
Create Date: 2025-10-19 01:56:00.037635
"""
from alembic import op
import sqlalchemy as sa

revision = '8412737cd35a'
down_revision = 'dd2b532d4632'
branch_labels = None
depends_on = None

def upgrade() -> None:
    # SQLite-compatible migration using batch mode
    with op.batch_alter_table('agents', schema=None) as batch_op:
        # Change description from VARCHAR(512) to TEXT
        batch_op.alter_column('description',
                   existing_type=sa.VARCHAR(length=512),
                   type_=sa.Text(),
                   existing_nullable=False)
    
    # Create missing indexes (if they don't already exist)
    # These may already exist, so we'll use try-except pattern
    try:
        op.create_index(op.f('ix_agents_key'), 'agents', ['key'], unique=True)
    except:
        pass  # Index already exists
    
    try:
        op.create_index(op.f('ix_messages_session_id'), 'messages', ['session_id'], unique=False)
    except:
        pass
    
    try:
        op.create_index(op.f('ix_sessions_user_id'), 'sessions', ['user_id'], unique=False)
    except:
        pass
    
    try:
        op.create_index(op.f('ix_users_id'), 'users', ['id'], unique=False)
    except:
        pass
    
    print("Agent description field changed to TEXT (supports longer prompts)")

def downgrade() -> None:
    # Downgrade: change back from TEXT to VARCHAR(512)
    with op.batch_alter_table('agents', schema=None) as batch_op:
        batch_op.alter_column('description',
                   existing_type=sa.Text(),
                   type_=sa.VARCHAR(length=512),
                   existing_nullable=False)
    
    print("Agent description field changed back to VARCHAR(512)")
