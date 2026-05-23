"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Redirect to login if unauthenticated
        router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
      } else if (requireAdmin && user.role !== "admin") {
        // Redirect to unauthorized or home if non-admin tries to access admin route
        router.push("/unauthorized");
      }
    }
  }, [user, isLoading, requireAdmin, router, pathname]);

  // While checking auth state, we can return a loading skeleton or null
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // If we reach here, we are either authenticated (and authorized) or the redirect is taking place
  if (!user || (requireAdmin && user.role !== "admin")) {
    return null; // Prevents flashing of protected content during redirect
  }

  return <>{children}</>;
}
