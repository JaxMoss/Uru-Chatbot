from pydantic_settings import BaseSettings
from typing import List, Optional
import os
from dotenv import load_dotenv
import json

# Load environment variables from .env file if it exists
load_dotenv()

class Settings(BaseSettings):
    """Application settings."""
    
    # API settings
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "Uru ChatGPT Interface"
    
    # Security settings
    SECRET_KEY: str = "your-secret-key-here"  # Change in production
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    # CORS settings
    CORS_ORIGINS: List[str] = [
        "https://uru-chatbot-jax-u46172.vm.elestio.app",
        "https://api.uru-chatbot-u46172.vm.elestio.app",
        "http://localhost:3000",
        "http://localhost:8000"
    ]
    
    # Database settings
    POSTGRES_SERVER: str = "db"
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "uru_chatbot"
    DATABASE_URL: str = f"postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}/{POSTGRES_DB}"
    
    # OpenAI settings
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4"
    OPENAI_MAX_TOKENS: int = 2000
    OPENAI_TEMPERATURE: float = 0.7
    
    class Config:
        case_sensitive = True


settings = Settings()
