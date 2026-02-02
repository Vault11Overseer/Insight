from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime


# =====================================================
# CREATE IMAGE
# =====================================================
class ImageCreate(BaseModel):
    """
    Payload used when uploading an image.
    S3 upload happens separately.
    """

    title: str
    description: str

    # Optional album associations at upload time
    album_ids: Optional[List[int]] = Field(default=None)

    # User-provided tags (strings only)
    user_tags: Optional[List[str]] = Field(default=None)

    # Camera / EXIF fields (indexed columns)
    camera_make: Optional[str] = None
    camera_model: Optional[str] = None
    lens: Optional[str] = None
    focal_length: Optional[str] = None
    aperture: Optional[str] = None
    shutter_speed: Optional[str] = None
    iso: Optional[str] = None

    # Location
    gps_latitude: Optional[float] = None
    gps_longitude: Optional[float] = None
    location_name: Optional[str] = None

    # Dates
    captured_at: Optional[datetime] = None

    # Full EXIF + misc + AWS Rekognition output
    metadata: Optional[Dict[str, Any]] = Field(default=None)


# =====================================================
# READ IMAGE (API RESPONSE)
# =====================================================
class ImageRead(BaseModel):
    """
    Full image representation returned to the frontend.
    """

    id: int
    uploader_user_id: int

    # Storage
    s3_key: str
    s3_url: str

    preview_key: Optional[str]
    preview_url: Optional[str]

    # Core metadata
    title: str
    description: str

    # Flattened searchable fields
    camera_make: Optional[str]
    camera_model: Optional[str]
    lens: Optional[str]
    focal_length: Optional[str]
    aperture: Optional[str]
    shutter_speed: Optional[str]
    iso: Optional[str]

    gps_latitude: Optional[float]
    gps_longitude: Optional[float]
    location_name: Optional[str]

    # Dates
    captured_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime

    # Sharing
    watermark_enabled: bool

    # Relationships (flattened)
    album_ids: List[int]
    tags: List[str]  # Combined user + aws tag names

    # Full metadata blob (EXIF + AWS Rekognition)
    metadata: Dict[str, Any]

    class Config:
        from_attributes = True


# =====================================================
# UPDATE IMAGE
# =====================================================
class ImageUpdate(BaseModel):
    """
    Fields that can be updated after upload.
    Ownership & S3 keys are immutable.
    """

    title: Optional[str] = None
    description: Optional[str] = None

    camera_make: Optional[str] = None
    camera_model: Optional[str] = None
    lens: Optional[str] = None
    focal_length: Optional[str] = None
    aperture: Optional[str] = None
    shutter_speed: Optional[str] = None
    iso: Optional[str] = None

    gps_latitude: Optional[float] = None
    gps_longitude: Optional[float] = None
    location_name: Optional[str] = None

    captured_at: Optional[datetime] = None

    # Metadata updates (admin or system-level ops)
    metadata: Optional[Dict[str, Any]] = None
