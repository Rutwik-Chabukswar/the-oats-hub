"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAddToCart } from "@/hooks/useCart";
import { Product, ProductVariant } from "@/types";
import { Button } from "@/components/ui/button";

interface StickyMobileCTAProps {
  product: Product;
  selectedVariant?: ProductVariant | null;
}

export function StickyMobileCTA({ product, selectedVariant }: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const addToCart = useAddToCart();

  useEffect(() => {
    const handleScroll = () => {
      // Show the sticky CTA once the user scrolls past the main product info (approx 800px)
      if (window.scrollY > 800) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentPrice = selectedVariant ? selectedVariant.price : product.base_price;
  const isOutOfStock = selectedVariant ? selectedVariant.stock_quantity <= 0 : false;
  const targetVariant = selectedVariant || (product.variants?.[0]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/90 backdrop-blur-md border-t border-border shadow-[0_-10px_40px_rgba(0,0,0,0.1)] pb-safe"
        >
          <div className="flex items-center justify-between p-4 gap-4">
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold truncate text-foreground">
                {product.name}
              </span>
              <span className="text-xs text-muted-foreground font-medium mt-0.5">
                ₹{(currentPrice / 100).toFixed(2)}
              </span>
            </div>
            
            <Button 
              size="lg" 
              className="shrink-0 h-12 px-8 font-bold bg-brand-gold text-brand-black hover:bg-brand-gold-light rounded-full transition-transform active:scale-[0.97]"
              disabled={isOutOfStock || !targetVariant || addToCart.isPending}
              onClick={() => {
                if (targetVariant) {
                  addToCart.mutate({ variant_id: targetVariant.id, quantity: 1 });
                }
              }}
            >
              {addToCart.isPending ? "Adding..." : isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
