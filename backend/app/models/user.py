# backend/app/models/user.py
# USER MODEL

# IMPORTS
from sqlalchemy import Column, String, Integer, DateTime, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.ext.mutable import MutableDict
from ..database.db import Base

# CLASS USER BASE
class User(Base):
    __tablename__ = "users"

    # CORE FIELDS
    id = Column(Integer, primary_key=True, index=True)

    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)

    cognito_sub = Column(String, unique=True, nullable=True)

    avatar = Column(String, nullable=True)

    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)

    role = Column(String, default="user", nullable=False)  # admin | user

    password_hash = Column(String, nullable=True)  # dev only

    profile_metadata = Column(
        MutableDict.as_mutable(JSON),
        default=dict
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    # RELATIONSHIPS

    # ONE USER -> MANY ALBUMS
    albums = relationship(
        "Album",
        back_populates="owner",
        cascade="all, delete-orphan"
    )

    # One-to-many: User -> Images
    images = relationship(
        "Image",
        back_populates="uploader",
        cascade="all, delete-orphan"
    )

    # One-to-many: User -> ShareLinks
    share_links = relationship(
        "ShareLink",
        back_populates="owner",
        cascade="all, delete-orphan"
    )

    # One-to-many: User -> ImageFavorites
    favorites = relationship(
        "ImageFavorite",
        back_populates="user",
        cascade="all, delete-orphan"
    )
