import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, RefreshCcw, HeartHandshake, Check, Zap } from 'lucide-react';
import PricingCards from '../components/ui/PricingCards';
import FAQAccordion from '../components/ui/FAQAccordion';
import CTASection from '../components/ui/CTASection';
import { SectionHeading, Reveal } from '../components/ui/Section';
import { faqs, addOns, planComparison } from '../data/content';

const assurances = [
  {
    icon: RefreshCcw,
    title: 'Switch anytime',
    description: 'Upgrade or downgrade whenever you like — your data stays exactly where it is.',
  },
  {
    icon: HeartHandshake,
    title: 'Free migration support',
    description: 'Our team moves your members, giving history, and financials from your old system for free.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure by design',
    description: 'Role-based access, tailored portals, and private pages protect your church data at every level.',
  },
];

export default function Pricing() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-32 md:pt-40">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-white to-white" aria-hidden="true" />
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-block rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600">
              Pricing
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Simple, honest pricing for <span className="gradient-text">every church</span>
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              Start free forever. Upgrade when you're ready — every paid plan includes a 1-month
              free trial and free migration support.
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mx-auto mt-8 inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 shadow-lg shadow-orange-500/25"
            >
              <Zap className="h-5 w-5 text-white" aria-hidden="true" />
              <span className="text-sm font-bold uppercase tracking-wide text-white sm:text-base">
                Limited Unbeatable One-Month Deal
              </span>
              <span className="rounded-full bg-white/20 px-3 py-0.5 text-xs font-semibold text-white">
                Up to $75/month value
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page">
          <PricingCards />
        </div>
      </section>

      {/* Optional Add-ons */}
      <section className="section bg-slate-50">
        <div className="container-page">
          <SectionHeading
            eyebrow="Optional Add-ons"
            title="Extend your plan when you need more"
            subtitle="Add powerful modules to any plan — turn them on or off at any time."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {addOns.map((addon, i) => (
              <Reveal key={addon.name} delay={i * 0.1}>
                <div className="card flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl" aria-hidden="true">
                      {addon.emoji}
                    </span>
                    <span className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-sm font-bold text-white">
                      {addon.price}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{addon.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{addon.description}</p>
                  <ul className="mt-4 flex-1 space-y-2.5">
                    {addon.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                          <Check className="h-3 w-3 text-emerald-600" aria-hidden="true" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Plan comparison table */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Plan Comparison"
            title="Compare plans side by side"
            subtitle="Everything each plan includes, at a glance."
          />
          <Reveal className="mt-12">
            <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-xl shadow-slate-900/5">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-sm">
                  <caption className="sr-only">Feature comparison across Free, Standard, and Pro plans</caption>
                  <thead>
                    <tr className="bg-slate-50">
                      <th scope="col" className="px-5 py-4 text-left font-semibold text-slate-700">
                        Feature
                      </th>
                      <th scope="col" className="px-4 py-4 text-center font-semibold text-slate-700">
                        Free
                        <span className="block text-xs font-normal text-slate-400">$0/mo</span>
                      </th>
                      <th scope="col" className="bg-gradient-to-b from-blue-600 to-purple-600 px-4 py-4 text-center font-semibold text-white">
                        Standard
                        <span className="block text-xs font-normal text-blue-100">$15/mo</span>
                      </th>
                      <th scope="col" className="px-4 py-4 text-center font-semibold text-slate-700">
                        Pro
                        <span className="block text-xs font-normal text-slate-400">$25/mo</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {planComparison.map((row, ri) => (
                      <tr key={row.feature} className={ri % 2 ? 'bg-slate-50/60' : 'bg-white'}>
                        <th scope="row" className="px-5 py-3.5 text-left font-medium text-slate-800">
                          {row.feature}
                        </th>
                        {[row.free, row.standard, row.pro].map((v, vi) => (
                          <td
                            key={vi}
                            className={`px-4 py-3.5 text-center ${vi === 1 ? 'bg-blue-50/70' : ''} ${
                              v === '—' ? 'text-slate-300' : v === '✓' ? 'text-emerald-600' : 'font-medium text-slate-700'
                            }`}
                          >
                            {v === '✓' ? (
                              <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                                <Check className="h-4 w-4 text-emerald-600" aria-label="Included" />
                              </span>
                            ) : (
                              v
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Assurances */}
      <section className="section bg-slate-50">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-3">
            {assurances.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.1}>
                <div className="card h-full text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                    <a.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-bold text-slate-900">{a.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{a.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="Questions" title="Pricing questions, answered" />
          <div className="mt-12">
            <FAQAccordion
              items={faqs.filter((f) => ['Pricing', 'Getting Started'].includes(f.category))}
            />
          </div>
          <Reveal className="mt-10 text-center">
            <Link to="/compare" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
              Compare us with other tools <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
