"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { Package, User, MapPin, LogOut, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { href: "/account", label: "Dashboard", icon: Home, exact: true },
  { href: "/account/orders", label: "Order History", icon: Package },
  { href: "/account/profile", label: "Profile", icon: User },
  { href: "/account/addresses", label: "Address Book", icon: MapPin },
];

export function AccountShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="flex-1 bg-background relative selection:bg-brand-gold/20">
      {/* Subtle decorative background gradient */}
      <div className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b from-brand-black/5 to-transparent dark:from-brand-white/5 pointer-events-none -z-10" />
      
      <div className="container mx-auto px-4 md:px-6 py-6 md:py-12 max-w-7xl">
        <h1 className="text-3xl md:text-4xl font-serif tracking-tight mb-8 hidden md:block">Your Account</h1>
        
        {/* Mobile Navigation Tabs */}
        <div className="md:hidden overflow-x-auto pb-4 mb-6 -mx-4 px-4 scrollbar-none">
          <nav className="flex gap-2">
            {navItems.map((item) => {
              const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href) && item.href !== "/account";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-medium transition-all",
                    isActive 
                      ? "bg-brand-black text-brand-white dark:bg-brand-white dark:text-brand-black shadow-premium" 
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block md:col-span-3 lg:col-span-3">
            <div className="sticky top-24 space-y-8">
              <nav className="space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href) && item.href !== "/account";
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group overflow-hidden",
                        isActive 
                          ? "text-brand-black dark:text-brand-white bg-muted/50 font-semibold" 
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                      )}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="sidebar-active"
                          className="absolute left-0 w-1 inset-y-2 bg-brand-gold rounded-r-full"
                          initial={false}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <Icon className={cn("h-5 w-5", isActive ? "text-brand-gold" : "opacity-70 group-hover:opacity-100 transition-opacity")} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              
              <div className="px-4">
                <button
                  onClick={() => logout()}
                  className="w-full flex items-center gap-3 py-3 text-sm font-medium text-muted-foreground hover:text-destructive transition-colors group"
                >
                  <LogOut className="h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                  Sign Out
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="md:col-span-9 lg:col-span-9 min-h-[500px]">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card md:border border-border/50 md:rounded-3xl md:p-8 lg:p-10 md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:md:shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
