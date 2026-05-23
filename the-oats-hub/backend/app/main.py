"""
The Oats Hub — FastAPI Application Entry Point

This is the ONLY file that assembles the application.
All configuration, middleware, and routes are registered here.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.logging import setup_logging
from app.api.routes import router as api_router
from app.middleware.exception_handler import register_exception_handlers


def create_app() -> FastAPI:
    """Application factory — creates and configures the FastAPI app."""

    # Configure logging first so startup events are tracked
    setup_logging()

    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        description="The Oats Hub — Premium D2C Nutrition Ecommerce API",
        docs_url="/api/docs",
        redoc_url="/api/redoc",
        openapi_url="/api/openapi.json",
    )

    # ── Middleware ──────────────────────────────────────────────
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ── Exception Handlers ─────────────────────────────────────
    register_exception_handlers(app)

    # ── Routes ─────────────────────────────────────────────────
    app.include_router(api_router, prefix=settings.API_V1_PREFIX)

    # ── Health Check ───────────────────────────────────────────
    @app.get("/health", tags=["Health"])
    async def health_check():
        """Health check endpoint."""
        return {
            "success": True,
            "message": "The Oats Hub API is running",
            "data": {
                "status": "healthy",
                "version": settings.VERSION,
                "environment": settings.ENVIRONMENT,
            },
        }

    return app


# Create the application instance
app = create_app()
