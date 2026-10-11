import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, ExternalLink, Info } from 'lucide-react';
import CTASection from '../components/ui/CTASection';
import { guides, getGuide, guidesUpdatedLabel, type Guide } from '../data/guides';
import { SITE } from '../data/seo';
import NotFound from './NotFound';

/**
 * /guides (index) and /guides/<slug> (article). Prerendered like every other
 * marketing page; content lives in src/data/guides.ts.
 */

const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

function Breadcrumbs({ guide }: { guide?: Guide }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link to="/" className="hover:text-blue-700">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          {guide ? (
            <Link to="/guides" className="hover:text-blue-700">
              Guides
            </Link>
          ) : (
            <span aria-current="page">Guides</span>
          )}
        </li>
        {guide && (
          <>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-slate-900">
              {guide.h1}
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}

function GuidesIndex() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE}/guides` },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbLd) }}
      />
      <section className="pb-16 pt-32 md:pt-40">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <Breadcrumbs />
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Guides for <span className="gradient-text">church administrators</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Plain-English explanations of the rules and practices behind church administration —
              giving statements, fund accounting, and more — with every rule linked to its official
              source.
            </p>
          </div>
          <ul className="mx-auto mt-12 grid max-w-3xl gap-6">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link to={`/guides/${g.slug}`} className="card group block">
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-700">
                    {g.h1}
                  </h2>
                  <p className="mt-2 leading-relaxed text-slate-600">{g.summary}</p>
                  <span className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4" aria-hidden="true" /> {g.readingMinutes} min read
                    </span>
                    <span>Updated {formatDate(g.dateModified)}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-blue-600">
                      Read the guide <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTASection />
    </>
  );
}

function GuideArticle({ guide }: { guide: Guide }) {
  const url = `${SITE}/guides/${guide.slug}`;
  const articleLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: guide.h1,
        description: guide.metaDescription,
        datePublished: guide.datePublished,
        dateModified: guide.dateModified,
        mainEntityOfPage: url,
        image: `${SITE}/og-image.png`,
        author: { '@type': 'Organization', name: 'ChurchGeniusPro', url: `${SITE}/` },
        publisher: {
          '@type': 'Organization',
          name: 'ChurchGeniusPro',
          logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` },
        },
        citation: guide.sources.map((s) => s.url),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE}/guides` },
          { '@type': 'ListItem', position: 3, name: guide.h1, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleLd) }} />
      <article className="pb-20 pt-32 md:pt-40">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <Breadcrumbs guide={guide} />
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              {guide.h1}
            </h1>
            <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" aria-hidden="true" /> ChurchGeniusPro Guides
              </span>
              <span>
                Updated <time dateTime={guide.dateModified}>{formatDate(guide.dateModified)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" /> {guide.readingMinutes} min read
              </span>
            </p>
            <p className="mt-8 text-lg leading-relaxed text-slate-700">{guide.summary}</p>

            <div className="mt-8 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
              <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <p>
                General information based on the official sources listed below, reviewed{' '}
                {guidesUpdatedLabel}. It is not tax, legal, or accounting advice — rules change, so
                confirm your church’s situation with a qualified professional.
              </p>
            </div>

            {guide.sections.map((s) => (
              <section key={s.heading} className="mt-12">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)} className="mt-4 leading-relaxed text-slate-700">
                    {p}
                  </p>
                ))}
                {s.bullets && (
                  <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-slate-700 marker:text-blue-600">
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section className="mt-14 border-t border-slate-200 pt-8">
              <h2 className="text-xl font-bold text-slate-900">Sources</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {guide.sources.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-start gap-1.5 text-blue-700 hover:text-blue-800"
                    >
                      {s.name}
                      <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-12">
              <h2 className="text-xl font-bold text-slate-900">Related</h2>
              <ul className="mt-4 grid gap-4 sm:grid-cols-3">
                {guide.related.map((r) => (
                  <li key={r.to}>
                    <Link to={r.to} className="card group block h-full !p-5">
                      <span className="font-semibold text-slate-900 group-hover:text-blue-700">
                        {r.name}
                      </span>
                      <span className="mt-1 block text-sm text-slate-600">{r.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </article>
      <CTASection />
    </>
  );
}

export default function Guides({ slug }: { slug?: string }) {
  if (!slug) return <GuidesIndex />;
  const guide = getGuide(slug);
  return guide ? <GuideArticle guide={guide} /> : <NotFound />;
}
