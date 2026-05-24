"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MapPin, CreditCard, XCircle } from "lucide-react";

import { useCheckoutSummary, useCreateOrder } from "@/hooks/useCheckout";
import { useVerifyPayment } from "@/hooks/usePayment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/utils/format";
import { EmptyState } from "@/components/ui/error-state";
import { env } from "@/lib/env";

import { TrustIndicators, SecureCheckoutBadge } from "./trust-indicators";
import { PaymentLoader } from "./payment-loader";
import { SuccessState } from "./success-state";

const addressSchema = z.object({
  full_name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone required"),
  address_line_1: z.string().min(5, "Address is required"),
  address_line_2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().min(6, "Valid pincode required"),
  save_as_default: z.boolean().optional(),
});

type AddressFormValues = z.infer<typeof addressSchema>;

const loadScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export function CheckoutFlow() {
  const router = useRouter();
  const { data: summary, isLoading, error } = useCheckoutSummary();
  const createOrder = useCreateOrder();
  const verifyPayment = useVerifyPayment();
  
  const [orderComplete, setOrderComplete] = React.useState<any>(null);
  const [paymentFailed, setPaymentFailed] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    mode: "onBlur",
    defaultValues: {
      save_as_default: false,
    },
  });

  const onSubmit = async (data: AddressFormValues) => {
    setIsProcessing(true);
    
    // 1. Load Razorpay script
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Payment gateway failed to load. Please check your connection.");
      setIsProcessing(false);
      return;
    }

    // 2. Create the Order
    createOrder.mutate(
      { shipping_address: data },
      {
        onSuccess: (orderData: any) => {
          if (!orderData.razorpay_order_id) {
            setIsProcessing(false);
            setOrderComplete({ ...orderData, payment_status: "paid" });
            return;
          }

          // 3. Configure Razorpay
          const options = {
            key: env.RAZORPAY_KEY_ID,
            amount: orderData.total_amount,
            currency: "INR",
            name: "The Oats Hub",
            description: "Premium Nutrition Purchase",
            image: "/logo.png", // Ensure this exists or omit
            order_id: orderData.razorpay_order_id,
            handler: function (response: any) {
              // 4. Verify payment
              verifyPayment.mutate(
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                },
                {
                  onSuccess: () => {
                    setIsProcessing(false);
                    setOrderComplete({ ...orderData, payment_status: "paid" });
                  },
                  onError: () => {
                    setIsProcessing(false);
                    setPaymentFailed(true);
                  }
                }
              );
            },
            modal: {
              ondismiss: function() {
                setIsProcessing(false);
              }
            },
            prefill: {
              name: data.full_name,
              contact: data.phone,
            },
            theme: {
              color: "#18181B", // Premium dark theme
            },
          };

          const paymentObject = new (window as any).Razorpay(options);
          
          paymentObject.on("payment.failed", function (response: any) {
            console.error("Payment failed", response.error);
            setIsProcessing(false);
            setPaymentFailed(true);
          });

          paymentObject.open();
        },
        onError: () => {
          setIsProcessing(false);
        }
      }
    );
  };

  if (orderComplete) {
    return <SuccessState order={orderComplete} />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-gold border-t-transparent"></div>
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <EmptyState 
          title="Your cart is empty" 
          message="Discover our premium selection and add items to begin checkout." 
        />
        <div className="mt-6 flex justify-center w-full absolute top-[60vh]">
          <Button onClick={() => router.push("/products")} className="rounded-full bg-brand-gold text-brand-black hover:bg-brand-gold/90 px-8">
            Explore Products
          </Button>
        </div>
      </div>
    );
  }

  if (paymentFailed) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 max-w-xl mx-auto text-center space-y-6">
        <div className="h-24 w-24 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-2">
          <XCircle className="h-12 w-12" />
        </div>
        <h2 className="text-3xl font-serif tracking-tight">Payment Unsuccessful</h2>
        <p className="text-muted-foreground leading-relaxed text-lg">
          We were unable to process your transaction. Your order has been saved, but payment is required to complete the purchase.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4">
          <Button onClick={() => setPaymentFailed(false)} className="h-14 px-10 rounded-full bg-brand-gold text-brand-black hover:bg-brand-gold/90 shadow-premium text-base font-semibold">
            Try Payment Again
          </Button>
          <Button onClick={() => router.push("/account/orders")} variant="outline" className="h-14 px-10 rounded-full text-base font-semibold border-border hover:bg-muted">
            View Order History
          </Button>
        </div>
      </div>
    );
  }

  const freeShippingThreshold = 99900; // ₹999
  const isFreeShipping = summary.subtotal >= freeShippingThreshold;
  const amountNeeded = Math.max(0, freeShippingThreshold - summary.subtotal);

  return (
    <>
      <PaymentLoader isVisible={isProcessing} />
      
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start pb-24 lg:pb-0">
        
        {/* Left Column: Form Flow */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-10">
          
          <div className="space-y-2">
            <h2 className="text-2xl font-serif tracking-tight flex items-center gap-2">
              <MapPin className="h-5 w-5 text-brand-gold" /> Delivery Details
            </h2>
            <p className="text-sm text-muted-foreground">Please enter your shipping information below.</p>
          </div>
          
          <form id="checkout-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6 bg-card border border-border/50 p-6 md:p-8 rounded-2xl shadow-premium">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2.5">
                  <Label htmlFor="full_name" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Full Name</Label>
                  <Input 
                    id="full_name" 
                    {...form.register("full_name")} 
                    placeholder="Enter your name" 
                    className="h-12 bg-background border-border/60 focus:border-brand-gold focus:ring-brand-gold/20 rounded-xl"
                  />
                  {form.formState.errors.full_name && <span className="text-xs text-destructive font-medium">{form.formState.errors.full_name.message}</span>}
                </div>
                <div className="space-y-2.5">
                  <Label htmlFor="phone" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Phone Number</Label>
                  <Input 
                    id="phone" 
                    {...form.register("phone")} 
                    placeholder="10-digit mobile number" 
                    className="h-12 bg-background border-border/60 focus:border-brand-gold focus:ring-brand-gold/20 rounded-xl"
                  />
                  {form.formState.errors.phone && <span className="text-xs text-destructive font-medium">{form.formState.errors.phone.message}</span>}
                </div>
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="address_line_1" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Street Address</Label>
                <Input 
                  id="address_line_1" 
                  {...form.register("address_line_1")} 
                  placeholder="House number, building, street" 
                  className="h-12 bg-background border-border/60 focus:border-brand-gold focus:ring-brand-gold/20 rounded-xl"
                />
                {form.formState.errors.address_line_1 && <span className="text-xs text-destructive font-medium">{form.formState.errors.address_line_1.message}</span>}
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="address_line_2" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Apartment, Suite, etc. (Optional)</Label>
                <Input 
                  id="address_line_2" 
                  {...form.register("address_line_2")} 
                  placeholder="Apartment, suite, unit, etc." 
                  className="h-12 bg-background border-border/60 focus:border-brand-gold focus:ring-brand-gold/20 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="space-y-2.5 col-span-2 md:col-span-1">
                  <Label htmlFor="city" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">City</Label>
                  <Input 
                    id="city" 
                    {...form.register("city")} 
                    placeholder="City" 
                    className="h-12 bg-background border-border/60 focus:border-brand-gold focus:ring-brand-gold/20 rounded-xl"
                  />
                  {form.formState.errors.city && <span className="text-xs text-destructive font-medium">{form.formState.errors.city.message}</span>}
                </div>
                <div className="space-y-2.5">
                  <Label htmlFor="state" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">State</Label>
                  <Input 
                    id="state" 
                    {...form.register("state")} 
                    placeholder="State" 
                    className="h-12 bg-background border-border/60 focus:border-brand-gold focus:ring-brand-gold/20 rounded-xl"
                  />
                  {form.formState.errors.state && <span className="text-xs text-destructive font-medium">{form.formState.errors.state.message}</span>}
                </div>
                <div className="space-y-2.5">
                  <Label htmlFor="pincode" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">PIN Code</Label>
                  <Input 
                    id="pincode" 
                    {...form.register("pincode")} 
                    placeholder="PIN Code" 
                    className="h-12 bg-background border-border/60 focus:border-brand-gold focus:ring-brand-gold/20 rounded-xl"
                  />
                  {form.formState.errors.pincode && <span className="text-xs text-destructive font-medium">{form.formState.errors.pincode.message}</span>}
                </div>
              </div>
            </div>
          </form>

          <div className="hidden lg:block">
            <TrustIndicators />
          </div>
        </div>

        {/* Right Column: Sticky Order Summary */}
        <div className="lg:col-span-5 xl:col-span-5 relative">
          <div className="sticky top-24 space-y-6">
            
            <div className="bg-card border border-border/50 rounded-2xl shadow-premium overflow-hidden">
              <div className="p-6 md:p-8 bg-muted/20 border-b border-border/50">
                <h3 className="text-xl font-serif tracking-tight mb-6">Order Summary</h3>
                
                <div className="space-y-5 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-border">
                  {summary.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="relative h-16 w-16 bg-muted rounded-md border border-border/50 shrink-0 overflow-hidden">
                         {/* Placeholder image */}
                         <div className="absolute inset-0 bg-brand-black/5 dark:bg-brand-white/5" />
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <h4 className="font-medium text-sm leading-tight truncate">{item.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-medium text-sm pt-1 whitespace-nowrap">{formatPrice(item.subtotal)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(summary.subtotal)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  {summary.delivery_fee === 0 || isFreeShipping ? (
                    <span className="font-medium text-brand-gold">Complimentary</span>
                  ) : (
                    <span className="font-medium">{formatPrice(summary.delivery_fee)}</span>
                  )}
                </div>

                {!isFreeShipping && amountNeeded > 0 && (
                  <div className="bg-brand-gold/10 text-brand-gold text-xs p-3 rounded-lg flex items-center justify-between">
                    <span>Add {formatPrice(amountNeeded)} for free shipping</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-5 border-t border-border/50 mt-2">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold tracking-tight">{formatPrice(isFreeShipping ? summary.subtotal : summary.total)}</span>
                </div>
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block space-y-4">
              <Button 
                type="submit" 
                form="checkout-form"
                disabled={createOrder.isPending || isProcessing}
                className="w-full h-14 text-base font-bold bg-brand-black dark:bg-brand-white text-brand-white dark:text-brand-black hover:bg-brand-black/90 dark:hover:bg-brand-white/90 rounded-full shadow-premium flex items-center justify-center transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {createOrder.isPending || isProcessing ? (
                  "Securely Processing..."
                ) : (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" /> Pay Securely Now
                  </>
                )}
              </Button>
              <SecureCheckoutBadge />
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t border-border/50 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-40 pb-safe">
        <div className="flex items-center justify-between mb-3 px-2">
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-lg font-bold">{formatPrice(isFreeShipping ? summary.subtotal : summary.total)}</p>
          </div>
          <p className="text-xs text-brand-gold font-medium">Secure checkout</p>
        </div>
        <Button 
          type="submit" 
          form="checkout-form"
          disabled={createOrder.isPending || isProcessing}
          className="w-full h-14 text-base font-bold bg-brand-gold text-brand-black hover:bg-brand-gold/90 rounded-full shadow-premium flex items-center justify-center"
        >
          {createOrder.isPending || isProcessing ? "Processing..." : "Complete Purchase"}
        </Button>
      </div>
      
      <div className="lg:hidden mt-8 mb-12">
        <TrustIndicators />
      </div>
    </>
  );
}
