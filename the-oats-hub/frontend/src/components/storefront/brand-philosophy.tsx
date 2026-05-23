"use client";

import { ScrollReveal } from "./scroll-reveal";
import { Leaf, Sparkles, Heart } from "lucide-react";

const pillars = [
  {
    icon: Leaf,
    label: "Clean Ingredients",
    headline: "Nothing to Hide",
    body: "Every product is crafted with 100% natural, clean-label ingredients. No artificial flavours, no added sugars, no preservatives — just pure, honest nutrition.",
  },
  {
    icon: Sparkles,
    label: "Premium Quality",
    headline: "Uncompromising Standards",
    body: "We source only the finest rolled oats and artisan peanut butters from trusted producers. Quality isn't a feature — it's the foundation.",
  },
  {
    icon: Heart,
    label: "Wellness First",
    headline: "Designed for You",
    body: "From macros to micronutrients, every product is formulated for peak performance. Fuel your body with nutrition that loves you back.",
  },
];

export function BrandPhilosophy() {
  return (
    <section className="py-24 md:py-32 bg-brand-black">
      <div className="container px-6 md:px-8 mx-auto max-w-6xl">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-20">
          <span className="text-xs tracking-[0.25em] uppercase text-brand-gold/70 font-medium">
            Our Philosophy
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-brand-white">
            Built on principles,<br className="hidden sm:block" /> not shortcuts.
          </h2>
        </ScrollReveal>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={pillar.label} delay={i * 0.12}>
                <div className="flex flex-col items-start">
                  <div className="h-12 w-12 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-6">
                    <Icon className="h-5 w-5 text-brand-gold" />
                  </div>
                  <span className="text-[11px] tracking-[0.2em] uppercase text-brand-gold/60 font-medium">
                    {pillar.label}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold text-brand-white tracking-tight">
                    {pillar.headline}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-white/50">
                    {pillar.body}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
