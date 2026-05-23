"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export function PremiumHero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-brand-black">
      {/* Subtle radial gradient backdrop */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.08)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(201,168,76,0.04)_0%,_transparent_50%)]" />
      </div>

      {/* Fine grain texture overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />

      <div className="container relative z-10 px-6 md:px-8 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium tracking-[0.2em] uppercase text-brand-gold/80 border border-brand-gold/20 rounded-full mb-8">
              Premium Wellness Nutrition
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-brand-white leading-[0.95]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            Nourish Your
            <br />
            <span className="text-brand-gold">Potential.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="mt-8 text-lg md:text-xl text-brand-white/60 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            Handcrafted rolled oats, artisan peanut butter, and clean-label superfoods.
            Sourced with care, designed for your best mornings.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 h-14 px-10 bg-brand-gold text-brand-black font-semibold rounded-full transition-all duration-200 hover:bg-brand-gold-light active:scale-[0.97]"
            >
              Explore Collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/categories/peanut-butter"
              className="inline-flex items-center gap-2 h-14 px-10 border border-brand-white/15 text-brand-white/80 font-medium rounded-full transition-all duration-200 hover:border-brand-white/30 hover:text-brand-white active:scale-[0.97]"
            >
              Our Story
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-brand-white/30 font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4 text-brand-white/25" />
        </motion.div>
      </motion.div>
    </section>
  );
}
