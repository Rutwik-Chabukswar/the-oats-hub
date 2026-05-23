from uuid import UUID
from pydantic import BaseModel, Field
from typing import List, Optional

from app.schemas.product import VariantResponse

class AddToCartRequest(BaseModel):
    variant_id: UUID
    quantity: int = Field(default=1, gt=0)

class UpdateCartItemRequest(BaseModel):
    quantity: int = Field(gt=0)

class CartItemResponse(BaseModel):
    id: UUID
    cart_id: UUID
    variant_id: UUID
    quantity: int
    variant: VariantResponse

    class Config:
        from_attributes = True

class CartTotals(BaseModel):
    subtotal: int
    discount: int
    total: int

class CartResponse(BaseModel):
    id: UUID
    user_id: Optional[UUID] = None
    session_id: Optional[str] = None
    items: List[CartItemResponse]
    totals: CartTotals

    class Config:
        from_attributes = True
