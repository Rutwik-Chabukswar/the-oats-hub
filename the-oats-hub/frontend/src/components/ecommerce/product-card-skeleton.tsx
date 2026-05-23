import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "overflow-hidden rounded-lg border border-border/50 bg-brand-black",
        className
      )}
    >
      <CardContent className="p-0">
        {/* Image Skeleton */}
        <Skeleton className="aspect-square w-full rounded-none" />

        <div className="flex flex-col gap-2 p-4">
          <div className="flex flex-col gap-2">
            {/* Category Skeleton */}
            <Skeleton className="h-3 w-1/3" />
            {/* Title Skeleton */}
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* Rating Skeleton */}
          <div className="mt-1 flex gap-1">
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Price Skeleton */}
          <div className="mt-2 flex items-center justify-between">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
