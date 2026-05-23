"use client";

import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./product-card";
import { ProductGridSkeleton } from "../ui/product-skeleton";
import { ErrorState } from "../ui/error-state";


export function FeaturedProducts() {
  const { data, isLoading, error } = useProducts({ featured: true, per_page: 4 });

  if (isLoading) {
    return <ProductGridSkeleton count={4} />;
  }

  if (error || !data?.success) {
    return <ErrorState message="Could not load featured products." />;
  }

  const products = data.data;

  if (products.length === 0) {
    return null; // Don't show the section if no featured products
  }

  return (
    <section className="py-16 bg-background">
      <div className="container px-4 mx-auto md:px-6">
        <div className="flex flex-col items-center justify-between mb-10 space-y-4 md:flex-row md:space-y-0">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Featured Collections</h2>
            <p className="mt-2 text-lg text-muted-foreground">Handpicked premium nutrition for your daily goals.</p>
          </div>
          <Link href="/products" className="hidden md:inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            View All Products
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link href="/products" className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
