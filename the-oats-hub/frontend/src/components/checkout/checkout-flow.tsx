"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useCheckoutSummary, useCreateOrder } from "@/hooks/useCheckout";
import { useVerifyPayment } from "@/hooks/usePayment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/utils/format";
import { EmptyState } from "@/components/ui/error-state";
import { CheckCircle2, ShieldCheck, Truck, XCircle } from "lucide-react";
import { env } from "@/lib/env";

// Address Form Schema
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

// Helper to load external scripts
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

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      save_as_default: false,
    },
  });

  const onSubmit = async (data: AddressFormValues) => {
    // 1. Load Razorpay script
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // 2. Create the Order on backend (locks inventory)
    createOrder.mutate(
      { shipping_address: data },
      {
        onSuccess: (orderData: any) => {
          if (!orderData.razorpay_order_id) {
            // Free orders or bypass logic
            setOrderComplete({ ...orderData, payment_status: "paid" });
            return;
          }

          // 3. Configure Razorpay Pop-up
          const options = {
            key: env.RAZORPAY_KEY_ID,
            amount: orderData.total_amount, // Amount is in paise
            currency: "INR",
            name: "The Oats Hub",
            description: "Premium Nutrition Order",
            image: "/logo.png",
            order_id: orderData.razorpay_order_id,
            handler: function (response: any) {
              // 4. Verify payment via backend
              verifyPayment.mutate(
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                },
                {
                  onSuccess: () => {
                    setOrderComplete({ ...orderData, payment_status: "paid" });
                  },
                  onError: () => {
                    setPaymentFailed(true);
                  }
                }
              );
            },
            prefill: {
              name: data.full_name,
              contact: data.phone,
            },
            theme: {
              color: "#D4AF37", // brand-gold
            },
          };

          const paymentObject = new (window as any).Razorpay(options);
          
          paymentObject.on("payment.failed", function (response: any) {
            console.error("Payment failed", response.error);
            setPaymentFailed(true);
          });

          paymentObject.open();
        },
      }
    );
  };

  if (orderComplete) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-black rounded-2xl shadow-sm border border-border text-center max-w-2xl mx-auto">
        <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Order Confirmed!</h2>
        <p className="text-muted-foreground mb-6">
          Thank you for your purchase. Your order <span className="font-semibold text-foreground">{orderComplete.order_number}</span> is being processed.
        </p>
        <div className="bg-muted w-full p-4 rounded-lg mb-8 text-left space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount Paid</span>
            <span className="font-semibold">{formatPrice(orderComplete.total_amount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Status</span>
            <span className="font-semibold capitalize text-brand-gold">{orderComplete.payment_status}</span>
          </div>
        </div>
        <Button onClick={() => router.push("/products")} className="bg-brand-gold text-brand-black hover:bg-brand-gold/90 w-full md:w-auto px-12 h-12 rounded-full">
          Continue Shopping
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-gold border-t-transparent"></div>
      </div>
    );
  }

  if (error || !summary) {
    return (
      <EmptyState 
        title="Your cart is empty" 
        message="Add some items to your cart before checking out." 
      />
    );
  }

  if (paymentFailed) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-black rounded-2xl shadow-sm border border-destructive/20 text-center max-w-2xl mx-auto">
        <div className="h-20 w-20 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-6">
          <XCircle className="h-10 w-10" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Payment Failed</h2>
        <p className="text-muted-foreground mb-6">
          We couldn't process your payment. Your order was created, but payment was not captured.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Button onClick={() => setPaymentFailed(false)} variant="outline" className="h-12 px-8 rounded-full">
            Try Again
          </Button>
          <Button onClick={() => router.push("/profile/orders")} className="h-12 px-8 rounded-full">
            View My Orders
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Form */}
      <div className="lg:col-span-7 xl:col-span-8 bg-white dark:bg-black p-6 md:p-8 rounded-2xl border border-border shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Truck className="h-5 w-5 text-brand-gold" />
          <h2 className="text-xl font-bold">Shipping Details</h2>
        </div>
        
        <form id="checkout-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input id="full_name" {...form.register("full_name")} placeholder="John Doe" />
              {form.formState.errors.full_name && <span className="text-xs text-destructive">{form.formState.errors.full_name.message}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" {...form.register("phone")} placeholder="+91 98765 43210" />
              {form.formState.errors.phone && <span className="text-xs text-destructive">{form.formState.errors.phone.message}</span>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address_line_1">Address Line 1</Label>
            <Input id="address_line_1" {...form.register("address_line_1")} placeholder="Flat, House no., Building, Company" />
            {form.formState.errors.address_line_1 && <span className="text-xs text-destructive">{form.formState.errors.address_line_1.message}</span>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address_line_2">Address Line 2 (Optional)</Label>
            <Input id="address_line_2" {...form.register("address_line_2")} placeholder="Area, Street, Sector, Village" />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" {...form.register("city")} placeholder="Mumbai" />
              {form.formState.errors.city && <span className="text-xs text-destructive">{form.formState.errors.city.message}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" {...form.register("state")} placeholder="Maharashtra" />
              {form.formState.errors.state && <span className="text-xs text-destructive">{form.formState.errors.state.message}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode</Label>
              <Input id="pincode" {...form.register("pincode")} placeholder="400001" />
              {form.formState.errors.pincode && <span className="text-xs text-destructive">{form.formState.errors.pincode.message}</span>}
            </div>
          </div>
        </form>
      </div>

      {/* Right Column: Summary */}
      <div className="lg:col-span-5 xl:col-span-4 space-y-6">
        <div className="bg-white dark:bg-black p-6 rounded-2xl border border-border shadow-sm">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
            {summary.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start gap-4">
                <div>
                  <h4 className="font-medium text-sm leading-tight">{item.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">Qty: {item.quantity}</p>
                </div>
                <span className="font-medium text-sm whitespace-nowrap">{formatPrice(item.subtotal)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-border">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">{formatPrice(summary.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery</span>
              <span className="font-medium text-brand-gold">{summary.delivery_fee === 0 ? "FREE" : formatPrice(summary.delivery_fee)}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-border mt-3 text-lg font-bold">
              <span>Total</span>
              <span>{formatPrice(summary.total)}</span>
            </div>
          </div>

          <Button 
            type="submit" 
            form="checkout-form"
            disabled={createOrder.isPending}
            className="w-full h-14 mt-8 text-base font-bold bg-brand-gold text-brand-black hover:bg-brand-gold/90 rounded-full shadow-premium"
          >
            {createOrder.isPending ? "Processing..." : "Place Order & Pay"}
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1">
            <ShieldCheck className="h-4 w-4" />
            Secure Encrypted Checkout
          </p>
        </div>
      </div>
    </div>
  );
}
