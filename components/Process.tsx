"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { MaskWords } from "./ui/Reveal";

type Step = { title: string; body: string; placeholder?: string };

const STEPS: Step[] = [
  {
    title: "Mándame tu idea por WhatsApp",
    body: "Comparte referencias, el tamaño aproximado y la zona del cuerpo donde lo quieres.",
  },
  {
    title: "Diseñamos tu pieza única",
    body: "Partimos de tu idea para crear un diseño hecho solo para ti.",
    placeholder: "[PLACEHOLDER: proceso de diseño y aprobación]",
  },
  {
    title: "Agenda tu cita",
    body: "Elegimos juntos el día y la hora de tu sesión.",
    placeholder: "[PLACEHOLDER: política de anticipo]",
  },
  {
    title: "Día del tatuaje y cuidados",
    body: "Tu idea pasa a la piel. Te explico cómo cuidarla para que sane bien.",
    placeholder: "[PLACEHOLDER: información de cuidados posteriores]",
  },
];

function StepItem({ step, i, progress }: { step: Step; i: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const at = (i + 0.35) / STEPS.length;
  // Cada paso pasa de gris a blanco cuando la línea lo alcanza (solo opacidad/escala).
  const light = useTransform(progress, [at - 0.12, at], [0.68, 1]);
  const dot = useTransform(progress, [at - 0.06, at], [0.35, 1]);
  const right = i % 2 === 1;

  return (
    <li className="relative grid grid-cols-[2.5rem_1fr] md:grid-cols-2 md:gap-24">
      <motion.span
        aria-hidden
        style={reduce ? undefined : { scale: dot, opacity: light }}
        className="absolute left-5 top-2 size-3 -translate-x-1/2 rounded-full bg-bone ring-[6px] ring-ink md:left-1/2"
      />
      <div
        className={`col-start-2 md:row-start-1 ${right ? "md:col-start-2" : "md:col-start-1 md:text-right"}`}
      >
        <motion.div style={reduce ? undefined : { opacity: light }}>
          <span className="display block text-5xl text-smoke md:text-6xl" aria-hidden>
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="display mt-3 text-3xl text-bone md:text-4xl">{step.title}</h3>
        </motion.div>
        <p className={`mt-4 max-w-[42ch] leading-relaxed text-smoke ${right ? "" : "md:ml-auto"}`}>{step.body}</p>
        {step.placeholder && <p className={`placeholder mt-3 max-w-[42ch] ${right ? "" : "md:ml-auto"}`}>{step.placeholder}</p>}
      </div>
    </li>
  );
}

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="proceso" aria-labelledby="proceso-title" className="section-y relative border-t border-line/60 bg-coal/40">
      <div className="container-x">
        <div className="mx-auto max-w-3xl md:text-center">
          <MaskWords
            as="h2"
            id="proceso-title"
            text="Así trabajamos tu tatuaje"
            className="display text-[clamp(2.6rem,6vw,5.25rem)] text-bone"
          />
        </div>

        <ol ref={ref} className="relative mx-auto mt-16 flex max-w-5xl flex-col gap-20 md:mt-24 md:gap-28">
          <svg
            aria-hidden
            viewBox="0 0 2 100"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-5 top-2 h-[calc(100%-0.5rem)] w-0.5 -translate-x-1/2 overflow-visible md:left-1/2"
          >
            <path d="M1 0 V100" stroke="var(--color-line)" strokeWidth={1} />
            <motion.path
              d="M1 0 V100"
              stroke="var(--color-bone)"
              strokeWidth={1}
              style={{ pathLength: reduce ? 1 : progress }}
            />
          </svg>
          {STEPS.map((s, i) => (
            <StepItem key={s.title} step={s} i={i} progress={progress} />
          ))}
        </ol>
      </div>
    </section>
  );
}
