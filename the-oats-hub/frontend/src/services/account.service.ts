import { apiClient } from "@/lib/api-client";
import { ApiResponse, PaginatedResponse } from "@/types";

export interface OrderItem {
  id: string;
  variant_id: string;
  quantity: number;
  price_snapshot_in_paise: number;
  variant_name: string;
  product_name: string;
  image_url?: string;
}

export interface Address {
  id: string;
  full_name: string;
  phone: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
}

export interface Order {
  id: string;
  order_number: string;
  payment_status: string;
  fulfillment_status: string;
  total_in_paise: number;
  created_at: string;
  items: OrderItem[];
  shipping_address?: Address;
}

export const accountService = {
  getOrders: async (page = 1, perPage = 10): Promise<PaginatedResponse<Order>> => {
    const res = await apiClient.get<PaginatedResponse<Order>>(`/orders?page=${page}&per_page=${perPage}`);
    return res.data;
  },

  getOrderById: async (id: string): Promise<Order> => {
    const res = await apiClient.get<ApiResponse<Order>>(`/orders/${id}`);
    return res.data.data;
  },

  getAddresses: async (): Promise<Address[]> => {
    const res = await apiClient.get<ApiResponse<Address[]>>("/addresses");
    return res.data.data;
  },

  createAddress: async (data: Partial<Address>): Promise<Address> => {
    const res = await apiClient.post<ApiResponse<Address>>("/addresses", data);
    return res.data.data;
  },

  updateProfile: async (data: { full_name?: string, email?: string }): Promise<any> => {
    const res = await apiClient.patch<ApiResponse<any>>("/auth/me", data);
    return res.data.data;
  }
};
