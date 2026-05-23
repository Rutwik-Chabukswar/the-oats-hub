"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { Package, User, MapPin, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/account/orders", label: "My Orders", icon: Package },
  { href: "/account/profile", label: "Profile", icon: User },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  // Basic protection (better handled in middleware but good for UX)
  if (!user && typeof window !== 'undefined') {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex-1 bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        <h1 className="text-3xl font-bold tracking-tight mb-8">My Account</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <nav className="md:w-64 flex-shrink-0 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-brand-gold/10 text-brand-gold" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={() => logout()}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors mt-4"
            >
              <LogOut className="h-5 w-5" />
              Log Out
            </button>
          </nav>

          {/* Main Content Area */}
          <main className="flex-1 bg-white dark:bg-black rounded-2xl border border-border p-6 shadow-sm min-h-[500px]">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
