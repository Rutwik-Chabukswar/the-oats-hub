/**
 * Query Keys — Centralized, type-safe query key factory.
 *
 * All query keys for data fetching must be defined here.
 * This prevents key collisions and enables targeted cache invalidation.
 *
 * Pattern: entity → scope → identifier
 *
 * Usage:
 *   queryKeys.products.all()        → ["products", "list"]
 *   queryKeys.products.detail(id)   → ["products", "detail", id]
 *   queryKeys.products.byCategory(c)→ ["products", "category", c]
 */

export const queryKeys = {
  /** Product query keys */
  products: {
    all: () => ["products", "list"] as const,
    detail: (id: string) => ["products", "detail", id] as const,
    byCategory: (category: string) =>
      ["products", "category", category] as const,
    search: (query: string) => ["products", "search", query] as const,
  },

  /** Cart query keys */
  cart: {
    current: () => ["cart", "current"] as const,
    items: () => ["cart", "items"] as const,
  },

  /** Order query keys */
  orders: {
    all: () => ["orders", "list"] as const,
    detail: (id: string) => ["orders", "detail", id] as const,
    byStatus: (status: string) => ["orders", "status", status] as const,
  },

  /** User/auth query keys */
  auth: {
    user: () => ["auth", "user"] as const,
    session: () => ["auth", "session"] as const,
  },

  /** Review query keys */
  reviews: {
    byProduct: (productId: string) =>
      ["reviews", "product", productId] as const,
  },

  /** Address query keys */
  addresses: {
    all: () => ["addresses", "list"] as const,
    detail: (id: string) => ["addresses", "detail", id] as const,
  },
} as const;
