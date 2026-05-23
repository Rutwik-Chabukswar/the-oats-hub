"""
Order domain models.
"""

import uuid
from typing import TYPE_CHECKING
from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, UUIDMixin, TimestampMixin, SoftDeleteMixin

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.product import ProductVariant
    from app.models.address import Address


class Order(Base, UUIDMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "orders"

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True
    )
    order_number: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    
    payment_status: Mapped[str] = mapped_column(String(50), default="pending", index=True, nullable=False)
    fulfillment_status: Mapped[str] = mapped_column(String(50), default="unfulfilled", index=True, nullable=False)
    
    subtotal_in_paise: Mapped[int] = mapped_column(Integer, nullable=False)
    delivery_fee_in_paise: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    total_in_paise: Mapped[int] = mapped_column(Integer, nullable=False)
    
    payment_method: Mapped[str | None] = mapped_column(String(50), nullable=True)

    # We store address as foreign key, though capturing a static snapshot is also valid for orders
    # For now, following Phase 2A standard foreign key relation
    shipping_address_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("addresses.id", ondelete="SET NULL"), nullable=True
    )

    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="orders")
    items: Mapped[list["OrderItem"]] = relationship(
        "OrderItem", back_populates="order", cascade="all, delete-orphan"
    )
    shipping_address: Mapped["Address | None"] = relationship("Address")


class OrderItem(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "order_items"

    order_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, index=True
    )
    variant_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("product_variants.id", ondelete="SET NULL"), nullable=True, index=True
    )
    
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    price_snapshot_in_paise: Mapped[int] = mapped_column(Integer, nullable=False)

    # Relationships
    order: Mapped["Order"] = relationship("Order", back_populates="items")
    variant: Mapped["ProductVariant | None"] = relationship("ProductVariant")
