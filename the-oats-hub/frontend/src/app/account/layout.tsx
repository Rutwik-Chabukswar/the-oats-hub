"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { AccountShell } from "@/components/account/account-shell";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex-1 bg-background flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-gold border-t-transparent"></div>
      </div>
    );
  }

  // Basic protection
  if (!user && typeof window !== 'undefined') {
    router.push("/login");
    return null;
  }

  return <AccountShell>{children}</AccountShell>;
}
