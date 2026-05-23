"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

export function PremiumCTA() {
  return (
    <section className="py-32 md:py-40 bg-background relative overflow-hidden">
      {/* Subtle accent glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-gold/[0.03] blur-3xl" />
      </div>

      <div className="container relative px-6 md:px-8 mx-auto max-w-3xl text-center">
        <ScrollReveal>
          <span className="text-xs tracking-[0.25em] uppercase text-brand-gold/70 font-medium">
            Start Your Journey
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            Your best mornings<br />begin here.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Join thousands of wellness-conscious individuals who have elevated their daily nutrition with The Oats Hub.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 h-14 px-10 bg-brand-gold text-brand-black font-semibold rounded-full transition-all duration-200 hover:bg-brand-gold-light active:scale-[0.97]"
            >
              Shop Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
