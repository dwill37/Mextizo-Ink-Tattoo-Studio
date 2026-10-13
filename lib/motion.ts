// Lenguaje de movimiento: lento, controlado, cinematográfico. Nunca rebota.
export const EASE_CINE = [0.22, 1, 0.36, 1] as const;
export const EASE_DOLLY = [0.65, 0, 0.35, 1] as const;
export const EASE_SMOKE = [0.4, 0, 0.2, 1] as const;

// Spring con amortiguación alta: respuesta física sin rebote.
export const SPRING_SOFT = { type: "spring", stiffness: 140, damping: 22, mass: 0.6 } as const;

// Tiempo total de la intro del hero (s). Otros elementos esperan esta señal.
export const INTRO_DURATION = 2.2;
