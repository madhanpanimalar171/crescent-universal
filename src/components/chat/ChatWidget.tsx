import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Bot } from 'lucide-react';
import { getBotReply, initialBotGreeting } from '@/lib/chatbot';
import { cn } from '@/lib/utils';

type ChatMessage = { id: string; role: 'user' | 'bot'; text: string };

export function ChatWidget({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'greeting', role: 'bot', text: initialBotGreeting },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    // Simulated latency so it reads like a reply, not an instant lookup.
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: 'bot', text: getBotReply(text) },
      ]);
      setTyping(false);
    }, 700);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.96 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      role="dialog"
      aria-label="Chat with Crescent Universal"
      className="fixed bottom-24 right-4 z-[70] flex h-[min(32rem,70vh)] w-[min(23rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-mist-200 bg-white shadow-[0_24px_60px_-16px_rgba(11,19,48,0.35)] sm:right-6"
    >
      <div className="flex items-center justify-between bg-ink-950 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bronze-500 text-white">
            <Bot size={16} />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">Crescent Assistant</p>
            <p className="text-[11px] text-navy-300">Typically replies in minutes</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X size={18} />
        </button>
      </div>

      <div ref={scrollRef} className="no-scrollbar flex-1 space-y-3 overflow-y-auto bg-paper-soft p-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}
          >
            <p
              className={cn(
                'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                m.role === 'user'
                  ? 'rounded-br-sm bg-navy-600 text-white'
                  : 'rounded-bl-sm border border-mist-200 bg-white text-ink-900/85'
              )}
            >
              {m.text}
            </p>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-mist-200 bg-white px-4 py-3">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-mist-400"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-mist-200 p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message…"
          className="flex-1 rounded-full border border-mist-200 px-4 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-navy-600"
        />
        <button
          type="submit"
          aria-label="Send message"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bronze-500 text-white transition-colors hover:bg-bronze-600"
        >
          <Send size={16} />
        </button>
      </form>
    </motion.div>
  );
}
