import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { services } from '@/data/site';
import { serviceIconMap } from '@/lib/serviceIcons';

export function ServicesPreview() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-bronze-500">What we do</p>
            <h2 className="mt-3 max-w-lg text-3xl font-semibold text-ink-900 sm:text-4xl">
              Six services, one team, zero handoffs.
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-mist-200 px-5 py-2.5 text-sm font-semibold text-ink-900 transition-colors hover:border-navy-600 hover:text-navy-600"
          >
            View all services
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = serviceIconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-mist-200 bg-paper-soft p-7 transition-colors hover:border-navy-300/60"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-600 transition-colors group-hover:bg-navy-600 group-hover:text-white">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink-900">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-600">{service.summary}</p>
                <ul className="mt-4 space-y-1.5">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-xs text-mist-600">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-bronze-400" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
