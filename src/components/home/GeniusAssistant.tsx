import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CircleDollarSign,
  ExternalLink,
  FileQuestion,
  Keyboard,
  LineChart,
  ListChecks,
  MessagesSquare,
  Mic,
  MousePointerClick,
  Pause,
  Play,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  UserSearch,
  Wand2,
} from 'lucide-react';
import { Reveal } from '../ui/Section';

/**
 * Genius Assistant — homepage introduction (Nov 2026).
 * The three recordings are real screen captures of the assistant in the app,
 * supplied by ChurchGeniusPro. Only the selected recording is loaded, and only
 * once the section is near the viewport; a still frame is shown otherwise.
 */
const modes = [
  {
    id: 'type',
    label: 'Type',
    icon: Keyboard,
    summary: 'Enter a request using natural language.',
    caption:
      'Typed: “Create an income entry for $500 from John Mathew for Sunday Offering on November 8.” Genius asks how it was paid, shows every detail for review, and saves only after you confirm.',
    alt: 'Screen recording: a request to create a $500 income entry is typed into Genius Assistant, reviewed, confirmed, and saved.',
  },
  {
    id: 'speak',
    label: 'Speak',
    icon: Mic,
    summary: 'Use voice input to give instructions.',
    caption:
      'Spoken: “Record an income of $500 from John Mathew for Sunday Offering, paid by check, on November 8.” The entry is reviewed and recorded by voice, without touching the keyboard.',
    alt: 'Screen recording: an income entry is dictated to Genius Assistant by voice, reviewed, confirmed with “Yes”, and saved.',
  },
  {
    id: 'converse',
    label: 'Converse',
    icon: MessagesSquare,
    summary: 'Have a back-and-forth conversation with the assistant to complete a task.',
    caption:
      'Converse mode: Genius asks one question at a time — who the income is from, the amount, the fund, the date, how it was paid — then shows the details and saves when you say “Yes”.',
    alt: 'Screen recording: Genius Assistant asks step-by-step questions in Converse mode to record an income entry, then saves it after confirmation.',
  },
] as const;

type ModeId = (typeof modes)[number]['id'];

const examples = [
  { icon: CircleDollarSign, text: 'Create an income entry.' },
  { icon: UserSearch, text: 'Find a member or family.' },
  { icon: LineChart, text: 'Review church financial information.' },
  { icon: FileQuestion, text: 'Ask questions about church records.' },
  { icon: ListChecks, text: 'Get assistance with everyday church management tasks.' },
];

const reasons = [
  {
    icon: MousePointerClick,
    title: 'Fewer menus',
    description:
      'Open the Genius button and say what you need, instead of navigating through multiple menus and forms.',
  },
  {
    icon: Wand2,
    title: 'It asks for what is missing',
    description:
      'Genius asks for any detail it still needs, and optional details can be added or skipped.',
  },
  {
    icon: ShieldCheck,
    title: 'You stay in control',
    description:
      'Review every detail first. Nothing is saved until you confirm, and any field can be edited before saving.',
  },
];

const gifSrc = (id: ModeId) => `/genius/genius-assistant-${id}.gif`;
const posterSrc = (id: ModeId) => `/genius/genius-assistant-${id}-poster.webp`;

