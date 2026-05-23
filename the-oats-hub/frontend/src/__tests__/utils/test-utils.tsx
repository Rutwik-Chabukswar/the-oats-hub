import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * Creates a fresh QueryClient for each test to prevent state bleeding between tests.
 */
export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Turn off retries for faster tests
        gcTime: 0,
      },
    },
  });

/**
 * Wrapper for testing React hooks that use React Query.
 */
export function TestQueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

/**
 * Mock Auth Context wrapper (can be expanded based on testing needs)
 */
export const mockUser = {
  id: "test-id",
  email: "test@example.com",
  full_name: "Test User",
  role: "customer",
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};
