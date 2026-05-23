"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types";
import { authService } from "@/services/auth.service";
import { tokenUtils } from "@/lib/token";
import { LoginInput, RegisterInput } from "@/lib/validations";
import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (data: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = tokenUtils.getAccessToken();
      if (token) {
        try {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        } catch (error) {
          tokenUtils.clearTokens();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (data: LoginInput) => {
    const tokens = await authService.login(data);
    tokenUtils.setTokens(tokens.access_token, tokens.refresh_token);
    const userData = await authService.getCurrentUser();
    setUser(userData);
    queryClient.invalidateQueries({ queryKey: queryKeys.auth.user() });
  };

  const register = async (data: RegisterInput) => {
    // Backend returns user on register. Usually we need to login right after or return tokens.
    // Assuming register returns user but not tokens, we might need to manually login or redirect.
    await authService.register(data);
    await login({ email: data.email, password: data.password });
  };

  const logout = () => {
    tokenUtils.clearTokens();
    setUser(null);
    queryClient.clear();
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
