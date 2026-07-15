import { motion } from 'framer-motion';
import { Check, X, Sparkles, Trophy } from 'lucide-react';
import { SectionHeading, Reveal } from '../components/ui/Section';
import CTASection from '../components/ui/CTASection';
import { compareColumns, compareRows, type CompareRow } from '../data/content';

function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return (
      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
        <Check className="h-4 w-4 text-emerald-600" aria-label="Yes" />
      </span>
    );
  if (value === false)
    return (
      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-slate-100">
        <X className="h-4 w-4 text-slate-400" aria-label="No" />
      </span>
    );
  return <span className="text-xs font-medium text-amber-600">{value}</span>;
}

const keys: (keyof Omit<CompareRow, 'feature'>)[] = [
  'cgp',
  'excel',
  'quickbooks',
  'breeze',
  'planningCenter',
  'tithely',
  'others',
];

const strengths = [
  'Built-in AI assistant with voice, text & conversational commands',
  'Full fund accounting, payroll & automatic tax statements',
  'OCR that reads checks, bank statements & membership forms',
  'Complete church management: members, events, Sunday School & kids',
  'QR / NFC login, Wi-Fi-only pages & role-based security',
  'One unified platform — no add-ons, no integrations to babysit',
];

export default function Compare() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-32 md:pt-40">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50 via-white to-white" aria-hidden="true" />
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
              See how ChurchGeniusPro stacks up against spreadsheets, accounting software, and
              other church management systems.
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
                    Feature comparison between ChurchGeniusPro and other tools
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
          <p className="mt-4 text-center text-xs text-slate-400">
            Comparison based on typical plans and publicly available feature lists. “Varies” means
            capability differs by product or requires paid add-ons.
          </p>
        </div>
      </section>

      {/* Strengths */}
      <section className="section bg-slate-950">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why ChurchGeniusPro wins"
            title="Strengths no other tool combines"
            dark
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {strengths.map((s, i) => (
              <Reveal key={s} delay={(i % 3) * 0.08}>
                <div className="flex h-full items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 text-white">
                    <Trophy className="h-4 w-4" aria-hidden="true" />
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
