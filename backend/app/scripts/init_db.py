# backend/app/scripts/init_db.py
# DB SCRIPT

"""
DEV-ONLY DATABASE INITIALIZER :⚠️ WARNING:
This script DROPS ALL TABLES and RECREATES them. DO NOT run in production.
"""

from app.database.db import Base, engine, SessionLocal

# FORCE MODEL IMPORTS
from app.models.user import User
from app.models.image import Image
from app.models.album import Album
from app.models.tag import Tag
from app.models.image_album import image_albums
from app.models.image_tag import image_tags
from app.models.image_favorite import ImageFavorite
from app.models.share_link import ShareLink
# IMPORTS
from app.utils.auth import hash_password

# RESET DATABASE
print("� Dropping all tables...")
Base.metadata.drop_all(bind=engine)

print("�️ Creating all tables...")
Base.metadata.create_all(bind=engine)

# OPEN SESSION
db = SessionLocal()

try:
    # CREATE DEV ADMIN USER
    dev_user = User(
        username="admin",
        first_name="Dev",
        last_name="Admin",
        email="webdevadmin@bcimedia.com",
        password_hash=hash_password("devpassword"),
        role="admin",
        profile_metadata={
            "is_dev": True,
            "notes": "Auto-created by init_db.py"
        },
    )

    db.add(dev_user)
    db.commit()
    db.refresh(dev_user)

    print(f"✅ Dev admin user created: {dev_user.username} (id={dev_user.id})")

    # NO GALLERY ALBUM
    # Gallery is virtual:
    # Every image automatically exists in gallery queries

except Exception as e:
    db.rollback()
    print("❌ Database initialization failed")
    raise e

finally:
    db.close()

print("✅ Database initialized successfully")
