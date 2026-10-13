"use client";

import { motion, useReducedMotion } from "framer-motion";
import { whatsappLink } from "@/lib/site";
import { INTRO_DURATION, SPRING_SOFT } from "@/lib/motion";
import { WhatsAppIcon } from "./ui/Icons";

/** Botón flotante: siempre visible en móvil, discreto (solo icono) en desktop. Entra al terminar la intro. */
export function FloatingWhatsApp() {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ...SPRING_SOFT, delay: INTRO_DURATION + 0.2 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="group fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-40 flex h-14 items-center gap-2.5 rounded-full bg-bone pl-4 pr-5 text-ink shadow-[0_12px_40px_-8px_rgb(0_0_0/0.7)] md:bottom-6 md:right-6 md:size-12 md:justify-center md:bg-ash md:p-0 md:text-bone md:ring-1 md:ring-inset md:ring-line md:hover:ring-bone/40"
    >
      <WhatsAppIcon width={22} height={22} />
      <span className="text-sm font-medium md:sr-only">Cotiza por WhatsApp</span>
    </motion.a>
  );
}
