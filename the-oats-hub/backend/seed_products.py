import asyncio
import uuid
from app.db.session import get_session_factory
from app.models.product import Product, ProductImage, ProductVariant
from app.models.category import Category
from sqlalchemy.future import select
import os
from dotenv import load_dotenv

load_dotenv()

async def main():
    factory = get_session_factory()
    async with factory() as db:
        # get any category
        cat_result = await db.execute(select(Category).limit(1))
        category = cat_result.scalars().first()
        cat_id = category.id if category else None
        
        products = [
            {
                "name": "Pintola High Protein Peanut Butter",
                "slug": "pintola-high-protein-peanut-butter",
                "brand": "Pintola",
                "description": "Premium High Protein Peanut butter.",
                "short_description": "High Protein Peanut Butter.",
                "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2000&auto=format&fit=crop"
            },
            {
                "name": "Yogabar Crunchy Peanut Butter",
                "slug": "yogabar-crunchy-peanut-butter",
                "brand": "Yogabar",
                "description": "100% natural crunchy peanut butter.",
                "short_description": "Natural Crunchy Peanut Butter.",
                "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2000&auto=format&fit=crop"
            },
            {
                "name": "Organic Cosmos Toc",
                "slug": "organic-cosmos-toc",
                "brand": "Organic Cosmos",
                "description": "Premium organic nutrition blend.",
                "short_description": "Organic Nutrition Blend.",
                "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2000&auto=format&fit=crop"
            }
        ]

        for p_data in products:
            existing = await db.execute(select(Product).where(Product.slug == p_data["slug"]))
            if existing.scalars().first():
                print(f"Product {p_data['slug']} already exists. Skipping.")
                continue

            product = Product(
                name=p_data["name"],
                slug=p_data["slug"],
                brand=p_data["brand"],
                description=p_data["description"],
                short_description=p_data["short_description"],
                category_id=cat_id,
                is_active=True,
                featured=True
            )
            db.add(product)
            await db.flush()

            variant = ProductVariant(
                product_id=product.id,
                sku=f"SKU-{p_data['slug'][:10].upper()}",
                price_in_paise=49900,
                stock_quantity=100,
                is_default=True
            )
            db.add(variant)

            image = ProductImage(
                product_id=product.id,
                image_url=p_data["image"],
                is_primary=True,
                sort_order=0
            )
            db.add(image)
        
        await db.commit()
        print("Products seeded successfully.")

if __name__ == "__main__":
    asyncio.run(main())
