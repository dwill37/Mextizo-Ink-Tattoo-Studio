"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_CINE } from "@/lib/motion";

/**
 * Texto que emerge palabra por palabra a través de máscaras (overflow hidden).
 * - `immediate`: se anima al montar (hero). Si no, al entrar en pantalla.
 */
export function MaskWords({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  stagger = 0.07,
  immediate = false,
  id,
}: {
  text: string;
  as?: "span" | "p" | "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
  id?: string;
}) {
  const reduce = useReducedMotion();
  // "\n" fuerza un salto de línea controlado.
  const lines = text.split("\n").map((l) => l.trim().split(" "));

  const parent: Variants = { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } };
  const child: Variants = {
    hidden: { y: "105%" },
    show: { y: "0%", transition: { duration: 1, ease: EASE_CINE } },
  };

  const trigger = immediate
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, amount: 0.6 } };

  const MotionTag = motion[Tag];

  return (
    <MotionTag id={id} aria-label={text.replace(/\n/g, " ")} className={className} initial={reduce ? false : "hidden"} {...trigger} variants={parent}>
      {lines.map((words, li) => (
        <span key={li} aria-hidden>
          {li > 0 && <br />}
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
              <motion.span className="inline-block will-change-transform" variants={child}>
                {w}
              </motion.span>
              {i < words.length - 1 && "\u00A0"}
            </span>
          ))}
        </span>
      ))}
    </MotionTag>
  );
}

/** Desplazamiento ascendente con opacidad, como algo que sale de la sombra. */
export function Rise({
  children,
  className = "",
  delay = 0,
  y = 28,
  amount = 0.3,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1.1, delay, ease: EASE_CINE }}
    >
      {children}
    </motion.div>
  );
}
