"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";

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
          <Button variant="ghost" size="icon" className="relative group text-brand-black dark:text-brand-white">
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
      
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 border-l border-border bg-background">
        <SheetHeader className="p-6 border-b border-border">
          <SheetTitle className="flex items-center text-2xl font-bold tracking-tight">
            Your Cart <span className="text-muted-foreground text-sm ml-2 font-normal">({itemCount} items)</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-gold border-t-transparent"></div>
            </div>
          ) : !cart || cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-2">
                <ShoppingBag className="h-10 w-10 opacity-50" />
              </div>
              <p className="text-lg font-medium">Your cart is empty.</p>
              <p className="text-sm text-muted-foreground max-w-[200px]">
                Looks like you haven't added any premium nutrition yet.
              </p>
              <Button onClick={() => setIsOpen(false)} className="mt-4 bg-brand-gold text-brand-black hover:bg-brand-gold/90 rounded-full px-8">
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {cart.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative h-24 w-24 rounded-md overflow-hidden bg-muted border border-border shrink-0">
                    <Image
                      src={"/placeholder-product.jpg"}
                      alt={item.variant.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="font-semibold text-sm leading-tight line-clamp-2">
                          {item.variant.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Variant: {item.variant.name}
                        </p>
                      </div>
                      <button 
                        onClick={() => removeItem.mutate(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-border rounded-md">
                        <button
                          className="p-1 text-muted-foreground hover:bg-muted transition-colors disabled:opacity-50"
                          disabled={item.quantity <= 1 || updateQuantity.isPending}
                          onClick={() => updateQuantity.mutate({ item_id: item.id, quantity: item.quantity - 1 })}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          className="p-1 text-muted-foreground hover:bg-muted transition-colors disabled:opacity-50"
                          disabled={item.quantity >= item.variant.stock_quantity || updateQuantity.isPending}
                          onClick={() => updateQuantity.mutate({ item_id: item.id, quantity: item.quantity + 1 })}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <PriceDisplay priceInPaise={item.variant.price * item.quantity} size="sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart && cart.items.length > 0 && (
          <div className="p-6 border-t border-border bg-muted/30">
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">{formatPrice(cart.totals.subtotal)}</span>
            </div>
            <div className="flex justify-between mb-6">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-sm text-muted-foreground">Calculated at checkout</span>
            </div>
            
            <div className="flex justify-between items-center mb-6 text-lg font-bold">
              <span>Total</span>
              <span>{formatPrice(cart.totals.total)}</span>
            </div>

            <Link 
              href="/checkout" 
              onClick={() => setIsOpen(false)} 
              className="w-full h-12 text-base font-bold bg-brand-gold text-brand-black hover:bg-brand-gold/90 rounded-full shadow-premium flex items-center justify-center transition-colors"
            >
              Proceed to Checkout
            </Link>
            <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1">
              Securely processed by Razorpay
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
