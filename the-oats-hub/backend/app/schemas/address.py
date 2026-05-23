from uuid import UUID
from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional

class AddressBase(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=255)
    phone: str = Field(..., min_length=10, max_length=20)
    address_line_1: str = Field(..., min_length=5, max_length=500)
    address_line_2: Optional[str] = Field(None, max_length=500)
    city: str = Field(..., min_length=2, max_length=100)
    state: str = Field(..., min_length=2, max_length=100)
    pincode: str = Field(..., min_length=6, max_length=20)
    is_default: bool = False

class AddressCreate(AddressBase):
    pass

class AddressUpdate(BaseModel):
    full_name: Optional[str] = Field(None, min_length=2, max_length=255)
    phone: Optional[str] = Field(None, min_length=10, max_length=20)
    address_line_1: Optional[str] = Field(None, min_length=5, max_length=500)
    address_line_2: Optional[str] = Field(None, max_length=500)
    city: Optional[str] = Field(None, min_length=2, max_length=100)
    state: Optional[str] = Field(None, min_length=2, max_length=100)
    pincode: Optional[str] = Field(None, min_length=6, max_length=20)
    is_default: Optional[bool] = None

class AddressResponse(AddressBase):
    id: UUID
    user_id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
