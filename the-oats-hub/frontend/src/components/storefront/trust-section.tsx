"use client";

import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal";
import { ShieldCheck, Truck, Star, CreditCard } from "lucide-react";

const trustItems = [
  { icon: ShieldCheck, stat: "100%", label: "Authentic & Natural" },
  { icon: CreditCard, stat: "Secure", label: "Encrypted Payments" },
  { icon: Truck, stat: "Fast", label: "Pan-India Delivery" },
  { icon: Star, stat: "4.9★", label: "Customer Satisfaction" },
];

const testimonials = [
  {
    quote: "The quality of their rolled oats is unlike anything I've tried before. My mornings have completely transformed.",
    name: "Ananya S.",
    title: "Fitness Enthusiast",
  },
  {
    quote: "Finally, peanut butter that's actually clean. No junk, just pure flavour. I'm a customer for life.",
    name: "Rahul M.",
    title: "Health Coach",
  },
  {
    quote: "Beautiful packaging, premium quality, and fast delivery. The Oats Hub sets a new standard for wellness brands.",
    name: "Priya K.",
    title: "Nutritionist",
  },
];

export function TrustSection() {
  return (
    <section className="py-24 md:py-32 bg-brand-black">
      <div className="container px-6 md:px-8 mx-auto max-w-6xl">
        {/* Trust Stats */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.label}>
                <div className="text-center p-6 rounded-2xl border border-brand-white/5 bg-brand-white/[0.02]">
                  <Icon className="h-5 w-5 text-brand-gold mx-auto mb-3" />
                  <p className="text-2xl md:text-3xl font-bold text-brand-white tracking-tight">
                    {item.stat}
                  </p>
                  <p className="mt-1 text-xs tracking-widest uppercase text-brand-white/40 font-medium">
                    {item.label}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Testimonials */}
        <ScrollReveal className="text-center mb-16">
          <span className="text-xs tracking-[0.25em] uppercase text-brand-gold/70 font-medium">
            Trusted by Thousands
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-brand-white">
            What Our Customers Say
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <StaggerItem key={i}>
              <div className="p-8 rounded-2xl border border-brand-white/5 bg-brand-white/[0.02] flex flex-col h-full">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed text-brand-white/70 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 pt-6 border-t border-brand-white/5">
                  <p className="text-sm font-semibold text-brand-white">{t.name}</p>
                  <p className="text-xs text-brand-white/40 mt-0.5">{t.title}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
