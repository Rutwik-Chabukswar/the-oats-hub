"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ecommerce/product-card";
import { ProductGridSkeleton } from "@/components/ui/product-skeleton";
import { ErrorState, EmptyState } from "@/components/ui/error-state";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks/useCategories";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function ProductListing() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get("page")) || 1;
  const category_id = searchParams.get("category_id") || undefined;
  const search = searchParams.get("search") || undefined;

  const { data, isLoading, error } = useProducts({ 
    page, 
    per_page: 12,
    category_id,
    search,
    active_only: true
  });

  const { data: categories } = useCategories();

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Reset to page 1 on filter change
    if (key !== "page") {
      params.set("page", "1");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Our Products</h1>
          <p className="text-muted-foreground mt-1">Browse our premium selection of nutrition products.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Input 
            placeholder="Search products..." 
            className="w-full sm:w-[200px]"
            defaultValue={search || ""}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateFilters("search", e.currentTarget.value);
              }
            }}
          />
          <Select 
            value={category_id || "all"} 
            onValueChange={(val) => updateFilters("category_id", val === "all" ? null : val)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories?.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <ProductGridSkeleton count={12} />
      ) : error || !data?.success ? (
        <ErrorState message="Failed to load products. Please try again." />
      ) : data.data.length === 0 ? (
        <EmptyState 
          title="No products found" 
          message="Try adjusting your filters or search query." 
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
  );
}
