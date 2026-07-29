import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Send, Sparkles, X } from 'lucide-react';

/**
 * AI live chat assistant. Questions are answered by a Claude-powered Azure
 * Function (/api/chat) grounded in the ChurchGeniusPro user manual, pricing,
 * and feature documentation. See api/src/functions/chat.js.
 */

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME: ChatMessage = {
  role: 'assistant',
  content:
    "Hi! I'm the ChurchGeniusPro assistant. Ask me anything about features, pricing, giving, kids check-in, accounting, or getting started.",
};

const SUGGESTIONS = [
  'What does ChurchGeniusPro cost?',
  'How does kids check-in work?',
  'Can it replace our accounting software?',
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy, open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    const history = [...messages, { role: 'user' as const, content: trimmed }];
    setMessages(history);
    setInput('');
    setBusy(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send recent turns only; the system prompt lives server-side.
        body: JSON.stringify({ messages: history.slice(-10).filter((m) => m !== WELCOME) }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      setMessages([
        ...history,
        {
          role: 'assistant',
          content:
            res.ok && data.reply
              ? data.reply
              : 'Sorry — I could not reach the assistant just now. Please try again in a moment, or email support@churchgeniuspro.com.',
        },
      ]);
    } catch {
      setMessages([
        ...history,
        {
          role: 'assistant',
          content:
            'Sorry — I could not reach the assistant just now. Please try again in a moment, or email support@churchgeniuspro.com.',
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-600/30 transition hover:scale-105"
      >
        {open ? <X className="h-6 w-6" aria-hidden="true" /> : <MessageCircle className="h-6 w-6" aria-hidden="true" />}
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-5 z-[90] flex h-[min(560px,calc(100dvh-8rem))] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20"
            role="dialog"
            aria-label="ChurchGeniusPro chat assistant"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-4 text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold">ChurchGeniusPro Assistant</p>
                <p className="text-xs text-blue-100">AI-powered · answers in seconds</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'rounded-br-md bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'rounded-bl-md bg-slate-100 text-slate-800'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {busy && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-slate-100 px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              {messages.length === 1 && !busy && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => void send(s)}
                      className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              className="flex items-center gap-2 border-t border-slate-100 p-3"
              onSubmit={(e) => {
                e.preventDefault();
                void send(input);
              }}
            >
              <label htmlFor="chat-input" className="sr-only">
                Ask a question
              </label>
              <input
                id="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about ChurchGeniusPro…"
                autoComplete="off"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white transition hover:opacity-90 disabled:opacity-40"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
