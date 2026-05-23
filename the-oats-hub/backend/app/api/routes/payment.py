from fastapi import APIRouter, Depends, status, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.api.dependencies.auth import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.models.order import Order
from app.schemas.payment import PaymentVerificationRequest
from app.schemas.base import SuccessResponse
from app.services.payment import PaymentService
from app.core.exceptions import AppError

router = APIRouter(prefix="/payment", tags=["payment"])

@router.post(
    "/verify",
    response_model=SuccessResponse,
    status_code=status.HTTP_200_OK,
    summary="Verify a Razorpay payment signature",
)
async def verify_payment(
    data: PaymentVerificationRequest,
    session: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    """Verify that a payment was successfully captured using the Razorpay signature."""
    payment_service = PaymentService()
    
    is_valid = payment_service.verify_payment_signature(
        razorpay_order_id=data.razorpay_order_id,
        razorpay_payment_id=data.razorpay_payment_id,
        razorpay_signature=data.razorpay_signature
    )
    
    if not is_valid:
        raise AppError("Invalid payment signature", 400)
        
    # Find order and update status
    stmt = select(Order).where(Order.razorpay_order_id == data.razorpay_order_id)
    result = await session.execute(stmt)
    order = result.scalar_one_or_none()
    
    if not order:
        raise AppError("Order not found for this payment", 404)
        
    # Idempotent state transition
    if order.payment_status != "paid":
        order.payment_status = "paid"
        await session.commit()
        
    return SuccessResponse(message="Payment verified successfully")

@router.post(
    "/webhook",
    status_code=status.HTTP_200_OK,
    summary="Razorpay Webhook handler",
)
async def razorpay_webhook(
    request: Request,
    session: AsyncSession = Depends(get_db),
):
    """Secure idempotent webhook handler for Razorpay asynchronous events."""
    payload = await request.body()
    signature = request.headers.get("X-Razorpay-Signature")
    
    if not signature:
        raise AppError("Missing signature", 400)
        
    payment_service = PaymentService()
    if not payment_service.verify_webhook_signature(payload, signature):
        raise AppError("Invalid webhook signature", 400)
        
    event_data = await request.json()
    event_type = event_data.get("event")
    
    if event_type in ["payment.captured", "order.paid"]:
        # Extract order ID from webhook payload
        payload_entity = event_data.get("payload", {}).get("payment", {}).get("entity", {})
        razorpay_order_id = payload_entity.get("order_id")
        
        if razorpay_order_id:
            stmt = select(Order).where(Order.razorpay_order_id == razorpay_order_id)
            result = await session.execute(stmt)
            order = result.scalar_one_or_none()
            
            if order and order.payment_status != "paid":
                order.payment_status = "paid"
                await session.commit()
                
    elif event_type == "payment.failed":
        payload_entity = event_data.get("payload", {}).get("payment", {}).get("entity", {})
        razorpay_order_id = payload_entity.get("order_id")
        
        if razorpay_order_id:
            stmt = select(Order).where(Order.razorpay_order_id == razorpay_order_id)
            result = await session.execute(stmt)
            order = result.scalar_one_or_none()
            
            if order and order.payment_status == "pending":
                order.payment_status = "failed"
                # Trigger stock restoration (we can do this directly or enqueue task)
                await restore_order_stock(session, order)
                await session.commit()
                
    return {"status": "ok"}

async def restore_order_stock(session: AsyncSession, order: Order):
    """Restore stock for an abandoned or failed order."""
    from sqlalchemy.orm import selectinload
    
    stmt = select(Order).where(Order.id == order.id).options(selectinload(Order.items).selectinload(Order.items.property.mapper.class_.variant))
    result = await session.execute(stmt)
    full_order = result.scalar_one_or_none()
    
    if full_order:
        for item in full_order.items:
            if item.variant:
                item.variant.stock_quantity += item.quantity
