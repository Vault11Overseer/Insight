# backend/app/models/image_album.py
# IMAGE ALBUM MODEL

# IMPORTS
from sqlalchemy import Column, Integer, ForeignKey, Table
from app.database.db import Base

# JOIN TABLE
# M-M RELATIONSHIP FOR IMAGES AND ALBUMS
image_albums = Table(
    "image_albums",
    Base.metadata,
    Column("image_id", Integer, ForeignKey("images.id", ondelete="CASCADE"), primary_key=True),
    Column("album_id", Integer, ForeignKey("albums.id", ondelete="CASCADE"), primary_key=True),
)
