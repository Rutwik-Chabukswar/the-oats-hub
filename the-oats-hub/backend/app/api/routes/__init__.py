"""
API Routes — Central router aggregating all versioned route modules.
"""

from fastapi import APIRouter

from app.api.routes import auth, category, product

router = APIRouter()
router.include_router(auth.router)
router.include_router(category.router)
router.include_router(product.router)


@router.get("/", tags=["Root"])
async def api_root():
    """API v1 root endpoint."""
    return {
        "success": True,
        "message": "The Oats Hub API v1",
        "data": None,
    }
