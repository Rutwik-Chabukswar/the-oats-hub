export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-transparent">
      {/* ── Image Area Skeleton ── */}
      <div className="relative aspect-[4/5] rounded-2xl mb-5 overflow-hidden shimmer-gold" />

      {/* ── Text Content Skeleton ── */}
      <div className="flex flex-col flex-grow px-1">
        <div className="flex flex-col gap-2 mb-4 mt-1">
          {/* Category */}
          <div className="h-2.5 w-24 rounded-full shimmer-gold" />
          {/* Title */}
          <div className="h-6 sm:h-7 w-[90%] rounded-md shimmer-gold mt-1.5" />
          <div className="h-6 sm:h-7 w-[60%] rounded-md shimmer-gold" />
        </div>

        {/* Footer: Price & Rating */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="h-5 w-20 rounded-md shimmer-gold" />
          <div className="h-4 w-16 rounded-md shimmer-gold opacity-60" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
