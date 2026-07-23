import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { Users2, Search, MapPin, Link2, Compass, PenSquare, Layers, Rocket, LifeBuoy } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { CTABanner } from '@/components/home/CTABanner';
import { differentiators, processSteps, type Differentiator, type ProcessStep } from '@/data/site';

const differentiatorIcons: Record<Differentiator['icon'], ComponentType<{ size?: number; className?: string }>> = {
  team: Users2,
  seo: Search,
  local: MapPin,
  link: Link2,
};

const processIcons: Record<ProcessStep['icon'], ComponentType<{ size?: number; className?: string }>> = {
  discover: Compass,
  design: PenSquare,
  develop: Layers,
  launch: Rocket,
  support: LifeBuoy,
};

export default function Profile() {
  return (
    <>
      <PageHero
        eyebrow="Our Profile"
        title="A Chennai team built for the whole journey online."
        description="From your first sketch to your first customer search — design, hosting and marketing under one roof."
      />

      {/* Story */}
      <section className="mx-auto max-w-2xl px-5 py-20 text-center lg:px-8">
        <p className="eyebrow text-bronze-500">Who we are</p>
        <p className="mt-4 text-lg leading-relaxed text-ink-900/85">
          Crescent Universal is a Chennai-based web design and digital marketing studio.
          We build the websites, the graphic design and the marketing campaigns that let a
          local business look — and perform — like it belongs on a much bigger stage.
        </p>
        <p className="mt-5 text-base leading-relaxed text-mist-600">
          Most businesses we meet have already tried the patchwork approach: one person for
          the site, another for social media, a third for print. We put all of it under one
          accountable team instead, so the website, the brochure and the Instagram page
          finally look like they belong to the same company.
        </p>
      </section>

      {/* Mission band */}
      <section className="relative overflow-hidden bg-ink-950 py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-navy-600/30 blur-[110px]" />
        <div className="relative mx-auto max-w-2xl px-5 text-center lg:px-8">
          <p className="eyebrow text-sky-400">Our mission</p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
            Go <span className="text-bronze-300">Global</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-navy-300">
            A business's reach shouldn't stop at its street. We build the digital presence
            that lets a Chennai business be found, trusted and chosen — anywhere its
            customers are searching from.
          </p>
        </div>
      </section>

      {/* Differentiators */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <p className="eyebrow text-center text-bronze-500">What makes us different</p>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {differentiators.map((d, i) => {
            const Icon = differentiatorIcons[d.icon];
            return (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-4 rounded-2xl border border-mist-200 bg-paper-soft p-6"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-600">
                  <Icon size={20} />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-ink-900">{d.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist-600">{d.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section className="bg-paper-soft py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <p className="eyebrow text-center text-bronze-500">How a project runs</p>
          <h2 className="mx-auto mt-3 max-w-lg text-center text-3xl font-semibold text-ink-900 sm:text-4xl">
            Five stages, start to launch — and beyond.
          </h2>

          <div className="relative mt-14 grid grid-cols-1 gap-8 sm:grid-cols-5">
            <div className="absolute left-0 right-0 top-[22px] hidden h-px bg-mist-200 sm:block" aria-hidden="true" />
            {processSteps.map((step, i) => {
              const Icon = processIcons[step.icon];
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col items-center text-center sm:items-start sm:text-left"
                >
                  <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-navy-600 bg-white text-navy-600">
                    <Icon size={18} />
                  </span>
                  <p className="eyebrow mt-4 text-mist-400">0{i + 1}</p>
                  <h3 className="mt-1 text-base font-semibold text-ink-900">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist-600">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
