import { Link } from 'react-router-dom';
import { ArrowRight, Check, ExternalLink } from 'lucide-react';
import { SectionHeading } from '../components/ui/Section';
import CTASection from '../components/ui/CTASection';
import FAQAccordion from '../components/ui/FAQAccordion';
import {
  cgpPricingSummary,
  compareVsPages,
  getCompareVsPage,
  type CellValue,
  type CompareVsPage,
} from '../data/compareVs';
import { SITE } from '../data/seo';

/**
 * /compare/<slug> — one-on-one comparison against a single provider.
 * Content and the legal rules for it live in src/data/compareVs.ts.
 */

function Cell({ value }: { value: CellValue }) {
  if (value === true)
    return (
      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
        <Check className="h-4 w-4 text-emerald-700" aria-label="Offered" />
      </span>
    );
  if (value === false)
    return (
      <span
        className="text-slate-500"
        aria-label="Not found as a built-in feature in official public materials"
      >
        —
      </span>
    );
  return <span className="text-xs font-medium text-amber-700">{value}</span>;
}

export default function CompareVs({ slug }: { slug: CompareVsPage['slug'] }) {
  const page = getCompareVsPage(slug);
  const others = compareVsPages.filter((p) => p.slug !== slug);

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': `${SITE}/compare/${page.slug}#faq`,
        mainEntity: page.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Compare', item: `${SITE}/compare` },
          { '@type': 'ListItem', position: 3, name: page.h1, item: `${SITE}/compare/${page.slug}` },
        ],
      },
    ],
  }).replace(/</g, '\\u003c');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      {/* Hero */}
      <section className="pb-12 pt-32 md:pt-40">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
              <Link to="/" className="hover:text-blue-700">
                Home
              </Link>{' '}
              /{' '}
              <Link to="/compare" className="hover:text-blue-700">
                Compare
              </Link>{' '}
              / <span aria-current="page">{page.name}</span>
            </nav>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              ChurchGeniusPro <span className="gradient-text">vs {page.name}</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">{page.intro}</p>
            <p className="mt-3 text-sm text-slate-600">
              Last verified {page.verified} from official public sources.
            </p>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="pb-12">
        <div className="container-page">
          {/* Phones: one card per feature, both products visible side by side */}
          <ul
            className="space-y-3 sm:hidden"
            aria-label={`ChurchGeniusPro compared with ${page.name}`}
          >
            {page.rows.map((r) => (
              <li
                key={r.feature}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <p className="font-semibold text-slate-900">{r.feature}</p>
                <dl className="mt-3 grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-xl bg-slate-50 p-2">
                    <dt className="text-xs font-medium text-slate-600">ChurchGeniusPro</dt>
                    <dd className="mt-1.5">
                      <Cell value={r.cgp} />
                    </dd>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-2">
                    <dt className="text-xs font-medium text-slate-600">{page.name}</dt>
                    <dd className="mt-1.5">
                      <Cell value={r.them} />
                    </dd>
                  </div>
                </dl>
                <a
                  href={r.src}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-blue-700"
                >
                  {page.name} official page <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="relative mx-auto hidden max-w-4xl overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm sm:block">
            <table className="w-full min-w-[560px] text-sm">
              <caption className="sr-only">
                ChurchGeniusPro compared with {page.name}, verified {page.verified}
              </caption>
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-700">
                    Feature
                  </th>
                  <th scope="col" className="px-4 py-3 text-center font-semibold text-slate-900">
                    ChurchGeniusPro
                  </th>
                  <th scope="col" className="px-4 py-3 text-center font-semibold text-slate-700">
                    {page.name}
                  </th>
                  <th scope="col" className="px-4 py-3 text-center font-semibold text-slate-700">
                    Source
                  </th>
                </tr>
              </thead>
              <tbody>
                {page.rows.map((r) => (
                  <tr key={r.feature} className="border-t border-slate-100">
                    <th scope="row" className="px-4 py-3 text-left font-medium text-slate-800">
                      {r.feature}
                    </th>
                    <td className="px-4 py-3 text-center">
                      <Cell value={r.cgp} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Cell value={r.them} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <a
                        href={r.src}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-800"
                      >
                        Official page <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        <span className="sr-only">
                          for {r.feature} at {page.name} (opens in a new tab)
                        </span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mx-auto mt-6 max-w-4xl rounded-2xl border border-slate-100 bg-slate-50/60 p-5 text-xs leading-relaxed text-slate-600">
            <p>
              <span className="font-semibold text-emerald-700">✓</span> offered as a built-in
              feature (for ChurchGeniusPro, on at least one plan — see{' '}
              <Link to="/pricing" className="font-medium text-blue-600 hover:underline">
                Pricing
              </Link>
              ). <span className="font-semibold">—</span> not found as a built-in feature in the
              provider&rsquo;s official public website, pricing pages, and documentation as of the
              verified date; it may be available through integrations or may have changed since.{' '}
              <span className="font-semibold text-amber-700">Text notes</span> describe a partial
              form, a specific plan or product, an add-on, or the scope stated.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section bg-slate-50">
        <div className="container-page">
          <SectionHeading eyebrow="Pricing" title="How each one is priced" />
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="card">
              <h3 className="font-bold text-slate-900">ChurchGeniusPro</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{cgpPricingSummary}</p>
              <Link
                to="/pricing"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600"
              >
                See full pricing <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="card">
              <h3 className="font-bold text-slate-900">{page.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{page.pricing.text}</p>
              <a
                href={page.pricing.src}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-700"
              >
                Official pricing page <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Strengths both ways */}
      <section className="section">
        <div className="container-page">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Where {page.name} is stronger
              </h2>
              <ul className="mt-6 space-y-4">
                {page.theirStrengths.map((s) => (
                  <li key={s.text} className="text-slate-700">
                    {s.text}{' '}
                    <a
                      href={s.src}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="whitespace-nowrap text-sm font-medium text-blue-700 hover:text-blue-800"
                    >
                      Source<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Where ChurchGeniusPro differs
              </h2>
              <ul className="mt-6 space-y-4">
                {page.ourDifferences.map((d) => (
                  <li key={d} className="text-slate-700">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
            <div className="card">
              <h3 className="font-bold text-slate-900">{page.name} may suit you if…</h3>
              <p className="mt-2 text-slate-600">{page.chooseThem}</p>
            </div>
            <div className="card">
              <h3 className="font-bold text-slate-900">ChurchGeniusPro may suit you if…</h3>
              <p className="mt-2 text-slate-600">{page.chooseUs}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-slate-50">
        <div className="container-page">
          <SectionHeading eyebrow="Questions" title={`ChurchGeniusPro vs ${page.name}: FAQ`} />
          <div className="mt-12">
            <FAQAccordion items={page.faqs.map((f) => ({ ...f, category: page.name }))} />
          </div>
        </div>
      </section>

      {/* Other comparisons + disclaimer */}
      <section className="section">
        <div className="container-page">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl font-bold text-slate-900">More comparisons</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              <li>
                <Link to="/compare" className="btn-secondary !py-2">
                  All tools side by side
                </Link>
              </li>
              {others.map((o) => (
                <li key={o.slug}>
                  <Link to={`/compare/${o.slug}`} className="btn-secondary !py-2">
                    vs {o.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10 space-y-3 text-xs leading-relaxed text-slate-600">
              <p>
                <span className="font-semibold">About this comparison.</span> This page was prepared
                by ChurchGeniusPro and last verified on {page.verified}, based on information
                published on {page.name}&rsquo;s official website, pricing pages, and public
                documentation as of that date, linked beside each entry. Products change frequently,
                and features, plans, and prices may have been added, removed, or modified since our
                review. Please consult each provider&rsquo;s own website for the most current
                information before making a purchasing decision. If you believe anything on this
                page is inaccurate or out of date, please{' '}
                <Link to="/contact" className="font-medium text-blue-600 hover:underline">
                  contact us
                </Link>{' '}
                and we will review and correct it promptly.
              </p>
              <p>
                <span className="font-semibold">Trademarks.</span> {page.name} and all other
                third-party product names, brands, and trademarks referenced on this page are the
                property of their respective owners. They are used here only to identify the
                products being compared. Their use does not imply — and should not be interpreted as
                implying — any affiliation with, sponsorship of, partnership with, or endorsement of
                ChurchGeniusPro by those companies, or of those companies by ChurchGeniusPro. This
                page intentionally uses no third-party logos, screenshots, or other content.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
