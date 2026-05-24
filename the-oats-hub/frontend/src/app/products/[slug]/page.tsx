import { Metadata } from "next";
import { productService } from "@/services/product.service";
import { ProductDetail } from "@/components/ecommerce/product-detail";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const product = await productService.getProductBySlug(resolvedParams.slug);
    
    return {
      title: product.name,
      description: product.description || `Buy ${product.name} at The Oats Hub.`,
      openGraph: {
        title: product.name,
        description: product.description || `Buy ${product.name} at The Oats Hub.`,
        images: product.images && product.images.length > 0 
          ? [{ url: typeof product.images[0] === 'string' ? product.images[0] : (product.images[0] as any).image_url }] 
          : [],
      },
    };
  } catch (error) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;
  return (
    <div className="flex-1 bg-background">
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail slug={resolvedParams.slug} />
      </Suspense>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <Skeleton className="w-full aspect-square rounded-2xl" />
        <div className="space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <div className="space-y-2 mt-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
          <Skeleton className="h-12 w-32 mt-6" />
          <div className="pt-8">
            <Skeleton className="h-12 w-full rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
