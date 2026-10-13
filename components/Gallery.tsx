"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { GALLERY, type Photo } from "@/lib/images";
import { SITE } from "@/lib/site";
import { EASE_CINE } from "@/lib/motion";
import { useFinePointer, useMediaQuery } from "@/lib/useMediaQuery";
import { MaskWords } from "./ui/Reveal";
import { MagneticLink } from "./ui/MagneticLink";
import { ChevronLeft, ChevronRight, CloseIcon, InstagramIcon } from "./ui/Icons";

function Tile({
  photo,
  order,
  onOpen,
  shared,
}: {
  photo: Photo;
  order: number;
  onOpen: (id: string, el: HTMLButtonElement) => void;
  shared: boolean;
}) {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const interactive = fine && !reduce;

  // Inclinación sutil + reflector que sigue al cursor (solo transform, solo desktop).
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [4, -4]), { stiffness: 150, damping: 20 });
  const ry = useSpring(useTransform(px, [0, 1], [-4, 4]), { stiffness: 150, damping: 20 });
  const lx = useTransform(px, (v) => `${(v - 0.5) * 100}%`);
  const ly = useTransform(py, (v) => `${(v - 0.5) * 100}%`);
  const glow = useSpring(0, { stiffness: 120, damping: 20 });

  function move(e: PointerEvent<HTMLButtonElement>) {
    if (!interactive) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, scale: 1.06 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.4, delay: (order % 3) * 0.12, ease: EASE_CINE }}
      style={{ perspective: 900 }}
    >
      <motion.button
        type="button"
        onClick={(e) => onOpen(photo.id, e.currentTarget)}
        onPointerMove={move}
        onPointerEnter={() => interactive && glow.set(1)}
        onPointerLeave={() => {
          px.set(0.5);
          py.set(0.5);
          glow.set(0);
        }}
        style={interactive ? { rotateX: rx, rotateY: ry } : undefined}
        aria-label={`Ampliar: ${photo.alt}`}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-frame bg-coal"
      >
        <motion.div layoutId={shared ? `work-${photo.id}` : undefined} className="relative">
          <Image
            src={photo.src}
            alt=""
            placeholder="blur"
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 50vw"
            className="h-auto w-full transition-[filter] duration-700 ease-cine group-hover:brightness-110"
          />
        </motion.div>
        {interactive && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 size-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.16),transparent)] mix-blend-soft-light"
            style={{ x: lx, y: ly, opacity: glow }}
          />
        )}
      </motion.button>
    </motion.li>
  );
}

function Column({ items, y, startOrder, onOpen, sharedId }: {
  items: Photo[];
  y?: MotionValue<number>;
  startOrder: number;
  onOpen: (id: string, el: HTMLButtonElement) => void;
  sharedId: string | null;
}) {
  return (
    <motion.ul style={y ? { y } : undefined} className="flex flex-col gap-3 md:gap-5">
      {items.map((p, i) => (
        <Tile key={p.id} photo={p} order={startOrder + i} onOpen={onOpen} shared={sharedId === null || sharedId === p.id} />
      ))}
    </motion.ul>
  );
}

