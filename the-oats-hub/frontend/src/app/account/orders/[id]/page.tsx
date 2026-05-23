"use client";

import { use } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, MapPin, CreditCard, Package } from "lucide-react";

import { useOrderDetail } from "@/hooks/useAccount";
import { formatPrice } from "@/utils/format";
import { Badge } from "@/components/ui/badge";

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { data: order, isLoading } = useOrderDetail(resolvedParams.id);

  if (isLoading) {
    return <div className="flex justify-center p-12"><div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-gold border-t-transparent" /></div>;
  }

  if (!order) {
    return <div>Order not found.</div>;
  }

  return (
    <div>
      <Link href="/account/orders" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Orders
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold">Order #{order.order_number}</h2>
          <p className="text-sm text-muted-foreground mt-1">Placed on {format(new Date(order.created_at), "MMMM d, yyyy 'at' h:mm a")}</p>
        </div>
        <div className="flex gap-2">
          <Badge className={order.payment_status === "paid" ? "bg-green-100 text-green-800" : ""}>
            {order.payment_status}
          </Badge>
          <Badge variant="outline">{order.fulfillment_status}</Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="border border-border rounded-xl overflow-hidden">
            <div className="bg-muted px-4 py-3 border-b border-border font-medium">Items Ordered</div>
            <div className="divide-y divide-border">
              {order.items.map((item) => (
                <div key={item.id} className="p-4 flex gap-4">
                  {item.image_url ? (
                    <div className="h-16 w-16 bg-muted rounded-md overflow-hidden shrink-0">
                      <img src={item.image_url} alt={item.variant_name} className="h-full w-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center shrink-0">
                      <Package className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 flex justify-between">
                    <div>
                      <p className="font-medium">{item.product_name || "Unknown Product"}</p>
                      <p className="text-sm text-muted-foreground">{item.variant_name}</p>
                      <p className="text-sm mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-medium text-right">
                      {formatPrice(item.price_snapshot_in_paise * item.quantity)}
                      <p className="text-xs text-muted-foreground font-normal">{formatPrice(item.price_snapshot_in_paise)} each</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border border-border rounded-xl p-5 space-y-4">
            <h3 className="font-semibold flex items-center gap-2 border-b border-border pb-2">
              <CreditCard className="h-4 w-4" /> Order Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="text-foreground">{formatPrice(order.total_in_paise - (order.shipping_address ? 5000 : 0))}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery</span>
                <span className="text-foreground">{order.total_in_paise > 50000 ? "FREE" : "₹50.00"}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-brand-gold">{formatPrice(order.total_in_paise)}</span>
              </div>
            </div>
          </div>

          {order.shipping_address && (
            <div className="border border-border rounded-xl p-5 space-y-4">
              <h3 className="font-semibold flex items-center gap-2 border-b border-border pb-2">
                <MapPin className="h-4 w-4" /> Shipping Address
              </h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p className="font-medium text-foreground">{order.shipping_address.full_name}</p>
                <p>{order.shipping_address.address_line_1}</p>
                {order.shipping_address.address_line_2 && <p>{order.shipping_address.address_line_2}</p>}
                <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.pincode}</p>
                <p className="pt-2">Phone: {order.shipping_address.phone}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
