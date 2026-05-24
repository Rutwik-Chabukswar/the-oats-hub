"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductImage } from "@/components/ecommerce/product-image";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  productSlug?: string;
}

export function ProductGallery({ images, productName, productSlug }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const rawImages = images?.length > 0 ? images : ["/placeholder-product.jpg"];
  const mainImages = rawImages.map(img => 
    typeof img === "string" ? img : ((img as any).image_url || "/placeholder-product.jpg")
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setMousePos({ x, y });
  };

  return (
    <div className="flex flex-col gap-4 relative md:static">
      {/* Main Image Container */}
      <div 
        id="pdp-main-image"
        ref={containerRef}
        className="relative aspect-square md:aspect-[4/5] rounded-2xl bg-[#0F0D0A] border border-brand-white/[0.04] group touch-pan-y"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
        style={{ viewTransitionName: productSlug ? `product-image-${productSlug}` : undefined }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 overflow-hidden rounded-2xl"
          >
            {/* Mobile Native Pinch Zoom / Base Image */}
            <motion.div
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.2}
              className="w-full h-full cursor-grab active:cursor-grabbing md:cursor-crosshair"
            >
              <ProductImage
                src={mainImages[currentIndex]}
                alt={`${productName} image ${currentIndex + 1}`}
                fill
                priority
                className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* ── Desktop Dual View Zoom Panel ── */}
        {/* Rendered absolutely outside the bounds (to the right) but hidden on mobile */}
        <AnimatePresence>
          {isHovering && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="hidden md:block absolute top-0 -right-[105%] w-full h-full bg-[#0F0D0A] rounded-2xl border border-brand-white/[0.08] shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden z-50 pointer-events-none"
            >
              <div 
                className="w-full h-full relative"
                style={{
                  transform: 'scale(2.2)',
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                  transition: 'transform-origin 0.1s ease-out'
                }}
              >
                <Image
                  src={mainImages[currentIndex]}
                  alt={`${productName} zoomed`}
                  fill
                  className="object-cover"
                  unoptimized // usually good for zooming if we want raw res, or just rely on Next sizes
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {mainImages.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide pt-2">
          {mainImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border transition-all duration-300",
                currentIndex === i
                  ? "border-brand-gold ring-1 ring-brand-gold shadow-[0_0_15px_rgba(201,168,76,0.3)]"
                  : "border-brand-white/[0.04] bg-[#0F0D0A] hover:border-brand-white/30 opacity-60 hover:opacity-100"
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
