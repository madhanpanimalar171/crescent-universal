import { motion } from 'framer-motion';

export function PageHero({ eyebrow, title, description }: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-16 lg:py-20">
      <div className="pointer-events-none absolute -right-32 -top-24 h-80 w-80 rounded-full bg-navy-600/30 blur-[110px]" />
      <div className="relative mx-auto max-w-4xl px-5 text-center lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="eyebrow text-sky-400"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-3xl font-semibold text-white sm:text-4xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-navy-300"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
