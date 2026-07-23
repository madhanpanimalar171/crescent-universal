import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { productPackages } from '@/data/site';
import { cn } from '@/lib/utils';

export function ProductsTeaser() {
  return (
    <section className="bg-paper-soft py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-bronze-500">Packages</p>
            <h2 className="mt-3 max-w-lg text-3xl font-semibold text-ink-900 sm:text-4xl">
              A starting point for every stage of business.
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-mist-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink-900 transition-colors hover:border-navy-600 hover:text-navy-600"
          >
            Compare packages
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {productPackages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'relative flex flex-col rounded-2xl border p-8',
                pkg.featured
                  ? 'border-navy-600 bg-ink-950 text-white shadow-xl shadow-navy-600/15'
                  : 'border-mist-200 bg-white'
              )}
            >
              {pkg.featured && (
                <span className="eyebrow absolute -top-3 left-8 rounded-full bg-bronze-500 px-3 py-1 text-white">
                  Most chosen
                </span>
              )}
              <h3 className={cn('text-xl font-semibold', pkg.featured ? 'text-white' : 'text-ink-900')}>
                {pkg.name}
              </h3>
              <p className={cn('mt-2 text-sm leading-relaxed', pkg.featured ? 'text-navy-300' : 'text-mist-600')}>
                {pkg.tagline}
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check
                      size={16}
                      className={cn('mt-0.5 shrink-0', pkg.featured ? 'text-sky-400' : 'text-navy-600')}
                    />
                    <span className={pkg.featured ? 'text-navy-100' : 'text-ink-900/80'}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={cn(
                  'mt-8 inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold transition-colors',
                  pkg.featured
                    ? 'bg-bronze-500 text-white hover:bg-bronze-600'
                    : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                )}
              >
                Request this package
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
