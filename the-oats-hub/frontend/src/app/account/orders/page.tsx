"use client";

import { useOrders } from "@/hooks/useAccount";
import { Package } from "lucide-react";
import { OrderCard } from "@/components/account/order-card";
import { AccountEmptyState } from "@/components/account/account-empty-state";

export default function OrdersPage() {
  const { data, isLoading } = useOrders(1);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-gold border-t-transparent" />
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-serif tracking-tight">Order History</h2>
        <AccountEmptyState
          icon={<Package className="h-10 w-10 opacity-50" />}
          title="No Orders Yet"
          message="Your order history is currently empty. Discover our premium wellness selection and begin your journey."
          actionLabel="Explore Collection"
          actionHref="/products"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2 border-b border-border/50 pb-6">
        <h2 className="text-2xl md:text-3xl font-serif tracking-tight flex items-center gap-3">
          Order History
        </h2>
        <p className="text-muted-foreground">View and track your previous purchases.</p>
      </div>

      <div className="space-y-6">
        {data.data.map((order: any) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
