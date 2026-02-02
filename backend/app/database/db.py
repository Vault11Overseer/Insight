# app/database/db.py
# DATABASE

# IMPORTS
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

# LOAD ENVIRONMENT VARIABLES
load_dotenv()

# SET DATABASE URL
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL IS NOT SET")

# SQLALCHEMY ENGINE
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    connect_args={"sslmode": "require"},
    echo=True,  # LOGS ALL SQL QUERIES
)

# SESSION FACTORY
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# BASE CLASS FOR ORM MODELS
Base = declarative_base()

print("✅ DATABASE_URL LOADED")


# DEPENDENCY FOR DB SESSION
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()