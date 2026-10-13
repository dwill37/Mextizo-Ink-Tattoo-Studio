// Datos del negocio. Única fuente de verdad para textos de contacto, SEO y JSON-LD.
// Todo lo marcado [PLACEHOLDER: ...] debe completarse con información real.

export const SITE = {
  name: "Mextizo Ink Tattoo Studio",
  shortName: "Mextizo Ink",
  artist: "Joel Ernesto",
  signature: "Realismo Negro y Gris Cancún",
  // [PLACEHOLDER: dominio final del sitio, p. ej. https://www.tudominio.com]
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  phoneDisplay: "+52 998 203 4783",
  phoneHref: "tel:+529982034783",
  phoneE164: "+529982034783",

  whatsappNumber: "529986171707",
  whatsappDisplay: "+52 998 617 1707",

  email: "yolos.tattoo20@gmail.com",

  address: {
    street: "Nichupté 507",
    postalCode: "77533",
    city: "Cancún",
    region: "Quintana Roo",
    regionShort: "Q.R.",
    country: "MX",
    full: "Nichupté 507, 77533 Cancún, Q.R., México",
  },
  plusCode: "44QX+JH Cancún, Quintana Roo, México",
  // Coordenadas calculadas a partir del plus code 76HM44QX+JH.
  // [PLACEHOLDER: verificar latitud/longitud exactas en Google Maps]
  geo: { latitude: 21.13906, longitude: -86.85106 },

  hours: {
    closes: "22:30",
    // [PLACEHOLDER: hora de apertura, formato 24 h, p. ej. "11:00"]
    opens: "",
    // [PLACEHOLDER: días de apertura, p. ej. ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]]
    days: [] as string[],
    // Texto visible mientras no se completen los datos de arriba.
    openingLabel: "[PLACEHOLDER: días y hora de apertura]",
  },

  rating: { value: 5.0, count: 5 },

  instagram: "https://instagram.com/yolos.tattoo",
  facebook: "https://www.facebook.com/profile.php?id=61574968266801",
  // [PLACEHOLDER: enlace directo a las reseñas de Google]. Mientras tanto, abre la ficha en Google Maps.
  googleReviews:
    "https://www.google.com/maps/search/?api=1&query=Mextizo+Ink+Tattoo+Studio+Nichupt%C3%A9+507+Canc%C3%BAn",
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=Nichupt%C3%A9+507%2C+77533+Canc%C3%BAn%2C+Q.R.%2C+M%C3%A9xico",
  mapEmbed:
    "https://www.google.com/maps?q=Nichupt%C3%A9+507,+77533+Canc%C3%BAn,+Q.R.,+M%C3%A9xico&z=16&hl=es-419&output=embed",
} as const;

export const MESSAGES = {
  general: "¡Hola Joel! Vi tu página y me gustaría cotizar un tatuaje.",
  realism: "¡Hola Joel! Vi tu página y me gustaría cotizar un tatuaje de realismo black & grey.",
  custom: "¡Hola Joel! Vi tu página y quiero un diseño único. Te cuento mi idea:",
  final: "¡Hola Joel! Tengo una idea para un tatuaje y me gustaría platicarla contigo.",
} as const;

export function whatsappLink(message: string = MESSAGES.general) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { href: "#estilos", label: "Estilos" },
  { href: "#trabajos", label: "Trabajos" },
  { href: "#joel", label: "Joel" },
  { href: "#resenas", label: "Reseñas" },
  { href: "#proceso", label: "Proceso" },
  { href: "#ubicacion", label: "Ubicación" },
  { href: "#faq", label: "FAQ" },
] as const;
