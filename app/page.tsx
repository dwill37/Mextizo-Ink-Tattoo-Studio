import { MotionProvider } from "@/components/MotionProvider";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { WhyUs } from "@/components/WhyUs";
import { Styles } from "@/components/Styles";
import { Gallery } from "@/components/Gallery";
import { Artist } from "@/components/Artist";
import { Reviews } from "@/components/Reviews";
import { Process } from "@/components/Process";
import { Location } from "@/components/Location";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <MotionProvider>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-bone focus:px-4 focus:py-2 focus:text-ink"
      >
        Saltar al contenido
      </a>
      <Nav />
      <main id="contenido">
        <Hero />
        <WhyUs />
        <Styles />
        <Gallery />
        <Artist />
        <Reviews />
        <Process />
        <Location />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </MotionProvider>
  );
}
