"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ecommerce/product-card";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal";

export function ProductShowcase() {
  const { data, isLoading } = useProducts({ featured: true, per_page: 4 });

  const products = data?.data || [];

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container px-6 md:px-8 mx-auto max-w-7xl">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
            <div>
              <span className="text-xs tracking-[0.25em] uppercase text-brand-gold/70 font-medium">
                Curated Selection
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                Featured Products
              </h2>
              <p className="mt-3 text-muted-foreground max-w-lg text-base md:text-lg">
                Handpicked essentials for your premium nutrition routine.
              </p>
            </div>
            <Link
              href="/products"
              className="group hidden md:inline-flex items-center gap-2 text-sm font-medium text-brand-gold hover:text-brand-gold-light transition-colors"
            >
              View All
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-muted rounded-xl animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Products coming soon.</p>
          </div>
        )}

        {/* Mobile CTA */}
        <div className="mt-10 md:hidden">
          <Link
            href="/products"
            className="group flex items-center justify-center gap-2 w-full h-14 border border-border text-foreground font-medium rounded-full transition-all hover:border-brand-gold/40 hover:text-brand-gold"
          >
            View All Products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
