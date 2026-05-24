import Link from "next/link"
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

  return (
    <div
      className={cn(
        "group relative flex flex-col bg-transparent transition-all duration-500",
        className
      )}
    >
      <Link href={`/products/${product.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {product.name}</span>
      </Link>

      {/* ── Image Area ── */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#0F0D0A] border border-brand-white/[0.04] mb-5">
        {/* Ambient background glow inside the image container */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)] pointer-events-none z-0" />
        
        {/* Badges Overlay */}
        <div className="absolute left-4 top-4 z-20 flex flex-col gap-2">
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
          className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105 z-10"
        />

        {/* Hover overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10 pointer-events-none" />
      </div>

      {/* ── Text Content ── */}
      <div className="flex flex-col flex-grow px-1">
        <div className="flex flex-col gap-1.5 mb-3">
          <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-brand-gold/70">
            {product.category || "The Oats Hub"}
          </span>
          <h3 className="font-serif text-xl sm:text-2xl leading-[1.1] text-brand-white group-hover:text-brand-gold transition-colors duration-300">
            {product.name}
          </h3>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <PriceDisplay
            priceInPaise={price}
            compareAtPriceInPaise={compareAtPrice}
            size="md"
            className="text-brand-white/90 font-light"
          />
          <RatingDisplay rating={5.0} count={12} size="sm" />
        </div>
      </div>
    </div>
  )
}
