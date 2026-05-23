/**
 * Shared TypeScript types — Core domain types used across the application.
 */

/** UUID string type alias */
export type UUID = string;

/** Base entity with common fields */
export interface BaseEntity {
  id: UUID;
  created_at: string;
  updated_at: string;
}

/** Product type */
export interface Product extends BaseEntity {
  name: string;
  slug: string;
  description: string | null;
  category: string;
  base_price: number; // paise
  is_active: boolean;
  variants?: ProductVariant[];
  images?: string[];
}

/** Product variant type */
export interface ProductVariant extends BaseEntity {
  product_id: UUID;
  name: string;
  sku: string;
  price: number; // paise
  weight_grams: number | null;
  stock_quantity: number;
  is_active: boolean;
}

/** User type */
export interface User extends BaseEntity {
  email: string;
  full_name: string;
  phone: string | null;
  role: "customer" | "admin";
  is_active: boolean;
}

/** Cart type */
export interface Cart extends BaseEntity {
  user_id: UUID;
  items?: CartItem[];
}

/** Cart item type */
export interface CartItem extends BaseEntity {
  cart_id: UUID;
  variant_id: UUID;
  quantity: number;
  variant?: ProductVariant;
  product?: Product;
}

/** Order type */
export interface Order extends BaseEntity {
  user_id: UUID;
  status: string;
  total_amount: number; // paise
  shipping_address_id: UUID;
  payment_id: string | null;
  payment_status: string;
  items?: OrderItem[];
}

/** Order item type */
export interface OrderItem extends BaseEntity {
  order_id: UUID;
  variant_id: UUID;
  quantity: number;
  unit_price: number; // paise
}

/** Address type */
export interface Address extends BaseEntity {
  user_id: UUID;
  full_name: string;
  phone: string;
  address_line_1: string;
  address_line_2: string | null;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
}

/** Review type */
export interface Review extends BaseEntity {
  user_id: UUID;
  product_id: UUID;
  rating: number;
  comment: string | null;
}

/** API response wrapper */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

/** Paginated response */
export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}
