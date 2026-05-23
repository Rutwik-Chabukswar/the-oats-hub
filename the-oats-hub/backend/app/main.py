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

    if settings.SENTRY_DSN:
        import sentry_sdk
        sentry_sdk.init(
            dsn=settings.SENTRY_DSN,
            environment=settings.ENVIRONMENT,
            traces_sample_rate=1.0 if settings.is_development else 0.1,
            profiles_sample_rate=1.0 if settings.is_development else 0.1,
        )

    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        description="The Oats Hub — Premium D2C Nutrition Ecommerce API",
        docs_url="/api/docs",
        redoc_url="/api/redoc",
        openapi_url="/api/openapi.json",
    )

    from fastapi.middleware.trustedhost import TrustedHostMiddleware
    from slowapi import Limiter, _rate_limit_exceeded_handler
    from slowapi.util import get_remote_address
    from slowapi.errors import RateLimitExceeded
    from slowapi.middleware import SlowAPIMiddleware

    limiter = Limiter(key_func=get_remote_address, default_limits=["100/minute"])
    
    # ── Middleware ──────────────────────────────────────────────
    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
    app.add_middleware(SlowAPIMiddleware)

    app.add_middleware(
        TrustedHostMiddleware, allowed_hosts=settings.ALLOWED_HOSTS
    )
    
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
        """Extended health check endpoint for container lifecycle."""
        import redis.asyncio as redis
        from sqlalchemy import text
        from app.db.session import engine
        
        health_status = {
            "status": "healthy",
            "version": settings.VERSION,
            "environment": settings.ENVIRONMENT,
            "components": {}
        }
        
        # Check DB
        try:
            async with engine.connect() as conn:
                await conn.execute(text("SELECT 1"))
            health_status["components"]["database"] = "up"
        except Exception as e:
            health_status["components"]["database"] = "down"
            health_status["status"] = "unhealthy"
            
        # Check Redis
        try:
            r = redis.from_url(settings.REDIS_URL)
            await r.ping()
            health_status["components"]["redis"] = "up"
            await r.close()
        except Exception as e:
            health_status["components"]["redis"] = "down"
            health_status["status"] = "unhealthy"

        return {
            "success": health_status["status"] == "healthy",
            "message": "Health check completed",
            "data": health_status,
        }

    return app


# Create the application instance
app = create_app()