export default function GeniusAssistant() {
  const [active, setActive] = useState<ModeId>('type');
  const [playing, setPlaying] = useState(false);
  const [near, setNear] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const mode = modes.find((m) => m.id === active) ?? modes[0];

  // Start playing once the recording is near the viewport (unless the visitor
  // prefers reduced motion — then it stays a still frame until they press Play).
  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          if (!reduce) setPlaying(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const showGif = near && playing;

  return (
    <section id="genius-assistant" className="section section-tint relative scroll-mt-20 overflow-hidden">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">
            <Sparkles className="h-3.5 w-3.5 text-gold-600" aria-hidden="true" /> New · Genius Assistant
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl md:leading-[1.1]">
            Meet Genius Assistant –{' '}
            <span className="gradient-text">A Smarter Way to Manage Your Church.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            Interact with the assistant to manage church activities more naturally, instead of
            navigating through multiple menus. Type it, say it, or talk it through.
          </p>
        </Reveal>

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] lg:gap-10">
          {/* Mode picker */}
          <Reveal>
            <div role="tablist" aria-label="Ways to use Genius Assistant" className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {modes.map((m) => {
                const selected = m.id === active;
                return (
                  <button
                    key={m.id}
                    type="button"
                    role="tab"
                    id={`genius-tab-${m.id}`}
                    aria-selected={selected}
                    aria-controls="genius-panel"
                    onClick={() => setActive(m.id)}
                    className={`flex items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:flex-col lg:flex-row ${
                      selected
                        ? 'border-brand-600 bg-white shadow-xl shadow-brand-950/10'
                        : 'border-brand-100 bg-white/60 hover:border-brand-300 hover:bg-white'
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        selected
                          ? 'bg-gradient-to-br from-brand-600 to-plum-600 text-white'
                          : 'bg-brand-50 text-brand-700'
                      }`}
                    >
                      <m.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="font-display block text-lg font-bold text-slate-900">{m.label}</span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-slate-600">{m.summary}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 hidden rounded-2xl border border-gold-200 bg-gold-50 p-5 lg:block">
              <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <ShieldCheck className="h-4 w-4 text-gold-700" aria-hidden="true" /> Nothing is saved until you
                confirm
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                Genius shows the details it is about to record so you can review or edit them first.
              </p>
            </div>
          </Reveal>

          {/* Recording */}
          <Reveal delay={0.1}>
            <div
              id="genius-panel"
              role="tabpanel"
              aria-labelledby={`genius-tab-${mode.id}`}
              ref={stageRef}
            >
              <div className="shot-frame relative">
                <img
                  key={`${mode.id}-${showGif ? 'gif' : 'poster'}`}
                  src={showGif ? gifSrc(mode.id) : posterSrc(mode.id)}
                  width={1140}
                  height={816}
                  alt={mode.alt}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full bg-white"
                  style={{ backgroundImage: `url(${posterSrc(mode.id)})`, backgroundSize: 'cover' }}
                />
                {!showGif && (
                  <button
                    type="button"
                    onClick={() => {
                      setNear(true);
                      setPlaying(true);
                    }}
                    className="absolute inset-0 flex items-center justify-center bg-plum-950/25 transition hover:bg-plum-950/35 focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-brand-500"
                    aria-label={`Play the ${mode.label} recording (large button)`}
                  >
                    <span className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-800 shadow-xl">
                      <Play className="h-4 w-4 fill-current" aria-hidden="true" /> Play recording
                    </span>
                  </button>
                )}
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <p className="text-sm leading-relaxed text-slate-600">{mode.caption}</p>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setNear(true);
                      setPlaying((v) => !v);
                    }}
                    aria-label={`${showGif ? 'Pause' : 'Play'} the ${mode.label} recording`}
                    className="inline-flex h-10 items-center gap-1.5 rounded-full border border-brand-200 bg-white px-4 text-xs font-semibold text-brand-800 transition hover:border-brand-400 hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    {showGif ? (
                      <>
                        <Pause className="h-3.5 w-3.5" aria-hidden="true" /> Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5" aria-hidden="true" /> Play
                      </>
                    )}
                  </button>
                  <a
                    href={gifSrc(mode.id)}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex h-10 items-center gap-1.5 rounded-full border border-brand-200 bg-white px-4 text-xs font-semibold text-brand-800 transition hover:border-brand-400 hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /> Full size
                    <span className="sr-only"> {mode.label} recording (opens in a new tab)</span>
                  </a>
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-500">Real screen recording from ChurchGeniusPro, using demo church data.</p>
            </div>
          </Reveal>
        </div>

        {/* Examples */}
        <Reveal className="mt-16">
          <h3 className="text-center text-xl font-bold text-slate-900">Ask Genius to…</h3>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {examples.map((e) => (
              <li
                key={e.text}
                className="flex items-start gap-3 rounded-2xl border border-brand-100 bg-white p-4 text-sm font-medium leading-snug text-slate-800 shadow-sm lg:flex-col"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                  <e.icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                {e.text}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Why it is easier */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.1}>
              <div className="h-full rounded-3xl bg-gradient-to-br from-brand-600 to-plum-600 p-6 text-white shadow-xl shadow-brand-950/15">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-gold-300">
                  <r.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-bold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-100">{r.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/signup" className="btn-primary !px-8 !py-4 !text-base">
              Try Genius Assistant Free for 2 Months <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/demo" className="btn-secondary !px-8 !py-4 !text-base">
              <PlayCircle className="h-5 w-5 text-brand-600" aria-hidden="true" /> Watch Demo
            </Link>
          </div>
          <p className="mt-5 text-xs text-slate-500">
            Part of Advanced AI on the Pro plan — included in every 2-month free trial.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
