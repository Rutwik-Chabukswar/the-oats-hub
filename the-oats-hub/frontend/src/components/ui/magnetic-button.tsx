"use client";

import { useRef, ReactNode } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function MagneticButton({
  children,
  className = "",
  magneticPull = 0.3,
}: {
  children: ReactNode;
  className?: string;
  magneticPull?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for smooth spring physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * magneticPull);
    y.set(middleY * magneticPull);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: 0, y: 0 }}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
