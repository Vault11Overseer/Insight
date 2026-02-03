# backend/app/schemas/share_link.py
# SHARE LINK SCHEMA

# IMPORTS
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum

# CLASS RESOURCE TYPE
class ResourceType(str, Enum):
    image = "image"
    album = "album"


# CREATE SHARE LINK
class ShareLinkCreate(BaseModel):
    resource_type: ResourceType
    resource_id: int
    expires_at: Optional[datetime] = None
    watermark_enabled: bool = False


# READ SHARE LINK
class ShareLinkRead(BaseModel):
    id: int
    resource_type: ResourceType
    resource_id: int
    owner_user_id: int
    token: str
    link: str
    watermark_enabled: bool
    expires_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# UPDATE SHARE LINK
class ShareLinkUpdate(BaseModel):
    watermark_enabled: Optional[bool] = None
    expires_at: Optional[datetime] = None
