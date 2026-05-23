import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";
import { parseApiError } from "@/lib/error-utils";

export const useAdminOrders = (page: number, status: string) => {
  return useQuery({
    queryKey: ["admin", "orders", page, status],
    queryFn: () => adminService.getOrders(page, 20, status),
  });
};

export const useAdminCustomers = (page: number, search: string) => {
  return useQuery({
    queryKey: ["admin", "customers", page, search],
    queryFn: () => adminService.getCustomers(page, 20, search),
  });
};

export const useUpdateFulfillment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string, status: string }) => 
      adminService.updateFulfillment(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
    },
    onError: (err) => {
      console.error(parseApiError(err).message);
    }
  });
};

export const useUpdateStock = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ variantId, stock }: { variantId: string, stock: number }) => 
      adminService.updateStock(variantId, stock),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      // We don't have a specific admin products query key yet, but we'd invalidate that too.
    },
    onError: (err) => {
      console.error(parseApiError(err).message);
    }
  });
};
