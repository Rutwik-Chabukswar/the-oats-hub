import { apiClient } from "@/lib/api-client";
import { ApiResponse, ProductVariant } from "@/types";

export interface CartTotals {
  subtotal: number;
  discount: number;
  total: number;
}

export interface CartItemResponse {
  id: string;
  cart_id: string;
  variant_id: string;
  quantity: number;
  variant: ProductVariant;
}

export interface CartData {
  id: string;
  user_id?: string;
  session_id?: string;
  items: CartItemResponse[];
  totals: CartTotals;
}

export const cartService = {
  getCart: async (): Promise<CartData> => {
    const res = await apiClient.get<ApiResponse<CartData>>("/cart");
    return res.data.data;
  },

  addItem: async (variant_id: string, quantity: number = 1): Promise<CartData> => {
    const res = await apiClient.post<ApiResponse<CartData>>("/cart/items", { variant_id, quantity });
    return res.data.data;
  },

  updateQuantity: async (item_id: string, quantity: number): Promise<CartData> => {
    const res = await apiClient.patch<ApiResponse<CartData>>(`/cart/items/${item_id}`, { quantity });
    return res.data.data;
  },

  removeItem: async (item_id: string): Promise<CartData> => {
    const res = await apiClient.delete<ApiResponse<CartData>>(`/cart/items/${item_id}`);
    return res.data.data;
  },

  clearCart: async (): Promise<CartData> => {
    const res = await apiClient.delete<ApiResponse<CartData>>("/cart/clear");
    return res.data.data;
  },
};
