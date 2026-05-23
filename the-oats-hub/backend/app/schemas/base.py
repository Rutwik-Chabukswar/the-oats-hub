"""
Base Pydantic schemas — Reusable base schemas and response wrappers.
"""

from typing import Any, Generic, List, Optional, TypeVar
from pydantic import BaseModel, ConfigDict

T = TypeVar("T")


class BaseSchema(BaseModel):
    """Base schema with common configuration."""
    model_config = ConfigDict(from_attributes=True)


class SuccessResponse(BaseModel, Generic[T]):
    """Standardized success response wrapper."""
    success: bool = True
    message: str = "Success"
    data: Optional[T] = None


class ErrorResponse(BaseModel):
    """Standardized error response wrapper."""
    success: bool = False
    message: str = "An error occurred"
    errors: List[str] = []


class PaginatedResponse(BaseModel, Generic[T]):
    """Paginated response wrapper."""
    success: bool = True
    message: str = "Success"
    data: Optional[List[T]] = None
    total: int = 0
    page: int = 1
    per_page: int = 20
    total_pages: int = 0
