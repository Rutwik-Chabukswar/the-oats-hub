import * as React from "react"
import { cn } from "@/lib/utils"

export interface StockIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  stockCount: number
  lowStockThreshold?: number
  showCount?: boolean
}

export function StockIndicator({
  stockCount,
  lowStockThreshold = 5,
  showCount = false,
  className,
  ...props
}: StockIndicatorProps) {
  let status: "in-stock" | "low-stock" | "out-of-stock" = "in-stock"
  
  if (stockCount <= 0) {
    status = "out-of-stock"
  } else if (stockCount <= lowStockThreshold) {
    status = "low-stock"
  }

  const getStatusColor = () => {
    switch (status) {
      case "in-stock":
        return "bg-success"
      case "low-stock":
        return "bg-warning"
      case "out-of-stock":
        return "bg-error"
    }
  }

  const getStatusText = () => {
    if (showCount && status !== "out-of-stock") {
      return `${stockCount} in stock`
    }
    switch (status) {
      case "in-stock":
        return "In Stock"
      case "low-stock":
        return "Low Stock"
      case "out-of-stock":
        return "Out of Stock"
    }
  }

  return (
    <div
      className={cn("flex items-center gap-2 text-sm font-medium", className)}
      {...props}
    >
      <span className="relative flex h-2.5 w-2.5">
        {status === "low-stock" && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warning opacity-75"></span>
        )}
        <span
          className={cn("relative inline-flex h-2.5 w-2.5 rounded-full", getStatusColor())}
        ></span>
      </span>
      <span
        className={cn({
          "text-foreground": status === "in-stock",
          "text-warning": status === "low-stock",
          "text-error": status === "out-of-stock",
        })}
      >
        {getStatusText()}
      </span>
    </div>
  )
}
