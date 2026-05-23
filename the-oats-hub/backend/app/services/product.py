"""
Product Service — Business logic for products, variants, and images.
"""

from uuid import UUID
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import DuplicateSlugError, DuplicateSKUError, NotFoundError, InvalidInventoryError
from app.models.product import Product, ProductVariant, ProductImage
from app.repositories.product import ProductRepository
from app.schemas.product import ProductCreate, ProductUpdate
from app.utils.string import generate_slug


class ProductService:
    """Service handling product lifecycle, inventory validation, and variant orchestration."""

    def __init__(self, session: AsyncSession):
        self.session = session
        self.repo = ProductRepository(session)

    async def _check_sku_exists(self, sku: str) -> bool:
        """Helper to check if a SKU already exists globally."""
        stmt = select(ProductVariant).where(ProductVariant.sku == sku)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none() is not None

    async def create_product(self, data: ProductCreate) -> Product:
        """Create a new product along with its variants and images transactionally."""
        # 1. Generate and validate Slug
        slug = generate_slug(data.name)
        existing = await self.repo.get_by_slug(slug)
        if existing:
            raise DuplicateSlugError("Product")

        # 2. Validate SKUs for all variants
        for variant in data.variants:
            if await self._check_sku_exists(variant.sku):
                raise DuplicateSKUError(variant.sku)
            if variant.stock_quantity < 0:
                raise InvalidInventoryError(f"Variant SKU {variant.sku} cannot have negative stock.")

        # 3. Create core product record
        product_data = data.model_dump(exclude={"variants", "images"})
        product_data["slug"] = slug
        
        # We use SQLAlchemy ORM session directly for nested creation
        product = Product(**product_data)
        
        for variant_data in data.variants:
            v_dict = variant_data.model_dump()
            product.variants.append(ProductVariant(**v_dict))
            
        for img_data in data.images:
            i_dict = img_data.model_dump()
            product.images.append(ProductImage(**i_dict))

        self.session.add(product)
        await self.session.flush()
        await self.session.refresh(product)
        
        # Reload with relationships
        return await self.repo.get_by_id_with_relations(product.id) # type: ignore

    async def update_product(self, id: UUID, data: ProductUpdate) -> Product:
        """Update an existing product's base information."""
        product = await self.repo.get_by_id(id)
        if not product:
            raise NotFoundError("Product", str(id))

        update_data = data.model_dump(exclude_unset=True)
        
        if "name" in update_data and update_data["name"] != product.name:
            new_slug = generate_slug(update_data["name"])
            existing = await self.repo.get_by_slug(new_slug)
            if existing and existing.id != id:
                raise DuplicateSlugError("Product")
            update_data["slug"] = new_slug

        updated = await self.repo.update(id, update_data)
        if not updated:
            raise NotFoundError("Product", str(id))
            
        return await self.repo.get_by_id_with_relations(id) # type: ignore
