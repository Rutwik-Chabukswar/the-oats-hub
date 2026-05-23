import pytest
import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.checkout import CheckoutService
from app.schemas.checkout import CheckoutRequest, ShippingAddressRequest
from app.core.exceptions import AppError

@pytest.mark.asyncio
async def test_checkout_service_delivery_fee(db_session: AsyncSession):
    """Test that delivery fee calculation follows the rule (free over 500 INR)."""
    service = CheckoutService(db_session)
    
    # Under 500 INR (50000 paise)
    assert service.calculate_delivery_fee(49999) == 5000
    
    # Exact 500 INR
    assert service.calculate_delivery_fee(50000) == 0
    
    # Over 500 INR
    assert service.calculate_delivery_fee(100000) == 0

@pytest.mark.asyncio
async def test_checkout_service_empty_cart_validation(db_session: AsyncSession):
    """Test that checkout blocks operations if cart is empty."""
    service = CheckoutService(db_session)
    user_id = uuid.uuid4()
    
    # Setup dummy request
    address_req = ShippingAddressRequest(
        full_name="John Doe",
        phone="9876543210",
        address_line_1="123 Street",
        city="Mumbai",
        state="MH",
        pincode="400001",
    )
    request = CheckoutRequest(shipping_address=address_req)
    
    # Should raise error since there's no items in the cart
    with pytest.raises(AppError, match="Cart is empty"):
        await service.process_checkout(user_id=user_id, request=request)
