from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database.db import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserRead, UserUpdate
from app.utils.auth import hash_password
from app.auth.dev_auth import get_current_user

router = APIRouter(prefix="/users", tags=["Users"])


# =========================
# LIST USERS (ADMIN)
# =========================
@router.get("/", response_model=List[UserRead])
def list_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")

    return db.query(User).all()


# =========================
# CREATE USER (ADMIN)
# =========================
@router.post("/", response_model=UserRead)
def create_user(
    data: UserCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")

    user = User(
        username=data.username,
        email=data.email,
        first_name=data.first_name,
        last_name=data.last_name,
        role=data.role,
        avatar=data.avatar,
        cognito_sub=data.cognito_sub,
        password_hash=hash_password(data.password),
        profile_metadata=data.profile_metadata,
    )

    db.add(user)
    db.commit()
    db.refresh(user)
    return user


# =========================
# READ USER
# =========================
@router.get("/{user_id}", response_model=UserRead)
def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if current_user.role != "admin" and current_user.id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    return user


# =========================
# UPDATE USER
# =========================
@router.put("/{user_id}", response_model=UserRead)
def update_user(
    user_id: int,
    data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if current_user.role != "admin" and current_user.id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    for field, value in data.model_dump(exclude_unset=True).items():
        if field == "password":
            user.password_hash = hash_password(value)
        elif field == "role" and current_user.role != "admin":
            raise HTTPException(status_code=403, detail="Not authorized to change role")
        else:
            setattr(user, field, value)

    db.commit()
    db.refresh(user)
    return user


# =========================
# DELETE USER (ADMIN)
# =========================
@router.delete("/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Only admin can delete users")

    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user)
    db.commit()
    return {"detail": "User deleted"}
