"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/storefront/scroll-reveal";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Are your products 100% natural?",
    answer: "Yes. We never use artificial flavours, preservatives, or colours. What you see on the ingredient list is exactly what you get—pure, honest nutrition."
  },
  {
    question: "How long is the shelf life?",
    answer: "Unopened, our products stay fresh for up to 9 months. Once opened, we recommend consuming them within 3 months and storing them in a cool, dry place to maintain peak freshness."
  },
  {
    question: "When will my order arrive?",
    answer: "We process all orders within 24 hours. Standard delivery takes 3-5 business days depending on your location. You'll receive a tracking link as soon as your order ships."
  },
  {
    question: "Do you accept returns?",
    answer: "Because our products are food items, we cannot accept returns once opened. However, if your order arrives damaged or you're unsatisfied with the quality, contact us within 7 days and we'll make it right."
  }
];

export function ProductFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-8 max-w-4xl">
        <ScrollReveal className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3 block">
            Common Questions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Frequently Asked
          </h2>
        </ScrollReveal>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div 
                  className={cn(
                    "border rounded-2xl overflow-hidden transition-colors duration-300",
                    isOpen ? "border-brand-gold/30 bg-card shadow-sm" : "border-border hover:border-foreground/30 bg-background"
                  )}
                >
                  <button
                    onClick={() => toggleOpen(i)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                  >
                    <span className="font-semibold text-lg pr-8">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="shrink-0"
                    >
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                      >
                        <div className="px-6 md:px-8 pb-6 md:pb-8 text-muted-foreground leading-relaxed pt-0">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
