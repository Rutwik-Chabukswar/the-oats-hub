"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Package, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

interface SuccessStateProps {
  order: any;
}

export function SuccessState({ order }: SuccessStateProps) {
  useEffect(() => {
    const duration = 3.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Confetti colors matching luxury aesthetic: Gold, White, Dark Gold
      const colors = ['#C9A84C', '#ffffff', '#8E793E'];

      confetti({
        ...defaults, particleCount,
        colors,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        colors,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const whatsappMessage = encodeURIComponent(
    "I just ordered from The Oats Hub! Their clean label ingredients and premium quality look amazing. Check them out: https://the-oats-hub.com"
  );
  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;

  // estimate delivery 3 days from now
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const formattedDelivery = deliveryDate.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 max-w-5xl mx-auto w-full relative z-10">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
        className="text-brand-gold mb-8"
      >
        <CheckCircle2 className="h-24 w-24 drop-shadow-[0_0_30px_rgba(201,168,76,0.3)]" />
      </motion.div>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center space-y-4 mb-14"
      >
        <h2 className="text-sm font-semibold tracking-[0.3em] uppercase text-brand-gold mb-2">Order Confirmed</h2>
        <h1 className="text-6xl md:text-8xl font-serif tracking-tight text-brand-white leading-none">
          {order.order_number || "ORD-0000"}
        </h1>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full bg-[#0F0D0A] border border-brand-white/[0.05] shadow-2xl rounded-3xl overflow-hidden mb-14 flex flex-col md:flex-row"
      >
        <div className="p-10 md:p-14 flex-1 border-b md:border-b-0 md:border-r border-brand-white/[0.05] flex flex-col justify-center items-center text-center">
            <Package className="h-10 w-10 text-brand-white/40 mb-5" />
            <h4 className="text-brand-white/60 text-sm uppercase tracking-widest font-medium mb-3">Estimated Delivery</h4>
            <p className="text-3xl md:text-4xl font-serif text-brand-gold mb-2">
              {formattedDelivery}
            </p>
            <p className="text-brand-white/40 text-sm mt-2">
              Standard Shipping (Pan-India)
            </p>
        </div>

        <div className="p-10 md:p-14 flex-1 bg-[#13110C] flex flex-col justify-center items-center text-center">
            <MessageCircle className="h-10 w-10 text-[#25D366] mb-5" />
            <h4 className="text-brand-white/60 text-sm uppercase tracking-widest font-medium mb-3">Spread the Word</h4>
            <p className="text-brand-white/80 text-lg mb-8 leading-relaxed max-w-sm">
              Loved your experience? Tell a friend about The Oats Hub and share the wellness journey.
            </p>
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors font-semibold tracking-wide"
            >
              Share via WhatsApp
            </a>
        </div>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex justify-center"
      >
        <Link href="/products">
          <Button className="h-16 px-12 rounded-full bg-brand-white text-brand-black hover:bg-brand-white/90 shadow-[0_0_40px_rgba(255,255,255,0.1)] text-lg font-bold tracking-wide transition-transform hover:scale-105 active:scale-95">
            Explore More <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
