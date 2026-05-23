"""
Cart domain models.
"""

import uuid
from typing import TYPE_CHECKING
from sqlalchemy import Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, UUIDMixin, TimestampMixin

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.product import ProductVariant


class Cart(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "carts"

    user_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), unique=True, index=True, nullable=True
    )
    session_id: Mapped[str | None] = mapped_column(
        unique=True, index=True, nullable=True
    )

    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="cart")
    items: Mapped[list["CartItem"]] = relationship(
        "CartItem", back_populates="cart", cascade="all, delete-orphan"
    )


class CartItem(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "cart_items"

    cart_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("carts.id", ondelete="CASCADE"), nullable=False, index=True
    )
    variant_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("product_variants.id", ondelete="CASCADE"), nullable=False, index=True
    )
    quantity: Mapped[int] = mapped_column(Integer, default=1, nullable=False)

    # Relationships
    cart: Mapped["Cart"] = relationship("Cart", back_populates="items")
    variant: Mapped["ProductVariant"] = relationship("ProductVariant")
