import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/category.service";

export const useCategories = (activeOnly: boolean = true) => {
  return useQuery({
    queryKey: ["categories", "list", { activeOnly }],
    queryFn: () => categoryService.getCategories(activeOnly),
  });
};
