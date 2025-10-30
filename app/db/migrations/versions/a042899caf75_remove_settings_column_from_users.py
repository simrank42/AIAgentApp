"""remove_settings_column_from_users

Revision ID: a042899caf75
Revises: 8412737cd35a
Create Date: 2025-10-19 17:52:22.079090
"""
from alembic import op
import sqlalchemy as sa

revision = 'a042899caf75'
down_revision = '8412737cd35a'
branch_labels = None
depends_on = None

def upgrade() -> None:
    # SQLite-compatible migration using batch mode
    with op.batch_alter_table('users', schema=None) as batch_op:
        # Drop the settings column
        batch_op.drop_column('settings')

def downgrade() -> None:
    # SQLite-compatible migration using batch mode
    with op.batch_alter_table('users', schema=None) as batch_op:
        # Add the settings column back
        batch_op.add_column('settings', sa.Column('settings', sa.JSON(), nullable=True))
