"use client";

import { useRef, useEffect } from "react";
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

import Image from "next/image";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

const testimonials = [
  {
    quote: "The quality of their rolled oats is unlike anything I've tried before. My mornings have completely transformed.",
    name: "Ananya S.",
    title: "Fitness Enthusiast",
    photo: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop",
  },
  {
    quote: "Finally, peanut butter that's actually clean. No junk, just pure flavour. I'm a customer for life.",
    name: "Rahul M.",
    title: "Health Coach",
    photo: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=600&auto=format&fit=crop",
  },
  {
    quote: "Beautiful packaging, premium quality, and fast delivery. The Oats Hub sets a new standard for wellness brands.",
    name: "Priya K.",
    title: "Nutritionist",
    photo: null,
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
  return (
    <section className="py-24 md:py-32 bg-brand-black">
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

        {/* Testimonials */}
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

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <StaggerItem key={i}>
              <div className="p-10 md:p-12 rounded-2xl border border-brand-white/[0.04] bg-[#0F0D0A] flex flex-col h-full transition-all duration-500 hover:border-brand-gold/20">
                {/* Stars */}
                <div className="flex gap-1.5 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                
                {t.photo && (
                  <Dialog>
                    <DialogTrigger className="relative w-full h-48 mb-6 rounded-xl overflow-hidden group cursor-pointer border border-brand-white/[0.05]">
                        <Image 
                          src={t.photo} 
                          alt={`Review photo by ${t.name}`} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-105" 
                          unoptimized 
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl p-0 overflow-hidden bg-brand-black border-brand-white/10 sm:rounded-2xl">
                      <div className="grid md:grid-cols-2 h-full">
                        <div className="relative h-[350px] md:h-[600px] bg-[#0A0A0A]">
                          <Image 
                            src={t.photo} 
                            alt={`Review photo by ${t.name}`} 
                            fill 
                            className="object-cover" 
                            unoptimized 
                          />
                        </div>
                        <div className="p-8 md:p-12 flex flex-col justify-center bg-[#0F0D0A] h-full">
                          <div className="flex gap-1.5 mb-6">
                            {[...Array(5)].map((_, j) => (
                              <Star key={j} className="h-5 w-5 fill-brand-gold text-brand-gold" />
                            ))}
                          </div>
                          <blockquote className="font-serif text-2xl md:text-3xl leading-relaxed text-brand-white/90 italic mb-8">
                            &ldquo;{t.quote}&rdquo;
                          </blockquote>
                          <div className="pt-6 border-t border-brand-white/[0.06]">
                            <p className="text-lg font-medium tracking-wide text-brand-white uppercase">{t.name}</p>
                            <p className="text-sm text-brand-white/40 mt-1 font-light tracking-wide">{t.title}</p>
                            <div className="mt-4 flex items-center gap-2 text-xs text-green-500/80 font-medium tracking-widest uppercase">
                              <ShieldCheck className="h-4 w-4" /> Verified Buyer
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}

                <blockquote className="font-serif text-lg md:text-xl leading-relaxed text-brand-white/90 flex-1 italic mb-8">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="pt-6 border-t border-brand-white/[0.06]">
                  <p className="text-sm font-medium tracking-wide text-brand-white uppercase">{t.name}</p>
                  <p className="text-xs text-brand-white/40 mt-1 font-light tracking-wide">{t.title}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
