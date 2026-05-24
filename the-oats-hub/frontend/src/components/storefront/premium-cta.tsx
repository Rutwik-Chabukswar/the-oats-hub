"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function PremiumCTA() {
  return (
    <section className="py-32 md:py-48 bg-brand-black relative overflow-hidden">
      {/* Subtle accent glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(201,168,76,0.06)_0%,_transparent_70%)] blur-3xl" />
      </div>

      <div className="container relative px-6 md:px-8 mx-auto max-w-3xl text-center">
        <ScrollReveal className="flex flex-col items-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-6 bg-brand-gold/50" />
            <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-brand-gold/70 font-medium">
              Start Your Journey
            </span>
            <div className="h-[1px] w-6 bg-brand-gold/50" />
          </div>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tight text-brand-white leading-[1.05]">
            Your best mornings<br /><span className="italic text-brand-white/90">begin here.</span>
          </h2>
          <p className="mt-8 text-lg md:text-xl text-brand-white/50 max-w-xl mx-auto leading-relaxed font-light">
            Join thousands of wellness-conscious individuals who have elevated their daily nutrition with The Oats Hub.
          </p>
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6">
            <MagneticButton magneticPull={0.25} className="inline-block">
              <Link
                href="/products"
                className="group relative overflow-hidden inline-flex items-center gap-4 h-16 px-12 bg-brand-gold text-brand-black font-medium tracking-[0.15em] text-xs uppercase rounded-full transition-all duration-300 hover:bg-brand-gold-light hover:shadow-[0_0_40px_rgba(201,168,76,0.3)] active:scale-[0.98]"
              >
                <span>Shop Collection</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
