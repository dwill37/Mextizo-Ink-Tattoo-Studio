// Iconos de línea fina (1.5) en SVG en línea para no añadir dependencias.
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function WhatsAppIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M3.5 20.5l1.3-4.3A8.5 8.5 0 1 1 8 19.3l-4.5 1.2z" />
      <path d="M9 8.6c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.6l-.5.6c-.1.2-.1.4 0 .6.6 1 1.4 1.8 2.4 2.4.2.1.4.1.6 0l.6-.5c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3-.1.6-.6.8-.6.3-1.6.4-2.9-.1a9 9 0 0 1-4.6-4.6c-.5-1.3-.4-2.3-.1-2.9z" />
    </svg>
  );
}

export function InstagramIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M14 21v-7.5h2.6l.4-3H14V8.7c0-.9.3-1.5 1.5-1.5H17V4.5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.7 1.4-3.7 3.9v2.2H8.5v3H11V21" />
    </svg>
  );
}

export function ArrowUpRight(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export function ArrowDown(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

export function PinIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

export function PhoneIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M5 4h3.2l1.5 4-2 1.3a11 11 0 0 0 5 5l1.3-2 4 1.5V17a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export function MailIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

export function ClockIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function GridIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M4.5 4.5h6v6h-6zM13.5 4.5h6v6h-6zM4.5 13.5h6v6h-6zM13.5 13.5h6v6h-6z" />
    </svg>
  );
}

export function CloseIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function ChevronLeft(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

export function ChevronRight(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function StarShape(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable={false} {...p}>
      <path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z" />
    </svg>
  );
}
