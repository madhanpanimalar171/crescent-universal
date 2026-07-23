import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { staggerContainer, fadeUpItem } from '@/lib/motion';

const GlobeScene = lazy(() =>
  import('@/components/home/GlobeScene').then((m) => ({ default: m.GlobeScene }))
);

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950">
      {/* ambient background glow */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[560px] w-[560px] rounded-full bg-navy-600/30 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 top-40 h-[420px] w-[420px] rounded-full bg-bronze-600/20 blur-[110px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-16 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:px-8 lg:pb-24 lg:pt-16">
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          <motion.p variants={fadeUpItem} className="eyebrow flex items-center gap-2 text-sky-400">
            <Sparkles size={14} />
            Web Design &amp; Digital Marketing — Chennai
          </motion.p>

          <motion.h1
            variants={fadeUpItem}
            className="mt-5 max-w-xl text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]"
          >
            Build a presence that reaches further than your street.
          </motion.h1>

          <motion.p variants={fadeUpItem} className="mt-6 max-w-md text-base leading-relaxed text-navy-300">
            Crescent Universal designs, builds, hosts and markets your business online —
            one Chennai-based team, from your first sketch to your first customer search.
          </motion.p>

          <motion.div variants={fadeUpItem} className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-bronze-500 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-bronze-600"
            >
              Get a Free Quote
              <ArrowUpRight size={16} />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
            >
              See Our Services
            </Link>
          </motion.div>

          <motion.p variants={fadeUpItem} className="eyebrow mt-10 text-navy-300/70">
            Static &amp; Dynamic Sites · Graphic Design · Hosting · SEO/PPC · QR · Social
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative h-[320px] sm:h-[420px] lg:h-[520px]"
        >
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center">
                <div className="h-40 w-40 animate-pulse rounded-full bg-navy-600/20" />
              </div>
            }
          >
            <GlobeScene />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
}
