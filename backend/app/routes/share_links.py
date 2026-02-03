# backend/app/routes/share_links.py
# SHARE LINK ROUTES

# IMPORTS
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import secrets
from datetime import datetime, timezone
from app.database.db import get_db
from app.models.share_link import ShareLink, ResourceType
from app.models.user import User
from app.models.image import Image
from app.models.album import Album
from app.schemas.share_link import (ShareLinkCreate, ShareLinkRead, ShareLinkUpdate)
from app.auth.dev_auth import get_current_user
# ROUTE
router = APIRouter(prefix="/share-links", tags=["Share Links"])

# GET SHARE LINK
@router.get("/", response_model=List[ShareLinkRead])
def list_share_links(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role == "admin":
        return db.query(ShareLink).all()

    return db.query(ShareLink).filter(
        ShareLink.owner_user_id == current_user.id
    ).all()

# READ SHARE LINK
@router.post("/", response_model=ShareLinkRead)
def create_share_link(
    data: ShareLinkCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if data.resource_type == "image":
        resource = db.get(Image, data.resource_id)
        if not resource:
            raise HTTPException(404, "Image not found")
        if current_user.role != "admin" and resource.uploader_user_id != current_user.id:
            raise HTTPException(403, "Not authorized")

    elif data.resource_type == "album":
        resource = db.get(Album, data.resource_id)
        if not resource:
            raise HTTPException(404, "Album not found")
        if current_user.role != "admin" and resource.owner_user_id != current_user.id:
            raise HTTPException(403, "Not authorized")
    else:
        raise HTTPException(400, "Invalid resource_type")

    token = secrets.token_urlsafe(32)
    frontend_url = "http://localhost:5173"
    link = f"{frontend_url}/share/{token}"

    share_link = ShareLink(
        resource_type=ResourceType(data.resource_type),
        resource_id=data.resource_id,
        owner_user_id=current_user.id,
        token=token,
        link=link,
        watermark_enabled=data.watermark_enabled,
        expires_at=data.expires_at,
    )

    db.add(share_link)
    db.commit()
    db.refresh(share_link)
    return share_link

# GET SHARE LINK BY TOKEN
@router.get("/token/{token}", response_model=ShareLinkRead)
def get_share_link_by_token(
    token: str,
    db: Session = Depends(get_db),
):
    link = db.query(ShareLink).filter(ShareLink.token == token).first()
    if not link:
        raise HTTPException(404, "Share link not found")

    if link.expires_at and datetime.now(timezone.utc) > link.expires_at:
        raise HTTPException(410, "Share link expired")

    return link


# SHARE LINK BY ID
@router.put("/{link_id}", response_model=ShareLinkRead)
def update_share_link(
    link_id: int,
    data: ShareLinkUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    link = db.get(ShareLink, link_id)
    if not link:
        raise HTTPException(404, "Share link not found")

    if current_user.role != "admin" and link.owner_user_id != current_user.id:
        raise HTTPException(403, "Not authorized")

    if data.watermark_enabled is not None:
        link.watermark_enabled = data.watermark_enabled
    if data.expires_at is not None:
        link.expires_at = data.expires_at

    db.commit()
    db.refresh(link)
    return link

# DELETE SHARE LINK
@router.delete("/{link_id}")
def delete_share_link(
    link_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    link = db.get(ShareLink, link_id)
    if not link:
        raise HTTPException(404, "Share link not found")

    if current_user.role != "admin" and link.owner_user_id != current_user.id:
        raise HTTPException(403, "Not authorized")

    db.delete(link)
    db.commit()
    return {"detail": "Share link revoked"}
