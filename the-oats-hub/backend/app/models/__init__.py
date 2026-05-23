"""
Models initialization.
Import all models here to ensure they are registered with SQLAlchemy declarative base before Alembic runs.
"""

from app.db.base import Base
from app.models.user import User
from app.models.address import Address
from app.models.category import Category
from app.models.product import Product, ProductVariant, ProductImage
from app.models.cart import Cart, CartItem
from app.models.order import Order, OrderItem
from app.models.review import Review

__all__ = [
    "Base",
    "User",
    "Address",
    "Category",
    "Product",
    "ProductVariant",
    "ProductImage",
    "Cart",
    "CartItem",
    "Order",
    "OrderItem",
    "Review",
]
