import { Link } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import { pricingPlans, pricingPerks } from '../../data/content';
import { Reveal } from './Section';

export default function PricingCards() {
  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-3 lg:items-stretch">
        {pricingPlans.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 0.12} className="h-full">
            <div
              className={`relative flex h-full flex-col rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1.5 ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-blue-600 to-purple-700 text-white shadow-2xl shadow-purple-600/30 lg:scale-105'
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
                  {plan.badge === 'Includes AI' && <Sparkles className="h-3 w-3" aria-hidden="true" />}
                  {plan.badge}
                </span>
              )}
              <h3 className={`text-lg font-bold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                {plan.name}
              </h3>
              <p className={`mt-1 text-sm ${plan.highlighted ? 'text-blue-100' : 'text-slate-500'}`}>
                {plan.description}
              </p>
              {plan.dealValue && (
                <div className="mt-5 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-amber-400 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-amber-950">
                    Limited Deal
                  </span>
                  <span
                    className={`text-sm font-semibold line-through ${
                      plan.highlighted ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    {plan.dealValue}/month value
                  </span>
                </div>
              )}
              <div className={`${plan.dealValue ? 'mt-2' : 'mt-6'} flex items-baseline gap-2`}>
                <span className={`text-5xl font-extrabold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.highlighted ? 'text-blue-100' : 'text-slate-500'}`}>
                  / {plan.period}
                </span>
              </div>
              <ul className="mt-8 flex-1 space-y-3.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        plan.highlighted ? 'bg-white/20' : 'bg-emerald-100'
                      }`}
                    >
                      <Check
                        className={`h-3 w-3 ${plan.highlighted ? 'text-white' : 'text-emerald-600'}`}
                        aria-hidden="true"
                      />
                    </span>
                    <span className={plan.highlighted ? 'text-blue-50' : 'text-slate-600'}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                  plan.highlighted
                    ? 'bg-white text-blue-700 shadow-lg hover:shadow-xl'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/25 hover:shadow-xl'
                }`}
              >
                {plan.cta}
              </Link>
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
