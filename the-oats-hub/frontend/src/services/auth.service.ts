import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types";
import { User } from "@/types";
import { LoginInput, RegisterInput } from "@/lib/validations";

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export const authService = {
  login: async (data: LoginInput): Promise<TokenResponse> => {
    const res = await apiClient.post<ApiResponse<TokenResponse>>("/auth/login", data);
    return res.data.data;
  },

  register: async (data: RegisterInput): Promise<User> => {
    const res = await apiClient.post<ApiResponse<User>>("/auth/register", data);
    return res.data.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const res = await apiClient.get<ApiResponse<User>>("/auth/me");
    return res.data.data;
  },
};
