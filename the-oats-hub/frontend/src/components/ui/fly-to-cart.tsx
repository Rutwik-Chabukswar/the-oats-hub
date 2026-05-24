"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export interface FlyToCartEventDetail {
  id: string;
  imageUrl: string;
  startRect: DOMRect;
}

export function FlyToCart() {
  const [items, setItems] = useState<FlyToCartEventDetail[]>([]);

  useEffect(() => {
    const handleFlyToCart = (e: CustomEvent<FlyToCartEventDetail>) => {
      setItems((prev) => [...prev, e.detail]);

      // Remove the item after animation completes (approx 1s)
      setTimeout(() => {
        setItems((prev) => prev.filter((item) => item.id !== e.detail.id));
        
        // Trigger bounce on cart icon
        const cartIcon = document.getElementById("nav-cart-icon");
        if (cartIcon) {
          cartIcon.classList.add("cart-bounce-animation");
          setTimeout(() => {
            cartIcon.classList.remove("cart-bounce-animation");
          }, 300);
        }
      }, 800); // 800ms animation duration
    };

    window.addEventListener("fly-to-cart" as any, handleFlyToCart);
    return () => {
      window.removeEventListener("fly-to-cart" as any, handleFlyToCart);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <AnimatePresence>
        {items.map((item) => {
          const cartIcon = document.getElementById("nav-cart-icon");
          const endRect = cartIcon?.getBoundingClientRect() || {
            top: 20,
            left: window.innerWidth - 60,
            width: 40,
            height: 40,
          };

          return (
            <motion.div
              key={item.id}
              initial={{
                top: item.startRect.top,
                left: item.startRect.left,
                width: item.startRect.width,
                height: item.startRect.height,
                opacity: 0.8,
                scale: 1,
              }}
              animate={{
                top: endRect.top,
                left: endRect.left,
                width: endRect.width,
                height: endRect.height,
                opacity: 0,
                scale: 0.2,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1], // Cinematic ease
              }}
              className="absolute rounded-xl overflow-hidden shadow-2xl z-[100]"
            >
              <Image
                src={item.imageUrl}
                alt="Flying product"
                fill
                className="object-cover"
                unoptimized
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
