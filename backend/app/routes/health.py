# backend/app/routes/health.py
# HEALTH ROUTE

# IMPORTS
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.db import get_db
# ROUTE
router = APIRouter( prefix="/health", tags=["Health"],)

# GET HEALTH CHECK
@router.get("/")
def health_check(db: Session = Depends(get_db)):

    db_status = "ok"
    try:
        with engine.connect() as conn:
            conn.execute("SELECT 1")
    except Exception:
        db_status = "error"
    return {"status": "ok", "api": "running", "database": db_status}

