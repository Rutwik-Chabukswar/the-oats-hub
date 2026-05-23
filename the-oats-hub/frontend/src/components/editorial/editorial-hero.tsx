"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EditorialHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  alignment?: "left" | "center";
  className?: string;
}

export function EditorialHero({ 
  title, 
  subtitle, 
  badge, 
  alignment = "center",
  className 
}: EditorialHeroProps) {
  return (
    <div className={cn(
      "py-20 md:py-32 flex flex-col justify-center",
      alignment === "center" ? "items-center text-center" : "items-start text-left",
      className
    )}>
      {badge && (
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="uppercase tracking-widest text-xs font-semibold text-brand-gold mb-6 block"
        >
          {badge}
        </motion.span>
      )}
      
      <motion.h1 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="font-serif text-5xl md:text-7xl lg:text-[5rem] tracking-tight leading-[1.05] text-brand-black dark:text-brand-white max-w-4xl"
      >
        {title}
      </motion.h1>

      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground mt-8 max-w-2xl leading-relaxed font-light"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
