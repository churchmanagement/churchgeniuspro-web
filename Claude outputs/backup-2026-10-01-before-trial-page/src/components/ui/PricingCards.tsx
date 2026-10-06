import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronDown, Clock, Sparkles } from 'lucide-react';
import {
  pricingPlans,
  pricingPerks,
  pricingOffer,
  trialFeatures,
  type PlanFeature,
} from '../../data/content';
import { Reveal } from './Section';

function FeatureList({ features, highlighted }: { features: PlanFeature[]; highlighted: boolean }) {
  return (
    <ul className="space-y-3">
      {features.map((f) => {
        const label = typeof f === 'string' ? f : f.label;
        return (
          <li key={label} className="flex items-start gap-3 text-sm">
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                highlighted ? 'bg-white/20' : 'bg-emerald-100'
              }`}
            >
              <Check
                className={`h-3 w-3 ${highlighted ? 'text-white' : 'text-emerald-600'}`}
                aria-hidden="true"
              />
            </span>
            <div className="min-w-0">
              <span
                className={`break-words ${highlighted ? 'text-blue-50' : 'text-slate-600'} ${typeof f === 'string' ? '' : 'font-semibold'}`}
              >
                {label}
                {typeof f === 'string' ? '' : ':'}
              </span>
              {typeof f !== 'string' && (
                <ul className="mt-1.5 space-y-1">
                  {f.items.map((item) => (
                    <li
                      key={item}
                      className={`flex items-start gap-2 text-[13px] ${highlighted ? 'text-blue-100' : 'text-slate-500'}`}
                    >
                      <span
                        className={`mt-[7px] h-1 w-1 shrink-0 rounded-full ${highlighted ? 'bg-blue-200' : 'bg-slate-400'}`}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function TrialPanel({ defaultOpen }: { defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const highlights = trialFeatures.filter((f): f is string => typeof f === 'string');
  const groups = trialFeatures.filter(
    (f): f is Exclude<PlanFeature, string> => typeof f !== 'string'
  );

  return (
    <div className="rounded-3xl bg-gradient-to-r from-amber-400 via-orange-500 to-purple-600 p-[2px] shadow-xl shadow-orange-500/15">
      <div className="rounded-[calc(1.5rem-2px)] bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-950">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {pricingOffer.label}
            </span>
            <h3 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Free Trial: <span className="gradient-text">{pricingOffer.trialLength}</span> with
              every feature
            </h3>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Unlimited people, emails, giving, and portals — plus all accounting features and
              advanced AI — free for {pricingOffer.trialLength}.
            </p>
          </div>
          <Link to="/signup" className="btn-primary shrink-0 justify-center !px-7 !py-3.5">
            Start 2-Month Free Trial
          </Link>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2">
          {highlights.map((h) => (
            <li
              key={h}
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 sm:text-sm"
            >
              <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          {open ? 'Hide' : 'See'} everything included in the trial
          <ChevronDown
            className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>

        <div id={panelId} hidden={!open} className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g) => (
            <div key={g.label} className="rounded-2xl bg-slate-50 p-5">
              <h4 className="text-sm font-bold text-slate-900">{g.label}</h4>
              <ul className="mt-3 space-y-2">
                {g.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PricingCards({ trialOpen = false }: { trialOpen?: boolean }) {
  return (
    <div>
      <Reveal>
        <TrialPanel defaultOpen={trialOpen} />
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-xl gap-8 lg:max-w-none lg:grid-cols-3 lg:items-stretch">
        {pricingPlans.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 0.12} className="h-full">
            <div
              className={`relative flex h-full flex-col rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 sm:p-8 ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-blue-600 to-purple-700 text-white shadow-2xl shadow-purple-600/30 ring-4 ring-purple-500/20'
                  : 'border border-slate-100 bg-white shadow-lg shadow-slate-900/5'
              }`}
            >
              {plan.badge && (
                <span
                  className={`absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold ${
                    plan.highlighted
                      ? 'bg-emerald-400 text-emerald-950'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  }`}
                >
                  {plan.badge === 'Includes AI' && (
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                  )}
                  {plan.badge}
                </span>
              )}
              <h3
                className={`text-lg font-bold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}
              >
                {plan.name}
              </h3>
              <p
                className={`mt-1 text-sm ${plan.highlighted ? 'text-blue-100' : 'text-slate-500'}`}
              >
                {plan.description}
              </p>
              <span className="mt-5 inline-flex w-fit items-center rounded-full bg-amber-400 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-amber-950">
                {pricingOffer.label}
              </span>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span
                  className={`text-5xl font-extrabold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-sm ${plan.highlighted ? 'text-blue-100' : 'text-slate-500'}`}
                >
                  / {plan.period}
                </span>
              </div>
              <Link
                to="/signup"
                className={`mt-6 inline-flex w-full items-center justify-center rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                  plan.highlighted
                    ? 'bg-white text-blue-700 shadow-lg hover:shadow-xl'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/25 hover:shadow-xl'
                }`}
              >
                {plan.cta}
              </Link>
              <div
                className={`mt-7 flex-1 border-t pt-6 ${plan.highlighted ? 'border-white/20' : 'border-slate-100'}`}
              >
                {plan.includesFrom && (
                  <p
                    className={`mb-4 text-sm font-bold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}
                  >
                    {plan.includesFrom}
                  </p>
                )}
                <FeatureList features={plan.features} highlighted={plan.highlighted} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {pricingPerks.map((perk) => (
            <span key={perk} className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <Check className="h-4 w-4 text-emerald-500" aria-hidden="true" />
              {perk}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
