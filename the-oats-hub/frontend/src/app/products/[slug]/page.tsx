import { Metadata } from "next";
import { productService } from "@/services/product.service";
import { ProductDetail } from "@/components/ecommerce/product-detail";
import { Suspense } from "react";

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
    <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl pt-8 pb-16 md:pt-16 md:pb-24">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: Gallery Skeleton */}
        <div className="w-full">
          <div className="md:sticky md:top-24">
            <div className="w-full aspect-square md:aspect-[4/5] rounded-2xl shimmer-gold mb-4" />
            <div className="flex gap-4 overflow-hidden pt-2">
              <div className="w-20 h-20 rounded-xl shimmer-gold" />
              <div className="w-20 h-20 rounded-xl shimmer-gold" />
            </div>
          </div>
        </div>

        {/* Right: Info Skeleton */}
        <div className="w-full space-y-8 pt-4">
          <div className="space-y-4">
            <div className="h-3 w-32 rounded-full shimmer-gold" />
            <div className="h-10 md:h-12 w-[90%] rounded-md shimmer-gold" />
            <div className="h-10 md:h-12 w-[70%] rounded-md shimmer-gold" />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="h-8 w-24 rounded-md shimmer-gold" />
            <div className="h-4 w-32 rounded-md shimmer-gold opacity-60" />
          </div>

          <div className="space-y-3 pt-6 border-t border-brand-white/[0.04]">
            <div className="h-4 w-full rounded-md shimmer-gold" />
            <div className="h-4 w-[85%] rounded-md shimmer-gold" />
            <div className="h-4 w-[60%] rounded-md shimmer-gold" />
          </div>

          <div className="pt-8">
            <div className="h-14 w-full rounded-full shimmer-gold" />
          </div>
        </div>
      </div>
    </div>
  );
}
