import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AnimatedOutlet } from '@/components/layout/AnimatedOutlet';
import { SiteWidgets } from '@/components/layout/SiteWidgets';

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-white">
      <Navbar />
      <AnimatedOutlet />
      <Footer />
      <SiteWidgets />
    </div>
  );
}
