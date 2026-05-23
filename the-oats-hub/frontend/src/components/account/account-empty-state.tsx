"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface AccountEmptyStateProps {
  icon: React.ReactNode;
  title: string;
  message: string;
  actionLabel: string;
  actionHref?: string;
  onAction?: () => void;
}

export function AccountEmptyState({ icon, title, message, actionLabel, actionHref, onAction }: AccountEmptyStateProps) {
  const ActionWrapper = actionHref ? Link : "button";
  const actionProps = actionHref ? { href: actionHref } : { onClick: onAction };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border/50 rounded-3xl p-10 md:p-16 text-center flex flex-col items-center shadow-sm"
    >
      <div className="h-20 w-20 bg-brand-black/5 dark:bg-brand-white/5 rounded-full flex items-center justify-center text-foreground mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-serif tracking-tight mb-3">{title}</h3>
      <p className="text-muted-foreground max-w-md mx-auto leading-relaxed mb-8">
        {message}
      </p>
      <ActionWrapper 
        {...actionProps as any}
        className="group inline-flex items-center justify-center h-12 px-8 rounded-full bg-brand-black dark:bg-brand-white text-brand-white dark:text-brand-black font-semibold text-sm transition-transform hover:scale-105 active:scale-95 shadow-premium"
      >
        {actionLabel} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </ActionWrapper>
    </motion.div>
  );
}
