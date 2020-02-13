"""empty message

Revision ID: 8c1164249e46
Revises: c943a4c11b15
Create Date: 2020-02-13 23:18:23.031889

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8c1164249e46'
down_revision = 'c943a4c11b15'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('deactivated', sa.Boolean(), nullable=True))
    op.add_column('users', sa.Column('post_card_received', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'post_card_received')
    op.drop_column('users', 'deactivated')
    # ### end Alembic commands ###