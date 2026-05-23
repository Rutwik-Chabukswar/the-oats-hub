import uuid
from typing import Tuple, List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, desc, or_
from sqlalchemy.orm import selectinload

from app.models.order import Order
from app.models.product import Product, ProductVariant
from app.models.user import User
from app.core.exceptions import NotFoundError, AppError

class AdminService:
    def __init__(self, session: AsyncSession):
        self.session = session

    # ── ORDERS ─────────────────────────────────────────────────────────────
    async def get_all_orders(
        self, page: int = 1, per_page: int = 20, status: Optional[str] = None
    ) -> Tuple[List[Order], int]:
        skip = (page - 1) * per_page
        
        base_query = select(Order).where(Order.is_deleted == False)
        if status:
            base_query = base_query.where(Order.fulfillment_status == status)
            
        count_stmt = select(func.count()).select_from(base_query.subquery())
        total_count = (await self.session.execute(count_stmt)).scalar_one()

        stmt = (
            base_query
            .options(
                selectinload(Order.user),
                selectinload(Order.shipping_address)
            )
            .order_by(desc(Order.created_at))
            .offset(skip)
            .limit(per_page)
        )
        result = await self.session.execute(stmt)
        return list(result.scalars().all()), total_count

    async def update_fulfillment_status(self, order_id: uuid.UUID, status: str) -> Order:
        stmt = select(Order).where(Order.id == order_id)
        result = await self.session.execute(stmt)
        order = result.scalar_one_or_none()
        
        if not order:
            raise NotFoundError("Order", str(order_id))
            
        order.fulfillment_status = status
        await self.session.commit()
        await self.session.refresh(order)
        return order

    # ── INVENTORY ──────────────────────────────────────────────────────────
    async def update_variant_stock(self, variant_id: uuid.UUID, new_stock: int) -> ProductVariant:
        if new_stock < 0:
            raise AppError("Stock cannot be negative", 400)
            
        stmt = select(ProductVariant).where(ProductVariant.id == variant_id)
        result = await self.session.execute(stmt)
        variant = result.scalar_one_or_none()
        
        if not variant:
            raise NotFoundError("ProductVariant", str(variant_id))
            
        variant.stock_quantity = new_stock
        # Auto update active status if it was out of stock and now has stock
        if new_stock > 0 and not variant.is_active:
            variant.is_active = True
            
        await self.session.commit()
        await self.session.refresh(variant)
        return variant

    # ── CUSTOMERS ──────────────────────────────────────────────────────────
    async def get_all_customers(
        self, page: int = 1, per_page: int = 20, search: Optional[str] = None
    ) -> Tuple[List[User], int]:
        skip = (page - 1) * per_page
        
        base_query = select(User)
        if search:
            search_filter = f"%{search}%"
            base_query = base_query.where(
                or_(
                    User.email.ilike(search_filter),
                    User.full_name.ilike(search_filter)
                )
            )
            
        count_stmt = select(func.count()).select_from(base_query.subquery())
        total_count = (await self.session.execute(count_stmt)).scalar_one()

        stmt = base_query.order_by(desc(User.created_at)).offset(skip).limit(per_page)
        result = await self.session.execute(stmt)
        return list(result.scalars().all()), total_count
