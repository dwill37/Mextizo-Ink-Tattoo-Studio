"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState, type ReactNode } from "react";
import { SITE, whatsappLink } from "@/lib/site";
import { EASE_CINE } from "@/lib/motion";
import { MaskWords } from "./ui/Reveal";

const linkCls = "text-bone underline decoration-line underline-offset-4 transition-colors hover:decoration-bone";

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "¿Cómo cotizo mi tatuaje?",
    a: (
      <>
        Escríbeme por{" "}
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={linkCls}>
          WhatsApp
        </a>{" "}
        y mándame tu idea: referencias, tamaño aproximado y zona del cuerpo. Con eso te paso tu cotización.
      </>
    ),
  },
  {
    q: "¿Cuánto cuesta un tatuaje?",
    a: (
      <>
        <span className="placeholder">[PLACEHOLDER: rango de precios o cómo se calcula el precio]</span>{" "}
        Mándame tu idea por WhatsApp y te cotizo tu pieza.
      </>
    ),
  },
  {
    q: "¿Haces diseños personalizados?",
    a: "Sí. Creo diseños únicos a partir de tu idea, para que tu tatuaje cuente tu historia.",
  },
  {
    q: "¿Necesito dejar anticipo?",
    a: <span className="placeholder">[PLACEHOLDER: política de anticipo]</span>,
  },
  {
    q: "¿Haces cover-ups o retoques?",
    a: <span className="placeholder">[PLACEHOLDER: respuesta sobre cover-ups y retoques]</span>,
  },
  {
    q: "¿Dónde están y cuál es su horario?",
    a: (
      <>
        Estamos en {SITE.address.full}. Cerramos a las {SITE.hours.closes}.{" "}
        <span className="placeholder">{SITE.hours.openingLabel}</span>
      </>
    ),
  },
];

function Item({ q, a, open, onToggle }: { q: string; a: ReactNode; open: boolean; onToggle: () => void }) {
  const id = useId();
  return (
    <li className="border-b border-line">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
        >
          <span className={`text-lg transition-colors duration-500 md:text-xl ${open ? "text-bone" : "text-bone/80 group-hover:text-bone"}`}>
            {q}
          </span>
          <motion.span
            aria-hidden
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.5, ease: EASE_CINE }}
            className={`relative grid size-9 shrink-0 place-items-center rounded-full ring-1 ring-inset transition-colors duration-500 ${open ? "bg-bone text-ink ring-bone" : "text-bone ring-line group-hover:ring-bone/40"}`}
          >
            <span className="absolute h-px w-3.5 bg-current" />
            <span className="absolute h-3.5 w-px bg-current" />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-btn`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.55, ease: EASE_CINE }, opacity: { duration: 0.4 } }}
            className="overflow-hidden"
          >
            <p className="max-w-[60ch] pb-7 pr-12 leading-relaxed text-smoke">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y relative border-t border-line/60">
      <div className="container-x">
        <div className="mx-auto max-w-3xl">
          <MaskWords
            as="h2"
            id="faq-title"
            text="Preguntas frecuentes"
            className="display text-[clamp(2.6rem,6vw,5.25rem)] text-bone"
          />
          <ul className="mt-12 border-t border-line md:mt-16">
            {FAQS.map((f, i) => (
              <Item key={f.q} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
