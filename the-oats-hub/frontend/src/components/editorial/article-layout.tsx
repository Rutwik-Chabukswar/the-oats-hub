"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ArticleLayout({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative pb-24 md:pb-32 bg-background">
      {/* Reading Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-gold z-50 origin-left"
        style={{ scaleX }}
      />
      
      <article className="container mx-auto px-5 md:px-8 max-w-[700px]">
        <div className="prose prose-lg md:prose-xl dark:prose-invert prose-headings:font-serif prose-headings:tracking-tight prose-p:leading-relaxed prose-a:text-brand-gold prose-a:no-underline hover:prose-a:underline prose-img:rounded-3xl mx-auto">
          {children}
        </div>
      </article>
    </div>
  );
}
