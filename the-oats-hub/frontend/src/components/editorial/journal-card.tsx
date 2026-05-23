"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface JournalCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  slug: string;
  index: number;
}

export function JournalCard({ title, excerpt, category, date, image, slug, index }: JournalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group flex flex-col h-full"
    >
      <Link href={`/journal/${slug}`} className="block overflow-hidden rounded-3xl mb-6 relative aspect-[4/3] md:aspect-square lg:aspect-[4/3] bg-muted">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider text-foreground shadow-sm">
            {category}
          </span>
        </div>
      </Link>
      
      <div className="flex-1 flex flex-col">
        <span className="text-sm text-muted-foreground mb-3 font-medium">{date}</span>
        <Link href={`/journal/${slug}`} className="block group-hover:text-brand-gold transition-colors">
          <h3 className="font-serif text-2xl tracking-tight mb-3 line-clamp-2">{title}</h3>
        </Link>
        <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-6 flex-1">
          {excerpt}
        </p>
        <Link 
          href={`/journal/${slug}`} 
          className="inline-flex items-center text-sm font-semibold uppercase tracking-widest mt-auto group/btn"
        >
          Read Story <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
