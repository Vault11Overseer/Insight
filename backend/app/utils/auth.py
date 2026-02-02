# backend/app/utils/auth.py
# AUTH UTILITY

# IMPORTS
from passlib.context import CryptContext


# PASSWORD HASHING CONTEXT
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

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
