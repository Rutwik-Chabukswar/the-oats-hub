import asyncio
from app.db.session import get_session_factory
from app.models.product import Product, ProductImage
from sqlalchemy.future import select

async def main():
    factory = get_session_factory()
    async with factory() as db:
        images_map = {
            "pintola-high-protein-peanut-butter": "/products/pintola.png",
            "yogabar-crunchy-peanut-butter": "/products/yogabar.png",
            "organic-cosmos-toc": "/products/cosmos.png",
        }
        
        for slug, img_url in images_map.items():
            result = await db.execute(select(Product).where(Product.slug == slug))
            product = result.scalars().first()
            if product:
                img_result = await db.execute(select(ProductImage).where(ProductImage.product_id == product.id))
                img = img_result.scalars().first()
                if img:
                    img.image_url = img_url
                    print(f"Updated {slug} image to {img_url}")
                else:
                    print(f"No image found for {slug}")
            else:
                print(f"Product not found for {slug}")
                
        await db.commit()

if __name__ == "__main__":
    asyncio.run(main())
