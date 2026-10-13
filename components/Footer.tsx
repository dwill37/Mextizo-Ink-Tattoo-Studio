import { NAV_LINKS, SITE, whatsappLink } from "@/lib/site";
import { FacebookIcon, InstagramIcon } from "./ui/Icons";

const link = "transition-colors duration-300 hover:text-bone";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink pb-28 pt-20 text-sm text-smoke md:pb-14">
      <div className="container-x grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="display text-4xl text-bone">Mextizo Ink</p>
          <p className="mt-3">
            {SITE.name} · {SITE.artist}
          </p>
          <p className="mt-1">{SITE.signature}</p>
          <div className="mt-7 flex gap-2">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Mextizo Ink"
              className="grid size-11 place-items-center rounded-full bg-coal text-bone ring-1 ring-inset ring-line transition hover:ring-bone/40"
            >
              <InstagramIcon />
            </a>
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de Mextizo Ink"
              className="grid size-11 place-items-center rounded-full bg-coal text-bone ring-1 ring-inset ring-line transition hover:ring-bone/40"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>

        <address className="not-italic md:col-span-4">
          <h2 className="mb-4 text-bone">Contacto</h2>
          <ul className="space-y-2.5">
            <li>{SITE.address.full}</li>
            <li>
              Tel.{" "}
              <a href={SITE.phoneHref} className={link}>
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              WhatsApp{" "}
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={link}>
                {SITE.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className={link}>
                {SITE.email}
              </a>
            </li>
            <li>
              Cierra a las {SITE.hours.closes} · <span className="placeholder">{SITE.hours.openingLabel}</span>
            </li>
          </ul>
        </address>

        <nav aria-label="Secciones" className="md:col-span-3">
          <h2 className="mb-4 text-bone">Secciones</h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={link}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container-x mt-16">
        <p className="border-t border-line pt-6 text-xs">© {year} {SITE.name}. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
