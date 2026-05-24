"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Minus, Plus, Trash2, Lock, ShieldCheck, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart, useUpdateCartItem, useRemoveCartItem } from "@/hooks/useCart";
import { formatPrice } from "@/utils/format";
import { PriceDisplay } from "../ecommerce/price-display";
import { FreeShippingProgress } from "./free-shipping-progress";

export function CartDrawer() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: cart, isLoading } = useCart();
  const updateQuantity = useUpdateCartItem();
  const removeItem = useRemoveCartItem();

  const itemCount = cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger 
        render={
          <Button id="nav-cart-icon" variant="ghost" size="icon" className="relative group text-brand-black dark:text-brand-white hover:bg-transparent">
            <ShoppingBag className="h-6 w-6 group-hover:text-brand-gold transition-colors" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-brand-gold text-[10px] font-bold text-brand-black flex items-center justify-center">
                {itemCount}
              </span>
            )}
            <span className="sr-only">Open cart</span>
          </Button>
        }
      />
      
      <SheetContent className="w-full sm:max-w-[480px] flex flex-col p-0 border-l border-border bg-background/95 backdrop-blur-xl shadow-2xl">
        <SheetHeader className="px-6 py-5 border-b border-border">
          <SheetTitle className="flex items-center text-xl font-bold tracking-tight">
            Your Selection 
            <span className="text-muted-foreground text-sm ml-2 font-normal">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </span>
          </SheetTitle>
        </SheetHeader>

        {cart && cart.items.length > 0 && (
          <FreeShippingProgress subtotalInPaise={cart.totals.subtotal} />
        )}

        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-gold border-t-transparent"></div>
            </div>
          ) : !cart || cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-24 w-24 rounded-full bg-brand-black/5 dark:bg-brand-white/5 flex items-center justify-center text-muted-foreground mb-2"
              >
                <ShoppingBag className="h-10 w-10 opacity-30" strokeWidth={1.5} />
              </motion.div>
              <div className="space-y-2">
                <p className="text-2xl font-serif tracking-tight">Your cart is empty</p>
                <p className="text-base text-muted-foreground max-w-[260px] mx-auto leading-relaxed">
                  Discover our premium selection of nutrition products and start your wellness journey.
                </p>
              </div>
              <Button 
                onClick={() => setIsOpen(false)} 
                className="mt-6 bg-brand-gold text-brand-black hover:bg-brand-gold/90 rounded-full px-10 h-14 text-base font-medium shadow-premium transition-transform hover:scale-105 active:scale-95"
              >
                Explore Collection
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              <AnimatePresence initial={false}>
                {cart.items.map((item) => (
                  <motion.div 
                    key={item.id} 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    className="group flex gap-5"
                  >
                    <div className="relative h-28 w-24 rounded-lg overflow-hidden bg-muted/30 border border-border/50 shrink-0">
                      <Image
                        src={"/placeholder-product.jpg"}
                        alt={item.variant.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-semibold text-base leading-snug tracking-tight text-foreground pr-4">
                            {item.variant.name}
                          </h4>
                          <button 
                            onClick={() => removeItem.mutate(item.id)}
                            className="text-muted-foreground/40 hover:text-destructive transition-colors shrink-0 mt-0.5"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1.5">
                          {item.variant.sku ? `SKU: ${item.variant.sku}` : "Standard Variant"}
                        </p>
                      </div>
                      
                      <div className="flex items-end justify-between mt-4">
                        <div className="flex items-center border border-border rounded-full bg-background overflow-hidden h-9">
                          <button
                            className="w-9 h-full flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors disabled:opacity-50"
                            disabled={item.quantity <= 1 || updateQuantity.isPending}
                            onClick={() => updateQuantity.mutate({ item_id: item.id, quantity: item.quantity - 1 })}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            className="w-9 h-full flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors disabled:opacity-50"
                            disabled={item.quantity >= item.variant.stock_quantity || updateQuantity.isPending}
                            onClick={() => updateQuantity.mutate({ item_id: item.id, quantity: item.quantity + 1 })}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <PriceDisplay priceInPaise={item.variant.price * item.quantity} size="md" className="font-semibold" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {cart && cart.items.length > 0 && (
          <div className="border-t border-border bg-background pt-6 pb-8 px-6 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between mb-3 text-base">
              <span className="text-muted-foreground">Subtotal</span>
              <motion.span 
                key={cart.totals.subtotal}
                initial={{ opacity: 0.5, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-medium"
              >
                {formatPrice(cart.totals.subtotal)}
              </motion.span>
            </div>
            <div className="flex justify-between mb-5 text-base">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-muted-foreground">Calculated next</span>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold">Total</span>
              <motion.span 
                key={cart.totals.total}
                initial={{ opacity: 0.5, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl font-bold"
              >
                {formatPrice(cart.totals.total)}
              </motion.span>
            </div>

            <Link 
              href="/checkout" 
              onClick={() => setIsOpen(false)} 
              className="group relative w-full h-14 text-base font-bold bg-brand-black dark:bg-brand-white text-brand-white dark:text-brand-black hover:bg-brand-black/90 dark:hover:bg-brand-white/90 rounded-full shadow-premium flex items-center justify-center transition-all overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-brand-gold opacity-0 group-hover:opacity-10 transition-opacity" />
            </Link>
            
            <div className="flex items-center justify-center gap-4 mt-5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Lock className="h-3 w-3" /> Secure Checkout
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3 w-3" /> Razorpay
              </span>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
