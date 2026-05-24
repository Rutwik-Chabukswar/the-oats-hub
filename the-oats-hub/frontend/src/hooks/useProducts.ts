import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { productService, GetProductsParams } from "@/services/product.service";
import { queryKeys } from "@/lib/query-keys";

export const useProducts = (params?: GetProductsParams) => {
  return useQuery({
    queryKey: [...queryKeys.products.all(), params],
    queryFn: () => productService.getProducts(params),
  });
};

export const useInfiniteProducts = (params?: Omit<GetProductsParams, 'page'>) => {
  return useInfiniteQuery({
    queryKey: [...queryKeys.products.all(), "infinite", params],
    queryFn: ({ pageParam = 1 }) => productService.getProducts({ ...params, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
};

export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.products.detail(slug),
    queryFn: () => productService.getProductBySlug(slug),
    enabled: !!slug,
  });
};
