# backend/app/schemas/auth.py
# AUTH SCHEMA

# IMPORTS
from pydantic import BaseModel, EmailStr

# LOGIN REQUEST
class LoginRequest(BaseModel):
    email: EmailStr
    password: str
