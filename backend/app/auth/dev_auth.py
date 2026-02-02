# backend/app/auth/dev_auth.py
# DEV AUTH

# IMPORTS
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.user import User
from app.schemas.auth import LoginRequest
from app.utils.auth import verify_password

# ROUTERS
router = APIRouter(prefix="/auth", tags=["Dev Auth"])


# DEV AUTH DEPENDENCY
def get_current_user(db: Session = Depends(get_db)) -> User:
    user = db.query(User).first()
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user


# DEV LOGIN
@router.post("/login")
def dev_login(payload: LoginRequest, db: Session = Depends(get_db)):
    """
    Dev login endpoint
    POST /auth/login
    """
    user = db.query(User).filter(User.email == payload.email).first()

    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # RETURN USER JSON (CAN BE EXTENDED LATER TO RETURN TOKEN)
    return JSONResponse(
        {
            "user": {
                "id": user.id,
                "username": user.username,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "role": user.role,
            }
        }
    )
