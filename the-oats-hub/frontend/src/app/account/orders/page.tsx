"use client";

import Link from "next/link";
import { format } from "date-fns";
import { useOrders } from "@/hooks/useAccount";
import { formatPrice } from "@/utils/format";
import { EmptyState } from "@/components/ui/error-state";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";

export default function OrdersPage() {
  const { data, isLoading } = useOrders(1);

  if (isLoading) {
    return <div className="flex justify-center p-12"><div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-gold border-t-transparent" /></div>;
  }

  if (!data || data.data.length === 0) {
    return (
      <EmptyState
        title="No Orders Yet"
        message="You haven't placed any orders yet. Start exploring our premium oats!"
        actionText="Shop Now"
        onAction={() => window.location.href = "/products"}
      />
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Package className="h-6 w-6 text-brand-gold" /> 
        Order History
      </h2>

      <div className="space-y-4">
        {data.data.map((order) => (
          <div key={order.id} className="border border-border rounded-xl p-4 md:p-6 flex flex-col md:flex-row gap-4 md:items-center justify-between hover:border-brand-gold/50 transition-colors">
            
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-bold">{order.order_number}</span>
                <Badge variant={order.payment_status === "paid" ? "default" : "secondary"} className={order.payment_status === "paid" ? "bg-green-100 text-green-800" : ""}>
                  {order.payment_status}
                </Badge>
                <Badge variant="outline">{order.fulfillment_status}</Badge>
              </div>
              
              <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                <span>Placed on {format(new Date(order.created_at), "MMM d, yyyy")}</span>
                <span>•</span>
                <span>{order.items.length} items</span>
                <span>•</span>
                <span className="font-medium text-foreground">{formatPrice(order.total_in_paise)}</span>
              </div>
            </div>

            <Link
              href={`/account/orders/${order.id}`}
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground md:w-auto w-full"
            >
              View Details
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
}
