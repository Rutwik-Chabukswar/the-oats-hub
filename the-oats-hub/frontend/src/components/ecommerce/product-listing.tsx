"use client";

import React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ecommerce/product-card";
import { ProductGridSkeleton } from "@/components/ui/product-skeleton";
import { ErrorState, EmptyState } from "@/components/ui/error-state";
import { useCategories } from "@/hooks/useCategories";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export function ProductListing() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get("page")) || 1;
  const category_id = searchParams.get("category_id") || undefined;
  const search = searchParams.get("search") || undefined;

  const [searchValue, setSearchValue] = React.useState(search || "");

  React.useEffect(() => {
    setSearchValue(search || "");
  }, [search]);

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
    <div className="container relative z-10 px-6 md:px-12 mx-auto max-w-7xl py-16 md:py-24">
      {/* ── Editorial Header ── */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-24 gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-10 bg-brand-gold/50" />
            <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-brand-gold/70 font-medium">
              The Collection
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05] text-brand-white">
            Pure nutrition.<br />
            <span className="text-brand-white/40 italic">Zero compromises.</span>
          </h1>
          <p className="mt-8 text-brand-white/50 text-base md:text-lg max-w-lg font-light leading-relaxed pl-4 border-l border-brand-gold/20">
            Browse our premium selection of nutrition products, crafted in small batches for those who demand the best from their daily rituals.
          </p>
        </motion.div>

        {/* ── Search & Filter Controls ── */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto"
        >
          <Input 
            placeholder="Search collection..." 
            className="w-full sm:w-[240px] bg-[#0F0D0A] border-brand-white/[0.08] text-brand-white placeholder:text-brand-white/30 focus-visible:ring-1 focus-visible:ring-brand-gold/40 focus-visible:border-brand-gold/40 rounded-full h-12 px-6 shadow-none"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateFilters("search", searchValue);
              }
            }}
          />
          <Select 
            value={category_id || "all"} 
            onValueChange={(val) => updateFilters("category_id", val === "all" ? null : val)}
          >
            <SelectTrigger className="w-full sm:w-[200px] bg-[#0F0D0A] border-brand-white/[0.08] text-brand-white/80 focus:ring-1 focus:ring-brand-gold/40 rounded-full h-12 px-6 shadow-none">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1610] border-brand-white/[0.08] text-brand-white rounded-xl shadow-2xl">
              <SelectItem value="all" className="focus:bg-brand-gold/10 focus:text-brand-gold cursor-pointer">All Categories</SelectItem>
              {categories?.map((cat) => (
                <SelectItem key={cat.id} value={cat.id} className="focus:bg-brand-gold/10 focus:text-brand-gold cursor-pointer">
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>
      </div>

      {/* ── Product Grid ── */}
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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16">
            {data.data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* ── Pagination ── */}
          {data.total_pages > 1 && (
            <div className="mt-20 pt-10 border-t border-brand-white/[0.06] flex justify-between items-center max-w-md mx-auto">
              <button 
                disabled={page <= 1}
                onClick={() => updateFilters("page", String(page - 1))}
                className="text-xs tracking-[0.2em] uppercase text-brand-white/50 hover:text-brand-gold transition-colors disabled:opacity-30 disabled:hover:text-brand-white/50"
              >
                Previous
              </button>
              <div className="flex items-center px-4 font-serif italic text-brand-white/60 text-lg">
                {page} <span className="mx-2 not-italic text-sm text-brand-white/20">/</span> {data.total_pages}
              </div>
              <button 
                disabled={page >= data.total_pages}
                onClick={() => updateFilters("page", String(page + 1))}
                className="text-xs tracking-[0.2em] uppercase text-brand-white/50 hover:text-brand-gold transition-colors disabled:opacity-30 disabled:hover:text-brand-white/50"
              >
                Next
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
