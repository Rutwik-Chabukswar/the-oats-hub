"use client";

import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ecommerce/product-card";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/storefront/scroll-reveal";

interface RecommendedProductsProps {
  currentProductId: string;
}

export function RecommendedProducts({ currentProductId }: RecommendedProductsProps) {
  // We'll fetch featured products and filter out the current one
  const { data, isLoading } = useProducts({ per_page: 5 });

  if (isLoading) return null;
  
  const products = data?.data?.filter(p => p.id !== currentProductId).slice(0, 4) || [];
  
  if (products.length === 0) return null;

  return (
    <section className="py-24 bg-brand-gray/5 border-t border-border/50">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Complete Your Routine
            </h2>
            <p className="mt-2 text-muted-foreground">
              Pairs perfectly with your selection.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
