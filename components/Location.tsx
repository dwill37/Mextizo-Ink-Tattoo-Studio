"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { SITE } from "@/lib/site";
import { EASE_DOLLY } from "@/lib/motion";
import { MaskWords, Rise } from "./ui/Reveal";
import { MagneticLink } from "./ui/MagneticLink";
import { ArrowUpRight, ClockIcon, PhoneIcon, PinIcon } from "./ui/Icons";

export function Location() {
  const mapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // El iframe de Google Maps solo se carga cerca de la vista (protege el rendimiento).
  const near = useInView(mapRef, { once: true, margin: "400px 0px" });
  const visible = useInView(mapRef, { once: true, amount: 0.35 });

  return (
    <section id="ubicacion" aria-labelledby="ubicacion-title" className="section-y relative border-t border-line/60">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <MaskWords
            as="h2"
            id="ubicacion-title"
            text="Visítanos en Cancún"
            className="display text-[clamp(2.6rem,5.5vw,4.5rem)] text-bone"
          />

          <Rise className="mt-10 space-y-7 text-[0.975rem]">
            <div className="flex gap-4">
              <PinIcon className="mt-0.5 shrink-0 text-jade" />
              <div>
                <p className="text-bone">{SITE.address.full}</p>
                <p className="mt-1 text-sm text-smoke">Plus code: {SITE.plusCode}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <ClockIcon className="mt-0.5 shrink-0 text-jade" />
              <div>
                <p className="text-bone">Cierra a las {SITE.hours.closes}</p>
                <p className="placeholder mt-1">{SITE.hours.openingLabel}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <PhoneIcon className="mt-0.5 shrink-0 text-jade" />
              <a href={SITE.phoneHref} className="text-bone underline decoration-line underline-offset-4 transition-colors hover:decoration-bone">
                {SITE.phoneDisplay}
              </a>
            </div>
          </Rise>

          <MagneticLink
            href={SITE.directions}
            className="mt-10"
            strength={0.2}
            icon={<ArrowUpRight width={16} height={16} />}
          >
            Cómo llegar
          </MagneticLink>
        </div>

        {/* El observador vive en un contenedor sin clip-path (si no, nunca detecta la intersección). */}
        <div ref={mapRef} className="relative aspect-[4/5] sm:aspect-[4/3] lg:col-span-8 lg:aspect-auto lg:min-h-[34rem]">
        <motion.div
          initial={reduce ? false : { clipPath: "inset(0% 0% 100% 0%)" }}
          animate={visible || reduce ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
          transition={{ duration: 1.5, ease: EASE_DOLLY }}
          className="absolute inset-0 overflow-hidden rounded-frame bg-coal ring-1 ring-inset ring-line"
        >
          {near && (
            <iframe
              title="Mapa de Mextizo Ink Tattoo Studio en Nichupté 507, Cancún"
              src={SITE.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0 [filter:grayscale(1)_invert(0.9)_contrast(0.92)_brightness(0.95)]"
            />
          )}
        </motion.div>
        </div>
      </div>
    </section>
  );
}
