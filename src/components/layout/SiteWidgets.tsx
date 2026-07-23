import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CookieBanner } from '@/components/layout/CookieBanner';
import type { ConsentValue } from '@/components/layout/CookieBanner';
import { FloatingActions } from '@/components/layout/FloatingActions';
import { ChatWidget } from '@/components/chat/ChatWidget';

const STORAGE_KEY = 'crescent-cookie-consent';

export function SiteWidgets() {
  const [cookieVisible, setCookieVisible] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) setCookieVisible(true);
  }, []);

  function handleDecide(value: ConsentValue) {
    window.localStorage.setItem(STORAGE_KEY, value);
    setCookieVisible(false);
  }

  return (
    <>
      <FloatingActions
        liftedForBanner={cookieVisible}
        chatOpen={chatOpen}
        onToggleChat={() => setChatOpen((v) => !v)}
      />
      <AnimatePresence>
        {chatOpen && <ChatWidget onClose={() => setChatOpen(false)} />}
      </AnimatePresence>
      <CookieBanner visible={cookieVisible} onDecide={handleDecide} />
    </>
  );
}
