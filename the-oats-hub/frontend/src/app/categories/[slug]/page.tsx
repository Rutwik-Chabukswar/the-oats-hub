import { Metadata } from "next";
import { Suspense } from "react";
import { CategoryListing } from "@/components/ecommerce/category-listing";
import { ProductGridSkeleton } from "@/components/ui/product-skeleton";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const titleSlug = resolvedParams.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: `${titleSlug} | The Oats Hub`,
    description: `Shop our premium ${titleSlug} category at The Oats Hub.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params;
  return (
    <div className="flex-1 bg-background">
      <Suspense fallback={<div className="container mx-auto px-4 py-8"><ProductGridSkeleton count={8} /></div>}>
        <CategoryListing slug={resolvedParams.slug} />
      </Suspense>
    </div>
  );
}
