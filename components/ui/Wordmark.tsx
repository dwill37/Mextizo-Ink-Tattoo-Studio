"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_DOLLY, EASE_SMOKE } from "@/lib/motion";

/**
 * Wordmark "Mextizo Ink": el contorno se dibuja (stroke-dashoffset) y después se rellena,
 * como un boceto que pasa a tinta. `draw={false}` lo muestra ya relleno.
 */
export function Wordmark({ draw = false, delay = 0.2, className = "" }: { draw?: boolean; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  const animate = draw && !reduce;

  return (
    <svg
      viewBox="0 0 300 48"
      role="img"
      aria-label="Mextizo Ink"
      className={className}
    >
      <motion.text
        x="0"
        y="37"
        textLength="296"
        lengthAdjust="spacingAndGlyphs"
        style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, letterSpacing: "-0.02em" }}
        fontSize="44"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="420"
        fill="currentColor"
        initial={animate ? { strokeDashoffset: 420, fillOpacity: 0 } : false}
        animate={{ strokeDashoffset: 0, fillOpacity: 1 }}
        transition={{
          strokeDashoffset: { duration: 1.3, delay, ease: EASE_DOLLY },
          fillOpacity: { duration: 0.7, delay: delay + 1.05, ease: EASE_SMOKE },
        }}
      >
        Mextizo Ink
      </motion.text>
    </svg>
  );
}
