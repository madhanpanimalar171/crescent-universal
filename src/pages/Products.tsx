import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowUpRight, PenTool, QrCode, Share2, FilePlus2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '@/components/layout/PageHero';
import { productPackages, addOns } from '@/data/site';
import { cn } from '@/lib/utils';

const addOnIcons: ComponentType<{ size?: number; className?: string }>[] = [PenTool, QrCode, Share2, FilePlus2];

export default function Products() {
  return (
    <>
      <PageHero
        eyebrow="Our Products"
        title="Packages built around where your business is today."
        description="Every package ends the same way — a quote shaped around what you actually need, not a generic price tag."
      />

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
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
              <h2 className={cn('text-xl font-semibold', pkg.featured ? 'text-white' : 'text-ink-900')}>
                {pkg.name}
              </h2>
              <p className={cn('mt-2 text-sm leading-relaxed', pkg.featured ? 'text-navy-300' : 'text-mist-600')}>
                {pkg.tagline}
              </p>
              <p
                className={cn(
                  'eyebrow mt-4 border-t pt-4',
                  pkg.featured ? 'border-white/10 text-sky-400' : 'border-mist-200 text-bronze-500'
                )}
              >
                Best for
              </p>
              <p className={cn('mt-1.5 text-sm', pkg.featured ? 'text-navy-100' : 'text-ink-900/80')}>
                {pkg.bestFor}
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
                Get a Custom Quote
                <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="mt-20">
          <p className="eyebrow text-center text-bronze-500">Popular add-ons</p>
          <h2 className="mx-auto mt-3 max-w-md text-center text-2xl font-semibold text-ink-900 sm:text-3xl">
            Layer these onto any package.
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {addOns.map((addOn, i) => {
              const Icon = addOnIcons[i];
              return (
                <motion.div
                  key={addOn.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl border border-mist-200 bg-paper-soft p-6"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-600">
                    <Icon size={18} />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold text-ink-900">{addOn.name}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-mist-600">{addOn.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
