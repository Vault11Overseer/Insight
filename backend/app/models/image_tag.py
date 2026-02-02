# backend/app/models/image_tag.py
# IMAGE TAG MODEL

# IMPORTS
from sqlalchemy import Table, Column, Integer, ForeignKey
from app.database.db import Base

# JOIN TABLE M-M RELATIONSHIP FOR TAGS AND IMAGES
image_tags = Table(
    "image_tags",
    Base.metadata,
    Column("image_id", Integer, ForeignKey("images.id", ondelete="CASCADE"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tags.id", ondelete="CASCADE"), primary_key=True),
)
