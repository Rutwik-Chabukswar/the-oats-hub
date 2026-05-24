"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

/* ── Product Data ── */
const PRODUCTS = [
  {
    name: "Pintola",
    tagline: "High Protein Peanut Butter",
    origin: "30g Protein",
    process: "Stone Ground",
    story: "Slow-roasted and stone-ground for unmatched depth. High-protein, unsweetened, and crafted for serious athletes.",
    micro: "Vegan · Gluten-Free",
    image: "/products/pintola.png",
    alt: "Pintola High Protein Peanut Butter jar",
    slug: "pintola-high-protein-peanut-butter",
    accent: "rgba(139, 115, 60, 0.06)",
  },
  {
    name: "Yoga Bar",
    tagline: "High Protein Oats",
    origin: "21g Protein",
    process: "Dark Chocolate",
    story: "Premium high protein rolled oats with rich dark chocolate. No added sugar and completely gluten-free for your daily ritual.",
    micro: "High Fibre · Gluten Free",
    image: "/products/yogabar-oats.png",
    alt: "Yoga Bar High Protein Oats pouch",
    slug: "yogabar-crunchy-peanut-butter",
    accent: "rgba(100, 40, 140, 0.05)",
  },
  {
    name: "Organic Cosmos",
    tagline: "Daily Wellness Blend",
    origin: "Plant-Powered",
    process: "Superfood Blend",
    story: "60 capsules of concentrated plant nutrition. Cold-processed to preserve bioactive compounds for peak daily wellness.",
    micro: "30 Servings · Veg Capsules",
    image: "/products/cosmos.png",
    alt: "Organic Cosmos Daily Wellness supplement box",
    slug: "organic-cosmos-toc",
    accent: "rgba(120, 160, 100, 0.05)",
  },
] as const;

/* ── Easing ── */
const CINEMATIC_EASE = [0.16, 1, 0.3, 1] as const;

