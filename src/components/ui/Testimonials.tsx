import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, CalendarCheck, Gift, Quote, Wrench } from 'lucide-react';
import { testimonials } from '../../data/content';
import { SectionHeading, Reveal } from './Section';

/**
 * Homepage trust section.
 *
 * Shows real customer quotes when `testimonials` (data/content.ts) has entries.
 * Until then it shows verifiable facts about the offer instead — never invented
 * quotes, names, ratings, or customer counts.
 */

const facts = [
  {
    icon: Gift,
    title: 'A free plan that stays free',
    description:
      'Up to 50 people, attendance, groups, event registration, and 20 gifts a month at $0 — free forever, no credit card.',
  },
  {
    icon: CalendarCheck,
    title: '2 months of every feature',
    description:
      'Try the full Pro plan — accounting, payroll, and the AI assistant — free for two months. No credit card required.',
  },
  {
    icon: Wrench,
    title: 'Free application setup',
    description:
      'We help you get your church set up at no cost, so you are not left figuring it out alone.',
  },
  {
    icon: Calculator,
    title: 'Accounting included, not added on',
    description:
      'Bank imports and sync, pledges, and reports on Standard; payroll and AI-assisted accounting on Pro.',
  },
];

function CustomerQuotes() {
  return (
    <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {testimonials.map((t, i) => (
        <Reveal key={t.name} delay={i * 0.08}>
          <figure className="card flex h-full flex-col">
            <Quote className="h-8 w-8 text-blue-600/20" aria-hidden="true" />
            <blockquote className="mt-4 flex-1 text-slate-600">“{t.quote}”</blockquote>
            <figcaption className="mt-6 border-t border-slate-100 pt-4">
              <p className="font-semibold text-slate-900">{t.name}</p>
              <p className="text-sm text-slate-500">
                {t.role} · {t.church}
              </p>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}

function OfferFacts() {
  return (
    <>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.08}>
            <div className="card h-full">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/10 to-purple-600/10">
                <f.icon className="h-5 w-5 text-blue-600" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link to="/signup" className="btn-primary">
          Start 2-Month Free Trial <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link to="/pricing" className="btn-secondary">
          See plans &amp; limits
        </Link>
      </Reveal>
      <p className="mt-6 text-center text-sm text-slate-600">
        Already using ChurchGeniusPro?{' '}
        <Link to="/contact" className="font-semibold text-blue-700 hover:text-blue-800">
          We would love to hear your story.
        </Link>
      </p>
    </>
  );
}

export default function Testimonials() {
  const hasQuotes = testimonials.length > 0;
  return (
    <section className="section bg-gradient-to-b from-white to-slate-50">
      <div className="container-page">
        {hasQuotes ? (
          <SectionHeading
            eyebrow="From our churches"
            title="What church leaders say"
            subtitle="In their own words, shared with permission."
          />
        ) : (
          <SectionHeading
            eyebrow="Built for churches like yours"
            title="Start small. Grow without switching."
            subtitle="No credit card and no setup fee — see for yourself whether ChurchGeniusPro fits your church."
          />
        )}
        {hasQuotes ? <CustomerQuotes /> : <OfferFacts />}
      </div>
    </section>
  );
}
