"use client";

import { useRef, useEffect, useState } from "react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal";
import { ShieldCheck, Truck, Star, Users } from "lucide-react";
import { useInView, animate } from "framer-motion";
import { CinematicHeader } from "@/components/ui/cinematic-header";

const trustItems = [
  { icon: ShieldCheck, target: 100, suffix: "%", label: "Authentic & Natural" },
  { icon: Users, target: 15000, suffix: "+", label: "Happy Customers" },
  { icon: Truck, target: 48, suffix: "h", label: "Pan-India Dispatch" },
  { icon: Star, target: 4.9, suffix: "★", label: "Customer Satisfaction", isFloat: true },
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

function AnimatedCounter({ target, suffix, isFloat = false }: { target: number, suffix: string, isFloat?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(0, target, {
        duration: 2.5,
        ease: [0.16, 1, 0.3, 1], // Cinematic ease-out
        onUpdate: (val) => {
          if (ref.current) {
            ref.current.textContent = isFloat ? val.toFixed(1) + suffix : Math.floor(val).toLocaleString() + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [inView, target, suffix, isFloat]);

  return <span ref={ref}>0{suffix}</span>;
}

export function TrustSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isTouching = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTouching.current && carouselRef.current) {
        let nextIndex = (activeIndex + 1) % testimonials.length;
        carouselRef.current.scrollTo({
          left: nextIndex * carouselRef.current.clientWidth,
          behavior: "smooth"
        });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const width = carouselRef.current.clientWidth;
      const index = Math.round(scrollLeft / width);
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    }
  };

  return (
    <section className="py-24 md:py-32 bg-[#0F0D0A]">
      <div className="container px-6 md:px-12 mx-auto max-w-7xl">
        {/* Trust Stats with Animated Counters */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-24 md:mb-32">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.label}>
                <div className="text-center p-8 md:p-10 rounded-2xl border border-brand-white/[0.03] bg-[#0F0D0A] transition-all duration-500 hover:border-brand-gold/20 hover:bg-[#13110C]">
                  <Icon className="h-6 w-6 text-brand-gold/70 mx-auto mb-4" />
                  <p className="font-serif text-3xl md:text-4xl text-brand-white tracking-tight mb-2 flex items-center justify-center">
                    <AnimatedCounter target={item.target} suffix={item.suffix} isFloat={item.isFloat} />
                  </p>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-brand-white/40 font-medium">
                    {item.label}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Testimonials Carousel */}
        <ScrollReveal className="text-center mb-16 md:mb-20 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-6 bg-brand-gold/50" />
            <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-brand-gold/70 font-medium">
              Community
            </span>
            <div className="h-[1px] w-6 bg-brand-gold/50" />
          </div>
          <CinematicHeader className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1] text-brand-white">
            What Our <span className="italic text-brand-white/40">Customers Say.</span>
          </CinematicHeader>
        </ScrollReveal>

        <ScrollReveal className="max-w-4xl mx-auto">
          <div 
            className="relative overflow-hidden"
            onTouchStart={() => isTouching.current = true}
            onTouchEnd={() => isTouching.current = false}
          >
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              onScroll={handleScroll}
            >
              {testimonials.map((t, i) => {
                const initials = t.name.split(' ').map(n => n[0]).join('');
                return (
                  <div key={i} className="w-full flex-shrink-0 snap-center px-4 md:px-12 flex flex-col items-center text-center">
                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-full bg-[#13110C] border border-brand-gold/30 flex items-center justify-center mb-8 shadow-xl">
                      <span className="font-serif text-brand-gold text-xl tracking-widest">{initials}</span>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1.5 mb-8">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="h-5 w-5 fill-brand-gold text-brand-gold" />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="font-serif text-[20px] leading-relaxed text-brand-white/90 italic mb-10 max-w-2xl">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>

                    {/* Customer Info */}
                    <div className="flex flex-col items-center gap-1.5">
                      <p className="text-[12px] font-medium tracking-widest text-brand-white uppercase">{t.name}</p>
                      <p className="text-[11px] text-brand-white/40 font-light tracking-wide">{t.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-3 mt-12">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveIndex(i);
                    carouselRef.current?.scrollTo({
                      left: i * (carouselRef.current.clientWidth),
                      behavior: "smooth"
                    });
                  }}
                  className={`h-1.5 rounded-full transition-all duration-500 ${activeIndex === i ? "w-8 bg-brand-gold" : "w-2 bg-brand-white/20 hover:bg-brand-white/40"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
