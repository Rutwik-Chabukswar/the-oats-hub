"use client";

import { Leaf, Flame, Activity } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/storefront/scroll-reveal";

interface NutritionSectionProps {
  category?: string;
}

const fdaData = {
  servingsPerContainer: "About 10",
  servingSize: "1/2 cup (50g)",
  calories: 190,
  nutrients: [
    { name: "Total Fat", amount: "3.5g", dv: "4%", isBold: true },
    { name: "Saturated Fat", amount: "0.5g", dv: "3%", isBold: false, indent: true },
    { name: "Trans Fat", amount: "0g", dv: "", isBold: false, indent: true },
    { name: "Cholesterol", amount: "0mg", dv: "0%", isBold: true },
    { name: "Sodium", amount: "0mg", dv: "0%", isBold: true },
    { name: "Total Carbohydrate", amount: "34g", dv: "12%", isBold: true },
    { name: "Dietary Fiber", amount: "5g", dv: "18%", isBold: false, indent: true },
    { name: "Total Sugars", amount: "1g", dv: "", isBold: false, indent: true },
    { name: "Includes 0g Added Sugars", amount: "", dv: "0%", isBold: false, indent: true, isDoubleIndent: true },
    { name: "Protein", amount: "7g", dv: "", isBold: true, hideThinLine: true },
  ],
  vitamins: [
    { name: "Vitamin D", amount: "0mcg", dv: "0%" },
    { name: "Calcium", amount: "20mg", dv: "2%" },
    { name: "Iron", amount: "1.8mg", dv: "10%" },
    { name: "Potassium", amount: "170mg", dv: "4%" },
  ]
};

function FdaLabel({ data = fdaData }: { data?: any }) {
  return (
    <div className="bg-white text-black p-4 md:p-6 border-[2px] border-black font-sans w-full max-w-[360px] mx-auto shadow-sm">
      <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-1 leading-none font-sans">Nutrition Facts</h2>
      <div className="text-base leading-tight mb-2 border-b-[8px] border-black pb-2">
        <div>{data.servingsPerContainer} servings per container</div>
        <div className="font-bold flex justify-between text-xl mt-1">
          <span>Serving size</span>
          <span>{data.servingSize}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-end mb-1 border-b-[4px] border-black pb-1">
        <div>
          <div className="font-bold text-sm leading-none">Amount per serving</div>
          <div className="font-black text-4xl leading-none mt-1">Calories</div>
        </div>
        <div className="font-black text-5xl leading-none">{data.calories}</div>
      </div>
      
      <div className="text-right text-xs font-bold pb-1 border-b border-black">
        % Daily Value*
      </div>
      
      {data.nutrients.map((n: any, idx: number) => (
        <div key={idx} className={`flex justify-between text-[13px] md:text-sm py-1 ${!n.hideThinLine ? 'border-b border-black' : ''} ${n.indent && !n.isDoubleIndent ? 'pl-4' : ''} ${n.isDoubleIndent ? 'pl-8' : ''}`}>
          <div>
            <span className={n.isBold ? "font-bold" : ""}>{n.name}</span> {n.amount}
          </div>
          <div className="font-bold">{n.dv}</div>
        </div>
      ))}
      
      <div className="w-full bg-black h-[8px] mb-1 mt-1" />
      
      {data.vitamins.map((v: any, idx: number) => (
        <div key={idx} className="flex justify-between text-[13px] md:text-sm py-1 border-b border-black">
          <div>{v.name} {v.amount}</div>
          <div>{v.dv}</div>
        </div>
      ))}
      
      <p className="text-[10px] leading-tight mt-2 text-black/70">
        * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
      </p>
    </div>
  );
}

export function NutritionSection({ category: _category }: NutritionSectionProps) {
  const macros = [
    { label: "Protein", value: "24g", icon: Activity },
    { label: "Dietary Fibre", value: "8g", icon: Leaf },
    { label: "Calories", value: "190", icon: Flame },
  ];

  return (
    <section className="py-24 bg-background border-t border-border/50">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Macros & Overview */}
          <div>
            <ScrollReveal>
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                Clinical Precision.
              </h2>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                Our labels aren't an afterthought. We provide complete macro and micro-nutrient transparency, rigorously tested and FDA-compliant. Exactly what you need to fuel your regimen.
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

          {/* Right Column: Authentic FDA Label */}
          <div className="relative">
            {/* Subtle highlight behind the label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-brand-white/5 rounded-full blur-[80px]" />
            <ScrollReveal delay={0.2} className="relative z-10 flex justify-center">
              <FdaLabel />
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
