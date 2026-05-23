import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cartService } from "@/services/cart.service";
import { queryKeys } from "@/lib/query-keys";
import { parseApiError } from "@/lib/error-utils";
import { useAuth } from "@/providers/AuthProvider";

export const useCart = () => {
  const { user, isLoading } = useAuth();
  
  return useQuery({
    queryKey: queryKeys.cart.current(),
    queryFn: cartService.getCart,
    // Only fetch cart if auth is finished loading and a user exists
    enabled: !isLoading && !!user,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ variant_id, quantity }: { variant_id: string; quantity: number }) => 
      cartService.addItem(variant_id, quantity),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.cart.current(), data);
    },
    onError: (error) => {
      const parsedError = parseApiError(error);
      console.error("Failed to add to cart:", parsedError.message);
      // Can integrate with toast here
    }
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ item_id, quantity }: { item_id: string; quantity: number }) => 
      cartService.updateQuantity(item_id, quantity),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.cart.current(), data);
    },
  });
};

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item_id: string) => cartService.removeItem(item_id),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.cart.current(), data);
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cartService.clearCart(),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.cart.current(), data);
    },
  });
};
