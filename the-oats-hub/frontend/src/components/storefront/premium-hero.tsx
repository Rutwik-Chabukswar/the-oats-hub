"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { CinematicHeader } from "@/components/ui/cinematic-header";

/* ── Easing ── */
const EASE = [0.16, 1, 0.3, 1] as const;

export function PremiumHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll within this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax layer speeds (creating 3D depth)
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);          // Slowest (Background)

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);       // Fast/Reverse (Foreground Text)
  
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center bg-[#0F0D0A]"
    >
      {/* ── LAYER 1: Deep Background ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/luxury_wellness_hero.png"
          alt="Premium wellness ambient background"
          fill
          priority
          quality={100}
          unoptimized
          sizes="100vw"
          className="object-cover object-center opacity-70 scale-105"
        />
        {/* Ambient occlusion / Shadows */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.1)_0%,_transparent_60%)] mix-blend-screen" />
      </motion.div>



      {/* ── LAYER 2: Atmospheric Glow ── */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] z-0 pointer-events-none blur-3xl bg-[radial-gradient(circle_at_center,_rgba(201,168,76,0.04)_0%,_transparent_70%)]" />

      {/* ── LAYER 3: Foreground Content ── */}
      <motion.div
        style={{ y: textY, opacity: contentOpacity }}
        className="container relative z-20 px-6 md:px-12 mx-auto"
      >
        <div className="w-full max-w-3xl pt-20 md:pt-0">
          {/* Pre-title accent */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="flex items-center gap-4 mb-8 md:mb-10 drop-shadow-md"
          >
            <div className="h-[1px] w-10 bg-brand-gold" />
            <span className="text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase text-brand-gold shadow-black drop-shadow-lg">
              Crafted for Wellness
            </span>
          </motion.div>

          {/* Main Headline */}
          <CinematicHeader
            as="h1"
            className="font-serif text-6xl sm:text-7xl md:text-[6.5rem] lg:text-[7.5rem] tracking-tight leading-[0.95] text-brand-white drop-shadow-2xl"
          >
            Stronger<br />
            mornings<br />
            <span className="text-brand-gold italic">start here.</span>
          </CinematicHeader>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: EASE }}
            className="mt-10 md:mt-14 text-base md:text-lg text-brand-white/80 max-w-md leading-relaxed font-light pl-4 md:pl-12 border-l border-brand-gold/30 drop-shadow-xl bg-brand-black/20 backdrop-blur-sm p-4 rounded-r-xl"
          >
            Premium oats, artisan peanut butter, and clean-label superfoods — 
            handcrafted in small batches for people who take their health seriously.
          </motion.p>

          {/* Dual CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: EASE }}
            className="mt-10 md:mt-16 pl-4 md:pl-12 flex flex-col sm:flex-row items-start sm:items-center gap-5"
          >
            <MagneticButton magneticPull={0.25} className="inline-block">
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 h-14 px-8 bg-brand-gold text-brand-black font-semibold tracking-wide rounded-full transition-all duration-300 hover:bg-brand-gold-light hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] active:scale-[0.97]"
              >
                <span>Shop Collection</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </MagneticButton>

            <Link
              href="/about"
              className="group inline-flex items-center gap-3 text-sm font-medium text-brand-white/80 hover:text-brand-gold transition-colors duration-300 tracking-wide drop-shadow-md"
            >
              <span>Our Story</span>
              <span className="block h-[1px] w-6 bg-current transition-all duration-300 group-hover:w-10" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.25em] uppercase text-brand-white/40 font-medium">
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="w-[1px] h-6 bg-gradient-to-b from-brand-gold/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
