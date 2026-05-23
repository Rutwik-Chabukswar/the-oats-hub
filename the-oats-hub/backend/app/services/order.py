import uuid
from typing import Tuple, List

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, desc
from sqlalchemy.orm import selectinload

from app.models.order import Order
from app.core.exceptions import NotFoundError, AuthorizationError

class OrderService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_user_orders(self, user_id: uuid.UUID, page: int = 1, per_page: int = 10) -> Tuple[List[Order], int]:
        """Fetch paginated orders for a specific user."""
        skip = (page - 1) * per_page
        
        # Count total
        count_stmt = select(func.count(Order.id)).where(Order.user_id == user_id, Order.is_deleted == False)
        total_count = (await self.session.execute(count_stmt)).scalar_one()

        # Fetch data
        stmt = (
            select(Order)
            .where(Order.user_id == user_id, Order.is_deleted == False)
            .options(
                selectinload(Order.items).selectinload(Order.items.property.mapper.class_.variant).selectinload(Order.items.property.mapper.class_.variant.property.mapper.class_.product),
                selectinload(Order.shipping_address)
            )
            .order_by(desc(Order.created_at))
            .offset(skip)
            .limit(per_page)
        )
        
        result = await self.session.execute(stmt)
        orders = list(result.scalars().all())
        
        return orders, total_count

    async def get_order_by_id(self, order_id: uuid.UUID, user_id: uuid.UUID) -> Order:
        """Fetch a specific order, enforcing ownership."""
        stmt = (
            select(Order)
            .where(Order.id == order_id, Order.is_deleted == False)
            .options(
                selectinload(Order.items).selectinload(Order.items.property.mapper.class_.variant).selectinload(Order.items.property.mapper.class_.variant.property.mapper.class_.product),
                selectinload(Order.shipping_address)
            )
        )
        result = await self.session.execute(stmt)
        order = result.scalar_one_or_none()

        if not order:
            raise NotFoundError("Order", str(order_id))

        if order.user_id != user_id:
            raise AuthorizationError("You do not have permission to view this order.")

        return order
