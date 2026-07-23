import type { ComponentType } from 'react';
import { LayoutTemplate, Palette, Server, TrendingUp, QrCode, Share2 } from 'lucide-react';
import type { ServiceItem } from '@/data/site';

export const serviceIconMap: Record<
  ServiceItem['icon'],
  ComponentType<{ size?: number; className?: string; strokeWidth?: number }>
> = {
  website: LayoutTemplate,
  graphic: Palette,
  hosting: Server,
  seo: TrendingUp,
  qr: QrCode,
  social: Share2,
};
