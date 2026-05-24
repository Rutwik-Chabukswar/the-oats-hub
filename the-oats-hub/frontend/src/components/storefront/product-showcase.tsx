"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ecommerce/product-card";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal";
import { CinematicHeader } from "@/components/ui/cinematic-header";

export function ProductShowcase() {
  const { data, isLoading } = useProducts({ featured: true, per_page: 4 });

  const products = data?.data || [];

  return (
    <section className="relative py-24 md:py-32 bg-brand-black overflow-hidden">
      {/* Atmospheric Background Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,_rgba(201,168,76,0.03)_0%,_transparent_70%)]" />

      <div className="container relative z-10 px-6 md:px-12 mx-auto max-w-7xl">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-10 bg-brand-gold/50" />
                <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-brand-gold/70 font-medium">
                  Curated Selection
                </span>
              </div>
              <CinematicHeader className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1] text-brand-white">
                Curated <span className="italic text-brand-white/40">Excellence.</span>
              </CinematicHeader>
            </div>
            
            <Link
              href="/products"
              className="group hidden md:inline-flex items-center gap-4 text-[11px] md:text-xs tracking-[0.2em] uppercase text-brand-white/40 hover:text-brand-gold transition-colors duration-500 font-medium pb-2"
            >
              <span>Explore All</span>
              <span className="block h-[1px] w-8 bg-current transition-all duration-500 group-hover:w-12" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-brand-white/[0.02] rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="text-center py-32 border border-brand-white/[0.05] rounded-2xl">
            <p className="text-brand-white/40 font-light tracking-wide">The collection is currently being updated.</p>
          </div>
        )}

        {/* Mobile CTA */}
        <div className="mt-16 md:hidden flex justify-center">
          <Link
            href="/products"
            className="group inline-flex items-center gap-4 h-13 px-8 bg-brand-gold/10 text-brand-gold font-medium text-xs tracking-[0.15em] uppercase rounded-full transition-all duration-300 hover:bg-brand-gold hover:text-brand-black"
          >
            <span>Explore All</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
