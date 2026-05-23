import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { accountService } from "@/services/account.service";
import { queryKeys } from "@/lib/query-keys";
import { parseApiError } from "@/lib/error-utils";

export const useOrders = (page = 1) => {
  return useQuery({
    queryKey: [...queryKeys.orders.all(), { page }],
    queryFn: () => accountService.getOrders(page),
  });
};

export const useOrderDetail = (id: string) => {
  return useQuery({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => accountService.getOrderById(id),
    enabled: !!id,
  });
};

export const useAddresses = () => {
  return useQuery({
    queryKey: queryKeys.addresses.all(),
    queryFn: accountService.getAddresses,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: accountService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.user() });
    },
    onError: (error) => {
      const parsedError = parseApiError(error);
      console.error("Profile update failed:", parsedError.message);
    }
  });
};
