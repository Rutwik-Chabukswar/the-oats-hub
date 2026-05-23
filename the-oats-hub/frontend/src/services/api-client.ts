/**
 * API Client — Centralized HTTP client for backend communication.
 *
 * CANONICAL SOURCE: All types imported from @/types.
 * CANONICAL CONFIG: API base URL imported from @/constants.
 *
 * This is the ONLY file that makes HTTP requests to the backend.
 * All feature services must use apiClient methods, never raw fetch.
 */

import type { ApiResponse } from "@/types";
import { API_CONFIG } from "@/constants";

/**
 * Custom API error class with structured error data.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly errors: string[];

  constructor(message: string, status: number, errors: string[] = []) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

type RequestOptions = {
  headers?: Record<string, string>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  /** JWT token for authenticated requests */
  token?: string;
};

/**
 * Internal request handler — all apiClient methods delegate here.
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit & RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { token, ...fetchOptions } = options;
  const url = `${API_CONFIG.baseUrl}${endpoint}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((fetchOptions.headers as Record<string, string>) || {}),
  };

  // Attach auth token if provided
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      data.message || "Request failed",
      response.status,
      data.errors || []
    );
  }

  return data as ApiResponse<T>;
}

/**
 * Typed API client — the canonical way to communicate with the backend.
 *
 * @example
 * // GET request
 * const { data } = await apiClient.get<Product[]>("/products");
 *
 * // POST request with auth
 * const { data } = await apiClient.post<Order>("/orders", orderData, { token });
 */
export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { method: "GET", ...options }),

  post: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    apiRequest<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    }),

  patch: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    apiRequest<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
      ...options,
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { method: "DELETE", ...options }),
};
