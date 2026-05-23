"""
API Routes — Central router aggregating all versioned route modules.
"""

from fastapi import APIRouter

from app.api.routes import auth, category, product, cart, checkout, payment, order, address, admin

router = APIRouter()
router.include_router(auth.router)
router.include_router(category.router)
router.include_router(product.router)
router.include_router(cart.router)
router.include_router(checkout.router)
router.include_router(payment.router)
router.include_router(order.router)
router.include_router(address.router)
router.include_router(admin.router)


@router.get("/", tags=["Root"])
async def api_root():
    """API v1 root endpoint."""
    return {
        "success": True,
        "message": "The Oats Hub API v1",
        "data": None,
    }
