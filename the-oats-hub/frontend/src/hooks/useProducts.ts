import { useQuery } from "@tanstack/react-query";
import { productService, GetProductsParams } from "@/services/product.service";
import { queryKeys } from "@/lib/query-keys";

export const useProducts = (params?: GetProductsParams) => {
  return useQuery({
    queryKey: [...queryKeys.products.all(), params],
    queryFn: () => productService.getProducts(params),
  });
};

export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.products.detail(slug),
    queryFn: () => productService.getProductBySlug(slug),
    enabled: !!slug,
  });
};
