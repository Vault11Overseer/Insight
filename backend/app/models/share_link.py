# backend/app/models/share_link.py
# SHARE LINK MODEL

# IMPORTS
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean, Enum as SQLEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.db import Base
import enum

# CLASS RESOURCE TYPE
class ResourceType(str, enum.Enum):
    IMAGE = "image"
    ALBUM = "album"

# CLASS SHARE LINK
class ShareLink(Base):
    __tablename__ = "share_links"

    id = Column(Integer, primary_key=True, index=True)

    resource_type = Column(
        SQLEnum(ResourceType),
        nullable=False
    )

    resource_id = Column(Integer, nullable=False, index=True)

    owner_user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    token = Column(String, unique=True, nullable=False, index=True)
    link = Column(String, nullable=False)

    # WATERMARK
    watermark_enabled = Column(Boolean, default=False, nullable=False)

    expires_at = Column(DateTime(timezone=True), nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )

    owner = relationship("User", back_populates="share_links")
