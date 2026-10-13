import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Geist } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

// Bodoni: trazos gruesos y finos que evocan el sombreado negro y gris.
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-bodoni",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const title = "Mextizo Ink Tattoo Studio | Tatuajes realismo black and grey en Cancún";
const description =
  "Estudio de tatuajes en Cancún. Joel Ernesto, tatuador especialista en realismo black and grey y diseños únicos. 5.0 en Google. Cotiza tu tatuaje por WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description,
  keywords: [
    "estudio de tatuajes en Cancún",
    "tatuajes realismo black and grey Cancún",
    "tatuador en Cancún",
    "realismo negro y gris",
    "Joel Ernesto tatuador",
    "Mextizo Ink",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    siteName: SITE.name,
    title,
    description,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 627,
        alt: "Dos retratos en realismo negro y gris tatuados por Joel Ernesto en Mextizo Ink, Cancún",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a09",
  colorScheme: "dark",
  viewportFit: "cover",
};

function jsonLd() {
  const { hours } = SITE;
  const hoursReady = Boolean(hours.opens) && hours.days.length > 0;

  return {
    "@context": "https://schema.org",
    "@type": "TattooParlor",
    "@id": `${SITE.url}/#negocio`,
    name: SITE.name,
    url: SITE.url,
    image: `${SITE.url}/og.jpg`,
    telephone: SITE.phoneE164,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    // [PLACEHOLDER: verificar coordenadas exactas] Derivadas del plus code 44QX+JH.
    geo: { "@type": "GeoCoordinates", latitude: SITE.geo.latitude, longitude: SITE.geo.longitude },
    employee: { "@type": "Person", name: SITE.artist, jobTitle: "Tatuador, realismo negro y gris" },
    sameAs: [SITE.instagram, SITE.facebook],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.rating.value.toFixed(1),
      reviewCount: SITE.rating.count,
      bestRating: "5",
    },
    // Se publica solo cuando completes días y hora de apertura en lib/site.ts.
    ...(hoursReady
      ? {
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: hours.days,
            opens: hours.opens,
            closes: hours.closes,
          },
        }
      : {}),
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${bodoni.variable} ${geist.variable}`}>
      <body className="grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
