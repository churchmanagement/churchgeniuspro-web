import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Filter,
  HeartPulse,
  PenLine,
  Plug,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { Reveal } from '../ui/Section';

/**
 * Advanced AI capabilities — highlighted homepage section for the
 * Nov 2026 AI release (people filters, member intelligence, AI writing &
 * form builder, action agent, MCP connections, automations).
 * All of these are part of Advanced AI on the Pro plan (and the free trial).
 */
const newFeatures = [
  {
    icon: Filter,
    title: 'AI People Filters & Saved Lists',
    description:
      'Describe the people you need and get a filtered list you can refine with one click, save, re-run, export to CSV, or email.',
    example: '“Women 18–30 who attended twice in the last 60 days”',
    gradient: 'from-blue-600 to-cyan-500',
  },
  {
    icon: HeartPulse,
    title: 'Member Intelligence & Ministry Report',
    description:
      'Nightly engagement insights show who is new, growing, or drifting away — plus a monthly Ministry Report with tiles, a written summary, CSV, and print.',
    example: '“Who is at risk?” · “Show new attenders”',
    gradient: 'from-rose-500 to-orange-500',
  },
  {
    icon: PenLine,
    title: 'AI Writing & Event Form Builder',
    description:
      'Draft emails and SMS in the tone you choose, then rewrite, shorten, or translate. Describe an event in a sentence and the form fills itself — you review and save.',
    example: '“Youth lock-in Friday 7 pm to 7 am, $15, max 40”',
    gradient: 'from-purple-600 to-fuchsia-500',
  },
  {
    icon: Bot,
    title: 'AI Action Agent',
    description:
      'Ask it to do the work — add someone to a group or set a follow-up reminder. It shows a confirmation card first and nothing changes until you press Confirm.',
    example: '“Add Mary to the Welcome Team” · “Remind me to call John by Friday”',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Workflow,
    title: 'Automations',
    description:
      'Start from a template or describe a rule in plain English. Test-run it first, switch it on, and see every run in the history.',
    example: '“First-time visitor → follow-up call in 2 days”',
    gradient: 'from-amber-500 to-yellow-500',
  },
  {
    icon: Plug,
    title: 'AI Connections (MCP)',
    description:
      'Securely connect Claude and other MCP-compatible AI assistants to your church data with tokens you control — limit contact details, and revoke access anytime.',
    example: '“Which regular attenders are not in a group?”',
    gradient: 'from-indigo-600 to-blue-500',
  },
];

const safeguards = [
  'You confirm every AI action before anything is saved',
  'Respects each user’s existing roles and page permissions',
  'Admins can review all AI requests and actions in AI Activity',
];

export default function NewAIFeatures() {
  return (
    <section id="advanced-ai" className="section relative scroll-mt-20 overflow-hidden bg-slate-950">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(circle at 15% 20%, rgba(59,130,246,0.28), transparent 45%), radial-gradient(circle at 85% 75%, rgba(147,51,234,0.3), transparent 45%)',
        }}
        aria-hidden="true"
      />
      <div className="container-page relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-lg shadow-pink-500/25">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> ChurchGeniusPro Advanced AI
          </span>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.1]">
            Your AI assistant can now{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              find, write, act, and automate.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
            Six capabilities that turn everyday questions into lists, reports, messages, and
            completed tasks — with you in control of every change.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newFeatures.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.1}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/40 hover:bg-white/10">
                <div className="flex items-start gap-3">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${f.gradient} text-white shadow-lg`}
                  >
                    <f.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">{f.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300">{f.description}</p>
                <p className="mt-4 rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-xs italic leading-relaxed text-blue-200">
                  {f.example}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10">
          <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-emerald-400/25 bg-emerald-400/5 p-6 md:flex-row md:items-center md:gap-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </span>
            <ul className="grid flex-1 gap-2 text-sm text-slate-200 md:grid-cols-3 md:gap-4">
              {safeguards.map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.3} className="mt-10 text-center">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/signup" className="btn-primary !px-8 !py-4 !text-base">
              Try Advanced AI Free for 2 Months <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              See the Pro plan
            </Link>
          </div>
          <p className="mt-5 text-xs text-slate-400">
            Part of Advanced AI on the Pro plan — included in every 2-month free trial.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
