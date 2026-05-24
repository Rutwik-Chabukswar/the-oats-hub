"use client";

import { useState } from "react";
import { ScrollReveal } from "./scroll-reveal";
import { Flame, Wheat, Droplets, Sun, ChevronDown } from "lucide-react";
import { CinematicHeader } from "@/components/ui/cinematic-header";
import { motion, AnimatePresence } from "framer-motion";

const benefits = [
  {
    icon: Wheat,
    title: "Whole Grain Goodness",
    description: "Slow-digesting complex carbohydrates that keep you energised throughout the day without the crash.",
  },
  {
    icon: Flame,
    title: "Metabolism Boost",
    description: "Rich in fibre and protein to naturally support your metabolic health and sustained energy levels.",
  },
  {
    icon: Droplets,
    title: "Zero Added Sugar",
    description: "We never add refined sugars. Our products derive natural sweetness from whole food ingredients only.",
  },
  {
    icon: Sun,
    title: "Morning Ritual",
    description: "Designed to be the cornerstone of your morning routine — simple, nourishing, and deeply satisfying.",
  },
];

export function ProductBenefits() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 bg-brand-black relative overflow-hidden">
      {/* Accent gradient */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(201,168,76,0.03)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

      <div className="container relative px-6 md:px-12 mx-auto max-w-7xl">
        <ScrollReveal className="text-center mb-20 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-6 bg-brand-gold/50" />
            <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-brand-gold/70 font-medium">
              The Benefits
            </span>
            <div className="h-[1px] w-6 bg-brand-gold/50" />
          </div>
          <CinematicHeader className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1] text-brand-white">
            More than just <span className="italic text-brand-white/40">oats.</span>
          </CinematicHeader>
        </ScrollReveal>

        <ScrollReveal className="max-w-4xl mx-auto border-t border-brand-white/10">
          {benefits.map((b, idx) => {
            const isActive = activeIndex === idx;
            const number = (idx + 1).toString().padStart(2, "0");
            const Icon = b.icon;

            return (
              <div
                key={b.title}
                onClick={() => setActiveIndex(isActive ? null : idx)}
                className={`group cursor-pointer border-b border-brand-white/10 transition-all duration-500 overflow-hidden border-l-2 ${
                  isActive ? "bg-brand-white/[0.02] border-l-brand-gold" : "hover:bg-brand-white/[0.01] border-l-transparent"
                }`}
              >
                <div className="flex items-center justify-between p-6 md:p-10 transition-all duration-500">
                  <div className="flex items-center gap-6 md:gap-10">
                    <span className={`font-serif text-2xl md:text-3xl transition-colors duration-500 ${isActive ? "text-brand-gold" : "text-brand-white/20 group-hover:text-brand-white/40"}`}>
                      {number}
                    </span>
                    <div className="flex items-center gap-4 md:gap-6">
                      <div className={`hidden sm:flex p-2 md:p-3 rounded-full border transition-all duration-500 ${isActive ? "border-brand-gold/40 bg-brand-gold/10" : "border-brand-white/10 group-hover:border-brand-white/20"}`}>
                        <Icon className={`h-4 w-4 md:h-5 md:w-5 transition-colors duration-500 ${isActive ? "text-brand-gold" : "text-brand-white/40 group-hover:text-brand-white/70"}`} />
                      </div>
                      <h3 className={`font-serif text-xl sm:text-2xl md:text-3xl tracking-tight transition-colors duration-500 ${isActive ? "text-brand-white" : "text-brand-white/70 group-hover:text-brand-white"}`}>
                        {b.title}
                      </h3>
                    </div>
                  </div>
                  
                  <ChevronDown className={`h-5 w-5 text-brand-white/30 transition-transform duration-500 ${isActive ? "rotate-180 text-brand-gold/70" : ""}`} />
                </div>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-6 sm:pl-[6.5rem] md:pl-[9.5rem] pr-6 md:pr-10 pb-8 md:pb-10 -mt-2">
                        <p className="text-base md:text-lg text-brand-white/50 leading-relaxed font-light max-w-2xl">
                          {b.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
