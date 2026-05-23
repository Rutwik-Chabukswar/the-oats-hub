import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { checkoutService, CheckoutData } from "@/services/checkout.service";
import { queryKeys } from "@/lib/query-keys";
import { parseApiError } from "@/lib/error-utils";

export const useCheckoutSummary = () => {
  return useQuery({
    queryKey: queryKeys.cart.summary(),
    queryFn: checkoutService.getSummary,
    retry: false, // If it fails, usually means empty cart or invalid state
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CheckoutData) => checkoutService.createOrder(data),
    onSuccess: () => {
      // Clear cart cache since the backend clears the cart upon successful order
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
    },
    onError: (error) => {
      const parsedError = parseApiError(error);
      console.error("Order creation failed:", parsedError.message);
    }
  });
};
