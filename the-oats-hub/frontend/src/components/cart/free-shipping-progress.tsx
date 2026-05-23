"use client";

import { motion } from "framer-motion";
import { formatPrice } from "@/utils/format";

interface FreeShippingProgressProps {
  subtotalInPaise: number;
  thresholdInPaise?: number; // Default to ₹999 (99900 paise)
}

export function FreeShippingProgress({ 
  subtotalInPaise, 
  thresholdInPaise = 99900 
}: FreeShippingProgressProps) {
  const isFreeShipping = subtotalInPaise >= thresholdInPaise;
  const amountNeeded = Math.max(0, thresholdInPaise - subtotalInPaise);
  const progressPercentage = Math.min(100, (subtotalInPaise / thresholdInPaise) * 100);

  return (
    <div className="w-full py-4 px-6 bg-brand-black/5 dark:bg-brand-white/5 border-b border-border">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">
          {isFreeShipping ? (
            <span className="text-brand-gold">You've unlocked free shipping! ✨</span>
          ) : (
            <span>
              You're <span className="font-bold">{formatPrice(amountNeeded)}</span> away from free shipping
            </span>
          )}
        </span>
      </div>
      
      <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-brand-gold rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // smooth ease out
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
