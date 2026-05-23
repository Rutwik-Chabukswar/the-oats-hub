"use client";


import { Leaf, Flame, Activity, CheckCircle2 } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/storefront/scroll-reveal";

interface NutritionSectionProps {
  category?: string;
}

export function NutritionSection({ category: _category }: NutritionSectionProps) {
  // Placeholder data that would normally come from the product model
  const macros = [
    { label: "Protein", value: "24g", icon: Activity },
    { label: "Dietary Fibre", value: "8g", icon: Leaf },
    { label: "Calories", value: "190", icon: Flame },
  ];

  const ingredients = [
    "100% Whole Grain Rolled Oats",
    "Nothing Else."
  ];

  return (
    <section className="py-24 bg-background border-t border-border/50">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Macros & Overview */}
          <div>
            <ScrollReveal>
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                Clean Nutrition Profile
              </h2>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                We believe in complete transparency. Our products are formulated to deliver maximum nutritional value without any artificial compromises.
              </p>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-3 gap-4 mb-12">
              {macros.map((macro, i) => {
                const Icon = macro.icon;
                return (
                  <StaggerItem key={i}>
                    <div className="bg-card border border-border/50 rounded-2xl p-6 text-center shadow-sm">
                      <Icon className="h-6 w-6 text-brand-gold mx-auto mb-3" />
                      <div className="text-2xl font-bold text-foreground mb-1">{macro.value}</div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground font-medium">{macro.label}</div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>

          {/* Right Column: Ingredients list */}
          <div className="bg-brand-black text-brand-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Subtle background element */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl" />
            
            <ScrollReveal delay={0.2}>
              <div className="relative z-10">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-gold mb-4 block">
                  Ingredient Transparency
                </span>
                <h3 className="text-2xl font-bold mb-8">
                  What's inside matters.
                </h3>
                
                <ul className="space-y-6">
                  {ingredients.map((ingredient, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <CheckCircle2 className="h-6 w-6 text-brand-gold shrink-0" />
                      <span className="text-lg text-brand-white/90 leading-snug">{ingredient}</span>
                    </li>
                  ))}
                  
                  {/* Highlight what's NOT inside */}
                  <li className="flex items-start gap-4 pt-4 mt-6 border-t border-brand-white/10 opacity-70">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20 text-red-400 shrink-0 text-sm font-bold">X</span>
                    <span className="text-base text-brand-white/70">No artificial flavours, colours, or preservatives. Zero added refined sugar.</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
