from uuid import UUID
from fastapi import APIRouter, Depends, status, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies.auth import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.cart import AddToCartRequest, UpdateCartItemRequest, CartResponse
from app.schemas.base import SuccessResponse
from app.services.cart import CartService

router = APIRouter(prefix="/cart", tags=["cart"])

async def get_cart_response(service: CartService, user: User) -> dict:
    """Helper to format the cart response consistently."""
    cart = await service.get_or_create_cart(user_id=user.id)
    totals = service.calculate_totals(cart)
    # Convert ORM model to dictionary that matches schema
    return {
        "id": cart.id,
        "user_id": cart.user_id,
        "session_id": cart.session_id,
        "items": cart.items,
        "totals": totals
    }

@router.get(
    "",
    response_model=SuccessResponse[CartResponse],
    status_code=status.HTTP_200_OK,
    summary="Get current cart",
)
async def get_cart(
    session: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    """Retrieve the current user's cart or create a new one."""
    service = CartService(session)
    cart_data = await get_cart_response(service, user)
    return SuccessResponse(data=cart_data)

@router.post(
    "/items",
    response_model=SuccessResponse[CartResponse],
    status_code=status.HTTP_200_OK,
    summary="Add item to cart",
)
async def add_item_to_cart(
    data: AddToCartRequest,
    session: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    """Add a product variant to the cart, verifying inventory."""
    service = CartService(session)
    cart = await service.get_or_create_cart(user_id=user.id)
    
    await service.add_item(cart.id, data.variant_id, data.quantity)
    
    cart_data = await get_cart_response(service, user)
    return SuccessResponse(message="Item added to cart", data=cart_data)

@router.patch(
    "/items/{item_id}",
    response_model=SuccessResponse[CartResponse],
    status_code=status.HTTP_200_OK,
    summary="Update item quantity",
)
async def update_cart_item(
    item_id: UUID,
    data: UpdateCartItemRequest,
    session: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    """Update the quantity of an item in the cart, verifying inventory."""
    service = CartService(session)
    cart = await service.get_or_create_cart(user_id=user.id)
    
    await service.update_item_quantity(cart.id, item_id, data.quantity)
    
    cart_data = await get_cart_response(service, user)
    return SuccessResponse(message="Cart updated", data=cart_data)

@router.delete(
    "/items/{item_id}",
    response_model=SuccessResponse[CartResponse],
    status_code=status.HTTP_200_OK,
    summary="Remove item from cart",
)
async def remove_cart_item(
    item_id: UUID,
    session: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    """Remove a specific item from the cart."""
    service = CartService(session)
    cart = await service.get_or_create_cart(user_id=user.id)
    
    await service.remove_item(cart.id, item_id)
    
    cart_data = await get_cart_response(service, user)
    return SuccessResponse(message="Item removed", data=cart_data)

@router.delete(
    "/clear",
    response_model=SuccessResponse[CartResponse],
    status_code=status.HTTP_200_OK,
    summary="Clear entire cart",
)
async def clear_cart(
    session: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    """Remove all items from the cart."""
    service = CartService(session)
    cart = await service.get_or_create_cart(user_id=user.id)
    
    await service.clear_cart(cart.id)
    
    cart_data = await get_cart_response(service, user)
    return SuccessResponse(message="Cart cleared", data=cart_data)
