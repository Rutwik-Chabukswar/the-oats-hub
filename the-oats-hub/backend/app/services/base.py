"""
Base Service — Reusable business logic patterns for all entities.

All entity services MUST extend this base class.
Services orchestrate repositories and wrap responses.

Usage:
    class ProductService(BaseService[Product]):
        def __init__(self, session: AsyncSession):
            repo = ProductRepository(session)
            super().__init__(repo)

        # Add entity-specific business logic here
        async def get_by_slug(self, slug: str) -> SuccessResponse:
            ...
"""

from typing import Any, Generic, TypeVar
from uuid import UUID
from math import ceil

from app.db.base import Base
from app.repositories.base import BaseRepository
from app.schemas.base import SuccessResponse, ErrorResponse, PaginatedResponse

ModelType = TypeVar("ModelType", bound=Base)


class BaseService(Generic[ModelType]):
    """
    Generic service providing standard business logic operations.

    Handles:
    - CRUD orchestration via repository
    - Response wrapping (SuccessResponse / ErrorResponse)
    - Pagination calculation
    - Validation helpers
    """

    def __init__(self, repository: BaseRepository[ModelType]):
        self.repository = repository

    async def get_by_id(self, id: UUID) -> dict[str, Any]:
        """Get a single entity by ID, wrapped in standard response."""
        entity = await self.repository.get_by_id(id)
        if entity is None:
            return ErrorResponse(
                message="Resource not found",
                errors=[f"No record found with id: {id}"],
            ).model_dump()
        return SuccessResponse(
            message="Resource retrieved successfully",
            data=entity,
        ).model_dump()

    async def get_paginated(
        self,
        *,
        page: int = 1,
        per_page: int = 20,
        filters: list[Any] | None = None,
        order_by: Any | None = None,
    ) -> dict[str, Any]:
        """Get paginated list of entities, wrapped in paginated response."""
        # Clamp per_page to max 50
        per_page = min(per_page, 50)
        page = max(page, 1)

        items, total = await self.repository.get_paginated(
            page=page, per_page=per_page, filters=filters, order_by=order_by
        )
        total_pages = ceil(total / per_page) if per_page > 0 else 0

        return PaginatedResponse(
            data=items,
            total=total,
            page=page,
            per_page=per_page,
            total_pages=total_pages,
        ).model_dump()

    async def create(self, data: dict[str, Any]) -> dict[str, Any]:
        """Create a new entity, wrapped in standard response."""
        entity = await self.repository.create(data)
        return SuccessResponse(
            message="Resource created successfully",
            data=entity,
        ).model_dump()

    async def update(self, id: UUID, data: dict[str, Any]) -> dict[str, Any]:
        """Update an entity by ID, wrapped in standard response."""
        entity = await self.repository.update(id, data)
        if entity is None:
            return ErrorResponse(
                message="Resource not found",
                errors=[f"No record found with id: {id}"],
            ).model_dump()
        return SuccessResponse(
            message="Resource updated successfully",
            data=entity,
        ).model_dump()

    async def delete(self, id: UUID) -> dict[str, Any]:
        """Soft-delete an entity by ID, wrapped in standard response."""
        success = await self.repository.soft_delete(id)
        if not success:
            return ErrorResponse(
                message="Resource not found",
                errors=[f"No record found with id: {id}"],
            ).model_dump()
        return SuccessResponse(
            message="Resource deleted successfully",
        ).model_dump()
