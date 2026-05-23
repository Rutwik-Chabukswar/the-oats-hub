"use client";

import { useAuth } from "@/providers/AuthProvider";
import { Package, User, MapPin, ChevronRight, Clock } from "lucide-react";
import Link from "next/link";

export default function AccountDashboard() {
  const { user } = useAuth();
  
  const firstName = user?.full_name?.split(" ")[0] || "there";

  return (
    <div className="space-y-8 md:space-y-10">
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-serif tracking-tight">Welcome back, {firstName}.</h2>
        <p className="text-muted-foreground">Manage your premium nutrition orders and profile preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Link href="/account/orders" className="group p-5 md:p-6 bg-muted/30 rounded-2xl border border-border/50 hover:bg-muted/50 transition-colors">
          <div className="h-10 w-10 bg-brand-black/5 dark:bg-brand-white/5 rounded-full flex items-center justify-center text-foreground mb-4 group-hover:scale-110 transition-transform">
            <Package className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-lg mb-1 flex items-center justify-between">
            Orders <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </h3>
          <p className="text-sm text-muted-foreground">Track, return, or buy things again</p>
        </Link>

        <Link href="/account/profile" className="group p-5 md:p-6 bg-muted/30 rounded-2xl border border-border/50 hover:bg-muted/50 transition-colors">
          <div className="h-10 w-10 bg-brand-black/5 dark:bg-brand-white/5 rounded-full flex items-center justify-center text-foreground mb-4 group-hover:scale-110 transition-transform">
            <User className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-lg mb-1 flex items-center justify-between">
            Profile <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </h3>
          <p className="text-sm text-muted-foreground">Edit login, name, and mobile number</p>
        </Link>

        <Link href="/account/addresses" className="group p-5 md:p-6 bg-muted/30 rounded-2xl border border-border/50 hover:bg-muted/50 transition-colors">
          <div className="h-10 w-10 bg-brand-black/5 dark:bg-brand-white/5 rounded-full flex items-center justify-center text-foreground mb-4 group-hover:scale-110 transition-transform">
            <MapPin className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-lg mb-1 flex items-center justify-between">
            Addresses <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </h3>
          <p className="text-sm text-muted-foreground">Edit addresses for orders</p>
        </Link>
      </div>

      <div className="pt-6 border-t border-border/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-serif tracking-tight">Recent Activity</h3>
          <Link href="/account/orders" className="text-sm font-medium text-brand-gold hover:underline">
            View all
          </Link>
        </div>
        
        <div className="bg-muted/20 border border-border/50 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[200px]">
          <Clock className="h-10 w-10 text-muted-foreground/30 mb-3" />
          <h4 className="font-medium text-lg">No recent activity</h4>
          <p className="text-muted-foreground text-sm mt-1 max-w-[250px]">When you place an order, its status will appear here.</p>
          <Link href="/products" className="mt-5 text-sm font-semibold bg-brand-black text-brand-white dark:bg-brand-white dark:text-brand-black px-6 py-2.5 rounded-full shadow-premium">
            Explore Products
          </Link>
        </div>
      </div>
    </div>
  );
}