/* ── Noise Texture SVG ── */
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`;

/* ────────────────────────────────────────────────────── */
/*  CINEMATIC INGREDIENT SHOWCASE                        */
/* ────────────────────────────────────────────────────── */
export function CinematicIngredientShowcase() {
  return (
    <section className="relative bg-brand-black overflow-hidden">
      {/* ── Atmospheric Entrance Gradient ── */}
      <div className="h-32 md:h-48 bg-gradient-to-b from-background to-brand-black" />

      {/* ── Section Header ── */}
      <SectionHeader />

      {/* ── Three Product Spreads ── */}
      {PRODUCTS.map((product, index) => (
        <ProductSpread
          key={product.slug}
          product={product}
          index={index}
          reverse={index % 2 !== 0}
        />
      ))}

      {/* ── Atmospheric Exit Gradient ── */}
      <div className="h-32 md:h-48 bg-gradient-to-b from-brand-black to-background" />
    </section>
  );
}

/* ────────────────────────────────────────────────────── */
/*  SECTION HEADER                                       */
/* ────────────────────────────────────────────────────── */
function SectionHeader() {
  return (
    <div className="container mx-auto px-6 md:px-12 pt-12 pb-24 md:pt-20 md:pb-40">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.2, ease: CINEMATIC_EASE }}
        className="max-w-3xl"
      >
        {/* Pre-title */}
        <div className="flex items-center gap-4 mb-10 md:mb-14">
          <div className="h-[1px] w-16 bg-brand-gold" />
          <span className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-brand-gold font-medium">
            The Collection
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[0.95] text-brand-white">
          What we<br />
          <span className="text-brand-white/40 italic">stand behind.</span>
        </h2>

        {/* Subtitle */}
        <p className="mt-10 md:mt-14 text-lg md:text-xl text-brand-white/45 font-light max-w-md leading-relaxed pl-4 md:pl-20 border-l border-brand-gold/20">
          Three products. Each handpicked, tested, and trusted. 
          We only sell what we&apos;d eat ourselves.
        </p>
      </motion.div>
    </div>
  );
}

/* ────────────────────────────────────────────────────── */
/*  PRODUCT SPREAD — Single Cinematic Magazine Spread    */
/* ────────────────────────────────────────────────────── */
interface ProductSpreadProps {
  product: (typeof PRODUCTS)[number];
  index: number;
  reverse: boolean;
}

function ProductSpread({ product, index, reverse }: ProductSpreadProps) {
  const spreadRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: spreadRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const metaY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.02]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <div
      ref={spreadRef}
      className="relative py-20 md:py-32 lg:py-40"
    >
      {/* Atmospheric radial glow — unique per product */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse 60% 50% at ${reverse ? '70%' : '30%'} 50%, ${product.accent} 0%, transparent 70%)`,
        }}
      />

      <motion.div
        style={{ opacity }}
        className="container mx-auto px-6 md:px-12 relative z-10"
      >
        <div
          className={`flex flex-col ${
            reverse ? "lg:flex-row-reverse" : "lg:flex-row"
          } items-center gap-16 md:gap-20 lg:gap-28`}
        >
          {/* ── PRODUCT IMAGE PANEL ── */}
          <div className={`w-full lg:w-[50%] relative group ${reverse ? "lg:pl-8" : "lg:pr-8"}`}>
            {/* Product image with cinematic treatment */}
            <motion.div
              style={{ y: imageY }}
              className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-2xl"
            >
              <motion.div
                style={{ scale: imageScale }}
                className="absolute inset-0"
              >
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-[3s] ease-out group-hover:scale-[1.03]"
                  priority={index === 0}
                />
              </motion.div>

              {/* Subtle noise grain */}
              <div
                className="absolute inset-0 z-10 opacity-[0.025] mix-blend-overlay pointer-events-none rounded-2xl"
                style={{ backgroundImage: NOISE_SVG }}
              />

              {/* Bottom vignette */}
              <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-brand-black/50 via-transparent to-transparent rounded-2xl" />
            </motion.div>

            {/* ── Floating Product Badge ── */}
            <motion.div
              style={{ y: metaY }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.5, ease: CINEMATIC_EASE }}
              className={`absolute z-30 ${
                reverse
                  ? "bottom-6 left-0 md:-left-4"
                  : "bottom-6 right-0 md:-right-4"
              }`}
            >
              <div className="border border-brand-gold/25 backdrop-blur-md bg-brand-black/70 px-6 py-5 md:px-8 md:py-6 rounded-xl">
                <span className="block text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-brand-gold/70 mb-1">
                  {product.origin}
                </span>
                <span className="block font-serif text-xl md:text-2xl text-brand-white/90 tracking-tight">
                  {product.process}
                </span>
              </div>
            </motion.div>

            {/* ── Floating Micro Label ── */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.8, ease: CINEMATIC_EASE }}
              className={`absolute z-30 hidden md:block ${
                reverse ? "top-8 right-8" : "top-8 left-8"
              }`}
            >
              <div className="backdrop-blur-sm bg-brand-black/50 border border-brand-white/[0.08] rounded-lg px-4 py-2.5">
                <span className="text-[9px] tracking-[0.15em] uppercase text-brand-white/45 font-medium">
                  {product.micro}
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── TEXT PANEL ── */}
          <div className={`w-full lg:w-[50%] flex flex-col justify-center ${reverse ? "lg:pr-8" : "lg:pl-4"}`}>
            <motion.div
              initial={{ opacity: 0, x: reverse ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.3, ease: CINEMATIC_EASE }}
              className="space-y-6 md:space-y-8"
            >
              {/* Product number */}
              <span className="block font-serif text-7xl md:text-8xl lg:text-9xl text-brand-white/[0.04] leading-none select-none">
                0{index + 1}
              </span>

              {/* Brand name + tagline */}
              <div className="-mt-10 md:-mt-14">
                <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1] text-brand-white">
                  {product.name}
                </h3>
                <p className="mt-2 text-base md:text-lg text-brand-gold/60 font-light tracking-wide">
                  {product.tagline}
                </p>
              </div>

              {/* Gold rule */}
              <div className="h-[1px] w-16 bg-brand-gold/30" />

              {/* Product story */}
              <p className="text-base md:text-lg leading-relaxed text-brand-white/45 font-light max-w-sm">
                {product.story}
              </p>

              {/* CTA */}
              <Link
                href={`/products/${product.slug}`}
                className="group inline-flex items-center gap-4 text-[11px] md:text-xs tracking-[0.2em] uppercase text-brand-white/40 hover:text-brand-gold transition-colors duration-500 font-medium pt-4"
              >
                <span>View Product</span>
                <span className="block h-[1px] w-8 bg-current transition-all duration-500 group-hover:w-14" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
