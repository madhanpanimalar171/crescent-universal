import { AnimatePresence, motion } from 'framer-motion';
import { Cookie } from 'lucide-react';

export type ConsentValue = 'accepted' | 'declined';

export function CookieBanner({
  visible,
  onDecide,
}: {
  visible: boolean;
  onDecide: (value: ConsentValue) => void;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6"
        >
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-4 rounded-2xl border border-mist-200 bg-white p-5 shadow-[0_16px_40px_-12px_rgba(11,19,48,0.25)] sm:flex-row sm:items-center sm:p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-600">
              <Cookie size={19} />
            </span>
            <p className="flex-1 text-sm leading-relaxed text-ink-900/80">
              We use cookies to keep this site running smoothly and to understand how it's
              used. You can accept or decline — either way, the site works the same.
            </p>
            <div className="flex w-full shrink-0 gap-3 sm:w-auto">
              <button
                type="button"
                onClick={() => onDecide('declined')}
                className="flex-1 rounded-full border border-mist-200 px-5 py-2.5 text-sm font-semibold text-ink-900 transition-colors hover:border-navy-300 sm:flex-none"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => onDecide('accepted')}
                className="flex-1 rounded-full bg-bronze-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-bronze-600 sm:flex-none"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
