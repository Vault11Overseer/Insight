# backend/app/models/image.py
# IMAGE MODEL

# IMPORTS
from sqlalchemy import (Column, Integer, String, Boolean, DateTime, ForeignKey, Float, JSON)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.ext.mutable import MutableDict
from app.database.db import Base

# IMAGE BASE CLASS
class Image(Base):
    __tablename__ = "images"

    id = Column(Integer, primary_key=True, index=True)

    # OWNERSHIP
    uploader_user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    # S3 STORAGE LINKS
    s3_key = Column(String, nullable=False, unique=True)
    preview_key = Column(String, nullable=True)

    # CORE METADATA
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)

    # FULL EXIF + EXTENSIBLE METADATA (JSONB IN POSTGRES)
    image_metadata = Column(
        MutableDict.as_mutable(JSON),
        default=dict,
        nullable=False
    )

    # CAMERA JSON
    camera_make = Column(String)
    camera_model = Column(String)
    lens = Column(String)
    focal_length = Column(String)
    aperture = Column(String)
    shutter_speed = Column(String)
    iso = Column(String)
    # LOCATION JSON
    gps_latitude = Column(Float)
    gps_longitude = Column(Float)
    location_name = Column(String)

    # DATES
    captured_at = Column(DateTime(timezone=True))
    # CREATED AT
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )
    # UPDATED AT
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )

    # SHARING - WATERMARK
    watermark_enabled = Column(Boolean, default=False, nullable=False)

    # UPLOADER RELATIONS
    uploader = relationship("User", back_populates="images")

    # ALBUM RELATIONS
    albums = relationship(
        "Album",
        secondary="image_albums",
        back_populates="images"
    )

    # TAG RELATIONS
    tags = relationship(
        "Tag",
        secondary="image_tags",
        back_populates="images"
    )

    # FAVORITE RELATIONS
    favorites = relationship(
        "ImageFavorite",
        back_populates="image",
        cascade="all, delete-orphan"
    )

    # SHARE LINKS RELATIONS
    share_links = relationship(
        "ShareLink",
        primaryjoin="and_(ShareLink.resource_type == 'image', "
                    "foreign(ShareLink.resource_id) == Image.id)",
        viewonly=True
    )
