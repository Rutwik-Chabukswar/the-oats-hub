"use client";

import { useProductBySlug } from "@/hooks/useProducts";
import { ErrorState } from "../ui/error-state";
import { ProductGallery } from "../product/product-gallery";
import { ProductInfo } from "../product/product-info";
import { StickyMobileCTA } from "../product/sticky-mobile-cta";
import { NutritionSection } from "../product/nutrition-section";
import { ProductFAQ } from "../product/product-faq";
import { RecommendedProducts } from "../product/recommended-products";
import { TrustSection } from "../storefront/trust-section";
import { WellnessStorytelling } from "../storefront/editorial-split";
import { IngredientTransparency } from "../product/ingredient-transparency";

interface ProductDetailProps {
  slug: string;
}

export function ProductDetail({ slug }: ProductDetailProps) {
  const { data: product, isLoading, error } = useProductBySlug(slug);

  if (isLoading) {
    return null; // Handled by suspense fallback in parent
  }

  if (error || !product) {
    return (
      <div className="pt-24 pb-32">
        <ErrorState message="Product not found. It may have been removed or is currently unavailable." />
      </div>
    );
  }

  // Pre-select variant for the sticky CTA
  const selectedVariant = product.variants && product.variants.length > 0 ? product.variants[0] : null;

  return (
    <>
      {/* 1 & 2. Main Product Hero Area */}
      <section className="bg-background pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Gallery */}
            <div className="w-full">
              <div className="md:sticky md:top-24">
                <ProductGallery images={product.images || []} productName={product.name} />
              </div>
            </div>

            {/* Right: Info & Purchase */}
            <div className="w-full">
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Mobile Bar (Visible only on mobile after scrolling past hero) */}
      <StickyMobileCTA product={product} selectedVariant={selectedVariant} />

      {/* 3. Storytelling & Trust (Reusing Storefront Components) */}
      <WellnessStorytelling />

      {/* 3.5. Ingredient Transparency Diagram */}
      <IngredientTransparency />

      {/* 4. Nutrition & Ingredients */}
      <NutritionSection category={product.category} />

      {/* 5. Trust & Social Proof (Reviews abstraction) */}
      <TrustSection />

      {/* 6. FAQ Accordions */}
      <ProductFAQ />

      {/* 7. Recommended Cross-Sells */}
      <RecommendedProducts currentProductId={product.id} />
    </>
  );
}
