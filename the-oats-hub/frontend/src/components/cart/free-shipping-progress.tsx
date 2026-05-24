"use client";

import { motion } from "framer-motion";
import { formatPrice } from "@/utils/format";

interface FreeShippingProgressProps {
  subtotalInPaise: number;
  thresholdInPaise?: number; // Default to ₹999 (99900 paise)
}

import { cn } from "@/lib/utils";

export function FreeShippingProgress({ 
  subtotalInPaise, 
  thresholdInPaise = 500000 
}: FreeShippingProgressProps) {
  const isFreeShipping = subtotalInPaise >= thresholdInPaise;
  const amountNeeded = Math.max(0, thresholdInPaise - subtotalInPaise);
  const progressPercentage = Math.min(100, (subtotalInPaise / thresholdInPaise) * 100);

  return (
    <div className="w-full py-4 px-6 bg-brand-black/5 dark:bg-brand-white/5 border-b border-border">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm font-medium">
          {isFreeShipping ? (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1.05, 1], opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-green-500 font-bold flex items-center gap-1.5"
            >
              You've unlocked free shipping! ✨
            </motion.div>
          ) : (
            <span>
              <span className="font-bold">{formatPrice(amountNeeded)}</span> away from free shipping
            </span>
          )}
        </div>
      </div>
      
      <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
        <motion.div 
          className={cn("h-full rounded-full transition-colors duration-500", isFreeShipping ? "bg-green-500" : "bg-brand-gold")}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      
      {isFreeShipping && (
        <motion.p 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-muted-foreground mt-2"
        >
          Complimentary delivery applied at checkout.
        </motion.p>
      )}
    </div>
  );
}
