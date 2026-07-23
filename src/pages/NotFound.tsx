import { Link } from 'react-router-dom';
import { PageHero } from '@/components/layout/PageHero';

export default function NotFound() {
  return (
    <>
      <PageHero eyebrow="404" title="This page went off the map." description="Let's get you back on course." />
      <section className="flex justify-center px-5 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-bronze-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-bronze-600"
        >
          Back to Home
        </Link>
      </section>
    </>
  );
}
