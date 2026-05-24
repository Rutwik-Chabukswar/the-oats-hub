"use client";

import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal";
import { ShieldCheck, Recycle, Award, Zap } from "lucide-react";
import { CinematicHeader } from "@/components/ui/cinematic-header";

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
    <section className="py-24 md:py-32 bg-brand-black border-t border-brand-white/[0.02]">
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

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <StaggerItem key={reason.title}>
                <div className="group p-10 md:p-12 rounded-2xl border border-brand-white/[0.04] bg-[#0F0D0A] transition-all duration-500 hover:border-brand-gold/20 hover:bg-[#13110C]">
                  <div className="h-12 w-12 rounded-full border border-brand-gold/20 flex items-center justify-center mb-8 transition-colors duration-500 group-hover:border-brand-gold/50 group-hover:bg-brand-gold/5">
                    <Icon className="h-5 w-5 text-brand-gold/80 group-hover:text-brand-gold transition-colors duration-500" />
                  </div>
                  <h3 className="font-serif text-2xl text-brand-white tracking-tight mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-brand-white/50 font-light">
                    {reason.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
