import uuid
import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.models.cart import Cart, CartItem
from app.models.order import Order, OrderItem
from app.models.address import Address
from app.models.product import ProductVariant
from app.schemas.checkout import CheckoutRequest, OrderSummaryResponse, OrderSummaryItem
from app.core.exceptions import AppError
from app.services.cart import CartService

class CheckoutService:
    """Service handling transactional checkout and order creation."""

    def __init__(self, session: AsyncSession):
        self.session = session
        self.cart_service = CartService(session)

    def _generate_order_number(self) -> str:
        """Generate human-readable order numbers e.g. TOH-2026-000001"""
        # In a real system, we'd use a sequence or counter table
        # For simplicity, we use date + random hex
        timestamp = datetime.datetime.now().strftime("%Y%m%d")
        unique_suffix = uuid.uuid4().hex[:6].upper()
        return f"TOH-{timestamp}-{unique_suffix}"

    def calculate_delivery_fee(self, subtotal: int) -> int:
        """Calculate delivery fee based on subtotal (in paise). Free shipping over 500 INR (50000 paise)."""
        if subtotal >= 50000:
            return 0
        return 5000  # 50 INR

    async def get_checkout_summary(self, user_id: uuid.UUID) -> OrderSummaryResponse:
        """Calculate checkout totals safely from the backend source of truth."""
        cart = await self.cart_service.get_or_create_cart(user_id=user_id)
        
        if not cart.items:
            raise AppError("Cart is empty", 400)

        items = []
        subtotal = 0
        
        for item in cart.items:
            variant_price = item.variant.price
            item_subtotal = variant_price * item.quantity
            subtotal += item_subtotal
            items.append(OrderSummaryItem(
                variant_id=item.variant_id,
                name=item.variant.product.name if item.variant.product else item.variant.name,
                quantity=item.quantity,
                price_per_unit=variant_price,
                subtotal=item_subtotal
            ))
            
        delivery_fee = self.calculate_delivery_fee(subtotal)
        total = subtotal + delivery_fee
        
        return OrderSummaryResponse(
            items=items,
            subtotal=subtotal,
            delivery_fee=delivery_fee,
            total=total
        )

    async def process_checkout(self, user_id: uuid.UUID, request: CheckoutRequest) -> Order:
        """
        Create an order transactionally, verifying stock, saving address,
        and returning an Order model.
        """
        # We start a nested transaction (savepoint) to rollback cleanly on error
        async with self.session.begin_nested():
            # 1. Fetch Cart
            cart = await self.cart_service.get_or_create_cart(user_id=user_id)
            if not cart.items:
                raise AppError("Cart is empty", 400)

            # 2. Lock Inventory (FOR UPDATE)
            # We fetch all variant IDs in the cart
            variant_ids = [item.variant_id for item in cart.items]
            
            # Use with_for_update to lock rows and prevent concurrent checkouts of same stock
            stmt = select(ProductVariant).where(ProductVariant.id.in_(variant_ids)).with_for_update()
            result = await self.session.execute(stmt)
            locked_variants = {v.id: v for v in result.scalars().all()}

            # 3. Validate Stock & Calculate Totals
            subtotal = 0
            for item in cart.items:
                variant = locked_variants.get(item.variant_id)
                if not variant or not variant.is_active:
                    raise AppError(f"Variant {item.variant_id} is unavailable.", 400)
                
                if item.quantity > variant.stock_quantity:
                    raise AppError(f"Insufficient stock for {variant.name}. Available: {variant.stock_quantity}", 400)
                
                subtotal += variant.price * item.quantity
                
            delivery_fee = self.calculate_delivery_fee(subtotal)
            total = subtotal + delivery_fee

            # 4. Save Shipping Address
            addr_data = request.shipping_address
            address = Address(
                user_id=user_id,
                full_name=addr_data.full_name,
                phone=addr_data.phone,
                address_line_1=addr_data.address_line_1,
                address_line_2=addr_data.address_line_2,
                city=addr_data.city,
                state=addr_data.state,
                pincode=addr_data.pincode,
                is_default=addr_data.save_as_default
            )
            self.session.add(address)
            await self.session.flush()

            # 5. Create Order
            order = Order(
                user_id=user_id,
                order_number=self._generate_order_number(),
                subtotal_in_paise=subtotal,
                delivery_fee_in_paise=delivery_fee,
                total_in_paise=total,
                shipping_address_id=address.id,
                payment_status="pending",
                fulfillment_status="unfulfilled"
            )
            self.session.add(order)
            await self.session.flush()

            # 6. Create Order Items & Deduct Stock
            for item in cart.items:
                variant = locked_variants[item.variant_id]
                
                order_item = OrderItem(
                    order_id=order.id,
                    variant_id=variant.id,
                    quantity=item.quantity,
                    price_snapshot_in_paise=variant.price
                )
                self.session.add(order_item)
                
                # NOTE: For phase 4B, we deduct stock here. 
                # In robust flows, you might just "reserve" stock and deduct upon payment success.
                # We'll deduct now and if payment fails, it should be restored.
                variant.stock_quantity -= item.quantity

            # 7. Clear Cart
            await self.cart_service.clear_cart(cart.id)
            
            # 8. Generate Razorpay Order
            from app.services.payment import PaymentService
            payment_service = PaymentService()
            # If keys are missing (like in local dev without env vars), we handle gracefully 
            # by letting it error or logging. The frontend expects order ID.
            if payment_service.client:
                rzp_order = payment_service.create_razorpay_order(
                    amount_in_paise=total,
                    receipt_id=order.order_number
                )
                order.razorpay_order_id = rzp_order.get("id")
            
            await self.session.flush()
            
            # The transaction will automatically commit because of async with session.begin() in middleware,
            # or we are using begin_nested() here which commits the savepoint.

        return order
