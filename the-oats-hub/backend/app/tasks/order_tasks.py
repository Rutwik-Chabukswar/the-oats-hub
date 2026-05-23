import asyncio
import logging
from datetime import datetime, timedelta, timezone
from sqlalchemy import select
from app.core.celery_app import celery_app
from app.db.session import SessionLocal
from app.models.order import Order
from app.models.product import ProductVariant
from sqlalchemy.orm import selectinload

logger = logging.getLogger(__name__)

async def _cleanup_abandoned_orders_async():
    """Async core logic to find and fail pending orders, restoring stock."""
    timeout_threshold = datetime.now(timezone.utc) - timedelta(minutes=30)
    
    async with SessionLocal() as session:
        # Find pending orders older than 30 mins
        stmt = select(Order).where(
            Order.payment_status == "pending",
            Order.created_at <= timeout_threshold,
            Order.is_deleted == False
        ).options(
            selectinload(Order.items).selectinload(Order.items.property.mapper.class_.variant)
        )
        
        result = await session.execute(stmt)
        abandoned_orders = result.scalars().all()
        
        if not abandoned_orders:
            logger.info("No abandoned orders to clean up.")
            return

        for order in abandoned_orders:
            logger.info(f"Failing abandoned order {order.id}")
            order.payment_status = "failed"
            
            # Restore stock
            for item in order.items:
                if item.variant:
                    logger.info(f"Restoring {item.quantity} stock to variant {item.variant_id}")
                    item.variant.stock_quantity += item.quantity
                    if item.variant.stock_quantity > 0:
                        item.variant.is_active = True
                        
        await session.commit()
        logger.info(f"Cleaned up {len(abandoned_orders)} abandoned orders.")

@celery_app.task(name="app.tasks.order_tasks.cleanup_abandoned_orders")
def cleanup_abandoned_orders():
    """Synchronous Celery wrapper for the async cleanup task."""
    logger.info("Starting abandoned order cleanup task...")
    asyncio.run(_cleanup_abandoned_orders_async())
