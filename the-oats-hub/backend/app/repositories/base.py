"""
Base Repository — Generic CRUD operations for all entities.

All entity repositories MUST extend this base class.
This ensures consistent data access patterns across the codebase.

Usage:
    class ProductRepository(BaseRepository[Product]):
        def __init__(self, session: AsyncSession):
            super().__init__(Product, session)

        # Add entity-specific queries here
        async def get_by_slug(self, slug: str) -> Product | None:
            ...
"""

from typing import Any, Generic, TypeVar
from uuid import UUID

from sqlalchemy import select, func, update as sa_update, and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.base import Base

ModelType = TypeVar("ModelType", bound=Base)


class BaseRepository(Generic[ModelType]):
    """
    Generic repository providing standard CRUD operations.

    Handles:
    - Single record retrieval
    - Paginated listing with optional filtering
    - Create, update, soft delete
    - Count queries
    """

    def __init__(self, model: type[ModelType], session: AsyncSession):
        self.model = model
        self.session = session

    async def get_by_id(self, id: UUID) -> ModelType | None:
        """Get a single record by UUID primary key."""
        stmt = select(self.model).where(self.model.id == id)  # type: ignore[attr-defined]
        # Exclude soft-deleted records if model supports it
        if hasattr(self.model, "is_deleted"):
            stmt = stmt.where(self.model.is_deleted == False)  # noqa: E712
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_all(
        self,
        *,
        skip: int = 0,
        limit: int = 20,
        filters: list[Any] | None = None,
        order_by: Any | None = None,
    ) -> list[ModelType]:
        """
        Get paginated list of records.

        Args:
            skip: Number of records to skip (offset).
            limit: Maximum number of records to return.
            filters: Optional list of SQLAlchemy filter conditions.
            order_by: Optional column to order by.
        """
        stmt = select(self.model)

        # Exclude soft-deleted records if model supports it
        if hasattr(self.model, "is_deleted"):
            stmt = stmt.where(self.model.is_deleted == False)  # noqa: E712

        if filters:
            stmt = stmt.where(and_(*filters))

        if order_by is not None:
            stmt = stmt.order_by(order_by)
        elif hasattr(self.model, "created_at"):
            stmt = stmt.order_by(self.model.created_at.desc())  # type: ignore[attr-defined]

        stmt = stmt.offset(skip).limit(limit)
        result = await self.session.execute(stmt)
        return list(result.scalars().all())

    async def count(self, filters: list[Any] | None = None) -> int:
        """Count total records, optionally with filters."""
        stmt = select(func.count()).select_from(self.model)

        if hasattr(self.model, "is_deleted"):
            stmt = stmt.where(self.model.is_deleted == False)  # noqa: E712

        if filters:
            stmt = stmt.where(and_(*filters))

        result = await self.session.execute(stmt)
        return result.scalar_one()

    async def create(self, data: dict[str, Any]) -> ModelType:
        """Create a new record from a dictionary of attributes."""
        instance = self.model(**data)
        self.session.add(instance)
        await self.session.flush()
        await self.session.refresh(instance)
        return instance

    async def update(self, id: UUID, data: dict[str, Any]) -> ModelType | None:
        """Update an existing record by ID. Returns None if not found."""
        instance = await self.get_by_id(id)
        if instance is None:
            return None
        for key, value in data.items():
            setattr(instance, key, value)
        await self.session.flush()
        await self.session.refresh(instance)
        return instance

    async def soft_delete(self, id: UUID) -> bool:
        """Soft-delete a record by setting is_deleted=True. Returns False if not found."""
        from datetime import datetime, timezone

        instance = await self.get_by_id(id)
        if instance is None:
            return False

        if hasattr(instance, "is_deleted"):
            instance.is_deleted = True  # type: ignore[attr-defined]
        if hasattr(instance, "deleted_at"):
            instance.deleted_at = datetime.now(timezone.utc)  # type: ignore[attr-defined]

        await self.session.flush()
        return True

    async def hard_delete(self, id: UUID) -> bool:
        """Permanently delete a record. Use with caution."""
        instance = await self.get_by_id(id)
        if instance is None:
            return False
        await self.session.delete(instance)
        await self.session.flush()
        return True

    async def get_paginated(
        self,
        *,
        page: int = 1,
        per_page: int = 20,
        filters: list[Any] | None = None,
        order_by: Any | None = None,
    ) -> tuple[list[ModelType], int]:
        """
        Get paginated results with total count.

        Returns:
            Tuple of (items, total_count).
        """
        skip = (page - 1) * per_page
        items = await self.get_all(
            skip=skip, limit=per_page, filters=filters, order_by=order_by
        )
        total = await self.count(filters=filters)
        return items, total
