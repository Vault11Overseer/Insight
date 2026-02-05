# backend/app/auth/dev_auth.py
# DEV AUTH

# IMPORTS
from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status, Form
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.user import User
from app.utils.auth import create_access_token, verify_password, verify_token

# ROUTERS
router = APIRouter(prefix="/auth", tags=["Dev Auth"])

# OAUTH2 SCHEME
# NOTE:
# - Expects Authorization: Bearer <token>
# - tokenUrl is required for OpenAPI / Swagger
# - Cognito will later replace verify_token logic
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# ACCESS TOKEN EXPIRATION
ACCESS_TOKEN_EXPIRE_MINUTES = 30


# -----------------------------------
# DEV AUTH DEPENDENCY (BEARER TOKENS)
# -----------------------------------
def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:
    """
    Resolve the currently authenticated user from a Bearer token.

    - Used by protected routes
    - Token is expected in Authorization header
    - Cognito-compatible (JWT subject = user id)
    """

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    # VERIFY TOKEN AND EXTRACT USER ID
    user_id = verify_token(token, credentials_exception)

    # LOAD USER FROM DATABASE
    user = db.get(User, int(user_id))
    if not user:
        raise credentials_exception

    return user


# ---------------------------
# DEV LOGIN
# ---------------------------
@router.post("/login")
def dev_login(
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db),
):
    """
    Dev login endpoint
    POST /auth/login

    - Accepts FormData (frontend compatible)
    - Returns Bearer access token
    - Token stored client-side (localStorage / sessionStorage)
    """

    # LOOK UP USER
    user = db.query(User).filter(User.email == email).first()

    # VERIFY CREDENTIALS
    if not user or not verify_password(password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # CREATE ACCESS TOKEN
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)},
        expires_delta=access_token_expires,
    )

    # RETURN USER JSON AND TOKEN
    return JSONResponse(
        {
            "user": {
                "id": user.id,
                "username": user.username,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "role": user.role,
            },
            "accessToken": access_token,
        }
    )
