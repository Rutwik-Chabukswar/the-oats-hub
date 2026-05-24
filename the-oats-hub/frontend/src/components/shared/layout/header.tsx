"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, Menu, X } from "lucide-react";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Shop All", href: "/products" },
    { name: "Yogabar", href: "/categories/yogabar" },
    { name: "Pintola", href: "/categories/pintola" },
    { name: "Organic Cosmos", href: "/categories/organic-cosmos" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-[#0A0A0A]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0A0A0A]/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto relative z-50">
          
          {/* Mobile Hamburger Toggle */}
          <button 
            className="md:hidden p-2 -ml-2 text-brand-white focus:outline-none transition-transform active:scale-95"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 z-50">
            <span className="text-xl font-extrabold tracking-tight text-brand-white">
              THE OATS HUB
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium tracking-wide text-brand-white/80 hover:text-brand-gold transition-colors">
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4 relative z-50">
            <Link href="/profile" className="hidden sm:inline-flex items-center justify-center rounded-full text-sm font-medium hover:bg-white/5 text-brand-white h-10 w-10 transition-colors">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
            
            <CartDrawer />
          </div>
          
        </div>
      </header>

      {/* Full Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] pt-28 px-6 md:hidden flex flex-col h-[100dvh]"
          >
            <nav className="flex flex-col gap-10 mt-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.1, duration: 0.4, ease: "easeOut" }}
                >
                  <Link 
                    href={link.href} 
                    className="font-serif text-5xl tracking-tight text-brand-white hover:text-brand-gold transition-colors block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-auto pb-safe border-t border-brand-white/10 pt-8 mb-8"
            >
              <Link href="/profile" className="flex items-center gap-4 text-brand-white/70 hover:text-brand-gold transition-colors">
                <User className="h-6 w-6" />
                <span className="text-xl font-medium tracking-wide">My Account</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
