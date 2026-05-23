"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Package, ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/format";

interface SuccessStateProps {
  order: any;
}

export function SuccessState({ order }: SuccessStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-12 max-w-3xl mx-auto w-full">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="h-24 w-24 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mb-8 relative"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="absolute inset-0 border-2 border-brand-gold rounded-full"
        />
        <CheckCircle2 className="h-12 w-12" />
      </motion.div>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-center space-y-3 mb-10"
      >
        <h2 className="text-4xl font-serif tracking-tight">Thank you.</h2>
        <p className="text-lg text-muted-foreground">
          Your order has been confirmed and is being prepared.
        </p>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full bg-card border border-border/50 shadow-premium rounded-2xl overflow-hidden mb-10"
      >
        <div className="p-6 bg-muted/30 border-b border-border/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Order Number</p>
            <p className="font-mono font-semibold text-lg">{order.order_number}</p>
          </div>
          <div className="md:text-right">
            <p className="text-sm text-muted-foreground mb-1">Status</p>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-gold"></span>
              </span>
              <p className="font-semibold capitalize">{order.status}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-start gap-4">
            <div className="mt-1 h-10 w-10 rounded-full bg-brand-black/5 dark:bg-brand-white/5 flex items-center justify-center shrink-0">
              <Package className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Expected Delivery</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We'll email you a tracking link once your order has shipped. Standard delivery takes 2-4 business days.
              </p>
            </div>
          </div>

          <div className="bg-muted/30 rounded-xl p-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount Paid</span>
              <span className="font-medium">{formatPrice(order.total_amount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Payment Status</span>
              <span className="font-medium capitalize text-brand-gold flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {order.payment_status}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 w-full md:w-auto"
      >
        <Link href="/products" className="w-full sm:w-auto">
          <Button className="h-14 px-8 rounded-full bg-brand-gold text-brand-black hover:bg-brand-gold/90 shadow-premium w-full text-base font-semibold">
            Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link href="/account/orders" className="w-full sm:w-auto">
          <Button variant="outline" className="h-14 px-8 rounded-full w-full text-base font-semibold border-border hover:bg-muted">
            <Home className="mr-2 h-4 w-4 text-muted-foreground" /> View Account
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
