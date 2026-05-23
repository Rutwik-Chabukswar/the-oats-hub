import { Metadata } from "next";
import { CheckoutFlow } from "@/components/checkout/checkout-flow";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Secure checkout for The Oats Hub.",
  robots: "noindex, nofollow", // Prevent indexing of checkout
};

export default function CheckoutPage() {
  return (
    <div className="flex-1 bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        <h1 className="text-3xl font-bold tracking-tight mb-8 text-center md:text-left">Secure Checkout</h1>
        <CheckoutFlow />
      </div>
    </div>
  );
}
