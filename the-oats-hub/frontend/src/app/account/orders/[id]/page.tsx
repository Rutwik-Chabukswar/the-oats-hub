"use client";

import { use } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, MapPin, CreditCard, Package, HelpCircle, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import { useOrderDetail } from "@/hooks/useAccount";
import { formatPrice } from "@/utils/format";
import { OrderTimeline } from "@/components/account/order-timeline";

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { data: order, isLoading } = useOrderDetail(resolvedParams.id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-gold border-t-transparent" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">Order not found.</p>
        <Link href="/account/orders" className="text-brand-gold font-medium mt-4 inline-block hover:underline">
          Return to Orders
        </Link>
      </div>
    );
  }

  const fulfillmentStatus = order.fulfillment_status?.toLowerCase() || "processing";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-6">
        <div>
          <Link href="/account/orders" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-6 transition-colors group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Orders
          </Link>
          <h2 className="text-3xl font-serif tracking-tight">Order #{order.order_number}</h2>
          <p className="text-muted-foreground mt-2">
            Placed on {format(new Date(order.created_at), "MMMM d, yyyy")}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-muted/50 border border-border">
            {order.payment_status === "paid" ? "Payment Successful" : "Payment Pending"}
          </span>
          <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-brand-gold/10 text-brand-gold border border-brand-gold/20 capitalize">
            {order.fulfillment_status}
          </span>
        </div>
      </div>

      <div className="bg-card border border-border/50 rounded-3xl p-6 md:p-10 shadow-sm">
        <h3 className="text-xl font-serif tracking-tight mb-2">Delivery Status</h3>
        <p className="text-muted-foreground text-sm mb-6">Track the progress of your premium delivery.</p>
        <OrderTimeline status={fulfillmentStatus} />
      </div>

      <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
        <div className="md:col-span-7 lg:col-span-8 space-y-8">
          <div className="bg-card border border-border/50 rounded-3xl overflow-hidden shadow-sm">
            <div className="px-6 py-5 border-b border-border/50 flex items-center justify-between bg-muted/20">
              <h3 className="font-semibold text-lg font-serif">Items Ordered</h3>
              <span className="text-sm text-muted-foreground">{order.items.length} items</span>
            </div>
            <div className="divide-y divide-border/50">
              {order.items.map((item: any) => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 group">
                  {item.image_url ? (
                    <div className="h-24 w-24 bg-muted rounded-2xl overflow-hidden shrink-0 border border-border/50 relative">
                      <img src={item.image_url} alt={item.variant_name} className="h-full w-full object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ) : (
                    <div className="h-24 w-24 bg-muted rounded-2xl flex items-center justify-center shrink-0 border border-border/50">
                      <Package className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <p className="font-semibold text-lg">{item.product_name || "Premium Wellness Product"}</p>
                        <p className="text-muted-foreground text-sm mt-1">Variant: {item.variant_name || "Standard"}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(item.price_snapshot_in_paise * item.quantity)}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm px-3 py-1 bg-muted/50 rounded-full font-medium border border-border/50 text-muted-foreground">Qty: {item.quantity}</span>
                      <p className="text-xs text-muted-foreground">{formatPrice(item.price_snapshot_in_paise)} each</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-5 lg:col-span-4 space-y-6">
          <div className="bg-card border border-border/50 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            
            <h3 className="font-semibold text-lg font-serif mb-6 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-brand-gold" /> Order Summary
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(order.total_in_paise - (order.shipping_address ? 5000 : 0))}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{order.total_in_paise > 50000 ? "Complimentary" : "₹50.00"}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-4 border-t border-border/50">
                <span>Total Paid</span>
                <span>{formatPrice(order.total_in_paise)}</span>
              </div>
            </div>
          </div>

          {order.shipping_address && (
            <div className="bg-card border border-border/50 rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="font-semibold text-lg font-serif mb-6 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-brand-gold" /> Delivery Details
              </h3>
              <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                <p className="font-medium text-foreground">{order.shipping_address.full_name}</p>
                <p>{order.shipping_address.address_line_1}</p>
                {order.shipping_address.address_line_2 && <p>{order.shipping_address.address_line_2}</p>}
                <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.pincode}</p>
                <p className="pt-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-gold/50"></span>
                  {order.shipping_address.phone}
                </p>
              </div>
            </div>
          )}

          <Link href="/contact" className="group flex items-center justify-between bg-muted/30 hover:bg-muted/50 border border-border/50 rounded-2xl p-5 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-background rounded-full flex items-center justify-center border border-border/50 shadow-sm">
                <HelpCircle className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-sm">Need Assistance?</p>
                <p className="text-xs text-muted-foreground">Our support team is here to help.</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
