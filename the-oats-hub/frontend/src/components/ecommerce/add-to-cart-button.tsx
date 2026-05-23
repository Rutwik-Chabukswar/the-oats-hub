import * as React from "react"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface AddToCartButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isAdding?: boolean
  isOutOfStock?: boolean
  size?: "default" | "sm" | "lg" | "icon"
  quantity?: number
  onUpdateQuantity?: (quantity: number) => void
  showQuantityControls?: boolean
}

export function AddToCartButton({
  isAdding = false,
  isOutOfStock = false,
  size = "default",
  quantity = 1,
  onUpdateQuantity,
  showQuantityControls = false,
  className,
  onClick,
  ...props
}: AddToCartButtonProps) {
  if (isOutOfStock) {
    return (
      <Button
        disabled
        variant="secondary"
        size={size}
        className={cn("w-full opacity-50", className)}
        {...props}
      >
        Out of Stock
      </Button>
    )
  }

  if (showQuantityControls && onUpdateQuantity && quantity > 0) {
    return (
      <div className={cn("flex items-center rounded-md border border-brand-gray-light bg-brand-gray", className)}>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-none hover:bg-brand-gray-light hover:text-brand-gold"
          onClick={(e) => {
            e.preventDefault()
            onUpdateQuantity(Math.max(0, quantity - 1))
          }}
          disabled={isAdding}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="flex h-10 flex-1 items-center justify-center min-w-[3rem] text-sm font-medium">
          {isAdding ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-gold border-t-transparent" />
          ) : (
            quantity
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-none hover:bg-brand-gray-light hover:text-brand-gold"
          onClick={(e) => {
            e.preventDefault()
            onUpdateQuantity(quantity + 1)
          }}
          disabled={isAdding}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <Button
      size={size}
      disabled={isAdding}
      onClick={onClick}
      className={cn(
        "w-full bg-brand-gold text-brand-black hover:bg-brand-gold-light active:scale-[0.98] transition-all",
        className
      )}
      {...props}
    >
      {isAdding ? (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-black border-t-transparent" />
          Adding...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </span>
      )}
    </Button>
  )
}
