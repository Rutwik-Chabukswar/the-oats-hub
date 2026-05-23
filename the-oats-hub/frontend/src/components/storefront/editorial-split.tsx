"use client";

import { ScrollReveal } from "./scroll-reveal";

interface EditorialSplitProps {
  label: string;
  headline: string;
  body: string;
  imageSide?: "left" | "right";
  accentColor?: string;
}

export function EditorialSplit({
  label,
  headline,
  body,
  imageSide = "left",
}: EditorialSplitProps) {
  const isImageLeft = imageSide === "left";

  return (
    <section className="py-24 md:py-32 bg-brand-black overflow-hidden">
      <div className="container px-6 md:px-8 mx-auto max-w-7xl">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center ${isImageLeft ? "" : "md:[direction:rtl]"}`}>
          {/* Image placeholder */}
          <ScrollReveal direction={isImageLeft ? "left" : "right"}>
            <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden bg-brand-gray-light">
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 via-transparent to-transparent z-10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="h-16 w-16 mx-auto rounded-full bg-brand-gold/10 flex items-center justify-center mb-4">
                    <span className="text-2xl">🌾</span>
                  </div>
                  <p className="text-xs text-brand-white/30 tracking-widest uppercase">Lifestyle Image</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Text content */}
          <ScrollReveal
            direction={isImageLeft ? "right" : "left"}
            delay={0.15}
          >
            <div className={`${isImageLeft ? "" : "md:[direction:ltr]"} max-w-lg`}>
              <span className="text-[11px] tracking-[0.25em] uppercase text-brand-gold/60 font-medium">
                {label}
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-brand-white leading-tight">
                {headline}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-brand-white/50">
                {body}
              </p>
              <div className="mt-8 h-px w-16 bg-brand-gold/30" />
            </div>
          </ScrollReveal>
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
        headline="From farm to your morning bowl."
        body="We partner directly with trusted growers to bring you the purest rolled oats and finest peanuts. Every batch is tested for quality, because your nutrition shouldn't be a gamble."
        imageSide="left"
      />
      <EditorialSplit
        label="Craftsmanship"
        headline="Small-batch. Big difference."
        body="Our artisan peanut butters are stone-ground in small batches to preserve natural oils, flavour, and texture. No hydrogenated oils, no palm oil — just honest, rich nutrition."
        imageSide="right"
      />
    </>
  );
}
