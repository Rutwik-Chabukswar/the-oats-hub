"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

export function PaymentLoader({ isVisible }: { isVisible: boolean }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-card text-card-foreground p-8 rounded-2xl shadow-premium border border-border/50 flex flex-col items-center justify-center max-w-sm w-full mx-4 text-center space-y-6"
          >
            <div className="relative">
              <div className="absolute inset-0 border-4 border-brand-gold/20 rounded-full"></div>
              <Loader2 className="h-12 w-12 animate-spin text-brand-gold relative z-10" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Processing Securely</h3>
              <p className="text-sm text-muted-foreground">
                Please wait while we connect with Razorpay. Do not close this window.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
