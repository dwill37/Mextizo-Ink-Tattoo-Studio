"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { PHOTOS } from "@/lib/images";
import { SITE } from "@/lib/site";
import { EASE_CINE } from "@/lib/motion";
import { MagneticLink } from "./ui/MagneticLink";
import { FacebookIcon, InstagramIcon } from "./ui/Icons";

// Texto del artista, literal. Se revela frase por frase a través de máscaras.
const ARTIST_TEXT = [
  "Bienvenido.",
  "En esta página, comparto mi pasión y trabajo como tatuador y artista, mostrando mi portafolio, procesos creativos y diseños únicos.",
  "Inspírate y contáctame para descubrir cómo podemos crear un tatuaje que cuente tu historia.",
];

const lines: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.22, delayChildren: 0.15 } } };
const line: Variants = {
  hidden: { y: "102%" },
  show: { y: "0%", transition: { duration: 1.2, ease: EASE_CINE } },
};

export function Artist() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const { scrollYProgress: through } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Reflector: el círculo de luz crece conforme la sección entra en pantalla.
  const radius = useTransform(scrollYProgress, [0, 1], [10, 115]);
  const clipPath = useTransform(radius, (r) => `circle(${reduce ? 100 : r}% at 50% 38%)`);
  const photoY = useTransform(through, [0, 1], reduce ? ["0%", "0%"] : ["-7%", "7%"]);

  return (
    <section ref={ref} id="joel" aria-labelledby="joel-title" className="section-y relative border-t border-line/60">
      <div className="container-x grid grid-cols-1 items-center gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5 lg:col-span-5">
          <motion.div
            style={{ clipPath }}
            className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] overflow-hidden rounded-frame bg-coal md:mx-0"
          >
            <motion.div style={{ y: photoY }} className="absolute inset-[-8%_0]">
              <Image
                src={PHOTOS.joel.src}
                alt={PHOTOS.joel.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 768px) 26rem, 90vw"
                className="object-cover object-[50%_30%] grayscale-[35%]"
              />
            </motion.div>
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_40%,rgb(10_10_9/0.65))]" />
          </motion.div>
        </div>

        <div className="md:col-span-7 lg:col-span-6 lg:col-start-7">
          <p className="mb-6 text-xs uppercase tracking-[0.22em] text-smoke">Conoce a Joel</p>
          <h2 id="joel-title" className="display text-[clamp(3rem,7vw,6rem)] text-bone">
            {SITE.artist}
          </h2>
          <p className="mt-4 text-sm font-medium text-jade">Realismo Negro y Gris</p>

          <motion.blockquote
            variants={lines}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="mt-10 space-y-4"
          >
            {ARTIST_TEXT.map((t, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  variants={line}
                  className={`block ${i === 0 ? "display text-3xl italic text-bone md:text-4xl" : "text-lg leading-relaxed text-bone/85 md:text-xl"}`}
                >
                  {t}
                </motion.span>
              </span>
            ))}
          </motion.blockquote>

          <dl className="mt-10 border-t border-line pt-6 text-sm">
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              <dt className="text-smoke">Experiencia</dt>
              <dd className="placeholder">[PLACEHOLDER: años de experiencia]</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticLink href={SITE.instagram} variant="dark" strength={0.15} icon={<InstagramIcon width={16} height={16} />}>
              Instagram
            </MagneticLink>
            <MagneticLink href={SITE.facebook} variant="dark" strength={0.15} icon={<FacebookIcon width={16} height={16} />}>
              Facebook
            </MagneticLink>
          </div>
        </div>
      </div>
    </section>
  );
}
