import * as React from "react"
import { formatPrice } from "@/utils/format"
import { cn } from "@/lib/utils"

export interface PriceDisplayProps
  extends React.HTMLAttributes<HTMLDivElement> {
  priceInPaise: number
  compareAtPriceInPaise?: number | null
  size?: "sm" | "md" | "lg"
}

export function PriceDisplay({
  priceInPaise,
  compareAtPriceInPaise,
  size = "md",
  className,
  ...props
}: PriceDisplayProps) {
  const hasDiscount =
    compareAtPriceInPaise && compareAtPriceInPaise > priceInPaise

  return (
    <div className={cn("flex items-baseline gap-2", className)} {...props}>
      <span
        className={cn("font-semibold text-foreground", {
          "text-lg": size === "sm",
          "text-2xl": size === "md",
          "text-3xl lg:text-4xl": size === "lg",
        })}
      >
        {formatPrice(priceInPaise)}
      </span>

      {hasDiscount && (
        <span
          className={cn("text-muted-foreground line-through decoration-1", {
            "text-sm": size === "sm",
            "text-base": size === "md",
            "text-lg": size === "lg",
          })}
        >
          {formatPrice(compareAtPriceInPaise)}
        </span>
      )}
    </div>
  )
}
