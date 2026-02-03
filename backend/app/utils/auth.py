# backend/app/utils/auth.py
# AUTH UTILITY

# IMPORTS
import os
from datetime import datetime, timedelta
from typing import Optional

from jose import JWTError, jwt
from passlib.context import CryptContext


# PASSWORD HASHING CONTEXT
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT CONFIG
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "a_super_secret_dev_key_that_is_not_secure")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# HASH PLAIN PASSWORD
def hash_password(password: str) -> str:
    if not isinstance(password, str):
        raise TypeError("Password must be a string")

    if len(password.encode("utf-8")) > 72:
        raise ValueError("Password exceeds bcrypt 72-byte limit")

    return pwd_context.hash(password)

# VERIFY PASSWORD
def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifies that the plain password matches the hashed password.
    """
    return pwd_context.verify(plain_password, hashed_password)


# CREATE ACCESS TOKEN
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# VERIFY TOKEN
def verify_token(token: str, credentials_exception) -> str:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: Optional[str] = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        return user_id
    except JWTError:
        raise credentials_exception
