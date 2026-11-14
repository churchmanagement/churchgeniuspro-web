import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Copy, Tag } from 'lucide-react';
import { blackFriday, useOfferName } from '../../data/promo';

/** Copy-to-clipboard pill for the promo code. */
export function PromoCodePill({ dark = false }: { dark?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(blackFriday.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the code is visible anyway */
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className={`group inline-flex items-center gap-2 rounded-xl border-2 border-dashed px-4 py-2 font-mono text-lg font-extrabold tracking-widest transition ${
        dark
          ? 'border-amber-300/70 bg-white/10 text-amber-200 hover:bg-white/15'
          : 'border-amber-400 bg-amber-50 text-amber-800 hover:bg-amber-100'
      }`}
      aria-label={`Copy promo code ${blackFriday.code}`}
    >
      <Tag className="h-4 w-4" aria-hidden="true" />
      {blackFriday.code}
      {copied ? (
        <Check className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Copy className="h-4 w-4 opacity-60 group-hover:opacity-100" aria-hidden="true" />
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied' : ''}
      </span>
    </button>
  );
}

/** Black Friday banner shown at the very top of the home page while the offer is live. */
export default function BlackFridayBanner() {
  const name = useOfferName();
  return (
    <section aria-label={`${name} special offer`} className="pt-20 md:pt-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-plum-900 to-brand-900 px-6 py-8 text-white shadow-2xl shadow-plum-900/30 sm:px-10 sm:py-10">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-400/25 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-slate-950">
                {name} Special · Limited time
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-orange-300 bg-clip-text text-transparent">
                  50% OFF
                </span>{' '}
                for 2 years!
              </h2>
              <ul className="mt-5 grid gap-x-6 gap-y-2 text-sm text-white/90 sm:grid-cols-2 sm:text-base">
                {blackFriday.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-center gap-4 rounded-2xl bg-white/5 p-6 text-center ring-1 ring-white/10 backdrop-blur">
              <div className="flex items-end gap-6">
                {blackFriday.plans.map((p) => (
                  <div key={p.name}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/60">{p.name}</p>
                    <p className="text-sm text-white/50 line-through">${p.regular}/mo</p>
                    <p className="text-3xl font-extrabold text-amber-300">
                      ${p.promo}
                      <span className="text-base font-semibold text-white/70">/mo</span>
                    </p>
                  </div>
                ))}
              </div>
              <PromoCodePill dark />
              <Link
                to={`/signup?promo=${blackFriday.code}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3.5 text-base font-bold text-slate-950 shadow-lg shadow-orange-500/30 transition hover:brightness-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/50"
              >
                Get This Deal <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <p className="text-xs text-white/60">Ends {blackFriday.endsLabel}</p>
            </div>
          </div>

          <p className="relative mt-6 text-xs leading-relaxed text-white/50">{blackFriday.terms}</p>
        </div>
      </div>
    </section>
  );
}
