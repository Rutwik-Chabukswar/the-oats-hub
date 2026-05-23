"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { 
  LayoutDashboard, 
  PackageSearch, 
  ShoppingCart, 
  Users, 
  Boxes,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/inventory", label: "Inventory", icon: Boxes },
  { href: "/admin/products", label: "Products", icon: PackageSearch },
  { href: "/admin/customers", label: "Customers", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center">Loading Operations...</div>;
  }

  // Admin Guard
  if (!user || user.role !== "admin") {
    if (typeof window !== 'undefined') {
      router.push("/login");
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-black text-white p-4 flex flex-col shrink-0 md:min-h-screen sticky top-0">
        <div className="flex items-center gap-2 mb-8 px-4 py-2">
          <div className="h-8 w-8 bg-brand-gold rounded flex items-center justify-center text-black font-bold">O</div>
          <span className="font-bold tracking-tight text-lg">Hub Admin</span>
        </div>

        <nav className="flex-1 space-y-1">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-brand-gold text-black" 
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => logout()}
          className="mt-auto flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-auto w-full">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
