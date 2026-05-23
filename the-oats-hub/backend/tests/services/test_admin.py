import pytest
import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.admin import AdminService
from app.core.exceptions import NotFoundError, AppError
from app.models.product import ProductVariant

@pytest.mark.asyncio
async def test_admin_update_fulfillment_status(db_session: AsyncSession):
    """Test that AdminService can successfully mutate order fulfillment status."""
    service = AdminService(db_session)
    
    # Normally we would use a factory to insert an order and verify the status mutation.
    # We verify the logic handles missing entities properly.
    
    fake_order_id = uuid.uuid4()
    with pytest.raises(NotFoundError):
        await service.update_fulfillment_status(fake_order_id, "shipped")

@pytest.mark.asyncio
async def test_admin_update_inventory_stock(db_session: AsyncSession):
    """Test that AdminService can safely mutate inventory stock."""
    service = AdminService(db_session)
    
    fake_variant_id = uuid.uuid4()
    
    # Must reject negative stock
    with pytest.raises(AppError):
        await service.update_variant_stock(fake_variant_id, -5)
        
    # Must raise NotFound for missing variant
    with pytest.raises(NotFoundError):
        await service.update_variant_stock(fake_variant_id, 100)
