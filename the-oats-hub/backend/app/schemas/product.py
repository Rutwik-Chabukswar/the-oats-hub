"""
Product Domain Schemas — Data validation for Categories, Products, and Variants.
"""

from uuid import UUID
from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field, ConfigDict


# ── CATEGORY SCHEMAS ──────────────────────────────────────────

class CategoryBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    description: Optional[str] = None
    image_url: Optional[str] = None
    is_active: bool = True

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=100)
    description: Optional[str] = None
    image_url: Optional[str] = None
    is_active: Optional[bool] = None

class CategoryResponse(CategoryBase):
    id: UUID
    slug: str
    
    model_config = ConfigDict(from_attributes=True)


# ── VARIANT SCHEMAS ───────────────────────────────────────────

class VariantBase(BaseModel):
    sku: str = Field(..., min_length=3, max_length=100)
    size: Optional[str] = None
    flavor: Optional[str] = None
    price_in_paise: int = Field(..., gt=0)
    compare_price_in_paise: Optional[int] = None
    stock_quantity: int = Field(..., ge=0)
    weight: Optional[int] = None
    is_default: bool = False

class VariantCreate(VariantBase):
    pass

class VariantUpdate(BaseModel):
    sku: Optional[str] = Field(None, min_length=3, max_length=100)
    size: Optional[str] = None
    flavor: Optional[str] = None
    price_in_paise: Optional[int] = Field(None, gt=0)
    compare_price_in_paise: Optional[int] = None
    stock_quantity: Optional[int] = Field(None, ge=0)
    weight: Optional[int] = None
    is_default: Optional[bool] = None

class VariantResponse(VariantBase):
    id: UUID
    product_id: UUID
    
    model_config = ConfigDict(from_attributes=True)


# ── IMAGE SCHEMAS ─────────────────────────────────────────────

class ProductImageBase(BaseModel):
    image_url: str
    alt_text: Optional[str] = None
    sort_order: int = 0
    is_primary: bool = False

class ProductImageCreate(ProductImageBase):
    pass

class ProductImageResponse(ProductImageBase):
    id: UUID
    
    model_config = ConfigDict(from_attributes=True)


# ── PRODUCT SCHEMAS ───────────────────────────────────────────

class ProductBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    short_description: Optional[str] = None
    description: Optional[str] = None
    nutrition_info: Optional[Dict[str, Any]] = None
    category_id: Optional[UUID] = None
    brand: Optional[str] = "The Oats Hub"
    is_active: bool = True
    featured: bool = False
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None

class ProductCreate(ProductBase):
    variants: List[VariantCreate] = Field(default_factory=list)
    images: List[ProductImageCreate] = Field(default_factory=list)

class ProductUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=255)
    short_description: Optional[str] = None
    description: Optional[str] = None
    nutrition_info: Optional[Dict[str, Any]] = None
    category_id: Optional[UUID] = None
    brand: Optional[str] = None
    is_active: Optional[bool] = None
    featured: Optional[bool] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None

class ProductResponse(ProductBase):
    id: UUID
    slug: str
    category: Optional[CategoryResponse] = None
    variants: List[VariantResponse] = []
    images: List[ProductImageResponse] = []
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
