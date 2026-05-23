"""
Product Routes — Endpoints for managing products and catalog listing.
"""

from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies.auth import get_current_admin_user
from app.db.session import get_db
from app.models.product import Product
from app.repositories.product import ProductRepository
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse
from app.schemas.base import SuccessResponse, PaginatedResponse
from app.services.product import ProductService
from app.core.exceptions import NotFoundError

router = APIRouter(prefix="/products", tags=["products"])


@router.post(
    "",
    response_model=SuccessResponse[ProductResponse],
    status_code=status.HTTP_201_CREATED,
    summary="Create a new product with variants (Admin only)",
)
async def create_product(
    data: ProductCreate,
    session: AsyncSession = Depends(get_db),
    _admin=Depends(get_current_admin_user),
):
    """Create a new product alongside variants and images transactionally."""
    service = ProductService(session)
    product = await service.create_product(data)
    return SuccessResponse(message="Product created successfully", data=product)


@router.get(
    "",
    response_model=PaginatedResponse[ProductResponse],
    status_code=status.HTTP_200_OK,
    summary="List products with filtering and pagination",
)
async def list_products(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    category_id: Optional[UUID] = Query(None),
    featured: Optional[bool] = Query(None),
    active_only: bool = Query(True),
    search: Optional[str] = Query(None, min_length=2),
    session: AsyncSession = Depends(get_db),
):
    """Fetch paginated products with dynamic ecommerce filters."""
    repo = ProductRepository(session)
    filters = []
    
    if active_only:
        filters.append(Product.is_active == True)
    if featured is not None:
        filters.append(Product.featured == featured)
    if category_id:
        filters.append(Product.category_id == category_id)
    if search:
        filters.append(Product.name.ilike(f"%{search}%"))

    skip = (page - 1) * per_page
    
    # We fetch total count first
    total = await repo.count(filters=filters)
    
    # Then fetch paginated items
    items = await repo.get_all_with_relations(
        skip=skip, limit=per_page, filters=filters, order_by=Product.created_at.desc()
    )
    
    total_pages = (total + per_page - 1) // per_page
    
    return PaginatedResponse(
        data=items,
        total=total,
        page=page,
        per_page=per_page,
        total_pages=total_pages
    )


@router.get(
    "/{slug}",
    response_model=SuccessResponse[ProductResponse],
    status_code=status.HTTP_200_OK,
    summary="Get product by SEO slug",
)
async def get_product_by_slug(
    slug: str,
    session: AsyncSession = Depends(get_db),
):
    """Retrieve a single product by its SEO slug."""
    repo = ProductRepository(session)
    product = await repo.get_by_slug(slug)
    if not product:
        raise NotFoundError("Product", slug)
    return SuccessResponse(data=product)


@router.patch(
    "/{product_id}",
    response_model=SuccessResponse[ProductResponse],
    status_code=status.HTTP_200_OK,
    summary="Update product details (Admin only)",
)
async def update_product(
    product_id: UUID,
    data: ProductUpdate,
    session: AsyncSession = Depends(get_db),
    _admin=Depends(get_current_admin_user),
):
    """Update base product information."""
    service = ProductService(session)
    updated = await service.update_product(product_id, data)
    return SuccessResponse(message="Product updated successfully", data=updated)


@router.delete(
    "/{product_id}",
    response_model=SuccessResponse[None],
    status_code=status.HTTP_200_OK,
    summary="Soft delete a product (Admin only)",
)
async def delete_product(
    product_id: UUID,
    session: AsyncSession = Depends(get_db),
    _admin=Depends(get_current_admin_user),
):
    """Soft delete a product from the catalog."""
    repo = ProductRepository(session)
    success = await repo.soft_delete(product_id)
    if not success:
        raise NotFoundError("Product", str(product_id))
    return SuccessResponse(message="Product deleted successfully")
