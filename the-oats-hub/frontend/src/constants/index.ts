/**
 * Application Constants — Centralized configuration values.
 *
 * Business-level constants. Environment config lives in @/lib/env.
 */

import { env } from "@/lib/env";

export const APP_CONFIG = {
  name: "The Oats Hub",
  tagline: "Premium Nutrition, Delivered",
  description: "Premium oats, peanut butter, and healthy food products.",
  url: env.APP_URL,
} as const;

export const API_CONFIG = {
  baseUrl: env.API_URL,
  timeout: 10000,
} as const;

export const PAGINATION = {
  defaultPage: 1,
  defaultPerPage: 20,
  maxPerPage: 50,
} as const;

export const PRODUCT_CATEGORIES = [
  "oats",
  "peanut-butter",
  "healthy-snacks",
  "combos",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const STOCK_THRESHOLDS = {
  lowStock: 5,
  outOfStock: 0,
} as const;
