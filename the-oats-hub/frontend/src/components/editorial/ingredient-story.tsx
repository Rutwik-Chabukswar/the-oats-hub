"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface IngredientStoryProps {
  name: string;
  heroImage: string;
  description: string;
  benefits: string[];
  sourcing: string;
  nutritionFacts: { label: string; value: string }[];
}

export function IngredientStory({ 
  name, 
  heroImage, 
  description, 
  benefits, 
  sourcing,
  nutritionFacts
}: IngredientStoryProps) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden rounded-b-[3rem] md:rounded-b-[5rem]">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img src={heroImage} alt={name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="uppercase tracking-widest text-sm font-semibold mb-4 text-brand-gold"
          >
            Our Ingredients
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-8xl font-serif tracking-tight"
          >
            {name}
          </motion.h1>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-5xl py-24 md:py-32">
        {/* Description & Philosophy */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <p className="text-2xl md:text-4xl font-serif leading-relaxed text-foreground">
            {description}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center mb-24 md:mb-32">
          <div className="order-2 md:order-1 space-y-8">
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">Core Benefits</h2>
            <ul className="space-y-6">
              {benefits.map((benefit, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4 text-lg text-muted-foreground"
                >
                  <div className="mt-1 shrink-0 h-6 w-6 rounded-full bg-brand-gold/20 flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-brand-gold" />
                  </div>
                  {benefit}
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="order-1 md:order-2 h-[400px] md:h-[600px] rounded-[2rem] overflow-hidden bg-muted">
            <img src={heroImage} alt={`${name} benefits`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </div>

        {/* Sourcing & Nutrition */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <div className="bg-muted/30 border border-border/50 rounded-3xl p-10 md:p-14">
            <span className="uppercase tracking-widest text-xs font-semibold text-brand-gold mb-6 block">Sourcing Philosophy</span>
            <h3 className="text-2xl md:text-3xl font-serif mb-6 leading-relaxed">{sourcing}</h3>
            <p className="text-muted-foreground leading-relaxed">
              We partner exclusively with sustainable farms that share our vision for uncompromising quality and clean-label integrity.
            </p>
          </div>
          <div className="bg-brand-black text-brand-white dark:bg-brand-white dark:text-brand-black rounded-3xl p-10 md:p-14">
            <span className="uppercase tracking-widest text-xs font-semibold text-brand-gold mb-6 block">Nutrition Profile</span>
            <div className="space-y-6">
              {nutritionFacts.map((fact, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-white/20 dark:border-black/20 pb-4">
                  <span className="font-serif text-xl">{fact.label}</span>
                  <span className="font-mono text-lg">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
