import uuid
from typing import Optional

from sqlalchemy import select, delete, update
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.base import BaseRepository
from app.models.cart import Cart, CartItem
from app.models.product import ProductVariant

class CartRepository(BaseRepository[Cart]):
    """Repository for Cart domain logic and persistence."""

    def __init__(self, session: AsyncSession):
        super().__init__(model=Cart, session=session)

    async def get_cart_by_user(self, user_id: uuid.UUID) -> Optional[Cart]:
        """Fetch active cart by user ID, including items and variants."""
        query = (
            select(Cart)
            .where(Cart.user_id == user_id)
            .options(
                selectinload(Cart.items).selectinload(CartItem.variant).selectinload(ProductVariant.product)
            )
        )
        result = await self.session.execute(query)
        return result.scalars().first()

    async def get_cart_by_session(self, session_id: str) -> Optional[Cart]:
        """Fetch active cart by guest session ID."""
        query = (
            select(Cart)
            .where(Cart.session_id == session_id)
            .options(
                selectinload(Cart.items).selectinload(CartItem.variant).selectinload(ProductVariant.product)
            )
        )
        result = await self.session.execute(query)
        return result.scalars().first()

    async def add_item_to_cart(self, cart_id: uuid.UUID, variant_id: uuid.UUID, quantity: int) -> CartItem:
        """Add an item to the cart or update quantity if it already exists."""
        # Check if item exists
        query = select(CartItem).where(
            CartItem.cart_id == cart_id,
            CartItem.variant_id == variant_id
        )
        result = await self.session.execute(query)
        existing_item = result.scalars().first()

        if existing_item:
            existing_item.quantity += quantity
            item = existing_item
        else:
            item = CartItem(cart_id=cart_id, variant_id=variant_id, quantity=quantity)
            self.session.add(item)
        
        await self.session.flush()
        return item

    async def update_item_quantity(self, cart_id: uuid.UUID, item_id: uuid.UUID, quantity: int) -> Optional[CartItem]:
        """Update the quantity of a cart item."""
        query = select(CartItem).where(
            CartItem.id == item_id,
            CartItem.cart_id == cart_id
        )
        result = await self.session.execute(query)
        item = result.scalars().first()
        
        if item:
            item.quantity = quantity
            await self.session.flush()
            
        return item

    async def remove_item(self, cart_id: uuid.UUID, item_id: uuid.UUID) -> bool:
        """Remove an item from the cart."""
        query = delete(CartItem).where(
            CartItem.id == item_id,
            CartItem.cart_id == cart_id
        )
        result = await self.session.execute(query)
        return result.rowcount > 0

    async def clear_cart(self, cart_id: uuid.UUID) -> bool:
        """Delete all items in a cart."""
        query = delete(CartItem).where(CartItem.cart_id == cart_id)
        result = await self.session.execute(query)
        return result.rowcount > 0
