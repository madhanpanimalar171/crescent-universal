import { motion } from 'framer-motion';
import { Check, ShieldCheck } from 'lucide-react';

export function NotRobotCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-mist-200 bg-paper-soft px-4 py-3.5 sm:w-80">
      <label className="flex cursor-pointer items-center gap-3 select-none">
        <span
          role="checkbox"
          aria-checked={checked}
          tabIndex={0}
          onClick={() => onChange(!checked)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onChange(!checked);
            }
          }}
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
            checked ? 'border-navy-600 bg-navy-600' : 'border-mist-400 bg-white'
          }`}
        >
          {checked && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Check size={15} className="text-white" strokeWidth={3} />
            </motion.span>
          )}
        </span>
        <span className="text-sm text-ink-900">I'm not a robot</span>
      </label>
      <ShieldCheck size={22} className="shrink-0 text-mist-400" />
    </div>
  );
}
