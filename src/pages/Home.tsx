import { Hero } from '@/components/home/Hero';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { StatsBand } from '@/components/home/StatsBand';
import { ProductsTeaser } from '@/components/home/ProductsTeaser';
import { Testimonials } from '@/components/home/Testimonials';
import { CTABanner } from '@/components/home/CTABanner';

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBand />
      <ServicesPreview />
      <ProductsTeaser />
      <Testimonials />
      <CTABanner />
    </>
  );
}
