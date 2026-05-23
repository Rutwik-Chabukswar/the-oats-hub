import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentService, PaymentVerificationData } from "@/services/payment.service";
import { queryKeys } from "@/lib/query-keys";
import { parseApiError } from "@/lib/error-utils";

export const useVerifyPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PaymentVerificationData) => paymentService.verifyPayment(data),
    onSuccess: () => {
      // Refresh order list if user navigates to history
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all() });
    },
    onError: (error) => {
      const parsedError = parseApiError(error);
      console.error("Payment verification failed:", parsedError.message);
    }
  });
};
