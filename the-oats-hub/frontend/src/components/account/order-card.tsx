"use client";

import Link from "next/link";
import { formatPrice } from "@/utils/format";
import { ChevronRight, Package } from "lucide-react";
import { motion } from "framer-motion";

interface OrderCardProps {
  order: any;
}

export function OrderCard({ order }: OrderCardProps) {
  const date = new Date(order.created_at).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-card border border-border/50 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-premium transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 border-b border-border/40 pb-5">
        <div className="grid grid-cols-2 md:flex md:gap-10 gap-y-4 text-sm">
          <div>
            <p className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Order Placed</p>
            <p className="font-medium">{date}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Total Amount</p>
            <p className="font-medium">{formatPrice(order.total_in_paise || order.total_amount)}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Order Number</p>
            <p className="font-mono font-medium">{order.order_number}</p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-brand-gold/10 text-brand-gold capitalize">
            <span className="relative flex h-2 w-2">
              {order.status === "processing" && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>}
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
            </span>
            {order.status}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-lg bg-muted border border-border/50 flex items-center justify-center overflow-hidden shrink-0">
             <Package className="h-6 w-6 text-muted-foreground/50" />
             {/* If we had items in the list, we'd map over images here */}
          </div>
          <div>
            <p className="font-semibold text-sm md:text-base">Premium Nutrition Package</p>
            <p className="text-xs text-muted-foreground mt-0.5">Payment: {order.payment_status}</p>
          </div>
        </div>
        <Link 
          href={`/account/orders/${order.id}`}
          className="h-10 px-4 inline-flex items-center justify-center rounded-full text-sm font-medium border border-border bg-background hover:bg-muted transition-colors whitespace-nowrap"
        >
          View Details <ChevronRight className="ml-1.5 h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
