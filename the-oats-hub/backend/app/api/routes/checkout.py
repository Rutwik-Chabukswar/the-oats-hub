from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies.auth import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.checkout import CheckoutRequest, CheckoutResponse, OrderSummaryResponse
from app.schemas.base import SuccessResponse
from app.services.checkout import CheckoutService

router = APIRouter(prefix="/checkout", tags=["checkout"])

@router.get(
    "/summary",
    response_model=SuccessResponse[OrderSummaryResponse],
    status_code=status.HTTP_200_OK,
    summary="Get checkout order summary",
)
async def get_checkout_summary(
    session: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    """Retrieve the pricing snapshot for the current cart to display during checkout."""
    service = CheckoutService(session)
    summary = await service.get_checkout_summary(user_id=user.id)
    return SuccessResponse(data=summary)

@router.post(
    "/create-order",
    response_model=SuccessResponse[CheckoutResponse],
    status_code=status.HTTP_201_CREATED,
    summary="Create a new order",
)
async def create_order(
    request: CheckoutRequest,
    session: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    """Convert a cart into an order transactionally, deducting inventory."""
    service = CheckoutService(session)
    order = await service.process_checkout(user_id=user.id, request=request)
    
    response_data = CheckoutResponse(
        order_id=order.id,
        order_number=order.order_number,
        razorpay_order_id=order.razorpay_order_id,
        total_amount=order.total_in_paise,
        payment_status=order.payment_status
    )
    
    return SuccessResponse(message="Order created successfully", data=response_data)
