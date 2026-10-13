"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { ReactNode, PointerEvent } from "react";
import { useFinePointer } from "@/lib/useMediaQuery";

type Variant = "light" | "ghost" | "dark";

const VARIANTS: Record<Variant, { shell: string; icon: string }> = {
  light: {
    shell: "bg-bone text-ink hover:bg-white",
    icon: "bg-ink text-bone",
  },
  ghost: {
    shell: "bg-ink/40 text-bone ring-1 ring-inset ring-bone/25 backdrop-blur-sm hover:ring-bone/60",
    icon: "bg-bone/10 text-bone",
  },
  dark: {
    shell: "bg-ash text-bone ring-1 ring-inset ring-line hover:ring-bone/40",
    icon: "bg-bone/10 text-bone",
  },
};

type Props = {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  variant?: Variant;
  size?: "md" | "lg" | "xl";
  /** Fuerza del efecto imán (0 lo desactiva). */
  strength?: number;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
};

const SIZES = {
  md: "h-11 pl-5 pr-1.5 text-sm gap-3",
  lg: "h-14 pl-6 pr-2 text-[0.95rem] gap-4",
  xl: "h-16 pl-7 pr-2 text-base md:h-20 md:pl-9 md:pr-2.5 md:text-lg gap-5",
};
const ICON_SIZES = { md: "size-8", lg: "size-10", xl: "size-12 md:size-15" };

/**
 * Píldora con icono anidado ("botón dentro de botón") y efecto magnético en desktop.
 * Movimiento con motion values: nunca re-renderiza React al mover el puntero.
 */
export function MagneticLink({
  href,
  children,
  icon,
  variant = "light",
  size = "md",
  strength = 0.25,
  external = true,
  className = "",
  ariaLabel,
}: Props) {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const active = fine && !reduce && strength > 0;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 180, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 180, damping: 18, mass: 0.4 });
  const ix = useTransform(x, (v) => v * 0.6);
  const iy = useTransform(y, (v) => v * 0.6);

  function onMove(e: PointerEvent<HTMLAnchorElement>) {
    if (!active) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function reset() {
    mx.set(0);
    my.set(0);
  }

  const v = VARIANTS[variant];

  return (
    <motion.a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={ariaLabel}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex shrink-0 items-center justify-between whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-[background-color,box-shadow,color] duration-500 ease-cine ${SIZES[size]} ${v.shell} ${className}`}
    >
      <span>{children}</span>
      {icon && (
        <motion.span
          style={{ x: ix, y: iy }}
          className={`grid place-items-center rounded-full transition-transform duration-500 ease-cine group-hover:scale-105 ${ICON_SIZES[size]} ${v.icon}`}
        >
          {icon}
        </motion.span>
      )}
    </motion.a>
  );
}
