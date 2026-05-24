"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface Ingredient {
  id: string;
  name: string;
  percentage: number;
  description: string;
  color: string;
  size: number; // visual size multiplier
}

const ingredients: Ingredient[] = [
  {
    id: "oats",
    name: "Premium Rolled Oats",
    percentage: 65,
    description: "Sustainably sourced, rich in beta-glucan fiber for lasting energy and heart health.",
    color: "bg-brand-gold",
    size: 240,
  },
  {
    id: "protein",
    name: "Whey Protein Isolate",
    percentage: 20,
    description: "Ultra-filtered, fast-absorbing protein to support muscle recovery.",
    color: "bg-[#8E793E]",
    size: 140,
  },
  {
    id: "nuts",
    name: "Almonds & Chia Seeds",
    percentage: 10,
    description: "Packed with essential omega-3s, healthy fats, and satisfying crunch.",
    color: "bg-[#6A5A2B]",
    size: 100,
  },
  {
    id: "cacao",
    name: "Raw Cacao",
    percentage: 4,
    description: "Antioxidant-rich organic cacao for deep, indulgent chocolate flavor.",
    color: "bg-[#4A3B22]",
    size: 70,
  },
  {
    id: "sweetener",
    name: "Monk Fruit Extract",
    percentage: 1,
    description: "A zero-calorie, natural plant extract that provides perfect sweetness without the insulin spike.",
    color: "bg-[#2B261A]",
    size: 50,
  },
];

export function IngredientTransparency() {
  const [activeIngredient, setActiveIngredient] = useState<Ingredient | null>(null);

  return (
    <section className="py-20 md:py-32 bg-[#0A0A0A] border-y border-brand-white/[0.04] relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-brand-white mb-6">
            100% Transparent. Zero Compromises.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            We believe in radical transparency. Every ingredient serves a physiological purpose. 
            No fillers, no artificial preservatives, no hidden proprietary blends.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Interactive Bubble Chart */}
          <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center">
            <div className="relative w-full h-full">
              {ingredients.map((ing, i) => {
                // Hardcoded coordinates for an aesthetic packed-bubble look
                const positions = [
                  { top: "50%", left: "45%", x: "-50%", y: "-50%" }, // Center (Oats)
                  { top: "20%", left: "75%", x: "-50%", y: "-50%" }, // Top Right (Protein)
                  { top: "75%", left: "25%", x: "-50%", y: "-50%" }, // Bottom Left (Nuts)
                  { top: "80%", left: "70%", x: "-50%", y: "-50%" }, // Bottom Right (Cacao)
                  { top: "30%", left: "15%", x: "-50%", y: "-50%" }, // Top Left (Monk Fruit)
                ];
                
                const pos = positions[i];
                const isActive = activeIngredient?.id === ing.id;
                const isFaded = activeIngredient !== null && !isActive;

                return (
                  <motion.div
                    key={ing.id}
                    className={cn(
                      "absolute rounded-full cursor-pointer shadow-premium flex items-center justify-center transition-all duration-500",
                      ing.color,
                      isFaded ? "opacity-30 scale-95" : "opacity-100",
                      isActive ? "ring-4 ring-brand-gold/30 z-20 scale-105" : "hover:scale-105 z-10"
                    )}
                    style={{
                      width: ing.size,
                      height: ing.size,
                      top: pos.top,
                      left: pos.left,
                      x: pos.x,
                      y: pos.y,
                    }}
                    onMouseEnter={() => setActiveIngredient(ing)}
                    onMouseLeave={() => setActiveIngredient(null)}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 100, 
                      damping: 15,
                      delay: i * 0.1 
                    }}
                  >
                    {ing.size >= 100 && (
                      <div className="text-center p-4">
                        <span className="block font-serif text-brand-white text-opacity-90 font-bold leading-tight" style={{ fontSize: ing.size * 0.12 }}>
                          {ing.percentage}%
                        </span>
                        <span className="block text-brand-white text-opacity-80 uppercase tracking-wider font-medium mt-1" style={{ fontSize: ing.size * 0.08 }}>
                          {ing.name}
                        </span>
                      </div>
                    )}
                    {ing.size < 100 && ing.size >= 50 && (
                      <span className="block font-serif text-brand-white text-opacity-90 font-bold" style={{ fontSize: ing.size * 0.25 }}>
                        {ing.percentage}%
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Dynamic Ingredient Detail Panel */}
          <div className="flex flex-col justify-center h-full min-h-[300px]">
            <AnimatePresence mode="wait">
              {activeIngredient ? (
                <motion.div
                  key={activeIngredient.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="bg-brand-white/[0.02] border border-brand-white/[0.05] p-8 md:p-10 rounded-3xl"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-brand-gold/10 text-brand-gold font-serif text-xl font-bold">
                      {activeIngredient.percentage}%
                    </span>
                    <h3 className="text-2xl font-bold text-brand-white">{activeIngredient.name}</h3>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    {activeIngredient.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-brand-gold font-medium uppercase tracking-wider">
                    <Info className="h-4 w-4" />
                    Clean Label Verified
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center p-10 border border-dashed border-brand-white/10 rounded-3xl h-full"
                >
                  <div className="h-16 w-16 rounded-full border-2 border-brand-gold/20 flex items-center justify-center mb-6">
                    <div className="h-2 w-2 rounded-full bg-brand-gold animate-ping" />
                  </div>
                  <h3 className="text-xl font-serif text-brand-white mb-2">Hover over the ingredients</h3>
                  <p className="text-muted-foreground">Interact with the diagram to discover the nutritional purpose behind each component of our formula.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
