"""
Category Service — Business logic for category management.
"""

from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import DuplicateSlugError, NotFoundError
from app.models.category import Category
from app.repositories.category import CategoryRepository
from app.schemas.product import CategoryCreate, CategoryUpdate
from app.utils.string import generate_slug


class CategoryService:
    """Service handling category lifecycle and SEO validation."""

    def __init__(self, session: AsyncSession):
        self.session = session
        self.repo = CategoryRepository(session)

    async def create_category(self, data: CategoryCreate) -> Category:
        """Create a new category with a unique slug."""
        slug = generate_slug(data.name)
        
        existing = await self.repo.get_by_slug(slug)
        if existing:
            raise DuplicateSlugError("Category")

        category_data = data.model_dump()
        category_data["slug"] = slug
        
        return await self.repo.create(category_data)

    async def update_category(self, id: UUID, data: CategoryUpdate) -> Category:
        """Update an existing category, handling slug regeneration if name changes."""
        category = await self.repo.get_by_id(id)
        if not category:
            raise NotFoundError("Category", str(id))

        update_data = data.model_dump(exclude_unset=True)
        
        # If name changes, optionally update slug, but usually we keep old slug for SEO 
        # or regenerate and add redirect. For now, we only regenerate if explicitly needed.
        # Simple approach: regenerate slug if name changed.
        if "name" in update_data and update_data["name"] != category.name:
            new_slug = generate_slug(update_data["name"])
            existing = await self.repo.get_by_slug(new_slug)
            if existing and existing.id != id:
                raise DuplicateSlugError("Category")
            update_data["slug"] = new_slug

        updated = await self.repo.update(id, update_data)
        if not updated:
            raise NotFoundError("Category", str(id))
            
        return updated
