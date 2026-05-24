"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/* ── Easing ── */
const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Pillar Data ── */
const PILLARS = [
  {
    number: "01",
    label: "Clean Label",
    headline: "Nothing\nto hide.",
    body: "100% natural ingredients. No artificial flavours, no added sugars, no preservatives. Just pure, honest nutrition you can read and understand.",
  },
  {
    number: "02",
    label: "Small Batch",
    headline: "Crafted,\nnot manufactured.",
    body: "Every batch is made with intention. We source from trusted growers, roast low and slow, and never cut corners for scale.",
  },
  {
    number: "03",
    label: "Performance",
    headline: "Built for\nyour body.",
    body: "From macros to micronutrients, every product is formulated for real results. Fuel that actually works — morning to night.",
  },
];

export function BrandPhilosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-44 overflow-hidden bg-brand-black"
    >
      {/* ── Background Ingredient Flat-Lay ── */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/ingredients/philosophy-flatlay.png"
          alt="Premium ingredients composition"
          fill
          sizes="100vw"
          className="object-cover opacity-15 md:opacity-20"
        />
      </motion.div>

      {/* ── Atmospheric Gradients ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-transparent to-brand-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,_rgba(201,168,76,0.04)_0%,_transparent_70%)]" />
      </div>

      {/* ── Content ── */}
      <div className="container relative z-10 px-6 md:px-12 mx-auto max-w-7xl">

        {/* ── Section Header — Asymmetrical, Left-Aligned ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: EASE }}
          className="max-w-2xl mb-24 md:mb-32"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-10 bg-brand-gold/50" />
            <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-brand-gold/70 font-medium">
              Our Philosophy
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1] text-brand-white">
            Built on principles,<br />
            <span className="text-brand-white/40 italic">not shortcuts.</span>
          </h2>
        </motion.div>

        {/* ── Three Pillars — Staggered Editorial Layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 1,
                delay: i * 0.15,
                ease: EASE,
              }}
              className={`group relative py-12 md:py-16 px-0 md:px-8 lg:px-12 border-b md:border-b-0 md:border-r border-brand-white/[0.06] last:border-r-0 last:border-b-0 ${
                i === 1 ? "md:pt-28" : i === 2 ? "md:pt-40" : ""
              }`}
            >
              {/* Ghosted Number */}
              <span className="block font-serif text-6xl md:text-7xl text-brand-white/[0.15] leading-none mb-6 select-none transition-colors duration-700 group-hover:text-brand-gold/[0.30]">
                {pillar.number}
              </span>

              {/* Label */}
              <div className="flex items-center gap-3 mb-5">
                <div className="h-[1px] w-6 bg-brand-gold/40 transition-all duration-500 group-hover:w-10 group-hover:bg-brand-gold/70" />
                <span className="text-[10px] tracking-[0.25em] uppercase text-brand-gold/60 font-medium transition-colors duration-500 group-hover:text-brand-gold/90">
                  {pillar.label}
                </span>
              </div>

              {/* Headline — Serif, Split Lines */}
              <h3 className="font-serif text-2xl md:text-3xl lg:text-[2rem] tracking-tight leading-[1.15] text-brand-white mb-6 whitespace-pre-line">
                {pillar.headline}
              </h3>

              {/* Body */}
              <p className="text-sm md:text-base leading-relaxed text-brand-white/40 font-light max-w-xs">
                {pillar.body}
              </p>

              {/* Hover Gold Line — Bottom Accent */}
              <div className="absolute bottom-0 left-0 md:left-8 lg:left-12 h-[2px] w-0 bg-brand-gold/40 transition-all duration-700 group-hover:w-16" />
            </motion.div>
          ))}
        </div>

        {/* ── Bottom Editorial Closing Line ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
          className="mt-20 md:mt-28 flex justify-end"
        >
          <p className="text-xs md:text-sm text-brand-white/25 tracking-wide font-light max-w-xs text-right leading-relaxed">
            Three principles. Zero compromises.<br />
            <span className="text-brand-gold/40">Since day one.</span>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
