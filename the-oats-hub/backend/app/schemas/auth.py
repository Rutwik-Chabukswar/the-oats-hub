"""
Auth and User Schemas — Data validation for authentication routes.
"""

from uuid import UUID
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, ConfigDict


class UserBase(BaseModel):
    """Shared properties for all user schemas."""
    email: EmailStr
    full_name: str = Field(..., min_length=2, max_length=255)


class UserCreate(UserBase):
    """Schema for user registration."""
    password: str = Field(..., min_length=8, max_length=128)


class UserUpdate(BaseModel):
    """Schema for updating user profile."""
    full_name: Optional[str] = Field(None, min_length=2, max_length=255)
    email: Optional[EmailStr] = None


class UserLogin(BaseModel):
    """Schema for user login credentials."""
    email: EmailStr
    password: str


class RefreshTokenRequest(BaseModel):
    """Schema for refresh token requests."""
    refresh_token: str


class Token(BaseModel):
    """Schema for JWT token response."""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class UserResponse(UserBase):
    """Schema for returning user data (excludes sensitive info)."""
    id: UUID
    role: str
    is_active: bool
    email_verified: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
