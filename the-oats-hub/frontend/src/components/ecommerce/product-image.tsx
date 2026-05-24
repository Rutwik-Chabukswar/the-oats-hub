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

  // Generate Cloudinary blur placeholder automatically
  let blurUrl = "";
  if (typeof src === "string" && src.includes("res.cloudinary.com")) {
    const parts = src.split("/upload/");
    if (parts.length === 2) {
      // 20px wide, scaled, blurred, low quality
      blurUrl = `${parts[0]}/upload/w_20,c_scale,e_blur:200,q_auto:low/${parts[1]}`;
    }
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-muted",
        {
          "aspect-square": aspectRatio === "square",
          "aspect-[3/4]": aspectRatio === "portrait",
          "aspect-video": aspectRatio === "video",
        },
        className
      )}
      style={{
        backgroundImage: blurUrl ? `url(${blurUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
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
          unoptimized
          className={cn(
            "object-cover transition-opacity duration-800 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isLoading ? "opacity-0" : "opacity-100"
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