export function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 768px)");
  const parallax = desktop && !reduce;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Velocidades distintas por columna para dar profundidad.
  const y0 = useTransform(scrollYProgress, [0, 1], [40, -60]);
  const y1 = useTransform(scrollYProgress, [0, 1], [140, -140]);
  const y2 = useTransform(scrollYProgress, [0, 1], [70, -30]);

  const cols = desktop ? 3 : 2;
  const columns = useMemo(() => {
    const out: Photo[][] = Array.from({ length: cols }, () => []);
    GALLERY.forEach((p, i) => out[i % cols].push(p));
    return out;
  }, [cols]);
  const ys = [y0, y1, y2];

  // Lightbox
  const [openId, setOpenId] = useState<string | null>(null);
  const [navigated, setNavigated] = useState(false);
  const opener = useRef<HTMLButtonElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const index = openId ? GALLERY.findIndex((p) => p.id === openId) : -1;
  const current = index >= 0 ? GALLERY[index] : null;

  const open = useCallback((id: string, el: HTMLButtonElement) => {
    opener.current = el;
    setNavigated(false);
    setOpenId(id);
  }, []);
  const close = useCallback(() => {
    setOpenId(null);
    opener.current?.focus({ preventScroll: true });
  }, []);
  const step = useCallback(
    (dir: 1 | -1) => {
      if (index < 0) return;
      setNavigated(true);
      setOpenId(GALLERY[(index + dir + GALLERY.length) % GALLERY.length].id);
    },
    [index],
  );

  useEffect(() => {
    if (!openId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Tab") {
        // Trampa de foco mínima dentro del diálogo.
        const nodes = document.querySelectorAll<HTMLElement>("#lightbox button");
        if (!nodes.length) return;
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
  }, [openId, close, step]);

  useEffect(() => {
    if (openId) closeBtn.current?.focus({ preventScroll: true });
    // Solo al abrir; la navegación conserva el foco en las flechas.
  }, [openId === null]);

  // Sin lightbox: todas las miniaturas registran su layoutId para poder abrirse con transición compartida.
  const sharedId = openId ? (navigated ? "" : openId) : null;

  return (
    <section ref={ref} id="trabajos" aria-labelledby="trabajos-title" className="section-y relative overflow-hidden bg-coal/40">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <MaskWords
            as="h2"
            id="trabajos-title"
            text="Trabajos recientes"
            className="display text-[clamp(2.6rem,7vw,6.5rem)] text-bone"
          />
          <MagneticLink
            href={SITE.instagram}
            variant="dark"
            strength={0.2}
            icon={<InstagramIcon width={16} height={16} />}
            className="self-start md:self-auto"
          >
            Ver más en Instagram
          </MagneticLink>
        </div>

        <div className={`mt-14 grid gap-3 md:mt-20 md:gap-5 ${cols === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
          {columns.map((items, c) => (
            <Column
              key={c}
              items={items}
              startOrder={c}
              y={parallax ? ys[c] : undefined}
              onOpen={open}
              sharedId={sharedId}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            id="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Trabajo ampliado"
            className="fixed inset-0 z-[60] flex flex-col overscroll-contain items-center justify-center bg-ink/95 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4, delay: 0.1 } }}
            transition={{ duration: 0.4 }}
            onClick={close}
          >
            <motion.div
              key={navigated ? current.id : "origin"}
              layoutId={navigated ? undefined : `work-${current.id}`}
              initial={navigated ? { opacity: 0 } : undefined}
              animate={navigated ? { opacity: 1 } : undefined}
              transition={{ duration: 0.7, ease: EASE_CINE }}
              className="relative overflow-hidden rounded-frame"
              style={{
                aspectRatio: `${current.src.width} / ${current.src.height}`,
                width: `min(92vw, calc(78dvh * ${current.src.width / current.src.height}))`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={current.src} alt={current.alt} fill sizes="92vw" quality={85} className="object-cover" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.35 } }}
              exit={{ opacity: 0 }}
              className="mt-5 max-w-[60ch] text-center text-sm text-smoke"
            >
              {current.alt}
            </motion.p>

            <div className="mt-5 flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => step(-1)} aria-label="Trabajo anterior" className="grid size-12 place-items-center rounded-full bg-ash text-bone ring-1 ring-inset ring-line transition hover:ring-bone/40">
                <ChevronLeft />
              </button>
              <button ref={closeBtn} type="button" onClick={close} aria-label="Cerrar" className="grid size-12 place-items-center rounded-full bg-bone text-ink transition hover:bg-white">
                <CloseIcon />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Trabajo siguiente" className="grid size-12 place-items-center rounded-full bg-ash text-bone ring-1 ring-inset ring-line transition hover:ring-bone/40">
                <ChevronRight />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
