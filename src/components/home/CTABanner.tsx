import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-navy-600 py-20">
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-bronze-400/25 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-sky-400/20 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto flex max-w-4xl flex-col items-center px-5 text-center lg:px-8"
      >
        <p className="eyebrow text-sky-300">Ready when you are</p>
        <h2 className="mt-4 max-w-xl text-3xl font-semibold text-white sm:text-4xl">
          Let's take your business further than your street.
        </h2>
        <p className="mt-4 max-w-md text-sm text-navy-100/80">
          Tell us what you're building — a quote usually comes back the same day.
        </p>
        <Link
          to="/contact"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-bronze-500 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-bronze-600"
        >
          Get a Free Quote
          <ArrowUpRight size={16} />
        </Link>
      </motion.div>
    </section>
  );
}
