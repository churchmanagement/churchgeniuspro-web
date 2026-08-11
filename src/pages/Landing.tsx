import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { SectionHeading, Reveal } from '../components/ui/Section';
import CTASection from '../components/ui/CTASection';
import FAQAccordion from '../components/ui/FAQAccordion';
import { getLandingPage, type LandingSlug, type LandingSection } from '../data/landing';
import { screenshots, screenshotSrc, screenshotSrcSet, type Screenshot } from '../data/screens';
import { pricingPlans } from '../data/content';
import { SITE } from '../data/seo';

const screenshotBySlug = new Map(screenshots.map((s) => [s.slug, s]));

function ScreenshotFigure({ shot }: { shot: Screenshot }) {
  const largest = shot.sizes[shot.sizes.length - 1];
  return (
    <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-xl shadow-slate-900/10">
      <div className="flex items-center gap-1.5 border-b border-slate-700/60 bg-slate-800 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden="true" />
        <span className="ml-3 truncate text-xs text-slate-400">{shot.title} — ChurchGeniusPro</span>
      </div>
      <img
        src={screenshotSrc(shot)}
        srcSet={screenshotSrcSet(shot)}
        sizes="(min-width: 1024px) 560px, 92vw"
        width={largest.w}
        height={largest.h}
        alt={`ChurchGeniusPro screenshot — ${shot.title}: ${shot.caption}`}
        loading="lazy"
        className="w-full bg-white"
      />
      <figcaption className="sr-only">{shot.caption}</figcaption>
    </figure>
  );
}

function ContentSection({ section, index }: { section: LandingSection; index: number }) {
  const shot = section.screenshotSlug ? screenshotBySlug.get(section.screenshotSlug) : undefined;
  const flip = index % 2 === 1;
  return (
    <section className={`section ${index % 2 === 1 ? 'bg-slate-50' : ''}`}>
      <div className="container-page">
        <div
          className={
            shot
              ? 'grid items-center gap-10 lg:grid-cols-2 lg:gap-16'
              : 'mx-auto max-w-3xl'
          }
        >
          <Reveal className={shot && flip ? 'lg:order-2' : undefined}>
            {section.eyebrow && (
              <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600">
                {section.eyebrow}
              </span>
            )}
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {section.title}
            </h2>
            {section.body.map((p) => (
              <p key={p.slice(0, 40)} className="mt-4 text-lg leading-relaxed text-slate-600">
                {p}
              </p>
            ))}
          </Reveal>
          {shot && (
            <Reveal delay={0.1} className={flip ? 'lg:order-1' : undefined}>
              <ScreenshotFigure shot={shot} />
            </Reveal>
          )}
        </div>

        {section.bullets && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {section.bullets.map((b, i) => (
              <Reveal key={b.title} delay={(i % 3) * 0.08}>
                <div className="card h-full">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-bold text-slate-900">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function PricingTeaser() {
  return (
    <section className="section bg-slate-950">
      <div className="container-page">
        <SectionHeading
          eyebrow="Simple pricing"
          title="Start free. Upgrade when you grow."
          subtitle="Every paid plan includes a 1-month free trial and free migration support."
          dark
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pricingPlans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.08}>
              <div
                className={`h-full rounded-2xl border p-6 ${
                  plan.highlighted
                    ? 'border-blue-500/60 bg-slate-900 shadow-lg shadow-blue-600/20'
                    : 'border-slate-800 bg-slate-900/60'
                }`}
              >
                <h3 className="font-bold text-white">{plan.name}</h3>
                <p className="mt-2 text-3xl font-extrabold text-white">
                  {plan.price}
                  <span className="text-sm font-medium text-slate-400">/{plan.period}</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{plan.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link to="/pricing" className="btn-primary !px-8 !py-4 !text-base">
            See Full Pricing <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default function Landing({ slug }: { slug: LandingSlug }) {
  const page = getLandingPage(slug);

  const faqJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE}/${page.slug}#faq`,
    mainEntity: page.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }).replace(/</g, '\\u003c');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />

      {/* Page hero */}
      <section className="relative overflow-hidden pb-16 pt-32 md:pt-40">
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-white to-white"
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
              {page.eyebrow}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              {page.h1} <span className="gradient-text">{page.h1Gradient}</span>
            </h1>
            {page.intro.map((p) => (
              <p key={p.slice(0, 40)} className="mt-5 text-lg leading-relaxed text-slate-600">
                {p}
              </p>
            ))}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/signup" className="btn-primary">
                Start Free <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/pricing" className="btn-secondary">
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content sections */}
      {page.sections.map((s, i) => (
        <ContentSection key={s.title} section={s} index={i} />
      ))}

      {/* Pricing teaser */}
      {page.showPricingTeaser && <PricingTeaser />}

      {/* FAQs */}
      <section className={`section ${page.sections.length % 2 === 1 ? 'bg-slate-50' : ''}`}>
        <div className="container-page">
          <SectionHeading
            eyebrow="Questions"
            title="Frequently asked questions"
          />
          <div className="mt-12">
            <FAQAccordion items={page.faqs.map((f) => ({ ...f, category: 'General' }))} />
          </div>
        </div>
      </section>

      {/* Related pages */}
      <section className="section bg-slate-50">
        <div className="container-page">
          <SectionHeading
            eyebrow="Keep exploring"
            title="Related pages"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.related.map((r, i) => (
              <Reveal key={r.to + r.name} delay={(i % 4) * 0.06}>
                <Link to={r.to} className="card group block h-full">
                  <h3 className="font-bold text-slate-900 transition group-hover:text-blue-600">
                    {r.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{r.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                    Learn more{' '}
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
