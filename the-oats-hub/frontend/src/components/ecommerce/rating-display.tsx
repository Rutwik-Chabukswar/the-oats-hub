import * as React from "react"
import { Star, StarHalf } from "lucide-react"
import { cn } from "@/lib/utils"

export interface RatingDisplayProps
  extends React.HTMLAttributes<HTMLDivElement> {
  rating: number
  count?: number
  size?: "sm" | "md" | "lg"
}

export function RatingDisplay({
  rating,
  count,
  size = "md",
  className,
  ...props
}: RatingDisplayProps) {
  const iconSize = size === "sm" ? 14 : size === "md" ? 16 : 20
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      <div className="flex text-brand-gold">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <Star key={i} size={iconSize} className="fill-current" />
          }
          if (i === fullStars && hasHalfStar) {
            return (
              <div key={i} className="relative">
                <Star size={iconSize} className="text-muted/30 fill-current" />
                <div className="absolute inset-0 overflow-hidden w-1/2">
                  <StarHalf size={iconSize} className="fill-brand-gold text-brand-gold" />
                </div>
              </div>
            )
          }
          return (
            <Star
              key={i}
              size={iconSize}
              className="text-muted/30 fill-current"
            />
          )
        })}
      </div>

      {typeof count === "number" && (
        <span
          className={cn("text-muted-foreground", {
            "text-xs": size === "sm",
            "text-sm": size === "md",
            "text-base": size === "lg",
          })}
        >
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  )
}
