from uuid import UUID
from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
import math

from app.api.dependencies.auth import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.order import OrderResponse, OrderItemResponse
from app.schemas.base import PaginatedResponse, SuccessResponse
from app.services.order import OrderService

router = APIRouter(prefix="/orders", tags=["orders"])

def format_order_response(order) -> dict:
    """Helper to format the order response and enrich with variant/product names."""
    items = []
    for item in order.items:
        variant_name = item.variant.name if item.variant else None
        product_name = item.variant.product.name if item.variant and item.variant.product else None
        image_url = item.variant.product.images[0] if item.variant and item.variant.product and item.variant.product.images else None
        
        items.append({
            "id": item.id,
            "variant_id": item.variant_id,
            "quantity": item.quantity,
            "price_snapshot_in_paise": item.price_snapshot_in_paise,
            "variant_name": variant_name,
            "product_name": product_name,
            "image_url": image_url
        })
        
    return {
        "id": order.id,
        "order_number": order.order_number,
        "user_id": order.user_id,
        "payment_status": order.payment_status,
        "fulfillment_status": order.fulfillment_status,
        "subtotal_in_paise": order.subtotal_in_paise,
        "delivery_fee_in_paise": order.delivery_fee_in_paise,
        "total_in_paise": order.total_in_paise,
        "payment_method": order.payment_method,
        "shipping_address": order.shipping_address,
        "items": items,
        "created_at": order.created_at,
        "updated_at": order.updated_at
    }


@router.get(
    "",
    response_model=PaginatedResponse[OrderResponse],
    status_code=status.HTTP_200_OK,
    summary="Get user orders",
)
async def get_my_orders(
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(10, ge=1, le=50, description="Items per page"),
    session: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    """Retrieve the current user's order history."""
    service = OrderService(session)
    orders, total_count = await service.get_user_orders(user.id, page, per_page)
    
    formatted_orders = [format_order_response(o) for o in orders]
    
    total_pages = math.ceil(total_count / per_page) if total_count > 0 else 1
    
    return PaginatedResponse(
        data=formatted_orders,
        total=total_count,
        page=page,
        per_page=per_page,
        total_pages=total_pages
    )

@router.get(
    "/{order_id}",
    response_model=SuccessResponse[OrderResponse],
    status_code=status.HTTP_200_OK,
    summary="Get order details",
)
async def get_order_detail(
    order_id: UUID,
    session: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    """Retrieve details for a specific order owned by the user."""
    service = OrderService(session)
    order = await service.get_order_by_id(order_id, user.id)
    
    formatted_order = format_order_response(order)
    
    return SuccessResponse(data=formatted_order)
