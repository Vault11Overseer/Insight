# backend/app/schemas/tag.py
# TAG SCHEMA

# IMPORTS
from pydantic import BaseModel
from datetime import datetime

# TAG READ
class TagRead(BaseModel):
    id: int
    name: str
    source: str  # 'user' | 'aws'
    created_at: datetime
    # CLASS CONFIG
    class Config:
        from_attributes = True
