from pydantic import BaseModel
from datetime import datetime


class TagRead(BaseModel):
    id: int
    name: str
    source: str  # 'user' | 'aws'
    created_at: datetime

    class Config:
        from_attributes = True
