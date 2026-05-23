# The Oats Hub — Product Rules

## Product Categories

| Category        | Examples                                |
|-----------------|-----------------------------------------|
| Oats            | Rolled oats, Steel-cut oats, Masala oats|
| Peanut Butter   | Classic, Crunchy, Chocolate, Honey      |
| Healthy Snacks  | Granola bars, Trail mix, Protein bites  |
| Combos          | Bundled product sets                    |

## Product Data Requirements

Every product MUST have:

1. **Name** — Clear, descriptive product name
2. **Slug** — URL-friendly unique identifier
3. **Description** — Detailed product description (100-500 chars)
4. **Category** — One of the defined categories
5. **Base Price** — In paise (₹299 = 29900)
6. **At least one variant** — With SKU, price, weight, stock

## Variant Rules

- Each variant must have a unique **SKU**
- Inventory is tracked **per variant**, not per product
- Price can differ per variant
- Weight is in **grams**
- Stock quantity must be >= 0

## Price Display Rules

1. All prices stored in **paise** in the database
2. Display as **₹{amount}** with 2 decimal places when needed
3. Always show MRP if different from selling price
4. Show discount percentage when applicable
5. Format: ~~₹499~~ ₹399 (20% OFF)

## Product Image Rules

1. Primary image required for every product
2. Minimum 3 images per product (recommended)
3. Images stored on **Cloudinary**
4. Use responsive image sizes via `next/image`
5. WebP format preferred for performance

## Stock Management

- **In Stock**: `stock_quantity > 0`
- **Low Stock**: `stock_quantity <= 5` (show warning)
- **Out of Stock**: `stock_quantity === 0` (disable add to cart)

## SEO Requirements

Each product page must have:
- Unique `<title>`: `{Product Name} | The Oats Hub`
- Meta description from product description
- Open Graph image from primary product image
- Structured data (JSON-LD) for Product schema

## API Architecture & Contracts

1. **Filtering**: The `GET /api/v1/products` endpoint supports filtering by:
   - `category_id` (UUID)
   - `featured` (Boolean)
   - `active_only` (Boolean)
   - `search` (String)
2. **Pagination**: Uses `page` and `per_page` queries, returning a `PaginatedResponse` wrapper matching the API conventions.
3. **Slugs**: Slugs are generated automatically on product creation based on the `name`. If the name changes, the slug regenerates to stay SEO compliant.
4. **Transactions**: Product creation is transactional. If a variant's SKU is duplicated or inventory is negative, the entire product creation rolls back safely.
