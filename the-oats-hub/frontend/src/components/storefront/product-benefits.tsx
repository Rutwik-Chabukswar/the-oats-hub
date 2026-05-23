"use client";

import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal";
import { Flame, Wheat, Droplets, Sun } from "lucide-react";

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
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-gold/[0.02] blur-3xl" />

      <div className="container relative px-6 md:px-8 mx-auto max-w-6xl">
        <ScrollReveal className="text-center mb-20">
          <span className="text-xs tracking-[0.25em] uppercase text-brand-gold/70 font-medium">
            The Benefits
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-brand-white">
            More than just oats.
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-brand-white/5 rounded-2xl overflow-hidden">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <StaggerItem key={b.title}>
                <div className="p-10 bg-brand-black group hover:bg-brand-white/[0.02] transition-colors">
                  <Icon className="h-6 w-6 text-brand-gold mb-5" />
                  <h3 className="text-lg font-semibold text-brand-white tracking-tight">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-white/45">
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
