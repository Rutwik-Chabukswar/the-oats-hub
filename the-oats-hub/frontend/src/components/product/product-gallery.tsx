"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductImage } from "@/components/ecommerce/product-image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const rawImages = images?.length > 0 ? images : ["/placeholder-product.jpg"];
  const mainImages = rawImages.map(img => 
    typeof img === "string" ? img : ((img as any).image_url || "/placeholder-product.jpg")
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-2xl bg-brand-gray-light border border-border group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <ProductImage
              src={mainImages[currentIndex]}
              alt={`${productName} image ${currentIndex + 1}`}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {mainImages.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {mainImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border transition-all duration-300",
                currentIndex === i
                  ? "border-brand-gold ring-1 ring-brand-gold shadow-[0_0_15px_rgba(201,168,76,0.3)]"
                  : "border-border/50 hover:border-brand-white/30 opacity-70 hover:opacity-100"
              )}
            >
              <ProductImage
                src={img}
                alt={`${productName} thumbnail ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
