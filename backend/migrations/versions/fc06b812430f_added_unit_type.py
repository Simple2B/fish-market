"""added unit_type

Revision ID: fc06b812430f
Revises: 1962eb84b876
Create Date: 2023-01-08 20:24:36.490004

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "fc06b812430f"
down_revision = "1962eb84b876"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "order_items",
        sa.Column(
            "unit_type",
            sa.Enum("unknown", "by_kilogram", "by_unit", "by_both", name="soldby"),
            nullable=True,
        ),
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("order_items", "unit_type")
    # ### end Alembic commands ###
