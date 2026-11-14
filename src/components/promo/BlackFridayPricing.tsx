import { Link } from 'react-router-dom';
import { ArrowRight, Check, Clock } from 'lucide-react';
import { blackFriday, useOfferName } from '../../data/promo';
import { PromoCodePill } from './BlackFridayBanner';

/** Black Friday deal block for the Pricing page (above the regular plan cards). */
export default function BlackFridayPricing() {
  const name = useOfferName();
  return (
    <section aria-labelledby="black-friday-pricing" className="pb-14">
      <div className="container-page">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border-2 border-amber-400 bg-gradient-to-br from-slate-950 via-plum-900 to-brand-900 p-6 text-white shadow-2xl shadow-plum-900/30 sm:p-10">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-400/25 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-slate-950">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" /> Limited-time {name} deal
            </span>
            <h2 id="black-friday-pricing" className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">
                50% OFF FOR 2 YEARS
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/80">
              Start with a 2-month free trial. When paid billing begins, you pay half price for 2 years.
            </p>
          </div>

          <div className="relative mx-auto mt-8 max-w-xl overflow-hidden rounded-2xl bg-white text-slate-900 shadow-lg">
            <table className="w-full text-left">
              <caption className="sr-only">{name} prices for paid plans</caption>
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th scope="col" className="px-5 py-3">Plan</th>
                  <th scope="col" className="px-5 py-3 text-right">Original price</th>
                  <th scope="col" className="px-5 py-3 text-right">{name} price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blackFriday.plans.map((p) => (
                  <tr key={p.name}>
                    <th scope="row" className="px-5 py-4 font-bold">{p.name}</th>
                    <td className="px-5 py-4 text-right text-slate-400">
                      <del aria-label={`was $${p.regular} per month`}>${p.regular}/month</del>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="text-2xl font-extrabold text-brand-700">${p.promo}</span>
                      <span className="font-semibold text-slate-600">/month</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="relative mx-auto mt-8 grid max-w-2xl gap-x-6 gap-y-2 text-sm text-white/90 sm:grid-cols-2">
            {[
              '2-month free trial before promotional billing begins',
              '50% off for 2 years, then the regular price',
              'No contract',
              '30-day money-back guarantee',
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>

          <div className="relative mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <PromoCodePill dark />
            <Link
              to={`/signup?promo=${blackFriday.code}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3.5 text-base font-bold text-slate-950 shadow-lg shadow-orange-500/30 transition hover:brightness-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/50"
            >
              Claim {name} Deal <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>

          <p className="relative mt-6 text-center text-xs leading-relaxed text-white/55">
            Offer ends {blackFriday.endsLabel}. {blackFriday.terms}
          </p>
        </div>
      </div>
    </section>
  );
}
