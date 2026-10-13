"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PHOTOS } from "@/lib/images";
import { MESSAGES, whatsappLink } from "@/lib/site";
import { MaskWords, Rise } from "./ui/Reveal";
import { MagneticLink } from "./ui/MagneticLink";
import { WhatsAppIcon } from "./ui/Icons";

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Zoom lento ligado al scroll: la pieza se acerca mientras cruzas la sección.
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.18, 1]);

  return (
    <section
      ref={ref}
      id="contacto"
      aria-labelledby="cta-title"
      className="relative isolate flex min-h-[88dvh] items-center overflow-hidden border-t border-line/60"
    >
      <motion.div aria-hidden style={{ scale }} className="absolute inset-0 -z-10">
        <Image
          src={PHOTOS.portraitsThighs.src}
          alt=""
          fill
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[50%_45%]"
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/60" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_10%,var(--color-ink)_78%)]" />

      <div className="container-x flex flex-col items-center py-28 text-center">
        <MaskWords
          as="h2"
          id="cta-title"
          text="Creemos el tatuaje que cuente tu historia."
          stagger={0.08}
          className="display max-w-[16ch] text-[clamp(2.8rem,7.5vw,7rem)] leading-[0.95] text-bone"
        />
        <Rise delay={0.4} className="mt-8 max-w-[44ch] text-lg leading-relaxed text-bone/85">
          <p>Mándame tu idea, tus referencias y la zona del cuerpo. Empezamos desde ahí.</p>
        </Rise>
        <Rise delay={0.6} className="mt-12">
          <MagneticLink
            href={whatsappLink(MESSAGES.final)}
            size="xl"
            strength={0.35}
            icon={<WhatsAppIcon width={22} height={22} />}
          >
            Escríbeme por WhatsApp
          </MagneticLink>
        </Rise>
      </div>
    </section>
  );
}
