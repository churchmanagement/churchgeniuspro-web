import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  Compass,
  FileBarChart,
  HandCoins,
  HandHeart,
  Mail,
  Navigation,
  Pause,
  Play,
  PlayCircle,
  Receipt,
  Search,
  Sparkles,
  Users,
  Zap,
  BellRing,
  Mic,
} from 'lucide-react';
import { Reveal } from '../ui/Section';

/* ------------------------------------------------------------------ */
/* Example questions + the kind of response AI Search gives.           */
/* Names and figures are SAMPLE data for illustration only.            */
/* ------------------------------------------------------------------ */

type Kind = 'Find' | 'Do' | 'Go' | 'Help';

interface Example {
  id: string;
  label: string;
  kind: Kind;
  icon: ComponentType<{ className?: string }>;
  question: string;
  response: () => ReactNode;
}

const kindStyle: Record<Kind, { text: string; chip: string; verb: string }> = {
  Find: { text: 'text-blue-700', chip: 'bg-blue-50 text-blue-700 ring-blue-100', verb: 'Answer' },
  Do: { text: 'text-purple-700', chip: 'bg-purple-50 text-purple-700 ring-purple-100', verb: 'Done' },
  Go: { text: 'text-emerald-700', chip: 'bg-emerald-50 text-emerald-700 ring-emerald-100', verb: 'Navigating' },
  Help: { text: 'text-amber-700', chip: 'bg-amber-50 text-amber-700 ring-amber-100', verb: 'Guide' },
};

function Row({ left, right, sub }: { left: string; right?: ReactNode; sub?: string }) {
  return (
    <li className="flex items-center justify-between gap-3 py-2">
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-slate-800">{left}</span>
        {sub && <span className="block truncate text-xs text-slate-500">{sub}</span>}
      </span>
      {right && <span className="shrink-0 text-sm font-semibold text-slate-700">{right}</span>}
    </li>
  );
}

