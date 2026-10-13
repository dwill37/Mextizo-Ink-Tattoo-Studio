"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PHOTOS } from "@/lib/images";
import { MESSAGES, SITE, whatsappLink } from "@/lib/site";
import { EASE_CINE, EASE_DOLLY } from "@/lib/motion";
import { MaskWords } from "./ui/Reveal";
import { MagneticLink } from "./ui/MagneticLink";
import { ArrowDown, WhatsAppIcon } from "./ui/Icons";

// Punto donde "enciende" el reflector: el rostro de la pieza.
const SPOT = "at 60% 38%";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Al salir del hero la foto se hunde lentamente en la sombra.
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.15]);

  const cta = (d: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 22 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay: d, ease: EASE_CINE },
  });

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden bg-ink"
    >
      {/* Capa de foto: el reflector se abre (clip-path) y la pieza se asienta (scale 1.1 → 1). */}
      <motion.div
        className="absolute inset-0 -z-10 md:left-[16%]"
        style={{ y: photoY }}
        initial={reduce ? false : { clipPath: `circle(14% ${SPOT})` }}
        animate={{ clipPath: `circle(150% ${SPOT})` }}
        transition={{ duration: 1.7, delay: 0.1, ease: EASE_DOLLY }}
      >
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, delay: 0.1, ease: EASE_CINE }}
        >
          <Image
            src={PHOTOS.christForearm.src}
            alt={PHOTOS.christForearm.alt}
            fill
            priority
            fetchPriority="high"
            placeholder="blur"
            sizes="(min-width: 768px) 84vw, 100vw"
            className="object-cover object-[50%_32%]"
          />
        </motion.div>
      </motion.div>

      {/* Sombras que garantizan contraste del texto sobre la foto. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-y-0 left-0 hidden w-[16%] bg-ink md:block" />
        <div className="absolute inset-y-0 left-[16%] hidden w-[38%] bg-gradient-to-r from-ink via-ink/70 to-transparent md:block" />
        <div className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-ink via-ink/80 to-transparent md:h-[60%]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/80 to-transparent" />
      </div>

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="container-x relative flex flex-1 flex-col justify-end pb-28 pt-32 md:pb-20 lg:pb-24"
      >
        <motion.a
          {...cta(1.15)}
          href="#resenas"
          className="mb-7 inline-flex w-fit items-center rounded-full bg-ink/50 px-3.5 py-2 text-[0.8125rem] text-bone ring-1 ring-inset ring-bone/20 backdrop-blur-sm transition-colors hover:ring-bone/50"
        >
          <span>
            <strong className="font-semibold">5.0</strong> ★ en Google · 5 reseñas
          </span>
        </motion.a>

        <MaskWords
          as="h1"
          immediate
          delay={0.35}
          stagger={0.09}
          text={"Tu historia,\nen negro y gris."}
          className="display text-[clamp(3rem,8.4vw,8rem)] leading-[0.92] text-bone"
        />

        {/* Visible desde el primer render (solo se desliza): es el candidato a LCP. */}
        <motion.p
          initial={reduce ? false : { y: 18 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: EASE_CINE }}
          className="mt-7 max-w-[42ch] text-[1.0625rem] leading-relaxed text-bone/85 md:text-lg"
        >
          Realismo black &amp; grey por {SITE.artist}, en Cancún. Diseños únicos, creados a partir de tu idea.
        </motion.p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <motion.div {...cta(1.3)}>
            <MagneticLink
              href={whatsappLink(MESSAGES.general)}
              size="lg"
              icon={<WhatsAppIcon width={18} height={18} />}
            >
              Cotiza tu tatuaje por WhatsApp
            </MagneticLink>
          </motion.div>
          <motion.div {...cta(1.42)}>
            <MagneticLink
              href="#trabajos"
              external={false}
              variant="ghost"
              size="lg"
              strength={0.15}
              icon={<ArrowDown width={16} height={16} />}
            >
              Ver trabajos
            </MagneticLink>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
