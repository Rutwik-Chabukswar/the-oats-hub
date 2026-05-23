import { Metadata } from "next";
import { CheckoutFlow } from "@/components/checkout/checkout-flow";

export const metadata: Metadata = {
  title: "Secure Checkout | The Oats Hub",
  description: "Secure and fast checkout for your premium nutrition order.",
  robots: "noindex, nofollow", // Prevent indexing of checkout
};

export default function CheckoutPage() {
  return (
    <div className="flex-1 bg-background relative selection:bg-brand-gold/20">
      {/* Subtle decorative background gradient */}
      <div className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b from-brand-black/5 to-transparent dark:from-brand-white/5 pointer-events-none -z-10" />
      
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-16 max-w-7xl">
        <div className="mb-10 md:mb-14 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-3">Complete Your Order</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            You're just a few steps away from premium wellness. Secure, encrypted, and fast.
          </p>
        </div>
        
        <CheckoutFlow />
      </div>
    </div>
  );
}
