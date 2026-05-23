"""
Product Repository — Data access for the Product domain.
"""

from typing import Any
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.product import Product
from app.repositories.base import BaseRepository


class ProductRepository(BaseRepository[Product]):
    """Repository handling database operations for the Product model."""

    def __init__(self, session: AsyncSession):
        super().__init__(Product, session)

    def _get_base_query(self) -> Any:
        """Helper to build a query that eagerly loads variants and images."""
        return select(Product).options(
            selectinload(Product.variants),
            selectinload(Product.images),
            selectinload(Product.category)
        ).where(Product.is_deleted == False)

    async def get_by_slug(self, slug: str) -> Product | None:
        """Fetch a single product by its SEO slug with all relationships loaded."""
        stmt = self._get_base_query().where(Product.slug == slug)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_by_id_with_relations(self, id: UUID) -> Product | None:
        """Fetch a single product by ID with all relationships loaded."""
        stmt = self._get_base_query().where(Product.id == id)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_all_with_relations(
        self,
        *,
        skip: int = 0,
        limit: int = 20,
        filters: list[Any] | None = None,
        order_by: Any | None = None,
    ) -> list[Product]:
        """Fetch a paginated list of products with relationships loaded."""
        stmt = self._get_base_query()
        
        if filters:
            from sqlalchemy import and_
            stmt = stmt.where(and_(*filters))

        if order_by is not None:
            stmt = stmt.order_by(order_by)
        else:
            stmt = stmt.order_by(Product.created_at.desc())

        stmt = stmt.offset(skip).limit(limit)
        result = await self.session.execute(stmt)
        return list(result.scalars().all())

    async def get_variant_by_id(self, variant_id: UUID):
        """Fetch a specific product variant."""
        from app.models.product import ProductVariant
        stmt = select(ProductVariant).where(ProductVariant.id == variant_id, ProductVariant.is_deleted == False)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()
