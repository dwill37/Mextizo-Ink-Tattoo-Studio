"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS, SITE, whatsappLink } from "@/lib/site";
import { EASE_CINE, EASE_DOLLY } from "@/lib/motion";
import { Wordmark } from "./ui/Wordmark";
import { MagneticLink } from "./ui/MagneticLink";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./ui/Icons";

const menuList: Variants = {
  closed: {},
  open: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } },
};
const menuItem: Variants = {
  closed: { y: "110%" },
  open: { y: "0%", transition: { duration: 0.9, ease: EASE_CINE } },
};

export function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > 48;
    if (next !== solid) setSolid(next);
  });

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab") {
        // Trampa de foco: botón de cierre + enlaces del menú.
        const menu = document.getElementById("menu-movil");
        const nodes = [toggleRef.current, ...Array.from(menu?.querySelectorAll<HTMLElement>("a") ?? [])].filter(
          Boolean,
        ) as HTMLElement[];
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const compact = solid || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Fondo sólido: solo opacidad, sin animar layout. */}
      <motion.div
        aria-hidden
        className="absolute inset-0 border-b border-line/70 bg-ink/85 backdrop-blur-md"
        initial={false}
        animate={{ opacity: solid && !open ? 1 : 0 }}
        transition={{ duration: 0.6, ease: EASE_CINE }}
      />

      <motion.nav
        aria-label="Principal"
        className="container-x relative flex h-16 items-center justify-between gap-6"
        initial={false}
        animate={{ y: compact ? 0 : 10 }}
        transition={{ duration: 0.7, ease: EASE_CINE }}
      >
        <a href="#inicio" className="relative z-10 -m-2 p-2 text-bone" onClick={() => setOpen(false)}>
          <Wordmark draw delay={0.55} className="h-6 w-auto md:h-7" />
        </a>

        <motion.ul
          className="hidden items-center gap-7 text-[0.8125rem] text-bone/80 lg:flex"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4, ease: EASE_CINE }}
        >
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative py-2 transition-colors duration-300 hover:text-bone after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-bone after:transition-transform after:duration-500 after:ease-cine hover:after:scale-x-100"
              >
                {l.label}
              </a>
            </li>
          ))}
        </motion.ul>

        <div className="relative z-10 flex items-center gap-2">
          <motion.div
            className="hidden sm:block"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: EASE_CINE }}
          >
            <MagneticLink
              href={whatsappLink()}
              size="md"
              strength={0.2}
              icon={<WhatsAppIcon width={16} height={16} />}
            >
              Cotiza por WhatsApp
            </MagneticLink>
          </motion.div>

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((o) => !o)}
            className="relative grid size-11 place-items-center rounded-full text-bone lg:hidden"
          >
            <span className="relative block h-3 w-6">
              <motion.span
                className="absolute left-0 top-0 h-px w-6 bg-current"
                animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.5, ease: EASE_CINE }}
              />
              <motion.span
                className="absolute bottom-0 left-0 h-px w-6 bg-current"
                animate={open ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.5, ease: EASE_CINE }}
              />
            </span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            className="fixed inset-0 -z-10 flex flex-col overflow-y-auto overscroll-contain bg-ink pb-[env(safe-area-inset-bottom)] lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 2.6rem) 2.6rem)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "circle(150% at calc(100% - 2.6rem) 2.6rem)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 2.6rem) 2.6rem)" }}
            transition={{ duration: 0.85, ease: EASE_DOLLY }}
          >
            <motion.ul
              className="container-x mt-28 flex flex-col gap-1"
              variants={menuList}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {NAV_LINKS.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    ref={i === 0 ? firstLinkRef : undefined}
                    variants={reduce ? undefined : menuItem}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display block py-1.5 text-[2.6rem] text-bone sm:text-6xl"
                  >
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </motion.ul>

            <motion.div
              className="container-x mt-auto flex flex-col gap-6 pb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.7, duration: 0.6 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <MagneticLink
                href={whatsappLink()}
                size="lg"
                strength={0}
                className="self-start"
                icon={<WhatsAppIcon width={18} height={18} />}
              >
                Cotiza por WhatsApp
              </MagneticLink>
              <div className="flex items-center gap-5 text-sm text-smoke">
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-bone">
                  <InstagramIcon width={18} height={18} /> Instagram
                </a>
                <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-bone">
                  <FacebookIcon width={18} height={18} /> Facebook
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
