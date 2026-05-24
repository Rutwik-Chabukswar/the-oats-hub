import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export interface ProductImageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
  aspectRatio?: "square" | "portrait" | "video"
}

export function ProductImage({
  src,
  alt,
  fill = false,
  width,
  height,
  priority = false,
  aspectRatio = "square",
  className,
  ...props
}: ProductImageProps) {
  const [isLoading, setIsLoading] = React.useState(true)

  return (
    <div
      className={cn(
        "overflow-hidden rounded-md bg-muted",
        {
          "aspect-square": aspectRatio === "square",
          "aspect-[3/4]": aspectRatio === "portrait",
          "aspect-video": aspectRatio === "video",
        },
        className
      )}
      {...props}
    >
      {src && (typeof src !== "string" || src.trim() !== "") ? (
        <Image
          src={src}
          alt={alt || "Product image"}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          priority={priority}
          className={cn(
            "object-cover transition-all duration-500",
            isLoading ? "scale-105 blur-sm" : "scale-100 blur-0"
          )}
          onLoad={() => setIsLoading(false)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-muted/50 text-muted-foreground text-xs uppercase tracking-widest">
          No Image
        </div>
      )}
    </div>
  )
}
