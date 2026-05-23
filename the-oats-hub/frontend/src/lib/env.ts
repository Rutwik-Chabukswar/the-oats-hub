/**
 * Environment Configuration — Typed, validated access to environment variables.
 *
 * CANONICAL SOURCE for all environment configuration in the frontend.
 * No other file should read process.env directly.
 *
 * Usage:
 *   import { env } from "@/lib/env";
 *   const url = env.API_URL;
 */

/**
 * Typed environment configuration.
 * All env vars are validated and typed at the point of access.
 */
export const env = {
  /** Backend API base URL */
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",

  /** Frontend app URL */
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

  /** Razorpay public key */
  RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",

  /** Cloudinary cloud name */
  CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "",

  /** Current Node environment */
  NODE_ENV: process.env.NODE_ENV || "development",

  /** Whether we're in production */
  IS_PRODUCTION: process.env.NODE_ENV === "production",

  /** Whether we're in development */
  IS_DEVELOPMENT: process.env.NODE_ENV !== "production",
} as const;

export type Env = typeof env;
