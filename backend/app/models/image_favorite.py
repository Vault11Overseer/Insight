# backend/app/models/image_favorite.py
# IMAGE FAVORITE MODEL

# IMPORTS
from sqlalchemy import Column, Integer, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.db import Base

# IMAGE FAVORITES BASE CLASE
class ImageFavorite(Base):
    __tablename__ = "image_favorites"
    # USER ID
    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        primary_key=True
    )
    # IMAGE ID
    image_id = Column(
        Integer,
        ForeignKey("images.id", ondelete="CASCADE"),
        primary_key=True
    )
    # CREATED AT COLUMN
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )

    # RELATIONSHIPS
    user = relationship("User", back_populates="favorites")
    image = relationship("Image", back_populates="favorites")

    # ONLY ONE FAVORITE PER USER IMAGE
    __table_args__ = (
        UniqueConstraint("user_id", "image_id", name="unique_user_image_favorite"),
    )
