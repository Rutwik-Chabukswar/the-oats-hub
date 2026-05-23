import { apiClient } from "@/lib/api-client";
import { ApiResponse, PaginatedResponse, Product } from "@/types";

export interface GetProductsParams {
  page?: number;
  per_page?: number;
  category_id?: string;
  featured?: boolean;
  active_only?: boolean;
  search?: string;
}

export const productService = {
  getProducts: async (params?: GetProductsParams): Promise<PaginatedResponse<Product>> => {
    const res = await apiClient.get<PaginatedResponse<Product>>("/products", { params });
    return res.data;
  },

  getProductBySlug: async (slug: string): Promise<Product> => {
    const res = await apiClient.get<ApiResponse<Product>>(`/products/${slug}`);
    return res.data.data;
  },
};
