# backend/app/schemas/image.py
# IMAGES SCHEMA

# IMPORTS
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime


# CREATE IMAGE
class ImageCreate(BaseModel):
    """
    Payload used when uploading an image.
    S3 upload happens separately.
    """

    title: str
    description: str

    # OPTIONAL ALBUM ASSOCIATION UPON UPLOAD
    album_ids: Optional[List[int]] = Field(default=None)

    # USER PROVIDED TAGS (STRINGS ONLY)
    user_tags: Optional[List[str]] = Field(default=None)

    # CAMER EXIF FIELDS (INDEXED COLUMNS)
    camera_make: Optional[str] = None
    camera_model: Optional[str] = None
    lens: Optional[str] = None
    focal_length: Optional[str] = None
    aperture: Optional[str] = None
    shutter_speed: Optional[str] = None
    iso: Optional[str] = None

    # LOCATION
    gps_latitude: Optional[float] = None
    gps_longitude: Optional[float] = None
    location_name: Optional[str] = None

    # DATES
    captured_at: Optional[datetime] = None

    # FULL EXIF + MISC + AWS REKOGNITION OUTPUT
    metadata: Optional[Dict[str, Any]] = Field(default=None)


# READ IMAGE (API RESPONSE)
class ImageRead(BaseModel):
    # CORE FIELDS
    id: int
    uploader_user_id: int
    # STORAGE
    s3_key: str
    s3_url: str
    # S3 PREVIEW LINKS
    preview_key: Optional[str]
    preview_url: Optional[str]
    # CORE METADATA
    title: str
    description: str
    # FLATTENED SEARCHABLE FIELDS
    camera_make: Optional[str]
    camera_model: Optional[str]
    lens: Optional[str]
    focal_length: Optional[str]
    aperture: Optional[str]
    shutter_speed: Optional[str]
    iso: Optional[str]
    # LOCATIONS
    gps_latitude: Optional[float]
    gps_longitude: Optional[float]
    location_name: Optional[str]
    # DATES
    captured_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    # SHARING
    watermark_enabled: bool
    # RELATIONSHIPS (FLATTENED)
    album_ids: List[int]
    tags: List[str] 
    # FULL METADATA BLOB (EXIF = AWS REKOGNITION)
    metadata: Dict[str, Any]

    # CONFIG CLASS
    class Config:
        from_attributes = True


# UPDATE IMAGE
class ImageUpdate(BaseModel):
    # CORE FIELDS
    title: Optional[str] = None
    description: Optional[str] = None
    # CAMERA FIELDS
    camera_make: Optional[str] = None
    camera_model: Optional[str] = None
    lens: Optional[str] = None
    focal_length: Optional[str] = None
    aperture: Optional[str] = None
    shutter_speed: Optional[str] = None
    iso: Optional[str] = None
    # LOCATION FIELDS
    gps_latitude: Optional[float] = None
    gps_longitude: Optional[float] = None
    location_name: Optional[str] = None
    captured_at: Optional[datetime] = None
    # METADATA UPDATES (ADMIN)
    metadata: Optional[Dict[str, Any]] = None
