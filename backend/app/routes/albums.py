# backend/app/routes/albums.py
# ALBUM ROUTE

# IMPORTS
from fastapi import APIRouter, Depends, HTTPException, Form, File, UploadFile
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database.db import get_db
from app.models.album import Album
from app.models.user import User
from app.schemas.album import AlbumCreate, AlbumRead, AlbumUpdate
from app.auth.dev_auth import get_current_user
from app.auth.s3 import upload_file_to_s3, get_s3_url

# ROUTER
router = APIRouter(prefix="/albums", tags=["Albums"])

# FORMAT ALBUM
def format_album(album: Album) -> AlbumRead:
    return AlbumRead(
        id=album.id,
        title=album.title,
        description=album.description,
        owner_user_id=album.owner_user_id,
        is_master=album.is_master,
        created_at=album.created_at,
        updated_at=album.updated_at,
        cover_image_url=getattr(album, "cover_image_url", None),
        image_ids=[img.id for img in album.images],
    )

# GET ALBUMS
@router.get("/", response_model=List[AlbumRead])
def list_albums(db: Session = Depends(get_db)):
    albums = db.query(Album).all()
    return [format_album(a) for a in albums]

# CREATE ALBUM
@router.post("/", response_model=AlbumRead)
def create_album(
    title: str = Form(...),
    description: Optional[str] = Form(None),
    default_image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    album = Album(
        title=title,
        description=description,
        owner_user_id=current_user.id,
        is_master=False,
    )

    if default_image:
        upload_result = upload_file_to_s3(default_image, user_id=current_user.id, folder="album_images")
        s3_key = upload_result[0] if isinstance(upload_result, tuple) else upload_result
        url = get_s3_url(s3_key)
        if hasattr(album, "cover_image_url"):
            album.cover_image_url = url

    db.add(album)
    db.commit()
    db.refresh(album)
    return format_album(album)


# GET SINGLE ALBUM
@router.get("/{album_id}", response_model=AlbumRead)
def get_album(album_id: int, db: Session = Depends(get_db)):
    album = db.get(Album, album_id)
    if not album:
        raise HTTPException(404, "Album not found")
    return format_album(album)

# UPDATE ALBUM
@router.put("/{album_id}", response_model=AlbumRead)
def update_album(
    album_id: int,
    data: AlbumUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    album = db.get(Album, album_id)
    if not album:
        raise HTTPException(404, "Album not found")

    if current_user.role != "admin" and album.owner_user_id != current_user.id:
        raise HTTPException(403, "Not authorized")

    if data.title is not None:
        album.title = data.title
    if data.description is not None:
        album.description = data.description

    db.commit()
    db.refresh(album)
    return format_album(album)

# DELETE ALBUM
@router.delete("/{album_id}")
def delete_album(
    album_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    album = db.get(Album, album_id)
    if not album:
        raise HTTPException(404, "Album not found")

    if current_user.role != "admin" and album.owner_user_id != current_user.id:
        raise HTTPException(403, "Not authorized")

    db.delete(album)
    db.commit()
    return {"detail": "Album deleted"}
