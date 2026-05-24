"use client";

import { useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ProductImage } from "./product-image"
import { PriceDisplay } from "./price-display"
import { RatingDisplay } from "./rating-display"
import { ProductBadge } from "./product-badge"
import { cn } from "@/lib/utils"
import type { Product } from "@/types"

export interface ProductCardProps {
  product: Product
  className?: string
  priorityImage?: boolean
}

export function ProductCard({
  product,
  className,
  priorityImage = false,
}: ProductCardProps) {
  const router = useRouter();
  const prefetchTimer = useRef<NodeJS.Timeout | null>(null);

  // Use first image or fallback
  let mainImage = "/placeholder-product.jpg";
  if (product.images && product.images.length > 0) {
    const firstImg = product.images[0];
    if (typeof firstImg === "string") {
      mainImage = firstImg;
    } else if (typeof firstImg === "object" && firstImg !== null) {
      mainImage = (firstImg as any).image_url || "/placeholder-product.jpg";
    }
  }
  
  const price = product.base_price || 0
  const compareAtPrice = undefined
  const isOutOfStock = false

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const url = `/products/${product.slug}`;
    
    // @ts-ignore - startViewTransition is relatively new
    if (!document.startViewTransition) {
      router.push(url);
      return;
    }

    // @ts-ignore
    document.startViewTransition(() => {
      router.push(url);
    });
  };

  const handleMouseEnter = () => {
    prefetchTimer.current = setTimeout(() => {
      router.prefetch(`/products/${product.slug}`);
    }, 200);
  };

  const handleMouseLeave = () => {
    if (prefetchTimer.current) {
      clearTimeout(prefetchTimer.current);
    }
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col p-4 md:p-5 rounded-2xl",
        "transition-colors duration-500 ease-out",
        "border border-brand-white/[0.04] bg-[#0A0A0A]",
        "hover:border-brand-gold/20 hover:bg-[#13110C]",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link 
        href={`/products/${product.slug}`} 
        className="absolute inset-0 z-10"
        onClick={handleNavigation}
      >
        <span className="sr-only">View {product.name}</span>
      </Link>

      {/* ── Image Area ── */}
      <div 
        className="relative w-full aspect-[4/5] overflow-hidden rounded-xl bg-[#0F0D0A] mb-5"
        style={{ viewTransitionName: `product-image-${product.slug}` }}
      >
        {/* Ambient background glow inside the image container */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)] pointer-events-none z-0" />
        
        {/* Badges Overlay */}
        <div className="absolute left-3 top-3 z-20 flex flex-col gap-2">
          {isOutOfStock ? (
            <ProductBadge variant="limited" label="Out of Stock" />
          ) : compareAtPrice && compareAtPrice > price ? (
            <ProductBadge variant="sale" />
          ) : null}
        </div>

        <ProductImage
          src={mainImage}
          alt={product.name}
          fill
          priority={priorityImage}
          className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.04] z-10"
        />

        {/* Hover overlay gradient - fades up slowly, not snapping */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100 z-10 pointer-events-none" />
      </div>

      {/* ── Text Content ── */}
      <div className="flex flex-col flex-grow px-1">
        <div className="flex flex-col gap-1.5 mb-4">
          <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-brand-gold/70">
            {product.category || "The Oats Hub"}
          </span>
          <h3 className="font-serif text-lg sm:text-xl leading-[1.2] text-brand-white group-hover:text-brand-gold transition-colors duration-500">
            {product.name}
          </h3>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-brand-white/[0.04]">
          <PriceDisplay
            priceInPaise={price}
            compareAtPriceInPaise={compareAtPrice}
            size="sm"
            className="text-brand-white/90 font-light"
          />
          <RatingDisplay rating={5.0} count={12} size="sm" />
        </div>
      </div>
    </div>
  )
}
