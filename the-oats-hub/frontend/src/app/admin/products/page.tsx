"use client";

import { useProducts } from "@/hooks/useProducts";
import { formatPrice } from "@/utils/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AdminProductsPage() {
  const { data: productsData, isLoading } = useProducts();

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold">Products</h1>
        
        <Button className="bg-brand-gold text-brand-black hover:bg-brand-gold/90 gap-2">
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium text-zinc-500">Product</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Category</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Status</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Variants</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Price Range</th>
                <th className="px-6 py-4 font-medium text-zinc-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {isLoading ? (
                <tr><td colSpan={6} className="text-center py-8">Loading products...</td></tr>
              ) : productsData?.data?.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-zinc-500">No products found.</td></tr>
              ) : (
                productsData?.data?.map((product) => {
                  const prices = (product.variants || []).map(v => v.price);
                  const minPrice = prices.length ? Math.min(...prices) : product.base_price;
                  const maxPrice = prices.length ? Math.max(...prices) : product.base_price;
                  const priceStr = minPrice === maxPrice 
                    ? formatPrice(minPrice) 
                    : `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;

                  return (
                    <tr key={product.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium">{product.name}</p>
                      </td>
                      <td className="px-6 py-4 text-zinc-500">{product.category || "Uncategorized"}</td>
                      <td className="px-6 py-4">
                        <Badge variant={product.is_active ? "default" : "secondary"} className={product.is_active ? "bg-green-100 text-green-800" : ""}>
                          {product.is_active ? "Active" : "Draft"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-zinc-500">{(product.variants || []).length}</td>
                      <td className="px-6 py-4">{priceStr}</td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
