import { Metadata } from "next";
import { Suspense } from "react";
import { ProductListing } from "@/components/ecommerce/product-listing";
import { ProductGridSkeleton } from "@/components/ui/product-skeleton";

export const metadata: Metadata = {
  title: "Shop All Products",
  description: "Browse the complete collection of The Oats Hub's premium nutrition products.",
};

export default function ProductsPage() {
  return (
    <div className="flex-1 bg-background">
      <Suspense fallback={<div className="container mx-auto px-4 py-8"><ProductGridSkeleton count={12} /></div>}>
        <ProductListing />
      </Suspense>
    </div>
  );
}
