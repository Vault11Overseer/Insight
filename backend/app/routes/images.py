# backend/app/routes/images.py
# IMAGES

# IMPORTS
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import uuid4
import re
from app.database.db import get_db
from app.models.image import Image
from app.models.user import User
from app.models.tag import Tag
from app.models.album import Album
from app.schemas.image import ImageRead, ImageUpdate
from app.auth.dev_auth import get_current_user
from app.auth.s3 import (upload_file_to_s3, delete_s3_object, get_s3_url, rekognition_detect_labels,)
# ROUTE
router = APIRouter(prefix="/images", tags=["Images"])


# SANATIZE NAMES
def sanitize_name(value: str) -> str:
    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9_-]+", "_", value)
    return value

# FORMAT IMAGE
def format_image(image: Image) -> ImageRead:
    return ImageRead(
        id=image.id,
        uploader_user_id=image.uploader_user_id,
        s3_key=image.s3_key,
        s3_url=get_s3_url(image.s3_key),
        preview_key=image.preview_key,
        preview_url=get_s3_url(image.preview_key) if image.preview_key else None,
        title=image.title,
        description=image.description,
        camera_make=image.camera_make,
        camera_model=image.camera_model,
        lens=image.lens,
        focal_length=image.focal_length,
        aperture=image.aperture,
        shutter_speed=image.shutter_speed,
        iso=image.iso,
        gps_latitude=image.gps_latitude,
        gps_longitude=image.gps_longitude,
        location_name=image.location_name,
        captured_at=image.captured_at,
        created_at=image.created_at,
        updated_at=image.updated_at,
        watermark_enabled=image.watermark_enabled,
        album_ids=[a.id for a in image.albums],
        tags=[t.name for t in image.tags],
        metadata=image.image_metadata or {},
    )


# LIST ALL IMAGES (GALLERY)
@router.get("/", response_model=List[ImageRead])
def list_images(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    skip: int = 0,
    limit: int = 100,
):
    images = (
        db.query(Image)
        .order_by(Image.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )
    return [format_image(img) for img in images]


# LIST CURRENT USER IMAGES
@router.get("/user", response_model=List[ImageRead])
def list_user_images(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    images = db.query(Image).filter(
        Image.uploader_user_id == current_user.id
    ).all()
    return [format_image(img) for img in images]


# GET SINGLE IMAGE
@router.get("/{image_id}", response_model=ImageRead)
def get_image(
    image_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    image = db.get(Image, image_id)
    if not image:
        raise HTTPException(404, "Image not found")
    return format_image(image)


# CREATE IMAGE
@router.post("/", response_model=ImageRead)
async def create_image(
    file: UploadFile = File(...),
    title: str = Form(...),
    description: str = Form(...),
    album_ids: Optional[str] = Form(None),
    user_tags: Optional[str] = Form(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # BUILD S3 PATH
    first = sanitize_name(current_user.first_name or "user")
    last = sanitize_name(current_user.last_name or str(current_user.id))
    folder = f"uploads/{first}_{last}/"

    s3_key, _ = upload_file_to_s3(file, current_user.id, folder=folder)

    image = Image(
        uploader_user_id=current_user.id,
        s3_key=s3_key,
        title=title,
        description=description,
        image_metadata={},
    )

    db.add(image)
    db.flush()

    # ALBUMS
    if album_ids:
        for album_id in map(int, album_ids.split(",")):
            album = db.get(Album, album_id)
            if not album:
                continue
            if current_user.role != "admin" and album.owner_user_id != current_user.id:
                continue
            image.albums.append(album)

    # USER TAGS
    if user_tags:
        for raw in user_tags.split(","):
            name = raw.strip().lower()
            if not name:
                continue
            tag = db.query(Tag).filter_by(name=name).first()
            if not tag:
                tag = Tag(name=name, source="user")
                db.add(tag)
            image.tags.append(tag)

    # AWS REKOGNITION
    try:
        labels = rekognition_detect_labels(s3_key)
        image.image_metadata["aws"] = {"labels": labels}

        for label in labels:
            name = label["name"].lower()
            tag = db.query(Tag).filter_by(name=name).first()
            if not tag:
                tag = Tag(name=name, source="aws")
                db.add(tag)
            image.tags.append(tag)

    except Exception as e:
        image.image_metadata["aws_error"] = str(e)

    db.commit()
    db.refresh(image)
    return format_image(image)


# UPDATE IMAGE
@router.put("/{image_id}", response_model=ImageRead)
def update_image(
    image_id: int,
    data: ImageUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    image = db.get(Image, image_id)
    if not image:
        raise HTTPException(404, "Image not found")

    if current_user.role != "admin" and image.uploader_user_id != current_user.id:
        raise HTTPException(403, "Not authorized")

    for field, value in data.dict(exclude_unset=True).items():
        setattr(image, field, value)

    db.commit()
    db.refresh(image)
    return format_image(image)


# DELETE IMAGE
@router.delete("/{image_id}")
def delete_image(
    image_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    image = db.get(Image, image_id)
    if not image:
        raise HTTPException(404, "Image not found")

    if current_user.role != "admin" and image.uploader_user_id != current_user.id:
        raise HTTPException(403, "Not authorized")

    delete_s3_object(image.s3_key)
    if image.preview_key:
        delete_s3_object(image.preview_key)

    db.delete(image)
    db.commit()
    return {"detail": "Image deleted"}
