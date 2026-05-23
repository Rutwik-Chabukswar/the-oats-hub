import axios from "axios";
import { ApiResponse } from "@/types";

export interface AppError {
  message: string;
  errors?: string[];
  status?: number;
}

export function parseApiError(error: unknown): AppError {
  if (axios.isAxiosError(error) && error.response) {
    const data = error.response.data as ApiResponse | undefined;
    return {
      message: data?.message || "An unexpected error occurred",
      errors: (data as any)?.errors || [],
      status: error.response.status,
    };
  }
  
  if (error instanceof Error) {
    return { message: error.message };
  }
  
  return { message: "An unknown error occurred" };
}
