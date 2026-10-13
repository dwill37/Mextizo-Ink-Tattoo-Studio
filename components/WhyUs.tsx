"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { PHOTOS } from "@/lib/images";
import { EASE_CINE, EASE_DOLLY } from "@/lib/motion";
import { MaskWords } from "./ui/Reveal";

const grid: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.16 } } };

// Barrido de "sombreado": la tarjeta se revela de izquierda a derecha mientras sube desde la oscuridad.
const shade: Variants = {
  hidden: { opacity: 0, y: 40, clipPath: "inset(0% 100% 0% 0%)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      opacity: { duration: 0.9, ease: EASE_CINE },
      y: { duration: 1.2, ease: EASE_CINE },
      clipPath: { duration: 1.3, ease: EASE_DOLLY },
    },
  },
};

function Cell({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <motion.article variants={shade} className={`relative overflow-hidden rounded-frame ${className}`}>
      {children}
    </motion.article>
  );
}

export function WhyUs() {
  const reduce = useReducedMotion();

  return (
    <section id="por-que" aria-labelledby="por-que-title" className="section-y relative">
      <div className="container-x">
        <div className="max-w-5xl">
          <MaskWords
            as="h2"
            id="por-que-title"
            text="¿Por qué Mextizo Ink?"
            className="display text-[clamp(2.6rem,6vw,5.25rem)] text-bone"
          />
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-smoke">
            Lo que dicen las personas que ya se tatuaron con Joel, y lo que define su trabajo.
          </p>
        </div>

        <motion.div
          variants={grid}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid grid-cols-1 gap-3 md:mt-20 md:grid-cols-12 md:gap-4"
        >
          {/* Especialidad: celda con foto */}
          <Cell className="min-h-[26rem] md:col-span-7 md:row-span-2 md:min-h-[36rem]">
            <Image
              src={PHOTOS.dragonArm.src}
              alt={PHOTOS.dragonArm.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 56vw, 100vw"
              className="object-cover object-[50%_40%]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
            <div className="relative flex h-full flex-col justify-end p-7 md:p-10">
              <h3 className="display text-4xl text-bone md:text-5xl">Especialista en negro y gris</h3>
              <p className="mt-4 max-w-[40ch] leading-relaxed text-bone/85">
                El realismo black &amp; grey es la firma de Joel: profundidad, contraste y detalle que se
                disfruta de cerca.
              </p>
            </div>
          </Cell>

          <Cell className="bg-coal p-7 ring-1 ring-inset ring-line md:col-span-5 md:p-10">
            <h3 className="display text-3xl text-bone md:text-4xl">Una obra de arte en tu piel</h3>
            <p className="mt-4 leading-relaxed text-smoke">
              Así lo describió Michelle M. en su reseña. Cada pieza se trabaja como obra, no como trámite.
            </p>
          </Cell>

          <Cell className="bg-ash p-7 md:col-span-5 md:p-10">
            <h3 className="display text-3xl text-bone md:text-4xl">Trato profesional y cercano</h3>
            <p className="mt-4 leading-relaxed text-smoke">
              Las reseñas lo repiten: gran servicio del artista y verdaderos profesionales del tatuaje.
            </p>
          </Cell>

          <Cell className="bg-coal p-7 ring-1 ring-inset ring-line md:col-span-8 md:p-10">
            <h3 className="text-sm font-medium text-jade">Clientes que regresan</h3>
            <blockquote className="mt-5">
              <p className="display text-[clamp(1.9rem,3.6vw,3rem)] italic leading-[1.08] text-bone">
                “¡Joel es genial! En cuanto regrese a Cancún, me hago el segundo.”
              </p>
              <footer className="mt-5 text-sm text-smoke">Dario M., reseña en Google</footer>
            </blockquote>
          </Cell>

          <Cell className="flex flex-col justify-between gap-6 p-7 ring-1 ring-inset ring-line/80 [background:repeating-linear-gradient(135deg,transparent_0_10px,rgb(255_255_255/0.02)_10px_11px)] md:col-span-4 md:p-10">
            {/* Celda opcional: elimínala si no hay un diferenciador real que comunicar. */}
            <h3 className="display text-3xl text-bone">Lo que nos distingue</h3>
            <p className="placeholder">[PLACEHOLDER: diferenciador clave, p. ej. estándares de higiene]</p>
          </Cell>
        </motion.div>
      </div>
    </section>
  );
}
