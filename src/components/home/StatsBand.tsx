import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stats } from '@/data/site';

gsap.registerPlugin(ScrollTrigger);

export function StatsBand() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.stat-value', { opacity: 0, scale: 0.75 });
      gsap.set('.stat-rule', { scaleX: 0 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          tl.to('.stat-value', {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: 'back.out(1.7)',
          }).to(
            '.stat-rule',
            { scaleX: 1, duration: 0.5, stagger: 0.12, ease: 'power2.out', transformOrigin: 'left' },
            '-=0.4'
          );
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bg-ink-950 py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 lg:grid-cols-4 lg:gap-6 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="stat-value font-mono text-3xl font-semibold text-white sm:text-4xl">
              {stat.value}
            </p>
            <span className="stat-rule mt-3 block h-px w-10 bg-bronze-400" />
            <p className="mt-3 text-sm text-navy-300">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
