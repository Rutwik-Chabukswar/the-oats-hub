import { apiClient } from "@/lib/api-client";
import { PaginatedResponse } from "@/types";

export interface AdminOrderSummary {
  id: string;
  order_number: string;
  payment_status: string;
  fulfillment_status: string;
  total_in_paise: number;
  created_at: string;
  user_email: string | null;
  customer_name: string | null;
}

export interface AdminCustomer {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  is_active: boolean;
  is_superuser: boolean;
}

export const adminService = {
  getOrders: async (page = 1, perPage = 20, status?: string): Promise<PaginatedResponse<AdminOrderSummary>> => {
    const params = new URLSearchParams({ page: String(page), per_page: String(perPage) });
    if (status && status !== "all") params.append("status", status);
    
    const res = await apiClient.get<PaginatedResponse<AdminOrderSummary>>(`/admin/orders?${params.toString()}`);
    return res.data;
  },

  updateFulfillment: async (orderId: string, status: string): Promise<void> => {
    await apiClient.patch(`/admin/orders/${orderId}/fulfillment`, { fulfillment_status: status });
  },

  updateStock: async (variantId: string, stockQuantity: number): Promise<void> => {
    await apiClient.patch(`/admin/variants/${variantId}/stock`, { stock_quantity: stockQuantity });
  },

  getCustomers: async (page = 1, perPage = 20, search?: string): Promise<PaginatedResponse<AdminCustomer>> => {
    const params = new URLSearchParams({ page: String(page), per_page: String(perPage) });
    if (search) params.append("search", search);
    
    const res = await apiClient.get<PaginatedResponse<AdminCustomer>>(`/admin/customers?${params.toString()}`);
    return res.data;
  }
};
