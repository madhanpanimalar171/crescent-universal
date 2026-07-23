import { motion } from 'framer-motion';
import { Check, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '@/components/layout/PageHero';
import { TiltCard } from '@/components/ui/TiltCard';
import { services } from '@/data/site';
import { serviceIconMap } from '@/lib/serviceIcons';

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Everything your business needs to be found online."
        description="Six services under one roof — each one designed to make the others work harder."
      />

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {services.map((service, i) => {
            const Icon = serviceIconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard className="h-full overflow-hidden rounded-2xl border border-mist-200 bg-paper-soft p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-600 text-white">
                    <Icon size={22} />
                  </div>
                  <h2 className="mt-5 text-xl font-semibold text-ink-900">{service.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-mist-600">{service.description}</p>
                  <ul className="mt-5 space-y-2">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-2.5 text-sm text-ink-900/80">
                        <Check size={15} className="shrink-0 text-bronze-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl bg-navy-50 p-10 text-center">
          <p className="max-w-md text-base text-ink-900">
            Not sure which service to start with? Tell us what the business needs — we'll
            put together the right mix.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-bronze-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-bronze-600"
          >
            Get a Free Quote
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
