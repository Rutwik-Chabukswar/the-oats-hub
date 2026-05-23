import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types";

export interface OrderSummaryItem {
  variant_id: string;
  name: string;
  quantity: number;
  price_per_unit: number;
  subtotal: number;
}

export interface OrderSummary {
  items: OrderSummaryItem[];
  subtotal: number;
  delivery_fee: number;
  total: number;
}

export interface ShippingAddressData {
  full_name: string;
  phone: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  pincode: string;
  save_as_default?: boolean;
}

export interface CheckoutData {
  shipping_address: ShippingAddressData;
}

export interface OrderResponse {
  order_id: string;
  order_number: string;
  total_amount: number;
  payment_status: string;
}

export const checkoutService = {
  getSummary: async (): Promise<OrderSummary> => {
    const res = await apiClient.get<ApiResponse<OrderSummary>>("/checkout/summary");
    return res.data.data;
  },

  createOrder: async (data: CheckoutData): Promise<OrderResponse> => {
    const res = await apiClient.post<ApiResponse<OrderResponse>>("/checkout/create-order", data);
    return res.data.data;
  },
};
