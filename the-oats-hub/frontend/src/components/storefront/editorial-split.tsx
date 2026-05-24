"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EditorialSplitProps {
  label: string;
  headline: string;
  body: string;
  imageSide?: "left" | "right";
  imageUrl: string;
  badgeText: string;
}

export function EditorialSplit({
  label,
  headline,
  body,
  imageSide = "left",
  imageUrl,
  badgeText
}: EditorialSplitProps) {
  const isImageLeft = imageSide === "left";

  return (
    <section className="relative py-24 md:py-40 bg-brand-black overflow-hidden flex items-center min-h-[90vh]">
      <div className="container relative z-10 px-6 md:px-12 mx-auto">
        <div className={cn(
          "flex flex-col md:flex-row items-center justify-between gap-20 md:gap-32",
          !isImageLeft && "md:flex-row-reverse"
        )}>
          
          {/* Image Container with Luxury Skincare Aesthetic */}
          <div className="w-full md:w-[45%] relative group">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/4] md:aspect-[4/5] w-full mx-auto overflow-hidden bg-brand-black"
            >
              {/* Image */}
              <img 
                src={imageUrl} 
                alt={headline}
                className="w-full h-full object-cover opacity-70 mix-blend-luminosity transition-transform duration-[3s] ease-out group-hover:scale-105"
              />
              {/* Texture Overlay */}
              <div className="absolute inset-0 z-10 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />
              {/* Gradient Vignette */}
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-brand-black via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Floating Gold Accent Element */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "absolute -bottom-6 md:-bottom-12 z-30 w-32 md:w-48 aspect-square border border-brand-gold/30 flex items-center justify-center backdrop-blur-sm bg-brand-black/60 shadow-premium",
                isImageLeft ? "-right-4 md:-right-12" : "-left-4 md:-left-12"
              )}
            >
              <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-brand-gold text-center px-4 leading-relaxed font-medium">
                {badgeText.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </span>
            </motion.div>
          </div>

          {/* Text Content - Dramatic Whitespace */}
          <div className="w-full md:w-[55%] flex flex-col justify-center md:px-12 mt-12 md:mt-0">
            <motion.div
              initial={{ opacity: 0, x: isImageLeft ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-brand-gold" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-brand-gold/80 font-medium">
                  {label}
                </span>
              </div>

              <h2 className="font-serif text-5xl md:text-6xl lg:text-[5rem] tracking-tight leading-[1.05] text-brand-white">
                {headline.split('. ').map((line, i, arr) => (
                  <span key={i} className={cn("block", i === arr.length - 1 && "text-brand-white/60 italic mt-2")}>
                    {line}{i !== arr.length - 1 ? '.' : ''}
                  </span>
                ))}
              </h2>

              <p className="text-lg md:text-xl leading-relaxed text-brand-white/50 font-light max-w-md pt-6">
                {body}
              </p>

              <div className="pt-10">
                <span className="inline-flex items-center text-[11px] tracking-[0.2em] uppercase text-brand-white/40 hover:text-brand-gold transition-colors duration-300 cursor-pointer font-medium">
                  Discover Our Method
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

export function WellnessStorytelling() {
  return (
    <>
      <EditorialSplit
        label="Sourcing"
        headline="From farm. To morning."
        body="We partner directly with trusted growers to bring you the purest rolled oats and finest peanuts. Every batch is tested for quality, because your nutrition shouldn't be a gamble."
        imageSide="left"
        imageUrl="/products/pintola.png"
        badgeText="Premium Quality"
      />
      <EditorialSplit
        label="Craftsmanship"
        headline="Small batch. Big difference."
        body="Our artisan peanut butters are stone-ground in small batches to preserve natural oils, flavour, and texture. No hydrogenated oils, no palm oil — just honest, rich nutrition."
        imageSide="right"
        imageUrl="/products/yogabar-oats.png"
        badgeText="Artisan Crafted"
      />
    </>
  );
}
