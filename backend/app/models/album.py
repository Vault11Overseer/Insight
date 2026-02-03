# backend/app/models/album.py
# ALBUM MODEL

# IMPORTS
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.db import Base

# ALBUM BASE
class Album(Base):
    __tablename__ = "albums"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)
    description = Column(String, nullable=True)

    # ALBUM COVER IMAGE (S3 KEY, NOT AN IMAGE RECORD)
    cover_image_key = Column(String, nullable=True)


    owner_user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    # RESERVED FOR FUTURE SYSTEM ALBUMS (NOT GALLERY)
    is_master = Column(Boolean, default=False, nullable=False)

    # CREATED COLUMN
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )

    # UPDATED COLUMN
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )

    # OWNER RELATIONS
    owner = relationship("User", back_populates="albums")

    # IMAGE RELATIONS
    images = relationship(
        "Image",
        secondary="image_albums",
        back_populates="albums"
    )
