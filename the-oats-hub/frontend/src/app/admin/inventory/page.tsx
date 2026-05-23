"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useUpdateStock } from "@/hooks/useAdmin";
import { formatPrice } from "@/utils/format";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminInventoryPage() {
  const { data: productsData, isLoading } = useProducts();
  const updateStock = useUpdateStock();
  
  // Local state to track edits before saving
  const [stockEdits, setStockEdits] = useState<Record<string, string>>({});

  const handleStockChange = (variantId: string, value: string) => {
    setStockEdits(prev => ({ ...prev, [variantId]: value }));
  };

  const handleSaveStock = (variantId: string) => {
    const value = stockEdits[variantId];
    if (value === undefined || value === "") return;
    
    const quantity = parseInt(value, 10);
    if (!isNaN(quantity) && quantity >= 0) {
      updateStock.mutate({ variantId, stock: quantity }, {
        onSuccess: () => {
          // Clear edit state on success so it falls back to actual data
          setStockEdits(prev => {
            const next = { ...prev };
            delete next[variantId];
            return next;
          });
        }
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium text-zinc-500">Product</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Variant / SKU</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Price</th>
                <th className="px-6 py-4 font-medium text-zinc-500 w-48">Stock Quantity</th>
                <th className="px-6 py-4 font-medium text-zinc-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {isLoading ? (
                <tr><td colSpan={5} className="text-center py-8">Loading inventory...</td></tr>
              ) : productsData?.data?.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8 text-zinc-500">No products found.</td></tr>
              ) : (
                productsData?.data?.flatMap(product => 
                  (product.variants || []).map(variant => {
                    const isEditing = stockEdits[variant.id] !== undefined;
                    const currentValue = isEditing ? stockEdits[variant.id] : variant.stock_quantity;
                    const isLowStock = variant.stock_quantity <= 10;
                    
                    return (
                      <tr key={variant.id} className={`hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${isLowStock ? 'bg-red-50 dark:bg-red-900/10' : ''}`}>
                        <td className="px-6 py-4 font-medium">{product.name}</td>
                        <td className="px-6 py-4 text-zinc-500">
                          {variant.name}
                          <div className="text-xs mt-1">{variant.sku}</div>
                        </td>
                        <td className="px-6 py-4">{formatPrice(variant.price)}</td>
                        <td className="px-6 py-4">
                          <Input 
                            type="number" 
                            min="0"
                            value={currentValue}
                            onChange={(e) => handleStockChange(variant.id, e.target.value)}
                            className={`w-24 h-9 ${isLowStock ? 'border-red-300 dark:border-red-800' : ''}`}
                          />
                          {isLowStock && <p className="text-xs text-red-600 mt-1">Low stock</p>}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button 
                            size="sm" 
                            onClick={() => handleSaveStock(variant.id)}
                            disabled={!isEditing || updateStock.isPending}
                            className={isEditing ? "bg-brand-gold text-brand-black hover:bg-brand-gold/90" : "bg-zinc-200 text-zinc-800"}
                          >
                            {updateStock.isPending && isEditing ? "Saving..." : "Save"}
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
