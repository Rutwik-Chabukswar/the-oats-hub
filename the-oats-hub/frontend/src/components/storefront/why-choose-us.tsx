"use client";

import { ScrollReveal } from "./scroll-reveal";
import { ShieldCheck, Recycle, Award, Zap } from "lucide-react";
import { CinematicHeader } from "@/components/ui/cinematic-header";
import { motion } from "framer-motion";

const reasons = [
  {
    icon: Award,
    title: "Premium Sourced",
    description: "Globally sourced, locally crafted with uncompromising quality standards.",
  },
  {
    icon: ShieldCheck,
    title: "Lab Tested",
    description: "Every batch undergoes rigorous quality testing before it reaches you.",
  },
  {
    icon: Zap,
    title: "High Protein",
    description: "Packed with essential macros and micronutrients for peak performance.",
  },
  {
    icon: Recycle,
    title: "Sustainable",
    description: "Eco-conscious packaging and responsible sourcing for a better planet.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 md:py-32 bg-brand-black">
      <div className="container px-6 md:px-8 mx-auto max-w-6xl">
        <ScrollReveal className="text-center mb-20 md:mb-24 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-6 bg-brand-gold/50" />
            <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-brand-gold/70 font-medium">
              The Difference
            </span>
            <div className="h-[1px] w-6 bg-brand-gold/50" />
          </div>
          <CinematicHeader className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05] text-brand-white">
            Why <span className="italic text-brand-white/90">The Oats Hub?</span>
          </CinematicHeader>
          <p className="mt-6 text-brand-white/50 max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed">
            We believe nutrition should be pure, transparent, and extraordinary.
          </p>
        </ScrollReveal>

        <div className="relative flex overflow-hidden w-full -mx-6 px-6 md:mx-0 md:px-0">
          {/* Gradient Masks for Premium Fade */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-brand-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-brand-black to-transparent z-10 pointer-events-none" />
          
          <motion.div
            className="flex gap-6 md:gap-8 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 35, repeat: Infinity }}
          >
            {[...reasons, ...reasons].map((reason, i) => {
              const Icon = reason.icon;
              return (
                <div 
                  key={`${reason.title}-${i}`} 
                  className="w-[280px] md:w-[400px] shrink-0 group p-8 md:p-12 rounded-2xl border border-brand-white/[0.04] bg-[#0F0D0A] transition-all duration-500 hover:border-brand-gold/20 hover:bg-[#13110C]"
                >
                  <div className="h-12 w-12 rounded-full border border-brand-gold/20 flex items-center justify-center mb-8 transition-colors duration-500 group-hover:border-brand-gold/50 group-hover:bg-brand-gold/5">
                    <Icon className="h-5 w-5 text-brand-gold/80 group-hover:text-brand-gold transition-colors duration-500" />
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-brand-white tracking-tight mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-brand-white/50 font-light">
                    {reason.description}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
