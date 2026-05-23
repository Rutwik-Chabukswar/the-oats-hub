"use client";

import { ShieldCheck, Truck, RotateCcw, Lock } from "lucide-react";

export function TrustIndicators() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-border mt-12">
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="h-12 w-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <h4 className="font-semibold text-sm">Secure Payment</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Your payment information is processed securely. We never store credit card details.
        </p>
      </div>
      
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="h-12 w-12 rounded-full bg-brand-black/5 dark:bg-brand-white/5 flex items-center justify-center text-foreground">
          <Truck className="h-6 w-6" />
        </div>
        <h4 className="font-semibold text-sm">Fast Delivery</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Orders are dispatched within 24 hours and delivered in 2-4 business days.
        </p>
      </div>
      
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="h-12 w-12 rounded-full bg-brand-black/5 dark:bg-brand-white/5 flex items-center justify-center text-foreground">
          <RotateCcw className="h-6 w-6" />
        </div>
        <h4 className="font-semibold text-sm">Satisfaction Guarantee</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Premium quality guaranteed. Contact us within 7 days for any issues.
        </p>
      </div>
    </div>
  );
}

export function SecureCheckoutBadge() {
  return (
    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground py-4 bg-muted/30 rounded-lg border border-border/50">
      <Lock className="h-3.5 w-3.5" />
      <span>Secure Encrypted Checkout via Razorpay</span>
    </div>
  );
}
