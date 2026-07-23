import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { navLinks, services, siteConfig } from '@/data/site';
import { InstagramIcon, WhatsAppIcon } from '@/components/ui/BrandIcons';

export function Footer() {
  const year = new Date().getFullYear();
  const waHref = siteConfig.whatsappNumber
    ? `https://wa.me/${siteConfig.whatsappNumber}`
    : undefined;
  const igHref = siteConfig.instagramHandle
    ? `https://instagram.com/${siteConfig.instagramHandle}`
    : undefined;

  return (
    <footer className="bg-ink-950 text-navy-100">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-xl font-semibold text-white">
              crescent<span className="text-bronze-300"> universal</span>
            </p>
            <p className="eyebrow mt-2 text-sky-400">{siteConfig.tagline}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-300">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <SocialButton href={igHref} label="Instagram">
                <InstagramIcon className="h-4.5 w-4.5" />
              </SocialButton>
              <SocialButton href={waHref} label="WhatsApp">
                <WhatsAppIcon className="h-4.5 w-4.5" />
              </SocialButton>
            </div>
          </div>

          <div>
            <p className="eyebrow text-navy-300">Navigate</p>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-navy-100/90 transition-colors hover:text-bronze-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-navy-300">Services</p>
            <ul className="mt-4 space-y-3">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link
                    to="/services"
                    className="text-sm text-navy-100/90 transition-colors hover:text-bronze-300"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-navy-300">Reach us</p>
            <ul className="mt-4 space-y-3 text-sm text-navy-100/90">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-2.5 transition-colors hover:text-bronze-300"
                >
                  <Mail size={16} className="mt-0.5 shrink-0 text-sky-400" />
                  {siteConfig.email}
                </a>
              </li>
              {siteConfig.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="flex items-start gap-2.5 transition-colors hover:text-bronze-300"
                  >
                    <Phone size={16} className="mt-0.5 shrink-0 text-sky-400" />
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-sky-400" />
                {siteConfig.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-navy-300 sm:flex-row">
          <p>
            © {year} Crescent Universal. All rights reserved.
          </p>
          <p className="text-navy-300">Designed &amp; built to go global.</p>
        </div>
      </div>
    </footer>
  );
}

function SocialButton({
  href,
  label,
  children,
}: {
  href?: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href ?? '#'}
      target={href ? '_blank' : undefined}
      rel={href ? 'noreferrer' : undefined}
      aria-label={label}
      aria-disabled={!href}
      title={href ? label : `${label} — link pending`}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-bronze-300 hover:text-bronze-300"
    >
      {children}
    </a>
  );
}
