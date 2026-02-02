from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database.db import get_db
from app.models.album import Album
from app.models.user import User
from app.schemas.album import AlbumCreate, AlbumRead, AlbumUpdate
from app.auth.dev_auth import get_current_user

router = APIRouter(prefix="/albums", tags=["Albums"])


def format_album(album: Album) -> AlbumRead:
    return AlbumRead(
        id=album.id,
        title=album.title,
        description=album.description,
        owner_user_id=album.owner_user_id,
        is_master=album.is_master,
        created_at=album.created_at,
        updated_at=album.updated_at,
        image_ids=[img.id for img in album.images],
    )


@router.get("/", response_model=List[AlbumRead])
def list_albums(db: Session = Depends(get_db)):
    albums = db.query(Album).all()
    return [format_album(a) for a in albums]


@router.post("/", response_model=AlbumRead)
def create_album(
    data: AlbumCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    album = Album(
        title=data.title,
        description=data.description,
        owner_user_id=current_user.id,
        is_master=False,
    )
    db.add(album)
    db.commit()
    db.refresh(album)
    return format_album(album)


@router.get("/{album_id}", response_model=AlbumRead)
def get_album(album_id: int, db: Session = Depends(get_db)):
    album = db.get(Album, album_id)
    if not album:
        raise HTTPException(404, "Album not found")
    return format_album(album)


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
