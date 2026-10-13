"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { PHOTOS, type Photo } from "@/lib/images";
import { MESSAGES, whatsappLink } from "@/lib/site";
import { EASE_CINE, EASE_DOLLY, EASE_SMOKE } from "@/lib/motion";
import { MaskWords } from "./ui/Reveal";
import { MagneticLink } from "./ui/MagneticLink";
import { WhatsAppIcon } from "./ui/Icons";

type Style = {
  title: string;
  description: string;
  price: string;
  session: string;
  photo: Photo;
  message: string;
  isPlaceholder?: boolean;
};

const STYLES: Style[] = [
  {
    title: "Realismo black & grey",
    description:
      "Retratos, animales y figuras con volumen real, trabajados solo en negro y gris para que la imagen tenga profundidad.",
    price: "[PLACEHOLDER: precio o “desde $...”]",
    session: "[PLACEHOLDER: tiempo aproximado de sesión]",
    photo: PHOTOS.lionCalf,
    message: MESSAGES.realism,
  },
  {
    title: "Diseños únicos",
    description:
      "Llegas con una idea, una referencia o una historia. Joel la convierte en un diseño personalizado, hecho solo para ti.",
    price: "[PLACEHOLDER: precio o “desde $...”]",
    session: "[PLACEHOLDER: tiempo aproximado de sesión]",
    photo: PHOTOS.aztecCalf,
    message: MESSAGES.custom,
  },
  {
    title: "[PLACEHOLDER: otro estilo 1]",
    description: "[PLACEHOLDER: descripción breve del estilo]",
    price: "[PLACEHOLDER: precio o “desde $...”]",
    session: "[PLACEHOLDER: tiempo aproximado de sesión]",
    photo: PHOTOS.seahorseArm,
    message: "¡Hola Joel! Vi tu página y me gustaría cotizar un tatuaje de [PLACEHOLDER: otro estilo 1].",
    isPlaceholder: true,
  },
  {
    title: "[PLACEHOLDER: otro estilo 2, p. ej. cover-ups]",
    description: "[PLACEHOLDER: descripción breve del estilo]",
    price: "[PLACEHOLDER: precio o “desde $...”]",
    session: "[PLACEHOLDER: tiempo aproximado de sesión]",
    photo: PHOTOS.pandaArm,
    message: "¡Hola Joel! Vi tu página y me gustaría cotizar un tatuaje de [PLACEHOLDER: otro estilo 2].",
    isPlaceholder: true,
  },
];

// Trazos de construcción: el boceto previo al sombreado.
const SKETCH = [
  "M24 24 H376 V476 H24 Z",
  "M200 20 V480",
  "M20 210 H380",
  "M200 90 C 290 90 320 160 320 220 C 320 310 260 370 200 370 C 140 370 80 310 80 220 C 80 160 110 90 200 90",
  "M120 200 C 150 185 175 185 190 200 M210 200 C 225 185 250 185 280 200",
  "M200 220 L 188 280 L 212 284",
  "M160 320 C 185 335 215 335 240 320",
  "M40 470 L 110 400 M40 440 L 90 390 M40 410 L 70 380 M330 70 L 370 30 M300 70 L 360 30",
];

function StyleCard({ s, index }: { s: Style; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const reduce = useReducedMotion();
  const on = inView || !!reduce;

  return (
    <article className={`group ${index % 2 === 1 ? "md:mt-40" : ""}`}>
      <div ref={ref} className="relative aspect-[4/5] overflow-hidden rounded-frame bg-coal">
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { opacity: 0, scale: 1.05 }}
          animate={on ? { opacity: 1, scale: 1 } : undefined}
          transition={{ opacity: { duration: 1.4, delay: 0.95, ease: EASE_SMOKE }, scale: { duration: 2.2, delay: 0.95, ease: EASE_CINE } }}
        >
          <Image
            src={s.photo.src}
            alt={s.photo.alt}
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 44vw, 100vw"
            className="object-cover transition-transform duration-[1400ms] ease-cine group-hover:scale-[1.03]"
          />
        </motion.div>

        <motion.svg
          aria-hidden
          viewBox="0 0 400 500"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 size-full text-bone"
          initial={reduce ? { opacity: 0 } : { opacity: 0.9 }}
          animate={on ? { opacity: reduce ? 0 : 0.14 } : undefined}
          transition={{ duration: 1.2, delay: 1.6, ease: EASE_SMOKE }}
        >
          {SKETCH.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              initial={reduce ? false : { pathLength: 0 }}
              animate={on ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.3, delay: i * 0.07, ease: EASE_DOLLY }}
            />
          ))}
        </motion.svg>
      </div>

      <div className="mt-7 md:pr-8">
        <h3 className={`display text-3xl md:text-[2.5rem] ${s.isPlaceholder ? "text-jade" : "text-bone"}`}>{s.title}</h3>
        <p className={`mt-4 max-w-[46ch] leading-relaxed ${s.isPlaceholder ? "placeholder" : "text-smoke"}`}>
          {s.description}
        </p>
        <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-line pt-5 text-sm">
          <dt className="text-smoke">Precio</dt>
          <dd className="placeholder">{s.price}</dd>
          <dt className="text-smoke">Sesión</dt>
          <dd className="placeholder">{s.session}</dd>
        </dl>
        <MagneticLink
          href={whatsappLink(s.message)}
          variant="dark"
          className="mt-7"
          strength={0.15}
          icon={<WhatsAppIcon width={16} height={16} />}
        >
          Cotizar este estilo
        </MagneticLink>
      </div>
    </article>
  );
}

export function Styles() {
  return (
    <section id="estilos" aria-labelledby="estilos-title" className="section-y relative border-t border-line/60">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="mb-6 text-xs uppercase tracking-[0.22em] text-smoke">Estilos</p>
          <MaskWords
            as="h2"
            id="estilos-title"
            text="Del boceto a la piel."
            className="display text-[clamp(2.6rem,6vw,5.25rem)] text-bone"
          />
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-smoke">
            Cada pieza empieza como trazo y termina en sombra. Elige un estilo y mándame tu idea.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-20 md:mt-24 md:grid-cols-2 lg:gap-x-20">
          {STYLES.map((s, i) => (
            <StyleCard key={s.title + i} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
