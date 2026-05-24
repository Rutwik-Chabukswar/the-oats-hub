"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CinematicHeader({ 
  children, 
  className = "", 
  as: Component = "h2" 
}: { 
  children: React.ReactNode; 
  className?: string; 
  as?: any;
}) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(
      containerRef.current,
      {
        y: 80,
        opacity: 0,
        rotateX: -15,
        scale: 0.98,
        filter: "blur(12px)",
      },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        y: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.8,
        ease: "power3.out",
        clearProps: "filter,transform", // clear after animation to prevent weird rendering bugs
      }
    );
  }, { scope: containerRef });

  return (
    <Component ref={containerRef} className={className} style={{ perspective: "1000px" }}>
      {children}
    </Component>
  );
}