function Pill({ children, tone = 'slate' }: { children: ReactNode; tone?: 'slate' | 'amber' | 'emerald' | 'blue' }) {
  const tones = {
    slate: 'bg-slate-100 text-slate-600',
    amber: 'bg-amber-100 text-amber-800',
    emerald: 'bg-emerald-100 text-emerald-800',
    blue: 'bg-blue-100 text-blue-800',
  };
  return <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${tones[tone]}`}>{children}</span>;
}

function ActionDone({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div>
      <p className="flex items-center gap-2 text-sm font-bold text-emerald-700">
        <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> {title}
      </p>
      {children}
    </div>
  );
}

const examples: Example[] = [
  {
    id: 'contributors',
    label: 'Contributors',
    kind: 'Find',
    icon: Users,
    question: 'Who are the contributors this month?',
    response: () => (
      <div>
        <p className="text-sm text-slate-600">
          <strong className="text-slate-900">5 contributors</strong> so far this month
        </p>
        <ul className="mt-2 divide-y divide-slate-100">
          <Row left="John & Mary Thomas" sub="Tithe · 2 gifts" right="$640.00" />
          <Row left="Grace Lee" sub="Building Fund" right="$250.00" />
          <Row left="David Wilson" sub="Tithe" right="$200.00" />
          <Row left="Sarah Johnson" sub="Missions" right="$120.00" />
        </ul>
      </div>
    ),
  },
  {
    id: 'expenses',
    label: 'Expenses',
    kind: 'Find',
    icon: Receipt,
    question: 'How much have we spent on Charity this year?',
    response: () => (
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Charity · year to date</p>
        <p className="mt-1 text-4xl font-extrabold tracking-tight text-slate-900">$4,860.00</p>
        <p className="mt-1 text-sm text-slate-600">Across 14 expense entries</p>
        <div className="mt-4 flex h-16 items-end gap-1.5" aria-hidden="true">
          {[30, 45, 25, 60, 40, 55, 35, 70, 50, 65].map((h, i) => (
            <span key={i} className="flex-1 rounded-t bg-gradient-to-t from-blue-600 to-purple-500 opacity-80" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'report',
    label: 'Financial Reports',
    kind: 'Do',
    icon: FileBarChart,
    question: 'Create a financial report for July.',
    response: () => (
      <ActionDone title="Financial report for July is ready">
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            ['Income', '$18,420', 'text-emerald-700'],
            ['Expenses', '$12,935', 'text-rose-700'],
            ['Net', '$5,485', 'text-blue-700'],
          ].map(([k, v, c]) => (
            <div key={k} className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center">
              <p className="text-[11px] font-medium text-slate-500">{k}</p>
              <p className={`mt-0.5 text-base font-bold ${c}`}>{v}</p>
            </div>
          ))}
        </div>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white">
          Open report <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </ActionDone>
    ),
  },
  {
    id: 'meetings',
    label: 'Meetings',
    kind: 'Find',
    icon: CalendarDays,
    question: 'List the current meetings.',
    response: () => (
      <ul className="divide-y divide-slate-100">
        <Row left="Sunday Worship Service" sub="Sundays · 10:00 AM · Main Sanctuary" right={<Pill tone="blue">Weekly</Pill>} />
        <Row left="Midweek Prayer" sub="Wednesdays · 7:00 PM · Fellowship Hall" right={<Pill tone="blue">Weekly</Pill>} />
        <Row left="Youth Fellowship" sub="Fridays · 6:30 PM · Youth Room" right={<Pill tone="blue">Weekly</Pill>} />
        <Row left="Leadership Team" sub="1st Monday · 7:30 PM · Office" right={<Pill>Monthly</Pill>} />
      </ul>
    ),
  },
  {
    id: 'create-meeting',
    label: 'Create Meetings',
    kind: 'Do',
    icon: CalendarCheck,
    question: "Create a Bible Study meeting next Sunday at 2:00 PM at Amy's residence.",
    response: () => (
      <ActionDone title="Meeting created">
        <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm">
          <dt className="text-slate-500">Type</dt>
          <dd className="font-semibold text-slate-800">Bible Study</dd>
          <dt className="text-slate-500">When</dt>
          <dd className="font-semibold text-slate-800">Next Sunday · 2:00 PM</dd>
          <dt className="text-slate-500">Where</dt>
          <dd className="font-semibold text-slate-800">Amy&apos;s residence</dd>
        </dl>
        <p className="mt-2 text-xs text-slate-500">Added to the calendar — reminders follow your reminder schedule.</p>
      </ActionDone>
    ),
  },
  {
    id: 'prayer',
    label: 'Prayer Requests',
    kind: 'Find',
    icon: HandHeart,
    question: 'List the pending prayer requests.',
    response: () => (
      <ul className="divide-y divide-slate-100">
        <Row left="Healing for Robert's surgery" sub="Requested by Linda M. · 2 volunteers" right={<Pill tone="amber">Pending</Pill>} />
        <Row left="New job for the Garcia family" sub="Requested by Ana G." right={<Pill tone="amber">Pending</Pill>} />
        <Row left="Safe travels — mission team" sub="Requested by Pastor James" right={<Pill tone="amber">Pending</Pill>} />
      </ul>
    ),
  },
  {
    id: 'reminders',
    label: 'Event Reminders',
    kind: 'Find',
    icon: BellRing,
    question: 'List the event reminders.',
    response: () => (
      <ul className="divide-y divide-slate-100">
        <Row left="Fall Harvest Festival" sub="7 days before · 1 day before · day of" right={<Pill tone="emerald">Active</Pill>} />
        <Row left="Women's Retreat" sub="7 days before · day of" right={<Pill tone="emerald">Active</Pill>} />
        <Row left="Christmas Cantata" sub="1 day before · day of" right={<Pill tone="emerald">Active</Pill>} />
      </ul>
    ),
  },
  {
    id: 'navigate',
    label: 'Navigation',
    kind: 'Go',
    icon: Navigation,
    question: 'Go to the NTag page.',
    response: () => (
      <div>
        <p className="flex items-center gap-2 text-sm font-bold text-emerald-700">
          <Compass className="h-5 w-5" aria-hidden="true" /> Taking you to NTag…
        </p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-blue-600"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
        </div>
        <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
          <p className="text-sm font-semibold text-slate-800">NTag — NFC login &amp; page access</p>
          <p className="mt-1 text-xs text-slate-500">No menus, no clicking around — you&apos;re there.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'help',
    label: 'Help & Guidance',
    kind: 'Help',
    icon: BookOpen,
    question: 'How do I set up email?',
    response: () => (
      <div>
        <p className="flex items-center gap-2 text-sm font-bold text-amber-700">
          <Mail className="h-5 w-5" aria-hidden="true" /> Here&apos;s how to set up email
        </p>
        <p className="mt-2 text-sm text-slate-600">
          I found the step-by-step guide in the Help Center and can take you straight to the right settings screen.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white">
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" /> Open the guide
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">
            Go to email settings <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    ),
  },
];

const pillars = [
  {
    icon: Search,
    title: 'Ask for answers',
    text: 'Givers, spending, meetings, prayer requests — answered in seconds.',
    gradient: 'from-blue-600 to-cyan-500',
  },
  {
    icon: Zap,
    title: 'Tell it what to do',
    text: 'Create meetings and reports with one sentence. No forms.',
    gradient: 'from-purple-600 to-blue-600',
  },
  {
    icon: Compass,
    title: 'Go anywhere, get help',
    text: 'Jump to any page or get step-by-step help without hunting.',
    gradient: 'from-emerald-500 to-teal-500',
  },
];

/* Timing (ms) */
const TYPE_SPEED = 32;
const THINK_TIME = 750;
const HOLD_TIME = 5200;

type Phase = 'typing' | 'thinking' | 'answer';

export default function AISearchShowcase() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  // Prerendered HTML shows the first example fully answered; animation starts on the client.
  const [typed, setTyped] = useState(examples[0].question.length);
  const [phase, setPhase] = useState<Phase>('answer');
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  const current = examples[index];

  useEffect(() => {
    if (reduceMotion) setPlaying(false);
  }, [reduceMotion]);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    if (phase === 'typing') {
      if (typed < current.question.length) {
        t = setTimeout(() => setTyped((n) => n + 1), TYPE_SPEED);
      } else {
        t = setTimeout(() => setPhase('thinking'), 250);
      }
    } else if (phase === 'thinking') {
      t = setTimeout(() => setPhase('answer'), THINK_TIME);
    } else if (playing && !hovered) {
      t = setTimeout(() => select((index + 1) % examples.length), HOLD_TIME);
    }
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, typed, playing, hovered, index]);

  function select(i: number) {
    setIndex(i);
    if (reduceMotion) {
      setTyped(examples[i].question.length);
      setPhase('answer');
    } else {
      setTyped(0);
      setPhase('typing');
    }
  }

  const style = kindStyle[current.kind];

  return (
    <section id="ai-search" className="section relative scroll-mt-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-blue-50/60 to-white" aria-hidden="true" />
      <div
        className="absolute -right-40 top-20 -z-10 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(147,51,234,0.55), transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute -left-40 bottom-10 -z-10 h-[480px] w-[480px] rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(37,99,235,0.55), transparent)' }}
        aria-hidden="true"
      />

      <div className="container-page">
        {/* Heading */}
        <Reveal className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-purple-600/25">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> New · ChurchGeniusPro AI Search
          </span>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl md:leading-[1.1]">
            AI Search Is More Than Search.{' '}
            <span className="gradient-text">It&apos;s Your Intelligent Church Assistant!</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            No menus to memorize. No screens to click through. No feature names to remember. Just type
            your question in everyday words — AI Search finds the answer, gets the task done, or takes
            you right where you need to go.
          </p>
        </Reveal>

        {/* Demo */}
        <div
          className="mt-14 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-start lg:gap-10"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* App window */}
          <Reveal>
            <div ref={windowRef} className="glass scroll-mt-24 rounded-3xl p-2 sm:p-3">
              <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
                <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="ml-4 hidden rounded-lg bg-white px-3 py-1 text-xs text-slate-400 shadow-sm sm:block">
                    app.churchgeniuspro.com
                  </span>
                  <button
                    type="button"
                    onClick={() => setPlaying((p) => !p)}
                    className="ml-auto inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-slate-500 transition hover:bg-white hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    aria-label={playing ? 'Pause the AI Search demo' : 'Play the AI Search demo'}
                  >
                    {playing ? <Pause className="h-3.5 w-3.5" aria-hidden="true" /> : <Play className="h-3.5 w-3.5" aria-hidden="true" />}
                    {playing ? 'Pause' : 'Play'}
                  </button>
                </div>

                <div className="p-4 sm:p-6">
                  {/* Search bar */}
                  <div className="flex items-center gap-3 rounded-2xl border-2 border-transparent bg-[linear-gradient(white,white),linear-gradient(90deg,#2563eb,#9333ea,#10b981)] px-4 py-3.5 shadow-lg shadow-blue-600/10 [background-clip:padding-box,border-box] [background-origin:border-box]">
                    <Sparkles className="h-5 w-5 shrink-0 text-purple-600" aria-hidden="true" />
                    <p className="min-h-[1.5rem] min-w-0 flex-1 text-[15px] font-medium text-slate-800 sm:text-base" aria-label={`Example question: ${current.question}`}>
                      <span aria-hidden="true">
                        {current.question.slice(0, typed)}
                        {phase === 'typing' && (
                          <span className="ml-0.5 inline-block h-5 w-0.5 translate-y-1 animate-pulse bg-blue-600" />
                        )}
                      </span>
                    </p>
                    <span className="hidden shrink-0 items-center gap-1 rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-500 sm:inline-flex">
                      <Mic className="h-3.5 w-3.5" aria-hidden="true" /> Ask
                    </span>
                  </div>

                  {/* Response */}
                  <div className="mt-5 min-h-[260px] rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                        <Sparkles className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-bold text-slate-900">AI Search</span>
                      <span className={`ml-auto rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${style.chip}`}>
                        {current.label}
                      </span>
                    </div>
                    <AnimatePresence mode="wait">
                      {phase === 'answer' ? (
                        <motion.div
                          key={current.id}
                          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.35 }}
                        >
                          {current.response()}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="thinking"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2 py-6 text-sm text-slate-500"
                        >
                          {phase === 'thinking' ? (
                            <>
                              <span className="flex gap-1" aria-hidden="true">
                                {[0, 1, 2].map((d) => (
                                  <motion.span
                                    key={d}
                                    className="h-2 w-2 rounded-full bg-purple-500"
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ repeat: Infinity, duration: 0.9, delay: d * 0.15 }}
                                  />
                                ))}
                              </span>
                              Understanding your request…
                            </>
                          ) : (
                            <span className="text-slate-400">Listening…</span>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <p className="mt-3 text-center text-[11px] text-slate-400">Illustration with sample data</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Example chooser */}
          <Reveal delay={0.1}>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Try asking…</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {examples.map((ex, i) => {
                const active = i === index;
                const ks = kindStyle[ex.kind];
                return (
                  <li key={ex.id}>
                    <button
                      type="button"
                      onClick={() => {
                        select(i);
                        setPlaying(false);
                        // On stacked (mobile/tablet) layouts, bring the answer into view.
                        const el = windowRef.current;
                        if (el && window.innerWidth < 1024 && el.getBoundingClientRect().top < 0) {
                          el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
                        }
                      }}
                      aria-pressed={active}
                      className={`group flex w-full items-start gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        active
                          ? 'border-transparent bg-white shadow-lg shadow-purple-600/10 ring-2 ring-purple-500/60'
                          : 'border-slate-200/80 bg-white/70 hover:border-blue-300 hover:bg-white'
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
                          active ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white' : `${ks.chip} ring-1`
                        }`}
                      >
                        <ex.icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className={`block text-[11px] font-bold uppercase tracking-wide ${ks.text}`}>{ex.label}</span>
                        <span className="block text-sm font-medium leading-snug text-slate-700">“{ex.question}”</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        {/* Pillars */}
        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="card h-full">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${p.gradient} text-white shadow-lg`}>
                  <p.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Key message + CTA */}
        <Reveal className="mt-14">
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-12 text-center sm:px-12">
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                background:
                  'radial-gradient(50% 60% at 15% 20%, rgba(37,99,235,0.5), transparent 60%), radial-gradient(50% 60% at 85% 80%, rgba(147,51,234,0.5), transparent 60%)',
              }}
              aria-hidden="true"
            />
            <div className="relative">
              <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
                Just Ask.{' '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                  ChurchGeniusPro AI Search Understands.
                </span>
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
                Not just another church management system — an intelligent platform that makes running
                your church simpler and smarter.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link to="/signup" className="btn-primary !px-8 !py-4 !text-base">
                  Try AI Search Free for 2 Months <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <PlayCircle className="h-5 w-5 text-blue-300" aria-hidden="true" /> Watch AI Search in Action
                </Link>
              </div>
              <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-slate-400">
                <HandCoins className="h-3.5 w-3.5" aria-hidden="true" />
                AI Search is part of Advanced AI on the Pro plan — included in every 2-month free trial.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
