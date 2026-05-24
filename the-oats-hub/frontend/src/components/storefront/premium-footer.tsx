"use client";

import Link from "next/link";
import { ScrollReveal } from "./scroll-reveal";
import { Globe, MessageCircle, Mail } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "All Products", href: "/products" },
    { label: "Rolled Oats", href: "/categories/rolled-oats" },
    { label: "Peanut Butter", href: "/categories/peanut-butter" },
    { label: "Superfoods", href: "/categories/superfoods" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Story", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  support: [
    { label: "Shipping Policy", href: "/policies/shipping" },
    { label: "Return Policy", href: "/policies/returns" },
    { label: "Privacy Policy", href: "/policies/privacy" },
    { label: "Terms of Service", href: "/policies/terms" },
  ],
};

export function PremiumFooter() {
  return (
    <footer className="bg-brand-black">
      <div className="container px-6 md:px-8 mx-auto max-w-7xl">
        {/* Main footer */}
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <ScrollReveal>
              <Link href="/" className="inline-block">
                <span className="text-xl font-extrabold tracking-tight text-brand-white">
                  THE OATS HUB
                </span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-brand-white/40 max-w-xs">
                Premium wellness nutrition, delivered to your door. Crafted with care, designed for your best mornings.
              </p>
              <div className="flex items-center gap-3 mt-6">
                <a href="#" className="h-10 w-10 rounded-full border border-brand-white/10 flex items-center justify-center text-brand-white/40 hover:text-brand-gold hover:border-brand-gold/30 transition-colors">
                  <Globe className="h-4 w-4" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full border border-brand-white/10 flex items-center justify-center text-brand-white/40 hover:text-brand-gold hover:border-brand-gold/30 transition-colors">
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a href="mailto:hello@theoatshub.com" className="h-10 w-10 rounded-full border border-brand-white/10 flex items-center justify-center text-brand-white/40 hover:text-brand-gold hover:border-brand-gold/30 transition-colors">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Link Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1}>
              <h4 className="text-xs tracking-[0.2em] uppercase text-brand-white/60 font-medium mb-4">
                Shop
              </h4>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="text-sm text-brand-white/40 hover:text-brand-gold transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <h4 className="text-xs tracking-[0.2em] uppercase text-brand-white/60 font-medium mb-4">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="text-sm text-brand-white/40 hover:text-brand-gold transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h4 className="text-xs tracking-[0.2em] uppercase text-brand-white/60 font-medium mb-4">
                Support
              </h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="text-sm text-brand-white/40 hover:text-brand-gold transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-brand-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-white/25">
            © {new Date().getFullYear()} The Oats Hub. All rights reserved.
          </p>
          <p className="text-xs text-brand-white/25">
            Premium Wellness Nutrition — Made in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
