"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useInfiniteProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ecommerce/product-card";
import { ProductGridSkeleton } from "@/components/ui/product-skeleton";
import { ErrorState, EmptyState } from "@/components/ui/error-state";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export function ProductListing() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const category_id = searchParams.get("category_id") || undefined;
  const search = searchParams.get("search") || undefined;

  const [searchValue, setSearchValue] = React.useState(search || "");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isRestored = useRef(false);

  React.useEffect(() => {
    setSearchValue(search || "");
  }, [search]);

  // Define our new brand categories
  const mockCategories = [
    { id: "yogabar", name: "Yoga Bar" },
    { id: "pintola", name: "Pintola" },
    { id: "organic-cosmos", name: "Organic Cosmos" },
  ];

  const isMockCategory = mockCategories.find((c) => c.id === category_id);
  
  // If the selected category is a mock brand, we search by text instead of passing an invalid category UUID
  const apiSearch = isMockCategory ? isMockCategory.name : search;
  const apiCategoryId = isMockCategory ? undefined : category_id;

  const { 
    data, 
    isLoading, 
    error, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useInfiniteProducts({ 
    per_page: 12,
    category_id: apiCategoryId,
    search: apiSearch,
    active_only: true
  });

  // Override the backend categories with our brand categories for the dropdown
  const categories = mockCategories;

  // Scroll memory logic
  useEffect(() => {
    const scrollKey = `scroll_pos_${pathname}_${searchParams.toString()}`;

    const handleScroll = () => {
      sessionStorage.setItem(scrollKey, window.scrollY.toString());
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, searchParams]);

  // Restore scroll position once data is populated
  useEffect(() => {
    if (!isLoading && data?.pages && !isRestored.current) {
      const scrollKey = `scroll_pos_${pathname}_${searchParams.toString()}`;
      const savedPosition = sessionStorage.getItem(scrollKey);
      if (savedPosition) {
        // Use a short timeout to ensure DOM paints the infinite query results
        setTimeout(() => {
          window.scrollTo({ top: parseInt(savedPosition, 10), behavior: "instant" });
          isRestored.current = true;
        }, 100);
      } else {
        isRestored.current = true;
      }
    }
  }, [isLoading, data, pathname, searchParams]);

  // Intersection Observer for Infinite Scroll
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "400px",
      threshold: 0,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
      }
    };
  }, [handleObserver]);

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Delete page param if it was there since we don't use it anymore
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  // Flatten the pages to get all products
  const products = data?.pages.flatMap((page) => page.data) || [];

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
      ) : error || (!data?.pages?.length) ? (
        <ErrorState message="Failed to load products. Please try again." />
      ) : products.length === 0 ? (
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
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* ── Infinite Scroll Sentinel ── */}
          <div ref={loadMoreRef} className="h-20 w-full mt-10 flex items-center justify-center">
            {isFetchingNextPage && (
              <div className="h-6 w-6 rounded-full border-2 border-brand-gold/20 border-t-brand-gold animate-spin" />
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
