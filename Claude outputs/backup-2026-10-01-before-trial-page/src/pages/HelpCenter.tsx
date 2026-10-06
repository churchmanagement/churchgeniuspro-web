import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Rocket,
  UserCog,
  HeartHandshake,
  Calculator,
  HandHelping,
  CircleUser,
  Baby,
  Bell,
  Settings,
  Lightbulb,
  BookOpen,
  Server,
  LifeBuoy,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeading, Reveal } from '../components/ui/Section';
import CTASection from '../components/ui/CTASection';
import { helpSections, type HelpSection } from '../data/helpContent';

const icons: Record<string, LucideIcon> = {
  rocket: Rocket,
  'user-cog': UserCog,
  'heart-handshake': HeartHandshake,
  calculator: Calculator,
  'hand-helping': HandHelping,
  'circle-user': CircleUser,
  baby: Baby,
  bell: Bell,
  settings: Settings,
  lightbulb: Lightbulb,
  'book-open': BookOpen,
  server: Server,
  'life-buoy': LifeBuoy,
};

interface SearchHit {
  section: HelpSection;
  articleId: string;
  articleTitle: string;
  snippet: string;
}

function useSearch(query: string): SearchHit[] {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const hits: SearchHit[] = [];
    for (const section of helpSections) {
      for (const article of section.articles) {
        const haystack = `${article.title}\n${article.body.join('\n')}`.toLowerCase();
        const idx = haystack.indexOf(q);
        if (idx === -1) continue;
        const text = article.body.join(' ');
        const at = text.toLowerCase().indexOf(q);
        const snippet =
          at === -1 ? text.slice(0, 140) : `…${text.slice(Math.max(0, at - 60), at + 90)}…`;
        hits.push({ section, articleId: article.id, articleTitle: article.title, snippet });
      }
    }
    return hits.slice(0, 20);
  }, [query]);
}

function Body({ body }: { body: string[] }) {
  const blocks: Array<{ type: 'p' | 'ul'; items: string[] }> = [];
  for (const line of body) {
    const isBullet = line.startsWith('• ');
    const last = blocks[blocks.length - 1];
    if (isBullet) {
      if (last?.type === 'ul') last.items.push(line.slice(2));
      else blocks.push({ type: 'ul', items: [line.slice(2)] });
    } else {
      blocks.push({ type: 'p', items: [line] });
    }
  }
  return (
    <>
      {blocks.map((b, i) =>
        b.type === 'p' ? (
          <p key={i} className="mt-3 leading-relaxed text-slate-600">
            {b.items[0]}
          </p>
        ) : (
          <ul key={i} className="mt-3 list-disc space-y-1.5 pl-5 text-slate-600">
            {b.items.map((item, j) => (
              <li key={j} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        )
      )}
    </>
  );
}

function SectionView({ section }: { section: HelpSection }) {
  const Icon = icons[section.icon] ?? BookOpen;
  const index = helpSections.findIndex((s) => s.id === section.id);
  const prev = helpSections[index - 1];
  const next = helpSections[index + 1];

  return (
    <>
      <section className="relative overflow-hidden pb-10 pt-32 md:pt-40">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-white to-white" aria-hidden="true" />
        <div className="container-page">
          <Link to="/help" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Help Center
          </Link>
          <div className="mt-6 flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/20">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{section.title}</h1>
              <p className="mt-2 max-w-2xl text-slate-600">{section.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page grid gap-10 lg:grid-cols-[260px_1fr]">
          {/* In-page nav */}
          <nav aria-label="Articles in this guide" className="top-28 hidden self-start lg:sticky lg:block">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">In this guide</h2>
            <ul className="mt-3 space-y-1 border-l border-slate-200">
              {section.articles.map((a) => (
                <li key={a.id}>
                  <a
                    href={`#${a.id}`}
                    className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-slate-600 transition hover:border-blue-600 hover:text-blue-600"
                  >
                    {a.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Articles */}
          <div className="min-w-0">
            {section.articles.map((a) => (
              <article key={a.id} id={a.id} className="scroll-mt-28 border-b border-slate-100 py-8 first:pt-0 last:border-0">
                <h2 className="text-xl font-bold text-slate-900">{a.title}</h2>
                <Body body={a.body} />
              </article>
            ))}

            {/* Prev / next */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-between">
              {prev ? (
                <Link to={`/help/${prev.id}`} className="btn-secondary">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {prev.title}
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link to={`/help/${next.id}`} className="btn-secondary">
                  {next.title} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function HelpCenter() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const [query, setQuery] = useState('');
  const hits = useSearch(query);

  const section = sectionId ? helpSections.find((s) => s.id === sectionId) : undefined;
  if (sectionId && section) return <SectionView section={section} />;

  return (
    <>
      {/* Hero + search */}
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
              Help Center
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Everything explained, <span className="gradient-text">step by step</span>
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              The complete ChurchGeniusPro documentation — user guides, tutorials, and feature
              explanations for every role in your church.
            </p>
            <div className="relative mx-auto mt-8 max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the docs, e.g. “check-in”, “pledge”, “Stripe”…"
                className="input !py-4 !pl-12 shadow-lg shadow-slate-900/5"
                aria-label="Search documentation"
              />
            </div>
          </motion.div>

          {/* Search results */}
          {query.trim().length >= 2 && (
            <div className="mx-auto mt-8 max-w-2xl">
              {hits.length > 0 ? (
                <ul className="space-y-3">
                  {hits.map((h) => (
                    <li key={`${h.section.id}-${h.articleId}`}>
                      <Link
                        to={`/help/${h.section.id}#${h.articleId}`}
                        className="card block !p-5 transition hover:border-blue-300"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">{h.section.title}</p>
                        <h3 className="mt-1 font-bold text-slate-900">{h.articleTitle}</h3>
                        <p className="mt-1 text-sm text-slate-500">{h.snippet}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-slate-500">
                  No results for “{query}”. Try a different term, or{' '}
                  <Link to="/contact" className="font-semibold text-blue-600 hover:text-blue-700">
                    contact us
                  </Link>
                  .
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Section cards */}
      <section className="pb-20">
        <div className="container-page">
          <SectionHeading eyebrow="Browse the guides" title="Pick your role, find your answer" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {helpSections.map((s, i) => {
              const Icon = icons[s.icon] ?? BookOpen;
              return (
                <Reveal key={s.id} delay={(i % 3) * 0.08}>
                  <Link to={`/help/${s.id}`} className="card group block h-full">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/20 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-slate-900">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                      {s.articles.length} article{s.articles.length === 1 ? '' : 's'}
                      <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
