from uuid import UUID
from datetime import datetime
from pydantic import BaseModel
from typing import List, Optional

class AddressResponse(BaseModel):
    id: UUID
    full_name: str
    phone: str
    address_line_1: str
    address_line_2: Optional[str] = None
    city: str
    state: str
    pincode: str
    is_default: bool

    class Config:
        from_attributes = True

class OrderItemResponse(BaseModel):
    id: UUID
    variant_id: Optional[UUID] = None
    quantity: int
    price_snapshot_in_paise: int
    
    # We optionally include product data if we want to show it in the UI
    variant_name: Optional[str] = None
    product_name: Optional[str] = None
    image_url: Optional[str] = None

    class Config:
        from_attributes = True

class OrderResponse(BaseModel):
    id: UUID
    order_number: str
    user_id: Optional[UUID] = None
    payment_status: str
    fulfillment_status: str
    subtotal_in_paise: int
    delivery_fee_in_paise: int
    total_in_paise: int
    payment_method: Optional[str] = None
    shipping_address: Optional[AddressResponse] = None
    items: List[OrderItemResponse]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
