# The Oats Hub — Database Schema Overview

This document outlines the core database schema for The Oats Hub platform.
Models are written using SQLAlchemy 2.0 with strict `Mapped` typing, enforcing data integrity and AI-safe extension patterns.

## Core Mixins (Reusable ORM abstractions)
- **`UUIDMixin`**: Automatically assigns an indexed UUID4 primary key (`id`).
- **`TimestampMixin`**: Automatically maintains timezone-aware `created_at` and `updated_at`.
- **`SoftDeleteMixin`**: Provides `is_deleted` and `deleted_at` for safe record keeping.

## Entities and Relationships

### User Domain
**`User` (`users`)**
- `id` (UUID, PK)
- `full_name` (String)
- `email` (String, Unique, Index)
- `password_hash` (String)
- `role` (String, default: "customer")
- `is_active` (Boolean)
- `email_verified` (Boolean)
- *Relationships*: `addresses`, `carts`, `orders`, `reviews`

**`Address` (`addresses`)**
- `id` (UUID, PK)
- `user_id` (UUID, FK -> users)
- `full_name`, `phone`, `address_line_1`, `address_line_2`, `city`, `state`, `pincode`
- `is_default` (Boolean)
- *Relationships*: `user`

### Product Domain
**`Category` (`categories`)**
- `id` (UUID, PK)
- `name` (String)
- `slug` (String, Unique, Index)
- `description`, `image_url`
- `is_active` (Boolean)
- *Relationships*: `products`

**`Product` (`products`)**
- `id` (UUID, PK)
- `name` (String)
- `slug` (String, Unique, Index)
- `short_description`, `description`, `nutrition_info` (JSONB)
- `category_id` (UUID, FK -> categories)
- `brand` (String, default: "The Oats Hub")
- `is_active`, `featured` (Boolean)
- `seo_title`, `seo_description` (String)
- *Relationships*: `category`, `variants`, `images`, `reviews`

**`ProductVariant` (`product_variants`)**
- `id` (UUID, PK)
- `product_id` (UUID, FK -> products)
- `sku` (String, Unique, Index)
- `size`, `flavor`
- `price_in_paise`, `compare_price_in_paise` (Integer)
- `stock_quantity`, `weight` (Integer)
- `is_default` (Boolean)
- *Relationships*: `product`

**`ProductImage` (`product_images`)**
- `id` (UUID, PK)
- `product_id` (UUID, FK -> products)
- `image_url`, `alt_text`
- `sort_order` (Integer)
- `is_primary` (Boolean)
- *Relationships*: `product`

### Cart Domain
**`Cart` (`carts`)**
- `id` (UUID, PK)
- `user_id` (UUID, FK -> users, Unique)
- *Relationships*: `items`, `user`

**`CartItem` (`cart_items`)**
- `id` (UUID, PK)
- `cart_id` (UUID, FK -> carts)
- `variant_id` (UUID, FK -> product_variants)
- `quantity` (Integer)
- *Relationships*: `cart`, `variant`

### Order Domain
**`Order` (`orders`)**
- `id` (UUID, PK)
- `user_id` (UUID, FK -> users)
- `order_number` (String, Unique, Index)
- `payment_status`, `fulfillment_status` (String)
- `subtotal_in_paise`, `delivery_fee_in_paise`, `total_in_paise` (Integer)
- `payment_method` (String)
- `shipping_address_id` (UUID, FK -> addresses)
- *Relationships*: `user`, `items`, `shipping_address`

**`OrderItem` (`order_items`)**
- `id` (UUID, PK)
- `order_id` (UUID, FK -> orders)
- `variant_id` (UUID, FK -> product_variants)
- `quantity` (Integer)
- `price_snapshot_in_paise` (Integer)
- *Relationships*: `order`, `variant`

### Review Domain
**`Review` (`reviews`)**
- `id` (UUID, PK)
- `user_id` (UUID, FK -> users)
- `product_id` (UUID, FK -> products)
- `rating` (Integer, Check: 1-5)
- `title`, `comment` (Text)
- `is_approved` (Boolean)
- *Relationships*: `user`, `product`

## Indexing Strategy
Indexes are aggressively applied on frequent lookup fields:
- `users.email`
- `categories.slug`
- `products.slug`
- `products.category_id`
- `product_variants.sku`
- `orders.order_number`
- All Foreign Keys (`user_id`, `product_id`, `cart_id`, `order_id`, etc.) are indexed to optimize relational joins.
