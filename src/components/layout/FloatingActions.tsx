import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Bot, X } from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from '@/components/ui/BrandIcons';
import { siteConfig } from '@/data/site';
import { cn } from '@/lib/utils';

export function FloatingActions({
  liftedForBanner,
  chatOpen,
  onToggleChat,
}: {
  liftedForBanner: boolean;
  chatOpen: boolean;
  onToggleChat: () => void;
}) {
  const waHref = siteConfig.whatsappNumber ? `https://wa.me/${siteConfig.whatsappNumber}` : undefined;
  const igHref = siteConfig.instagramHandle
    ? `https://instagram.com/${siteConfig.instagramHandle}`
    : undefined;

  return (
    <div
      className={cn(
        'fixed right-4 z-[65] flex flex-col items-center gap-3 transition-[bottom] duration-300 sm:right-6',
        liftedForBanner ? 'bottom-40 sm:bottom-36' : 'bottom-6'
      )}
    >
      <FloatingButton href={igHref} label="Instagram" size="sm">
        <InstagramIcon className="h-5 w-5" />
      </FloatingButton>
      <FloatingButton href={waHref} label="WhatsApp" size="sm" tone="whatsapp">
        <WhatsAppIcon className="h-5 w-5" />
      </FloatingButton>

      <motion.button
        type="button"
        onClick={onToggleChat}
        aria-label={chatOpen ? 'Close chat' : 'Chat with us'}
        whileTap={{ scale: 0.94 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-bronze-500 text-white shadow-[0_10px_30px_-8px_rgba(138,90,44,0.6)] transition-colors hover:bg-bronze-600"
      >
        {chatOpen ? <X size={22} /> : <Bot size={24} />}
      </motion.button>
    </div>
  );
}

function FloatingButton({
  href,
  label,
  tone,
  children,
}: {
  href?: string;
  label: string;
  tone?: 'whatsapp';
  size?: 'sm';
  children: ReactNode;
}) {
  return (
    <a
      href={href ?? '#'}
      target={href ? '_blank' : undefined}
      rel={href ? 'noreferrer' : undefined}
      aria-disabled={!href}
      title={href ? label : `${label} — link pending`}
      onClick={(e) => {
        if (!href) e.preventDefault();
      }}
      className={cn(
        'flex h-11 w-11 items-center justify-center rounded-full shadow-[0_8px_20px_-8px_rgba(11,19,48,0.35)] transition-colors',
        href
          ? tone === 'whatsapp'
            ? 'bg-[#25D366] text-white hover:brightness-95'
            : 'bg-white text-navy-600 hover:bg-navy-50'
          : 'bg-white text-mist-400'
      )}
    >
      {children}
    </a>
  );
}
