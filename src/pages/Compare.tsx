import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Sparkles, Star } from 'lucide-react';
import { SectionHeading, Reveal } from '../components/ui/Section';
import CTASection from '../components/ui/CTASection';
import { compareColumns, compareRows, compareLastVerified, type CompareRow } from '../data/content';

function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return (
      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
        <Check className="h-4 w-4 text-emerald-600" aria-label="Offered" />
      </span>
    );
  if (value === false)
    return (
      <span
        className="text-slate-400"
        aria-label="Not offered as a built-in feature per official public materials"
      >
        —
      </span>
    );
  return <span className="text-xs font-medium text-amber-600">{value}</span>;
}

const keys: (keyof Omit<CompareRow, 'feature'>)[] = [
  'cgp',
  'spreadsheets',
  'quickbooks',
  'breeze',
  'planningCenter',
  'tithely',
];

const strengths = [
  'AI assistant on the Pro plan — type or speak everyday language to find records and complete tasks',
  'Optional accounting module with payroll, check scanning, bank statement import & giving statements — connected to your member and giving records',
  'Sunday School tools with automatic exams and grading',
  'Members, events, worship planning, kids check-in & giving managed in one system with one login',
  'Barcode & NFC temporary guest login and Wi-Fi-only private pages',
  'Free plan, free migration support, and a 1-month free trial on paid plans',
];

export default function Compare() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-32 md:pt-40">
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50 via-white to-white"
          aria-hidden="true"
        />
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-block rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600">
              Compare
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              One platform vs. <span className="gradient-text">a patchwork of tools</span>
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              An honest, feature-by-feature look at how ChurchGeniusPro compares with spreadsheets,
              accounting software, and popular church management platforms — based on each
              provider&rsquo;s official public information.
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Comparison information last verified: {compareLastVerified}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="pb-20">
        <div className="container-page">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-xl shadow-slate-900/5">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse text-sm">
                  <caption className="sr-only">
                    Feature comparison between ChurchGeniusPro and other tools, based on each
                    provider&rsquo;s official public information as of {compareLastVerified}
                  </caption>
                  <thead>
                    <tr className="bg-slate-50">
                      <th scope="col" className="px-5 py-4 text-left font-semibold text-slate-700">
                        Feature
                      </th>
                      {compareColumns.map((col, i) => (
                        <th
                          key={col}
                          scope="col"
                          className={`px-4 py-4 text-center font-semibold ${
                            i === 0
                              ? 'bg-gradient-to-b from-blue-600 to-purple-600 text-white'
                              : 'text-slate-700'
                          }`}
                        >
                          {i === 0 ? (
                            <span className="inline-flex items-center gap-1.5">
                              <Sparkles className="h-4 w-4" aria-hidden="true" /> {col}
                            </span>
                          ) : (
                            col
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {compareRows.map((row, ri) => (
                      <tr key={row.feature} className={ri % 2 ? 'bg-slate-50/60' : 'bg-white'}>
                        <th scope="row" className="px-5 py-4 text-left font-medium text-slate-800">
                          {row.feature}
                        </th>
                        {keys.map((k, ki) => (
                          <td
                            key={k}
                            className={`px-4 py-4 text-center ${ki === 0 ? 'bg-blue-50/70' : ''}`}
                          >
                            <Cell value={row[k]} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>

          {/* Legend */}
          <div className="mx-auto mt-6 max-w-4xl rounded-2xl border border-slate-100 bg-slate-50/60 p-5 text-left">
            <h2 className="text-sm font-semibold text-slate-700">How to read this table</h2>
            <ul className="mt-2 space-y-1.5 text-xs text-slate-500">
              <li>
                <span className="font-semibold text-emerald-600">✓</span> — offered as a built-in
                feature. For ChurchGeniusPro, this means available on at least one plan; see our{' '}
                <Link to="/pricing" className="font-medium text-blue-600 hover:underline">
                  Pricing page
                </Link>{' '}
                for which plan includes each feature.
              </li>
              <li>
                <span className="font-semibold text-slate-500">—</span> — not offered as a built-in
                feature according to the provider&rsquo;s official public website, pricing pages,
                and documentation as of the &ldquo;last verified&rdquo; date above. Providers may
                offer related capabilities through third-party integrations, and features may have
                changed since our review.
              </li>
              <li>
                <span className="font-semibold text-amber-600">Text notes</span> (for example
                &ldquo;Add-on,&rdquo; &ldquo;Pro plan,&rdquo; &ldquo;Checks (beta)&rdquo;) — the
                capability is available in a partial form, at extra cost, on a specific plan, or
                with the scope described.
              </li>
            </ul>
          </div>

          {/* Methodology & disclaimer */}
          <div className="mx-auto mt-6 max-w-4xl space-y-3 text-left text-xs leading-relaxed text-slate-400">
            <p>
              <span className="font-semibold text-slate-500">About this comparison.</span> This page
              was prepared by ChurchGeniusPro and last verified on {compareLastVerified}, based on
              information published on each provider&rsquo;s official website, pricing pages, and
              public documentation as of that date. Products change frequently, and features, plans,
              and prices may have been added, removed, or modified since our review. Please consult
              each provider&rsquo;s own website for the most current information before making a
              purchasing decision. If you believe anything on this page is inaccurate or out of
              date, please{' '}
              <Link to="/contact" className="font-medium text-blue-600 hover:underline">
                contact us
              </Link>{' '}
              and we will review and correct it promptly.
            </p>
            <p>
              <span className="font-semibold text-slate-500">Trademarks.</span> QuickBooks, Breeze,
              Planning Center, Tithe.ly, and all other third-party product names, brands, and
              trademarks referenced on this page are the property of their respective owners. They
              are used here only to identify the products being compared. Their use does not imply —
              and should not be interpreted as implying — any affiliation with, sponsorship of,
              partnership with, or endorsement of ChurchGeniusPro by those companies, or of those
              companies by ChurchGeniusPro. This page intentionally uses no third-party logos,
              screenshots, or other content.
            </p>
          </div>
        </div>
      </section>

      {/* Strengths */}
      <section className="section bg-slate-950">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our approach"
            title="What makes ChurchGeniusPro different"
            dark
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {strengths.map((s, i) => (
              <Reveal key={s} delay={(i % 3) * 0.08}>
                <div className="flex h-full items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 text-white">
                    <Star className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="text-sm font-medium text-slate-200">{s}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
