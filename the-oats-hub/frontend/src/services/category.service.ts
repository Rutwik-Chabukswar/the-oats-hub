import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const categoryService = {
  getCategories: async (activeOnly: boolean = true): Promise<Category[]> => {
    const res = await apiClient.get<ApiResponse<Category[]>>("/categories", {
      params: { active_only: activeOnly },
    });
    return res.data.data;
  },
};
