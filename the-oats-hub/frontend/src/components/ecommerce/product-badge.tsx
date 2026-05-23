import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface ProductBadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "new" | "bestseller" | "sale" | "limited"
  label?: string
}

export function ProductBadge({
  variant = "new",
  label,
  className,
  ...props
}: ProductBadgeProps) {
  const getBadgeStyle = () => {
    switch (variant) {
      case "new":
        return "bg-brand-gold text-brand-black hover:bg-brand-gold-light"
      case "bestseller":
        return "bg-brand-black text-brand-gold border-brand-gold hover:bg-brand-gray"
      case "sale":
        return "bg-error text-white hover:bg-error/90"
      case "limited":
        return "bg-brand-gray text-brand-white border-brand-gray-light hover:bg-brand-gray-light"
      default:
        return "bg-brand-gold text-brand-black"
    }
  }

  const getLabel = () => {
    if (label) return label
    switch (variant) {
      case "new":
        return "New Arrival"
      case "bestseller":
        return "Bestseller"
      case "sale":
        return "Sale"
      case "limited":
        return "Limited Edition"
      default:
        return ""
    }
  }

  return (
    <Badge
      className={cn(
        "rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
        getBadgeStyle(),
        className
      )}
      {...props}
    >
      {getLabel()}
    </Badge>
  )
}
