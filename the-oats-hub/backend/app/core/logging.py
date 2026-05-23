"""
Logging Configuration — Structured, environment-aware logging.

Configures Python logging with:
- JSON format in production (for log aggregators)
- Human-readable format in development
- Configurable log level via settings

Usage:
    import logging
    logger = logging.getLogger(__name__)
    logger.info("Processing order", extra={"order_id": "uuid"})
"""

import logging
import sys
from app.core.config import settings


def setup_logging() -> None:
    """Configure application-wide logging based on environment."""

    log_level = getattr(logging, settings.LOG_LEVEL.upper(), logging.INFO)

    if settings.is_production:
        # Production: JSON-formatted logs for log aggregators
        formatter = logging.Formatter(
            '{"time":"%(asctime)s","level":"%(levelname)s",'
            '"logger":"%(name)s","message":"%(message)s"}'
        )
    else:
        # Development: human-readable colored output
        formatter = logging.Formatter(
            "%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
            datefmt="%H:%M:%S",
        )

    # Configure root logger
    root_logger = logging.getLogger()
    root_logger.setLevel(log_level)

    # Remove existing handlers to prevent duplicates
    root_logger.handlers.clear()

    # Console handler
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(formatter)
    console_handler.setLevel(log_level)
    root_logger.addHandler(console_handler)

    # Suppress noisy third-party loggers
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
    logging.getLogger("sqlalchemy.engine").setLevel(
        logging.INFO if settings.DEBUG else logging.WARNING
    )

    logging.getLogger(__name__).info(
        "Logging configured: level=%s, env=%s",
        settings.LOG_LEVEL,
        settings.ENVIRONMENT,
    )
