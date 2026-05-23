"use client";

import { CheckCircle2, Package, Truck, Home, Circle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OrderTimelineProps {
  status: string; // 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
}

const steps = [
  { id: "pending", label: "Order Placed", icon: CheckCircle2 },
  { id: "processing", label: "Processing", icon: Package },
  { id: "shipped", label: "Shipped", icon: Truck },
  { id: "delivered", label: "Delivered", icon: Home },
];

export function OrderTimeline({ status }: OrderTimelineProps) {
  if (status === "cancelled") {
    return (
      <div className="bg-destructive/10 text-destructive p-4 rounded-xl flex items-center gap-3">
        <Circle className="h-5 w-5" />
        <span className="font-medium">Order Cancelled</span>
      </div>
    );
  }

  // Determine current step index
  let currentIndex = 0;
  if (status === "processing") currentIndex = 1;
  else if (status === "shipped") currentIndex = 2;
  else if (status === "delivered") currentIndex = 3;

  return (
    <div className="relative py-8">
      {/* Background Line */}
      <div className="absolute top-12 left-6 right-6 md:left-[10%] md:right-[10%] h-[2px] bg-border/50 hidden md:block" />
      
      {/* Active Line */}
      <motion.div 
        className="absolute top-12 left-[10%] h-[2px] bg-brand-gold hidden md:block"
        initial={{ width: 0 }}
        animate={{ width: `${(currentIndex / (steps.length - 1)) * 80}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0 px-4 md:px-[10%]">
        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isActive = index === currentIndex;
          const Icon = step.icon;
          
          return (
            <div key={step.id} className="flex md:flex-col items-center gap-4 md:gap-3 group relative">
              {/* Mobile Vertical Line */}
              {index !== steps.length - 1 && (
                <div className="absolute top-12 left-5 bottom-[-2rem] w-[2px] bg-border/50 md:hidden" />
              )}
              {isCompleted && index !== steps.length - 1 && (
                <motion.div 
                  className="absolute top-12 left-5 bottom-[-2rem] w-[2px] bg-brand-gold md:hidden"
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              )}

              <motion.div 
                initial={false}
                animate={{ 
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isCompleted ? "var(--brand-gold)" : "var(--muted)",
                  borderColor: isCompleted ? "var(--brand-gold)" : "var(--border)"
                }}
                className={cn(
                  "h-10 w-10 rounded-full border-2 flex items-center justify-center shrink-0 shadow-sm transition-colors duration-300 z-10",
                  isCompleted ? "bg-brand-gold text-brand-black border-brand-gold" : "bg-card text-muted-foreground border-border"
                )}
                style={{ 
                  '--brand-gold': 'hsl(45, 65%, 53%)',
                  '--muted': 'hsl(var(--muted))',
                  '--border': 'hsl(var(--border))'
                } as any}
              >
                <Icon className={cn("h-5 w-5", isCompleted ? "opacity-100" : "opacity-50")} />
              </motion.div>
              
              <div className="md:text-center">
                <p className={cn(
                  "font-medium text-sm transition-colors",
                  isCompleted ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step.label}
                </p>
                {isActive && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-brand-gold mt-1 font-medium hidden md:block absolute w-32 left-1/2 -translate-x-1/2"
                  >
                    Current Status
                  </motion.p>
                )}
                {isActive && (
                  <p className="text-xs text-brand-gold mt-1 font-medium md:hidden">
                    Current Status
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
