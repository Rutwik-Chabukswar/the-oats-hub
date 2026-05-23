import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types";

export interface PaymentVerificationData {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export const paymentService = {
  verifyPayment: async (data: PaymentVerificationData): Promise<boolean> => {
    const res = await apiClient.post<ApiResponse<null>>("/payment/verify", data);
    return res.data.success;
  },
};
