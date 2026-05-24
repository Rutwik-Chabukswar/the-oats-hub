"use client";

import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal";
import { Flame, Wheat, Droplets, Sun } from "lucide-react";
import { CinematicHeader } from "@/components/ui/cinematic-header";

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

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-brand-white/[0.04] rounded-2xl overflow-hidden shadow-2xl">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <StaggerItem key={b.title}>
                <div className="p-12 md:p-16 bg-[#0F0D0A] group hover:bg-[#13110C] transition-colors duration-700 h-full">
                  <Icon className="h-6 w-6 text-brand-gold/70 group-hover:text-brand-gold mb-6 transition-colors duration-700" />
                  <h3 className="font-serif text-2xl text-brand-white tracking-tight mb-3">
                    {b.title}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-brand-white/40 font-light max-w-sm">
                    {b.description}
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
