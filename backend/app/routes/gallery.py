# backend/app/routes/gallery.py
# GALLERY IMAGES

# IMPORTS
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database.db import get_db
from app.models.image import Image
from app.models.tag import Tag
from app.models.image_tag import image_tags
from app.schemas.image import ImageRead
from app.auth.dev_auth import get_current_user
from app.routes.images import format_image
# ROUTE
router = APIRouter(prefix="/gallery", tags=["Gallery"])

# GET GALLERY
@router.get("", response_model=List[ImageRead])
def get_gallery(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
    search: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
):
    query = db.query(Image)

    if search:
        term = f"%{search.lower()}%"
        query = query.filter(
            (Image.title.ilike(term)) |
            (Image.description.ilike(term)) |
            (Image.id.in_(
                db.query(image_tags.c.image_id)
                .join(Tag)
                .filter(Tag.name.ilike(term))
            ))
        )

    images = (
        query
        .order_by(Image.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )

    return [format_image(img) for img in images]
