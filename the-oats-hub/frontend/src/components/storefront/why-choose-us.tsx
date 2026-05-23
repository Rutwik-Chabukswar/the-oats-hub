"use client";

import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal";
import { ShieldCheck, Recycle, Award, Zap } from "lucide-react";

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
    <section className="py-24 md:py-32 bg-background">
      <div className="container px-6 md:px-8 mx-auto max-w-6xl">
        <ScrollReveal className="text-center mb-20">
          <span className="text-xs tracking-[0.25em] uppercase text-brand-gold/70 font-medium">
            The Difference
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Why The Oats Hub?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
            We believe nutrition should be pure, transparent, and extraordinary.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <StaggerItem key={reason.title}>
                <div className="group p-8 rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:border-brand-gold/20 hover:shadow-[0_8px_30px_-12px_rgba(201,168,76,0.08)]">
                  <div className="h-11 w-11 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-5 transition-colors group-hover:bg-brand-gold/15">
                    <Icon className="h-5 w-5 text-brand-gold" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground tracking-tight">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
