"""change user model

Revision ID: 9505a4b74788
Revises: 3adcbd1e582a
Create Date: 2022-11-14 17:58:23.840709

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9505a4b74788'
down_revision = '3adcbd1e582a'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('is_deleted', sa.Boolean(), nullable=True))
    op.drop_column('users', 'frozen')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('frozen', sa.BOOLEAN(), autoincrement=False, nullable=True))
    op.drop_column('users', 'is_deleted')
    # ### end Alembic commands ###