from uuid import UUID
from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
import math

from app.api.dependencies.auth import get_current_admin_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.admin import (
    FulfillmentUpdateRequest, 
    InventoryUpdateRequest, 
    AdminOrderSummaryResponse, 
    AdminCustomerResponse
)
from app.schemas.base import PaginatedResponse, SuccessResponse
from app.services.admin import AdminService

router = APIRouter(prefix="/admin", tags=["admin"], dependencies=[Depends(get_current_admin_user)])

@router.get(
    "/orders",
    response_model=PaginatedResponse[AdminOrderSummaryResponse],
    status_code=status.HTTP_200_OK,
    summary="Get all orders (Admin)",
)
async def get_all_orders(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    status_filter: str = Query(None, alias="status"),
    session: AsyncSession = Depends(get_db),
):
    service = AdminService(session)
    orders, total_count = await service.get_all_orders(page, per_page, status_filter)
    
    formatted = []
    for o in orders:
        formatted.append({
            "id": o.id,
            "order_number": o.order_number,
            "payment_status": o.payment_status,
            "fulfillment_status": o.fulfillment_status,
            "total_in_paise": o.total_in_paise,
            "created_at": o.created_at,
            "user_email": o.user.email if o.user else None,
            "customer_name": o.shipping_address.full_name if o.shipping_address else (o.user.full_name if o.user else "Guest")
        })
        
    total_pages = math.ceil(total_count / per_page) if total_count > 0 else 1
    
    return PaginatedResponse(
        data=formatted,
        total=total_count,
        page=page,
        per_page=per_page,
        total_pages=total_pages
    )

@router.patch(
    "/orders/{order_id}/fulfillment",
    response_model=SuccessResponse,
    status_code=status.HTTP_200_OK,
    summary="Update order fulfillment status",
)
async def update_fulfillment(
    order_id: UUID,
    data: FulfillmentUpdateRequest,
    session: AsyncSession = Depends(get_db),
):
    service = AdminService(session)
    await service.update_fulfillment_status(order_id, data.fulfillment_status)
    return SuccessResponse(message="Fulfillment status updated")

@router.patch(
    "/variants/{variant_id}/stock",
    response_model=SuccessResponse,
    status_code=status.HTTP_200_OK,
    summary="Update variant stock quantity",
)
async def update_stock(
    variant_id: UUID,
    data: InventoryUpdateRequest,
    session: AsyncSession = Depends(get_db),
):
    service = AdminService(session)
    await service.update_variant_stock(variant_id, data.stock_quantity)
    return SuccessResponse(message="Stock updated successfully")

@router.get(
    "/customers",
    response_model=PaginatedResponse[AdminCustomerResponse],
    status_code=status.HTTP_200_OK,
    summary="Get all customers (Admin)",
)
async def get_all_customers(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    search: str = Query(None),
    session: AsyncSession = Depends(get_db),
):
    service = AdminService(session)
    users, total_count = await service.get_all_customers(page, per_page, search)
    total_pages = math.ceil(total_count / per_page) if total_count > 0 else 1
    
    return PaginatedResponse(
        data=users,
        total=total_count,
        page=page,
        per_page=per_page,
        total_pages=total_pages
    )
