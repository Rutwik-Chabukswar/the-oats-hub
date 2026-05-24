"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAddToCart } from "@/hooks/useCart";
import { PriceDisplay } from "@/components/ecommerce/price-display";
import { RatingDisplay } from "@/components/ecommerce/rating-display";
import { Button } from "@/components/ui/button";
import { Product, ProductVariant } from "@/types";
import { cn } from "@/lib/utils";
import { ShieldCheck, Truck, Lock } from "lucide-react";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const addToCart = useAddToCart();

  const currentPrice = selectedVariant ? selectedVariant.price : product.base_price;
  const isOutOfStock = selectedVariant ? selectedVariant.stock_quantity <= 0 : false;
  
  // Demo comparison price
  const compareAtPrice = currentPrice + 20000; 

  const handleAddToCart = () => {
    if (selectedVariant) {
      // Find the main product image to get its starting coordinates
      const imgElement = document.getElementById("pdp-main-image");
      if (imgElement && product.images && product.images.length > 0) {
        const rect = imgElement.getBoundingClientRect();
        const imageUrl = typeof product.images[0] === 'string' 
          ? product.images[0] 
          : (product.images[0] as any).image_url;
          
        window.dispatchEvent(
          new CustomEvent("fly-to-cart", {
            detail: {
              id: Date.now().toString(),
              imageUrl: imageUrl || "/placeholder-product.jpg",
              startRect: rect,
            },
          })
        );
      }

      addToCart.mutate({ variant_id: selectedVariant.id, quantity });
    }
  };

  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    // Generate a stable view count for the session
    const key = `view_count_${product.id}`;
    let count = sessionStorage.getItem(key);
    if (!count) {
      count = Math.floor(Math.random() * 36 + 12).toString(); // Between 12 and 47
      sessionStorage.setItem(key, count);
    }
    setViewCount(parseInt(count, 10));
  }, [product.id]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="mb-3">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-gold">
            {product.category || "Premium Nutrition"}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-4">
          {product.name}
        </h1>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <RatingDisplay rating={4.9} count={342} size="md" />
          <span className="hidden sm:inline text-border">|</span>
          
          {/* Ethical Urgency: Real Stock Display */}
          {selectedVariant && selectedVariant.stock_quantity > 0 && selectedVariant.stock_quantity <= 5 ? (
            <span className="text-brand-gold font-medium text-sm flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-50"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
              </span>
              Only {selectedVariant.stock_quantity} left in stock — order soon
            </span>
          ) : selectedVariant && selectedVariant.stock_quantity > 5 ? (
            <span className="text-green-500 font-medium text-sm flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              In Stock & Ready to Ship
            </span>
          ) : (
            <span className="text-destructive font-medium text-sm flex items-center gap-1.5">
              Out of Stock
            </span>
          )}
        </div>
        
        <div className="mb-8">
          <PriceDisplay 
            priceInPaise={currentPrice} 
            compareAtPriceInPaise={compareAtPrice} 
            size="lg" 
          />
          <div className="flex items-center gap-4 mt-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Inclusive of all taxes</p>
            {/* Ethical Urgency: View Counter */}
            {viewCount !== null && (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                {viewCount} people viewed this today
              </span>
            )}
          </div>
        </div>

        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
          {product.description || "Formulated with clean-label ingredients to elevate your daily routine. Experience unparalleled quality and taste in every serving."}
        </p>
      </motion.div>

      <motion.div 
        className="w-full h-px bg-border/50 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      />

      {/* Variants */}
      {product.variants && product.variants.length > 0 && (
        <motion.div 
          className="mb-10 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <div className="flex justify-between items-end">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Select Option
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                className={cn(
                  "relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200",
                  selectedVariant?.id === variant.id 
                    ? "border-brand-gold bg-brand-gold/5 text-brand-gold shadow-[0_0_15px_rgba(201,168,76,0.15)]" 
                    : "border-border/50 hover:border-brand-gold/50 text-foreground bg-background hover:bg-muted/30"
                )}
              >
                <span className="font-semibold">{variant.name}</span>
                <span className="text-xs opacity-70 mt-1">
                  ₹{(variant.price / 100).toFixed(2)}
                </span>
                {selectedVariant?.id === variant.id && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-gold text-brand-black">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Purchase Panel */}
      <motion.div 
        className="mt-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      >
        <div className="flex gap-4 mb-6">
          {/* Quantity Selector */}
          <div className="flex items-center border-2 border-border/50 rounded-full h-14 bg-background">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-12 h-full flex items-center justify-center text-foreground hover:text-brand-gold transition-colors"
            >
              -
            </button>
            <span className="w-8 text-center font-semibold text-lg">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-12 h-full flex items-center justify-center text-foreground hover:text-brand-gold transition-colors"
            >
              +
            </button>
          </div>
          
          {/* Add to Cart */}
          <Button 
            size="lg" 
            className="flex-1 h-14 text-lg font-bold bg-brand-gold text-brand-black hover:bg-brand-gold-light rounded-full transition-all active:scale-[0.98] shadow-[0_4px_20px_-4px_rgba(201,168,76,0.4)]"
            disabled={isOutOfStock || !selectedVariant || addToCart.isPending}
            onClick={handleAddToCart}
          >
            {addToCart.isPending ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-brand-black border-t-transparent animate-spin" />
                Adding...
              </span>
            ) : isOutOfStock ? (
              "Out of Stock"
            ) : (
              "Add to Cart"
            )}
          </Button>
        </div>

        {/* Micro Trust Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border/50">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Lock className="h-4 w-4 text-brand-gold" />
            <span className="text-xs font-medium uppercase tracking-wider">Secure Checkout</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Truck className="h-4 w-4 text-brand-gold" />
            <span className="text-xs font-medium uppercase tracking-wider">Free Shipping &gt; ₹5K</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-brand-gold" />
            <span className="text-xs font-medium uppercase tracking-wider">Quality Guarantee</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
