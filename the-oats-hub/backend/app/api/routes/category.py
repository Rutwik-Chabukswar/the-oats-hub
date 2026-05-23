"""
Category Routes — Endpoints for managing product categories.
"""

from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies.auth import get_current_admin_user
from app.db.session import get_db
from app.models.category import Category
from app.repositories.category import CategoryRepository
from app.schemas.product import CategoryCreate, CategoryUpdate, CategoryResponse
from app.schemas.base import SuccessResponse
from app.services.category import CategoryService

router = APIRouter(prefix="/categories", tags=["categories"])


@router.post(
    "",
    response_model=SuccessResponse[CategoryResponse],
    status_code=status.HTTP_201_CREATED,
    summary="Create a new category (Admin only)",
)
async def create_category(
    data: CategoryCreate,
    session: AsyncSession = Depends(get_db),
    _admin=Depends(get_current_admin_user),
):
    """Create a new category. Slug is automatically generated."""
    service = CategoryService(session)
    category = await service.create_category(data)
    return SuccessResponse(message="Category created successfully", data=category)


@router.get(
    "",
    response_model=SuccessResponse[List[CategoryResponse]],
    status_code=status.HTTP_200_OK,
    summary="List all categories",
)
async def list_categories(
    active_only: bool = True,
    session: AsyncSession = Depends(get_db),
):
    """Retrieve all categories. By default, only active categories are returned."""
    repo = CategoryRepository(session)
    filters = []
    if active_only:
        filters.append(Category.is_active == True)
        
    categories = await repo.get_all(filters=filters, order_by=Category.name)
    return SuccessResponse(data=categories)


@router.patch(
    "/{category_id}",
    response_model=SuccessResponse[CategoryResponse],
    status_code=status.HTTP_200_OK,
    summary="Update a category (Admin only)",
)
async def update_category(
    category_id: UUID,
    data: CategoryUpdate,
    session: AsyncSession = Depends(get_db),
    _admin=Depends(get_current_admin_user),
):
    """Update an existing category. Slug regenerates if name changes."""
    service = CategoryService(session)
    updated = await service.update_category(category_id, data)
    return SuccessResponse(message="Category updated successfully", data=updated)


@router.delete(
    "/{category_id}",
    response_model=SuccessResponse[None],
    status_code=status.HTTP_200_OK,
    summary="Soft delete a category (Admin only)",
)
async def delete_category(
    category_id: UUID,
    session: AsyncSession = Depends(get_db),
    _admin=Depends(get_current_admin_user),
):
    """Soft delete a category."""
    repo = CategoryRepository(session)
    success = await repo.soft_delete(category_id)
    if not success:
        from app.core.exceptions import NotFoundError
        raise NotFoundError("Category", str(category_id))
    return SuccessResponse(message="Category deleted successfully")
