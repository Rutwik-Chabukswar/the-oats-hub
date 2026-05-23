"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { CartDrawer } from "@/components/cart/cart-drawer";


export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight">
            THE OATS HUB
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          <Link href="/products" className="text-sm font-medium text-muted-foreground hover:text-brand-gold transition-colors">
            Shop All
          </Link>
          <Link href="/categories/peanut-butter" className="text-sm font-medium text-muted-foreground hover:text-brand-gold transition-colors">
            Peanut Butter
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Link href="/profile" className="hidden sm:inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-10 w-10">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Link>
          
          <CartDrawer />
        </div>
        
      </div>
    </header>
  );
}
