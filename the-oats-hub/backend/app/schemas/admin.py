from uuid import UUID
from datetime import datetime
from pydantic import BaseModel, EmailStr
from typing import Optional

class FulfillmentUpdateRequest(BaseModel):
    fulfillment_status: str

class InventoryUpdateRequest(BaseModel):
    stock_quantity: int

class AdminOrderSummaryResponse(BaseModel):
    id: UUID
    order_number: str
    payment_status: str
    fulfillment_status: str
    total_in_paise: int
    created_at: datetime
    user_email: Optional[str] = None
    customer_name: Optional[str] = None

class AdminCustomerResponse(BaseModel):
    id: UUID
    email: EmailStr
    full_name: str
    created_at: datetime
    is_active: bool
    is_superuser: bool
