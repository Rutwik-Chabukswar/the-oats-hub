"use client";

import { useEffect, useState } from "react";

export function AmbientCursor() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Use requestAnimationFrame for smooth 60fps updates without thrashing the DOM
    let ticking = false;

    const updateCursor = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
          document.documentElement.style.setProperty('--my', `${e.clientY}px`);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('mousemove', updateCursor, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', updateCursor);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
      style={{
        background: `radial-gradient(200px circle at var(--mx, -100px) var(--my, -100px), rgba(201,168,76,0.03), transparent 100%)`,
      }}
    />
  );
}
