"use client";

import { motion, useInView, useReducedMotion, useSpring, useTransform, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import { SITE } from "@/lib/site";
import { EASE_CINE, EASE_DOLLY } from "@/lib/motion";
import { MagneticLink } from "./ui/MagneticLink";
import { ArrowUpRight, StarShape } from "./ui/Icons";

type Review = { name: string; text: string; placeholder?: boolean; featured?: boolean };

const REVIEWS: Review[] = [
  { name: "José Joaquín D.", text: "Tatuaje excelente, me encanta, gran trabajo y gran servicio del artista." },
  { name: "Dario M.", text: "¡Joel es genial! En cuanto regrese a Cancún, me hago el segundo. Saludos 🇦🇷🇲🇽" },
  {
    name: "Michelle M.",
    text: "¡Artistas excepcionales! Verdaderos profesionales del tatuaje. Crearon una obra de arte en mi piel ✨",
    featured: true,
  },
  // Reseñas de ejemplo: reemplázalas con reseñas reales o borra estas dos entradas.
  { name: "[PLACEHOLDER: nombre + inicial]", text: "[PLACEHOLDER: texto de la reseña]", placeholder: true },
  { name: "[PLACEHOLDER: nombre + inicial]", text: "[PLACEHOLDER: texto de la reseña]", placeholder: true },
];

function Stars({ size = "size-4", baseDelay = 0 }: { size?: string; baseDelay?: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const on = useInView(ref, { once: true, amount: 1 }) || !!reduce;
  return (
    <span ref={ref} className="flex gap-1" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`relative ${size}`}>
          <StarShape className="absolute inset-0 fill-bone/15" />
          <motion.span
            className="absolute inset-0"
            initial={reduce ? false : { clipPath: "inset(0% 100% 0% 0%)" }}
            animate={on ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
            transition={{ duration: 0.55, delay: baseDelay + i * 0.16, ease: EASE_DOLLY }}
          >
            <StarShape className="size-full fill-bone" />
          </motion.span>
        </span>
      ))}
    </span>
  );
}

const cards: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.13 } } };
const card: Variants = {
  hidden: { opacity: 0, x: 48 },
  show: { opacity: 1, x: 0, transition: { duration: 1.1, ease: EASE_CINE } },
};

export function Reviews() {
  const blockRef = useRef<HTMLDivElement>(null);
  const inView = useInView(blockRef, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  // Mismo valor inicial en servidor y cliente (evita desajustes de hidratación).
  const count = useSpring(0, { stiffness: 38, damping: 18 });
  const label = useTransform(count, (v) => v.toFixed(1));

  useEffect(() => {
    if (reduce) count.jump(SITE.rating.value);
    else if (inView) count.set(SITE.rating.value);
  }, [inView, reduce, count]);

  return (
    <section id="resenas" aria-labelledby="resenas-title" className="section-y relative border-t border-line/60">
      <div className="container-x grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div ref={blockRef} className="lg:sticky lg:top-28">
            <h2 id="resenas-title" className="display text-[clamp(2.4rem,5vw,4rem)] text-bone">
              Lo que dicen en Google
            </h2>
            <div className="mt-10 flex items-end gap-5">
              <motion.span
                aria-hidden
                className="display text-[clamp(6.5rem,16vw,12rem)] leading-[0.8] tabular-nums text-bone"
              >
                {label}
              </motion.span>
              <div className="pb-3">
                <Stars size="size-6 md:size-7" baseDelay={0.5} />
              </div>
            </div>
            <p className="sr-only">Calificación de 5.0 de 5 estrellas.</p>
            <p className="mt-6 text-smoke">Basado en {SITE.rating.count} reseñas de Google</p>
            <MagneticLink
              href={SITE.googleReviews}
              variant="dark"
              className="mt-9"
              strength={0.15}
              icon={<ArrowUpRight width={16} height={16} />}
            >
              Ver las 5 reseñas en Google
            </MagneticLink>
          </div>
        </div>

        <motion.ul
          variants={cards}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:col-span-7"
        >
          {REVIEWS.map((r, i) => (
            <motion.li
              key={i}
              variants={card}
              className={`flex flex-col justify-between gap-8 rounded-frame p-7 md:p-8 ${
                r.featured ? "sm:col-span-2 bg-ash" : "bg-coal ring-1 ring-inset ring-line"
              } ${r.placeholder ? "opacity-80" : ""}`}
            >
              <figure>
                <Stars size="size-3.5" baseDelay={0.5} />
                <span className="sr-only">5 de 5 estrellas</span>
                <blockquote className="mt-5">
                  <p
                    className={
                      r.placeholder
                        ? "placeholder"
                        : r.featured
                          ? "display text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.12] text-bone"
                          : "text-lg leading-relaxed text-bone/90"
                    }
                  >
                    {r.placeholder ? r.text : `“${r.text}”`}
                  </p>
                </blockquote>
                <figcaption className={`mt-6 text-sm ${r.placeholder ? "placeholder" : "text-smoke"}`}>
                  {r.name}
                  {!r.placeholder && <span>, reseña en Google</span>}
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
