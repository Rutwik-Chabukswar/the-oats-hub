import uuid
from typing import Optional

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.cart import Cart, CartItem
from app.repositories.cart import CartRepository
from app.repositories.product import ProductRepository
from app.core.exceptions import AppError, NotFoundError

class InvalidInventoryError(AppError):
    def __init__(self, message: str):
        super().__init__(message=message, status_code=400)

class CartService:
    """Service layer for Cart logic, enforcing stock safety."""

    def __init__(self, session: AsyncSession):
        self.session = session
        self.cart_repo = CartRepository(session)
        self.product_repo = ProductRepository(session)

    async def get_or_create_cart(self, user_id: Optional[uuid.UUID] = None, session_id: Optional[str] = None) -> Cart:
        """Fetch existing cart or create a new one. Priority given to user_id."""
        if not user_id and not session_id:
            raise AppError("Must provide either user_id or session_id to identify cart.", 400)

        cart = None
        if user_id:
            cart = await self.cart_repo.get_cart_by_user(user_id)
        elif session_id:
            cart = await self.cart_repo.get_cart_by_session(session_id)

        if not cart:
            cart = await self.cart_repo.create({"user_id": user_id, "session_id": session_id})
            
        return cart

    async def add_item(self, cart_id: uuid.UUID, variant_id: uuid.UUID, quantity: int) -> CartItem:
        """Add an item to the cart, strictly validating stock availability."""
        if quantity <= 0:
            raise AppError("Quantity must be greater than zero.", 400)

        # 1. Fetch variant and check stock
        # We need the variant to check stock, using product repo helper
        variant = await self.product_repo.get_variant_by_id(variant_id)
        if not variant:
            raise NotFoundError("ProductVariant", str(variant_id))

        if not variant.is_active:
            raise AppError("This product variant is currently unavailable.", 400)

        # 2. Add or update item in cart
        # To accurately check stock, we need to know how many are ALREADY in the cart
        item = await self.cart_repo.add_item_to_cart(cart_id, variant_id, quantity)

        if item.quantity > variant.stock_quantity:
            raise InvalidInventoryError(f"Cannot add {quantity} items. Only {variant.stock_quantity} left in stock.")

        return item

    async def update_item_quantity(self, cart_id: uuid.UUID, item_id: uuid.UUID, quantity: int) -> CartItem:
        """Update cart item quantity, enforcing inventory limits."""
        if quantity <= 0:
            raise AppError("Quantity must be greater than zero. Use remove_item to delete.", 400)

        # We must load the item to know the variant_id, then load the variant to check stock
        cart = await self.cart_repo.get_by_id(cart_id)
        if not cart:
            raise NotFoundError("Cart", str(cart_id))
            
        # Let's get the active cart with relations to easily find the item and variant
        full_cart = await self.cart_repo.get_cart_by_user(cart.user_id) if cart.user_id else await self.cart_repo.get_cart_by_session(cart.session_id)
        
        target_item = next((i for i in full_cart.items if i.id == item_id), None)
        if not target_item:
            raise NotFoundError("CartItem", str(item_id))

        if quantity > target_item.variant.stock_quantity:
            raise InvalidInventoryError(f"Cannot update to {quantity}. Only {target_item.variant.stock_quantity} left in stock.")

        updated_item = await self.cart_repo.update_item_quantity(cart_id, item_id, quantity)
        return updated_item

    async def remove_item(self, cart_id: uuid.UUID, item_id: uuid.UUID) -> bool:
        """Remove item from cart."""
        return await self.cart_repo.remove_item(cart_id, item_id)

    async def clear_cart(self, cart_id: uuid.UUID) -> bool:
        """Clear all items."""
        return await self.cart_repo.clear_cart(cart_id)

    def calculate_totals(self, cart: Cart) -> dict:
        """Calculate cart subtotal, discount, and total."""
        subtotal = sum(item.quantity * item.variant.price for item in cart.items)
        # Placeholder for future logic
        discount = 0
        total = subtotal - discount
        return {
            "subtotal": subtotal,
            "discount": discount,
            "total": total
        }
