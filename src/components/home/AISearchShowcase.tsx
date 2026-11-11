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
  UsersRound,
  HeartHandshake,
  CalendarX,
  TrendingDown,
  UserSearch,
} from 'lucide-react';
import { Reveal } from '../ui/Section';

/* ------------------------------------------------------------------ */
/* Example questions + the kind of response AI Search gives.           */
/* Names and figures are SAMPLE data for illustration only.            */
/* ------------------------------------------------------------------ */

type Kind = 'Care' | 'Find' | 'Do' | 'Go' | 'Help';

interface Example {
  id: string;
  label: string;
  kind: Kind;
  icon: ComponentType<{ className?: string }>;
  question: string;
  response: () => ReactNode;
}

const kindStyle: Record<Kind, { text: string; chip: string; verb: string }> = {
  Care: { text: 'text-rose-700', chip: 'bg-rose-50 text-rose-700 ring-rose-100', verb: 'Insight' },
  Find: { text: 'text-brand-700', chip: 'bg-brand-50 text-brand-700 ring-brand-100', verb: 'Answer' },
  Do: { text: 'text-plum-700', chip: 'bg-plum-50 text-plum-700 ring-plum-100', verb: 'Done' },
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

function Pill({ children, tone = 'slate' }: { children: ReactNode; tone?: 'slate' | 'amber' | 'emerald' | 'blue' | 'rose' }) {
  const tones = {
    rose: 'bg-rose-100 text-rose-800',
    slate: 'bg-slate-100 text-slate-600',
    amber: 'bg-amber-100 text-amber-800',
    emerald: 'bg-emerald-100 text-emerald-800',
    blue: 'bg-brand-100 text-brand-800',
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
    id: 'not-in-group',
    label: 'Group Connection',
    kind: 'Care',
    icon: UsersRound,
    question: 'Who attends regularly but isn’t in a group?',
    response: () => (
      <div>
        <p className="text-sm text-slate-600">
          <strong className="text-slate-900">3 regular attenders</strong> aren&apos;t in any group yet
        </p>
        <ul className="mt-2 divide-y divide-slate-100">
          <Row left="Michael Brown" sub="Attended 9 times in the last 12 weeks" right={<Pill tone="rose">No group</Pill>} />
          <Row left="Priya Nair" sub="Attended 7 times in the last 12 weeks" right={<Pill tone="rose">No group</Pill>} />
          <Row left="Kevin Park" sub="Attended 5 times in the last 12 weeks" right={<Pill tone="rose">No group</Pill>} />
        </ul>
        <p className="mt-2 text-xs text-slate-500">Tip: add &ldquo;by campus&rdquo; to group this list by campus.</p>
      </div>
    ),
  },
  {
    id: 'not-serving',
    label: 'Serving',
    kind: 'Care',
    icon: HeartHandshake,
    question: 'Regular attenders who aren’t serving',
    response: () => (
      <div>
        <p className="text-sm text-slate-600">
          <strong className="text-slate-900">3 regular attenders</strong> aren&apos;t on a serving team
        </p>
        <ul className="mt-2 divide-y divide-slate-100">
          <Row left="Emily Carter" sub="Regular attender · in Women’s Bible Study" right={<Pill>Not serving</Pill>} />
          <Row left="James Okafor" sub="Regular attender · no group" right={<Pill>Not serving</Pill>} />
          <Row left="Rachel Kim" sub="Regular attender · in Young Adults" right={<Pill>Not serving</Pill>} />
        </ul>
      </div>
    ),
  },
  {
    id: 'lapsed-attendance',
    label: 'Attendance Gaps',
    kind: 'Care',
    icon: CalendarX,
    question: 'Who came last Easter but hasn’t attended since February?',
    response: () => (
      <div>
        <p className="text-sm text-slate-600">
          <strong className="text-slate-900">3 people</strong> attended last Easter but not since February
        </p>
        <ul className="mt-2 divide-y divide-slate-100">
          <Row left="Daniel Ruiz" sub="Last attended Jan 25" right={<Pill tone="amber">Missing</Pill>} />
          <Row left="Hannah Scott" sub="Last attended Jan 18" right={<Pill tone="amber">Missing</Pill>} />
          <Row left="Anita Patel" sub="Last attended Jan 11" right={<Pill tone="amber">Missing</Pill>} />
        </ul>
        <p className="mt-2 text-xs text-slate-500">Also try: &ldquo;Who hasn&apos;t attended in the last 4 weeks?&rdquo;</p>
      </div>
    ),
  },
  {
    id: 'lapsed-givers',
    label: 'Giving Trends',
    kind: 'Care',
    icon: TrendingDown,
    question: 'Who gave last year but not this year?',
    response: () => (
      <div>
        <p className="text-sm text-slate-600">
          <strong className="text-slate-900">3 givers</strong> gave last year but haven&apos;t given this year
        </p>
        <ul className="mt-2 divide-y divide-slate-100">
          <Row left="Thomas Reed" sub="Last gift: Dec, last year" right={<Pill tone="amber">Lapsed</Pill>} />
          <Row left="Maria Gonzalez" sub="Last gift: Nov, last year" right={<Pill tone="amber">Lapsed</Pill>} />
          <Row left="Dana White" sub="Last gift: Oct, last year" right={<Pill tone="amber">Lapsed</Pill>} />
        </ul>
        <p className="mt-2 text-xs text-slate-500">Works for quarters and months too.</p>
      </div>
    ),
  },
  {
    id: 'visitor-follow-up',
    label: 'Visitor Follow-Up',
    kind: 'Care',
    icon: UserSearch,
    question: 'Visitors with no follow-up',
    response: () => (
      <div>
        <p className="text-sm text-slate-600">
          <strong className="text-slate-900">3 visitors</strong> haven&apos;t received a follow-up yet
        </p>
        <ul className="mt-2 divide-y divide-slate-100">
          <Row left="Angela Brooks" sub="First visit 2 weeks ago" right={<Pill tone="rose">No follow-up</Pill>} />
          <Row left="Jenny Liu" sub="First visit last Sunday" right={<Pill tone="rose">No follow-up</Pill>} />
          <Row left="Samuel Ortiz" sub="First visit 3 weeks ago" right={<Pill tone="rose">No follow-up</Pill>} />
        </ul>
      </div>
    ),
  },
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
            <span key={i} className="flex-1 rounded-t bg-gradient-to-t from-brand-600 to-plum-500 opacity-80" style={{ height: `${h}%` }} />
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
            ['Net', '$5,485', 'text-brand-700'],
          ].map(([k, v, c]) => (
            <div key={k} className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center">
              <p className="text-[11px] font-medium text-slate-500">{k}</p>
              <p className={`mt-0.5 text-base font-bold ${c}`}>{v}</p>
            </div>
          ))}
        </div>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white">
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
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-brand-600"
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
    text: 'Who’s drifting, who needs follow-up, giving trends, spending, meetings — answered in seconds.',
    gradient: 'from-brand-600 to-brand-500',
  },
  {
    icon: Zap,
    title: 'Tell it what to do',
    text: 'Create meetings and reports with one sentence. No forms.',
    gradient: 'from-plum-600 to-brand-600',
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

/* "Try asking…" ticker: 5 examples visible, scrolls vertically in step with the demo. */
const N = examples.length;
const VISIBLE = 5;
// Two full copies + a few extra so the loop can keep scrolling forward and then snap back
// invisibly (copies are identical, so pos and pos - N look the same).
const tickerItems = [...examples, ...examples, ...examples.slice(0, VISIBLE)];

export default function AISearchShowcase() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  // Prerendered HTML shows the first example fully answered; animation starts on the client.
  const [typed, setTyped] = useState(examples[0].question.length);
  const [phase, setPhase] = useState<Phase>('answer');
  const [playing, setPlaying] = useState(true);
  // Hover pauses auto-rotation only for a real mouse; touch taps never count as hovering.
  const [hovered, setHovered] = useState(false);
  // Keyboard focus inside the list also pauses rotation so the focused item doesn't scroll away.
  const [listFocused, setListFocused] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  // Ticker scroll position (index of the item in the top slot) and whether to animate the move.
  const [pos, setPos] = useState(0);
  const [animateTicker, setAnimateTicker] = useState(true);

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
    } else if (playing && !hovered && !listFocused) {
      t = setTimeout(advance, HOLD_TIME);
    }
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, typed, playing, hovered, listFocused, index]);

  // After an invisible snap-back (transition disabled), re-enable the smooth transition.
  useEffect(() => {
    if (animateTicker) return;
    let r2 = 0;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setAnimateTicker(true));
    });
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, [animateTicker]);

  // Scroll the ticker forward so example n sits in the top slot.
  function scrollTickerTo(n: number) {
    setPos((p) => {
      let target = n;
      while (target < p) target += N;
      if (target > 2 * N) target -= N;
      return reduceMotion ? target % N : target;
    });
  }

  function advance() {
    const next = (index + 1) % N;
    select(next);
    scrollTickerTo(next);
  }

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

  // Play is an explicit request: resume now and show the next example straight away, even though
  // the pointer is over the demo (hover-pause applies again only after the pointer leaves and returns).
  function togglePlay() {
    if (playing) {
      setPlaying(false);
      return;
    }
    setPlaying(true);
    setHovered(false);
    advance();
  }

  const style = kindStyle[current.kind];

  return (
    <section id="ai-search" className="section relative scroll-mt-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-brand-50/60 to-white" aria-hidden="true" />
      <div
        className="absolute -right-40 top-20 -z-10 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(233,162,59,0.16), transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute -left-40 bottom-10 -z-10 h-[480px] w-[480px] rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(164,85,124,0.55), transparent)' }}
        aria-hidden="true"
      />

      <div className="container-page">
        {/* Heading */}
        <Reveal className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-plum-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-plum-600/25">
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
          className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start lg:gap-10"
          onPointerEnter={(e) => {
            if (e.pointerType === 'mouse') setHovered(true);
          }}
          onPointerLeave={() => setHovered(false)}
        >
          {/* App window */}
          <Reveal className="lg:sticky lg:top-24">
            <div ref={windowRef} className="glass scroll-mt-24 rounded-3xl p-2 sm:p-3">
              <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
                <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="ml-auto inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-slate-500 transition hover:bg-white hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    aria-label={playing ? 'Pause the AI Search demo' : 'Play the AI Search demo'}
                  >
                    {playing ? <Pause className="h-3.5 w-3.5" aria-hidden="true" /> : <Play className="h-3.5 w-3.5" aria-hidden="true" />}
                    {playing ? 'Pause' : 'Play'}
                  </button>
                </div>

                <div className="p-4 sm:p-6">
                  {/* Search bar */}
                  <div className="flex items-center gap-3 rounded-2xl border-2 border-transparent bg-[linear-gradient(white,white),linear-gradient(90deg,#7c3a57,#a4557c,#e9a23b)] px-4 py-3.5 shadow-lg shadow-brand-600/10 [background-clip:padding-box,border-box] [background-origin:border-box]">
                    <Sparkles className="h-5 w-5 shrink-0 text-plum-600" aria-hidden="true" />
                    <p className="grid min-h-[1.5rem] min-w-0 flex-1 grid-cols-[minmax(0,1fr)] text-[15px] font-medium text-slate-800 sm:text-base" aria-label={`Example question: ${current.question}`}>
                      {/* Invisible copies of every question reserve the tallest one's height, so the
                          window (and the content below it) never changes size as examples rotate. */}
                      {examples.map((ex) => (
                        <span key={ex.id} className="invisible [grid-area:1/1]" aria-hidden="true">
                          {ex.question}
                          <span className="ml-0.5 inline-block h-5 w-0.5" />
                        </span>
                      ))}
                      <span className="self-center [grid-area:1/1]" aria-hidden="true">
                        {current.question.slice(0, typed)}
                        {phase === 'typing' && (
                          <span className="ml-0.5 inline-block h-5 w-0.5 translate-y-1 animate-pulse bg-brand-600" />
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
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-plum-600 text-white">
                        <Sparkles className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-bold text-slate-900">AI Search</span>
                      {/* Badge slot sized to the widest label so the header never changes height. */}
                      <span className="ml-auto grid items-center justify-items-end">
                        {examples.map((ex) => (
                          <span key={ex.id} className="invisible rounded-full px-2.5 py-0.5 text-[11px] font-semibold [grid-area:1/1]" aria-hidden="true">
                            {ex.label}
                          </span>
                        ))}
                        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 [grid-area:1/1] ${style.chip}`}>
                          {current.label}
                        </span>
                      </span>
                    </div>
                    <div className="grid grid-cols-[minmax(0,1fr)]">
                    {/* Same idea for the answers: reserve the height of the tallest one. */}
                    {examples.map((ex) => (
                      <div key={ex.id} className="pointer-events-none invisible [grid-area:1/1]" aria-hidden="true">
                        {ex.response()}
                      </div>
                    ))}
                    <div className="[grid-area:1/1]">
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
                                    className="h-2 w-2 rounded-full bg-plum-500"
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
                    </div>
                  </div>
                  <p className="mt-3 text-center text-[11px] text-slate-400">Illustration with sample data</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Example chooser */}
          <Reveal delay={0.1}>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Try asking…</p>
            {/* Fixed-height window showing 5 examples; the track inside slides vertically. */}
            <div
              className="relative mt-4 overflow-hidden p-1 [--slot:100px] sm:[--slot:84px]"
              // overflow: clip (not hidden) so focusing an item can't scroll the box behind the animation.
              style={{ height: `calc(var(--slot) * ${VISIBLE})`, overflow: 'clip' }}
              onScroll={(e) => {
                // Fallback for browsers without overflow: clip.
                e.currentTarget.scrollTop = 0;
              }}
            >
              <ul
                style={{
                  transform: `translateY(calc(var(--slot) * ${-pos}))`,
                  transition: animateTicker && !reduceMotion ? 'transform 700ms cubic-bezier(0.65, 0, 0.35, 1)' : 'none',
                }}
                onTransitionEnd={(e) => {
                  if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;
                  if (pos >= N) {
                    setAnimateTicker(false);
                    setPos(pos % N);
                  }
                }}
                onFocus={() => setListFocused(true)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setListFocused(false);
                }}
              >
                {tickerItems.map((ex, k) => {
                  const i = k % N;
                  const copy = k >= N;
                  const active = i === index;
                  const ks = kindStyle[ex.kind];
                  return (
                    <li key={`${ex.id}-${k}`} style={{ height: 'var(--slot)' }} aria-hidden={copy || undefined}>
                      <button
                        type="button"
                        tabIndex={copy ? -1 : undefined}
                        onFocus={() => {
                          // Keyboard users: keep the focused example inside the visible window.
                          if (copy) return;
                          const p = pos % N;
                          if (k < p) setPos(k);
                          else if (k > p + VISIBLE - 1) setPos(k - VISIBLE + 1);
                        }}
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
                        style={{ height: 'calc(var(--slot) - 8px)' }}
                        className={`group flex w-full items-center gap-3 overflow-hidden rounded-xl border px-3.5 py-2 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                          active
                            ? 'border-transparent bg-white shadow-md shadow-plum-600/10 ring-2 ring-plum-500/60'
                            : 'border-slate-200/80 bg-white/70 hover:border-brand-300 hover:bg-white'
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
                            active ? 'bg-gradient-to-br from-brand-600 to-plum-600 text-white' : `${ks.chip} ring-1`
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
            </div>
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
                  'radial-gradient(50% 60% at 15% 20%, rgba(164,85,124,0.5), transparent 60%), radial-gradient(50% 60% at 85% 80%, rgba(233,162,59,0.16), transparent 60%)',
              }}
              aria-hidden="true"
            />
            <div className="relative">
              <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
                Just Ask.{' '}
                <span className="bg-gradient-to-r from-brand-400 via-plum-400 to-gold-400 bg-clip-text text-transparent">
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
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                >
                  <PlayCircle className="h-5 w-5 text-brand-300" aria-hidden="true" /> Watch AI Search in Action
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
