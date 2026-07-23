import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonials } from '@/data/site';

export function Testimonials() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="eyebrow text-bronze-500">In their words</p>
        <h2 className="mt-3 max-w-lg text-3xl font-semibold text-ink-900 sm:text-4xl">
          What it's like to work with us.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col rounded-2xl border border-mist-200 bg-paper-soft p-7"
            >
              <Quote className="text-bronze-400" size={28} strokeWidth={1.5} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-900/85">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 border-t border-mist-200 pt-4">
                <p className="text-sm font-semibold text-ink-900">{t.name}</p>
                <p className="text-xs text-mist-600">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
