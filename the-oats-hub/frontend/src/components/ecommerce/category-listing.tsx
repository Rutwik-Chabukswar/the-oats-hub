"use client";

import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ProductCard } from "@/components/ecommerce/product-card";
import { ProductGridSkeleton } from "@/components/ui/product-skeleton";
import { ErrorState, EmptyState } from "@/components/ui/error-state";
import { Button } from "@/components/ui/button";
import { NutritionSection } from "@/components/product/nutrition-section";
import { TrustSection } from "@/components/storefront/trust-section";
import { WellnessStorytelling } from "@/components/storefront/editorial-split";
import { IngredientTransparency } from "@/components/product/ingredient-transparency";
import { PRODUCTS, ProductSpread } from "@/components/storefront/cinematic-ingredient-showcase";

export function CategoryListing({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get("page")) || 1;

  // Fetch categories to find the ID mapping
  const { data: categories, isLoading: isCatsLoading } = useCategories();
  
  // Find the exact cinematic product data
  const cinematicProduct = PRODUCTS.find(p => p.slug === slug);

  const mockCategories: Record<string, any> = {
    "yogabar": { id: "yogabar", name: "Yoga Bar", slug: "yogabar", description: "Premium, clean-label fitness and nutrition bars from Yoga Bar." },
    "pintola": { id: "pintola", name: "Pintola", slug: "pintola", description: "All-natural, high-protein peanut butters from Pintola." },
    "organic-cosmos": { id: "organic-cosmos", name: "Organic Cosmos", slug: "organic-cosmos", description: "100% certified organic grains and wellness essentials." }
  };

  const realCategory = categories?.find((c) => c.slug === slug);
  const category = realCategory || mockCategories[slug];

  // Try to use the cinematic name (e.g. "Yoga Bar" with space) to maximize search matches
  const searchTerm = !realCategory && (cinematicProduct?.name || category?.name);

  const { data, isLoading, error } = useProducts({ 
    page, 
    per_page: 12,
    category_id: realCategory?.id,
    search: searchTerm,
    active_only: true
  });

  // Suspend fetching products until category resolves
  const isReady = !isCatsLoading && !!category;

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  if (isCatsLoading) {
    return <div className="container mx-auto px-4 py-8"><ProductGridSkeleton count={8} /></div>;
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorState title="Category Not Found" message={`We couldn't find a category matching "${slug}".`} />
      </div>
    );
  }

  return (
    <>
      {cinematicProduct ? (
        <div className="bg-brand-black overflow-hidden -mt-8 pt-8">
          <ProductSpread product={cinematicProduct} index={0} reverse={false} />
        </div>
      ) : (
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="mb-8 p-8 rounded-2xl bg-brand-black text-brand-white border border-border/50 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-brand-gold">{category.name}</h1>
            {category.description && (
              <p className="mt-2 text-brand-gray-light max-w-2xl mx-auto">{category.description}</p>
            )}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6 py-8 pb-16">

        {!isReady || isLoading ? (
          <ProductGridSkeleton count={12} />
        ) : error || !data?.success ? (
          <ErrorState message="Failed to load products. Please try again." />
        ) : data.data.length === 0 ? (
          <EmptyState 
            title="No products yet" 
            message="We're currently restocking this category. Check back later!" 
          />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {data.total_pages > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                <Button 
                  variant="outline" 
                  disabled={page <= 1}
                  onClick={() => updateFilters("page", String(page - 1))}
                >
                  Previous
                </Button>
                <div className="flex items-center px-4 font-medium text-sm">
                  Page {page} of {data.total_pages}
                </div>
                <Button 
                  variant="outline" 
                  disabled={page >= data.total_pages}
                  onClick={() => updateFilters("page", String(page + 1))}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Rich Category Storytelling & Reviews (inherited from PDP requirements) */}
      <WellnessStorytelling />
      <IngredientTransparency />
      <NutritionSection category={category.name} />
      <TrustSection />
    </>
  );
}
