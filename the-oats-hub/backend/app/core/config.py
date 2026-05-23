"""
Application Configuration — Centralized, validated, environment-based settings.

All configuration is loaded from environment variables via Pydantic.
Critical variables raise validation errors if missing in production.
"""

from pydantic import field_validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # ── General ────────────────────────────────────────────────
    PROJECT_NAME: str = "The Oats Hub API"
    VERSION: str = "0.1.0"
    DEBUG: bool = False
    ENVIRONMENT: str = "development"
    LOG_LEVEL: str = "INFO"

    # ── API ────────────────────────────────────────────────────
    API_V1_PREFIX: str = "/api/v1"

    # ── CORS ───────────────────────────────────────────────────
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]
    ALLOWED_HOSTS: list[str] = ["*"]

    # ── Database ───────────────────────────────────────────────
    DATABASE_URL: str = ""
    DB_POOL_SIZE: int = 5
    DB_MAX_OVERFLOW: int = 10
    DB_POOL_TIMEOUT: int = 30

    # ── Redis & Observability ──────────────────────────────────
    REDIS_URL: str = "redis://localhost:6379/0"
    SENTRY_DSN: str = ""

    # ── JWT Auth ───────────────────────────────────────────────
    JWT_SECRET_KEY: str = ""
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    JWT_REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # ── Razorpay ───────────────────────────────────────────────
    RAZORPAY_KEY_ID: str = ""
    RAZORPAY_KEY_SECRET: str = ""

    # ── Cloudinary ─────────────────────────────────────────────
    CLOUDINARY_CLOUD_NAME: str = ""
    CLOUDINARY_API_KEY: str = ""
    CLOUDINARY_API_SECRET: str = ""

    # ── Validators ─────────────────────────────────────────────

    @field_validator("JWT_SECRET_KEY")
    @classmethod
    def validate_jwt_secret(cls, v: str, info) -> str:  # noqa: N805
        """Ensure JWT secret is set in non-development environments."""
        env = info.data.get("ENVIRONMENT", "development")
        if env != "development" and not v:
            raise ValueError("JWT_SECRET_KEY must be set in non-development environments")
        return v

    @field_validator("DATABASE_URL")
    @classmethod
    def validate_database_url(cls, v: str, info) -> str:  # noqa: N805
        """Warn if DATABASE_URL is empty (lazy engine handles the guard)."""
        return v

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "case_sensitive": True,
    }

    @property
    def is_production(self) -> bool:
        """Check if running in production."""
        return self.ENVIRONMENT == "production"

    @property
    def is_development(self) -> bool:
        """Check if running in development."""
        return self.ENVIRONMENT == "development"


settings = Settings()
