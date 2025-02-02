"""added the image_url column

Revision ID: d605bcd23b24
Revises: e65de079130b
Create Date: 2025-01-28 10:45:24.411095

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd605bcd23b24'
down_revision = 'e65de079130b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('rooms', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image_url', sa.String(length=255), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('rooms', schema=None) as batch_op:
        batch_op.drop_column('image_url')

    # ### end Alembic commands ###
