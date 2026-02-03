# backend/app/config.py
# APP config

# IMPORTS
import os
from dotenv import load_dotenv

# LOAD FROM .ENV
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set")

SECRET_KEY = os.getenv("SECRET_KEY")
DEBUG = os.getenv("DEBUG", "False") == "True"
