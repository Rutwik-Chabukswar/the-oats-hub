import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
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
  const mainImage = product.images?.[0] || "/placeholder-product.jpg"
  
  // Example variant extraction (assuming basic price tracking on product for UI)
  // In a real app, this might come from a selected variant or default variant
  const price = 29900 // Fallback price for demo
  const compareAtPrice = 39900 // Fallback compare price for demo
  const isOutOfStock = false // Example state

  return (
    <Card
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border/50 bg-brand-black transition-all duration-300 hover:border-brand-gold/30 hover:shadow-premium-hover",
        className
      )}
    >
      <Link href={`/products/${product.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {product.name}</span>
      </Link>

      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-brand-gray-light">
          {/* Badges Overlay */}
          <div className="absolute left-3 top-3 z-20 flex flex-col gap-2">
            {isOutOfStock ? (
              <ProductBadge variant="limited" label="Out of Stock" />
            ) : compareAtPrice > price ? (
              <ProductBadge variant="sale" />
            ) : null}
          </div>

          <ProductImage
            src={mainImage}
            alt={product.name}
            fill
            priority={priorityImage}
            className="transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col gap-2 p-4">
          <div className="flex flex-col gap-1">
            {/* Category / Brand if needed */}
            <span className="text-xs font-medium uppercase tracking-wider text-brand-gold">
              {product.category || "The Oats Hub"}
            </span>
            <h3 className="line-clamp-2 text-base font-semibold leading-tight text-brand-white group-hover:text-brand-gold transition-colors">
              {product.name}
            </h3>
          </div>

          <RatingDisplay rating={4.5} count={128} size="sm" />

          <div className="mt-2 flex items-center justify-between">
            <PriceDisplay
              priceInPaise={price}
              compareAtPriceInPaise={compareAtPrice}
              size="md"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
