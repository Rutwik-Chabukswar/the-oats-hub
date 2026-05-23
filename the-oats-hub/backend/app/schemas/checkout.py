from uuid import UUID
from pydantic import BaseModel, Field
from typing import List, Optional

class ShippingAddressRequest(BaseModel):
    full_name: str
    phone: str
    address_line_1: str
    address_line_2: Optional[str] = None
    city: str
    state: str
    pincode: str
    save_as_default: bool = False

class CheckoutRequest(BaseModel):
    shipping_address: ShippingAddressRequest

class OrderSummaryItem(BaseModel):
    variant_id: UUID
    name: str
    quantity: int
    price_per_unit: int
    subtotal: int

class OrderSummaryResponse(BaseModel):
    items: List[OrderSummaryItem]
    subtotal: int
    delivery_fee: int
    total: int

class CheckoutResponse(BaseModel):
    order_id: UUID
    order_number: str
    razorpay_order_id: Optional[str] = None
    total_amount: int
    payment_status: str
