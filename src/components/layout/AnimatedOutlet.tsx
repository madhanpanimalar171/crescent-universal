import { useEffect } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Renders the matched route inside a Framer Motion transition.
 * Each nav click swaps to a real, separate route (React Router) — this
 * component only animates the swap, it does not scroll to an anchor.
 */
export function AnimatedOutlet() {
  const location = useLocation();
  const element = useOutlet();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-[40vh]"
      >
        {element}
      </motion.main>
    </AnimatePresence>
  );
}
