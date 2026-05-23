/**
 * API Service Factory — Creates typed CRUD service functions for any entity.
 *
 * CANONICAL PATTERN for entity-specific API services.
 * Each entity gets a service created via this factory.
 *
 * Usage:
 *   // services/product-service.ts
 *   import { createApiService } from "@/services/create-api-service";
 *   import type { Product } from "@/types";
 *
 *   export const productService = createApiService<Product>("products");
 *
 *   // Then in components:
 *   const { data } = await productService.getAll();
 *   const { data } = await productService.getById("uuid");
 */

import { apiClient } from "@/services/api-client";


interface ServiceOptions {
  token?: string;
}

/**
 * Factory that generates typed CRUD API service functions for a given resource.
 */
export function createApiService<T>(resource: string) {
  const basePath = `/${resource}`;

  return {
    /** GET /resource — List all with pagination */
    getAll: (
      params?: { page?: number; per_page?: number; search?: string },
      options?: ServiceOptions
    ) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set("page", String(params.page));
      if (params?.per_page)
        searchParams.set("per_page", String(params.per_page));
      if (params?.search) searchParams.set("search", params.search);

      const query = searchParams.toString();
      const endpoint = query ? `${basePath}?${query}` : basePath;
      return apiClient.get<T[]>(endpoint, options);
    },

    /** GET /resource/:id — Get single by ID */
    getById: (id: string, options?: ServiceOptions) =>
      apiClient.get<T>(`${basePath}/${id}`, options),

    /** POST /resource — Create new */
    create: (data: Partial<T>, options?: ServiceOptions) =>
      apiClient.post<T>(basePath, data, options),

    /** PATCH /resource/:id — Update existing */
    update: (id: string, data: Partial<T>, options?: ServiceOptions) =>
      apiClient.patch<T>(`${basePath}/${id}`, data, options),

    /** DELETE /resource/:id — Soft delete */
    delete: (id: string, options?: ServiceOptions) =>
      apiClient.delete<void>(`${basePath}/${id}`, options),
  };
}
