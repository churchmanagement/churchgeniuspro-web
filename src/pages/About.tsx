import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CalendarCheck,
  Church,
  Code2,
  Compass,
  Eye,
  HandCoins,
  HandHeart,
  Heart,
  Layers,
  Lightbulb,
  LockKeyhole,
  Mail,
  MessageCircle,
  PlayCircle,
  Quote,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wallet,
} from 'lucide-react';
import type { ComponentType } from 'react';
import { SectionHeading, Reveal } from '../components/ui/Section';
import { SITE } from '../data/seo';

/*
 * Our Story — founder biography and the "why" behind ChurchGeniusPro.
 * Route: /about (linked as "Our Story" in the navbar and footer).
 * Founder photo: public/images/anson-mathew-founder-{320,640}.webp (+ 640.jpg fallback).
 */

type Icon = ComponentType<{ className?: string }>;

const FOUNDER_NAME = 'Anson Mathew';
const FOUNDER_TITLE = 'Founder & CEO, ChurchGenius LLC';

const roles: { icon: Icon; label: string }[] = [
  { icon: Code2, label: 'Software Developer' },
  { icon: Layers, label: 'Software Architect' },
  { icon: Compass, label: 'Technical Lead / Project Leader' },
  { icon: Briefcase, label: 'Project Manager' },
];

const churchNeeds: { icon: Icon; label: string }[] = [
  { icon: Users, label: 'Members and families' },
  { icon: CalendarCheck, label: 'Attendance and groups' },
  { icon: Wallet, label: 'Income, expenses and accounting' },
  { icon: HandCoins, label: 'Donations and pledges' },
  { icon: Church, label: 'Events and registrations' },
  { icon: Mail, label: 'Communication and follow-ups' },
];

const principles = [
  'Bring the essential parts of church administration together in one application.',
  'Stay affordable, even for small churches with limited budgets.',
  'Be simple enough for anyone to use, whatever their technical background.',
  'Reduce the need for several separate software subscriptions.',
  'Give leaders and volunteers more time for ministry and people.',
];

const stack = [
  'React for a modern, responsive user interface',
  'Java & Spring Boot for the application backend',
  'PostgreSQL for the database',
  'Microsoft Azure cloud infrastructure',
  'Secure sign-in with role-based access control',
  'Encryption and data-protection practices throughout',
];

const verses = [
  {
    ref: 'Colossians 3:23',
    text: 'Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.',
    note: 'Our skills and our work can honor God, including the quiet work of building good tools.',
  },
  {
    ref: '1 Peter 4:10',
    text: 'Each of you should use whatever gift you have received to serve others, as faithful stewards of God’s grace in its various forms.',
    note: 'Professional gifts are meant to serve others. This verse is at the heart of why ChurchGeniusPro exists.',
  },
  {
    ref: '1 Corinthians 10:31',
    text: 'So whether you eat or drink or whatever you do, do it all for the glory of God.',
    note: 'Even church administration, done well, can bring glory to God.',
  },
];

const aboutJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Our Story — ChurchGeniusPro',
  url: `${SITE}/about`,
  mainEntity: {
    '@type': 'Person',
    name: FOUNDER_NAME,
    jobTitle: 'Founder & CEO',
    image: `${SITE}/images/anson-mathew-founder-640.jpg`,
    worksFor: { '@type': 'Organization', name: 'ChurchGenius LLC', url: SITE },
    address: { '@type': 'PostalAddress', addressLocality: 'Olathe', addressRegion: 'KS', addressCountry: 'US' },
  },
});

function FounderPhoto({ className = '' }: { className?: string }) {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet="/images/anson-mathew-founder-320.webp 320w, /images/anson-mathew-founder-640.webp 640w"
        sizes="(min-width: 1024px) 320px, 240px"
      />
      <img
        src="/images/anson-mathew-founder-640.jpg"
        width={640}
        height={640}
        alt={`${FOUNDER_NAME}, founder and CEO of ChurchGenius LLC`}
        className={className}
        decoding="async"
      />
    </picture>
  );
}

export default function About() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: aboutJsonLd }} />

      {/* 1. Hero */}
      <section className="relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-white to-white" aria-hidden="true" />
        <div
          className="absolute -right-32 top-24 -z-10 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(233,162,59,0.18), transparent)' }}
          aria-hidden="true"
        />
        <div className="container-page">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="inline-block rounded-full bg-gradient-to-r from-brand-600/10 to-plum-600/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-600">
              Our Story
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:leading-[1.1]">
              Built with Faith, <span className="gradient-text">Passion &amp; Purpose</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              ChurchGeniusPro began with a simple question asked while serving in a local church: why can’t
              church management be complete, affordable and easy for everyone to use?
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Founder introduction */}
      <section aria-labelledby="founder" className="pb-20">
        <div className="container-page">
          <Reveal className="mx-auto grid max-w-5xl items-center gap-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-brand-950/5 sm:p-10 lg:grid-cols-[320px_1fr]">
            <div className="mx-auto w-60 sm:w-72 lg:w-80">
              <div className="relative">
                <div
                  className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-brand-500/30 via-plum-500/20 to-gold-400/30 blur-md"
                  aria-hidden="true"
                />
                <FounderPhoto className="relative aspect-square w-full rounded-[1.75rem] object-cover shadow-lg ring-4 ring-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Meet the founder</p>
              <h2 id="founder" className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {FOUNDER_NAME}
              </h2>
              <p className="mt-1 text-lg font-medium text-slate-500">{FOUNDER_TITLE}</p>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                <p>
                  I’m a software engineer who has spent more than 20 years turning ideas into working software,
                  and a church member who has served his local congregation in Kansas since 2013, including as
                  church treasurer.
                </p>
                <p>
                  ChurchGeniusPro is where those two parts of my life meet. It grew out of real needs I saw in
                  our own church, and out of a desire to use the skills God has given me to serve His church.
                </p>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {['20+ years in software', 'Former church treasurer', 'Olathe, Kansas'].map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Professional journey */}
      <section aria-labelledby="journey" className="bg-slate-50 py-20">
        <div className="container-page">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <span className="eyebrow mb-4">A lifelong passion</span>
              <h2 id="journey" className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Two decades of building software
              </h2>
              <div className="mt-5 space-y-4 leading-relaxed text-slate-600">
                <p>
                  I graduated in Computer Science and Engineering in 2005 and have worked as a software engineer
                  ever since, with several companies and in several roles. Many of the projects I’ve worked on
                  started from nothing but an idea, and went through requirements, architecture, development and
                  delivery.
                </p>
                <p>
                  Software has always been more than a job to me. Outside work I keep exploring new technologies
                  and building things, and I’ve especially enjoyed mentoring junior engineers as they learn and
                  grow.
                </p>
                <p>
                  Along the way I learned that technology shouldn’t just be powerful. It should be practical,
                  reliable, secure and easy for people to use.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {roles.map((r) => (
                  <li
                    key={r.label}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                      <r.icon className="h-5 w-5" />
                    </span>
                    <span className="font-semibold text-slate-800">{r.label}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-500">Roles held over a 20+ year career in software engineering.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. Church journey & the question */}
      <section aria-labelledby="church" className="py-20">
        <div className="container-page">
          <div className="mx-auto max-w-5xl">
            <Reveal className="mx-auto max-w-3xl text-center">
              <span className="eyebrow mb-4">Serving the local church</span>
              <h2 id="church" className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Seeing church administration from the inside
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                When I moved to Kansas in 2013, I became one of the first members of Kansas City Christian
                Fellowship, which later became Sharon Fellowship Church of Kansas. Over the years I’ve been
                involved in many areas of church life and had the privilege of serving as church treasurer.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Serving behind the scenes, I saw how much a church has to keep track of every week:
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {churchNeeds.map((n) => (
                  <li
                    key={n.label}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <n.icon className="h-5 w-5 shrink-0 text-plum-600" />
                    <span className="font-medium text-slate-700">{n.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="mx-auto mt-10 max-w-3xl space-y-4 text-lg leading-relaxed text-slate-600">
              <p>
                Many churches handle these with several different applications, and often still find it hard to
                keep everything connected. Some tools are costly for a small congregation; others assume IT or
                accounting expertise that volunteers don’t always have.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mx-auto mt-10 max-w-3xl">
              <figure className="relative rounded-3xl bg-gradient-to-br from-brand-700 to-plum-800 p-8 text-center text-white shadow-xl sm:p-10">
                <Lightbulb className="mx-auto h-8 w-8 text-gold-300" aria-hidden="true" />
                <blockquote className="mt-4 text-xl font-semibold leading-snug sm:text-2xl">
                  “Why can’t we have one complete church management system that is affordable, powerful, and
                  simple enough for everyone to use?”
                </blockquote>
                <figcaption className="mt-4 text-sm text-white/70">The question that started it all</figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. Inspiration & how it started */}
      <section aria-labelledby="inspiration" className="bg-slate-50 py-20">
        <div className="container-page">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
            <Reveal>
              <span className="eyebrow mb-4">The inspiration</span>
              <h2 id="inspiration" className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Not just another app, but a real help
              </h2>
              <p className="mt-5 leading-relaxed text-slate-600">
                That question became a personal calling. I wanted to give my experience and my spare time to
                something meaningful: a platform that genuinely makes church administration easier. From the
                start, ChurchGeniusPro was guided by a few simple goals:
              </p>
              <ul className="mt-5 space-y-3">
                {principles.map((p) => (
                  <li key={p} className="flex gap-3 text-slate-700">
                    <Heart className="mt-1 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-brand-950/5">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-100 text-gold-700">
                  <MessageCircle className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-slate-900">As easy as having a conversation</h3>
                <p className="mt-3 leading-relaxed text-slate-600">
                  Not everyone is comfortable typing, finding their way through complicated menus or learning
                  new software, including many older members and volunteers who serve faithfully every week.
                </p>
                <p className="mt-3 leading-relaxed text-slate-600">
                  That’s why we built <strong className="text-slate-800">Genius Assistant</strong>: you can type,
                  speak or simply have a conversation in everyday language to get routine tasks done, and nothing
                  is saved until you confirm it.
                </p>
                <p className="mt-5 rounded-2xl bg-brand-50 px-5 py-4 font-semibold text-brand-800">
                  Technology should adapt to people, not force people to adapt to technology.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. From idea to company */}
      <section aria-labelledby="company" className="py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl">
            <SectionHeading eyebrow="From an idea to a company" title="How ChurchGeniusPro came to be" />
            <ol className="relative mt-10 space-y-8 border-l-2 border-brand-100 pl-8">
              {[
                {
                  title: 'A need in our own church',
                  body: 'It began as an effort to solve the everyday challenges we faced in our own congregation.',
                },
                {
                  title: 'Friends with a shared heart',
                  body: 'As the vision grew, I worked with friends who share a similar professional background and an understanding of church life. Together we formed ChurchGenius LLC, with one mission: make modern church management technology accessible and affordable for churches of every size.',
                },
                {
                  title: 'Planning, building, testing',
                  body: 'Through careful planning, development, testing and many rounds of refinement, the separate pieces of church administration came together in one platform.',
                },
                {
                  title: 'Live and growing',
                  body: 'Today ChurchGeniusPro is live and serving churches. We keep improving it based on what churches tell us they need.',
                },
              ].map((step, i) => (
                <li key={step.title} className="relative">
                  <span className="absolute -left-[2.85rem] grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-plum-700 text-sm font-bold text-white shadow">
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-1 leading-relaxed text-slate-600">{step.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* 7. Security & technology */}
      <section aria-labelledby="trust" className="bg-slate-900 py-20 text-white">
        <div className="container-page">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <span className="eyebrow mb-4 !border-white/15 !bg-white/10 !text-gold-300">
                No compromise on trust
              </span>
              <h2 id="trust" className="text-3xl font-bold tracking-tight sm:text-4xl">
                Simple to use. Carefully engineered.
              </h2>
              <p className="mt-5 leading-relaxed text-slate-300">
                Member records, family details, children’s information and giving history are personal and
                sensitive. From the beginning, I decided we would not cut corners on security, sign-in or data
                protection to save on development costs.
              </p>
              <p className="mt-4 leading-relaxed text-slate-300">
                Our goal is to pair simplicity with the engineering practices I’ve relied on throughout my
                career. Churches trust us with important information, and we take that responsibility seriously.
              </p>
              <Link
                to="/security"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-gold-300 hover:text-gold-200"
              >
                Read about our security &amp; technology <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="space-y-3">
                {stack.map((s, i) => (
                  <li key={s} className="flex items-center gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                    {i < 4 ? (
                      <ShieldCheck className="h-5 w-5 shrink-0 text-gold-300" aria-hidden="true" />
                    ) : (
                      <LockKeyhole className="h-5 w-5 shrink-0 text-gold-300" aria-hidden="true" />
                    )}
                    <span className="text-slate-100">{s}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 8. Mission, vision, philosophy */}
      <section aria-label="Our mission, vision and philosophy" className="py-20">
        <div className="container-page">
          <SectionHeading eyebrow="What drives us" title="Our mission & vision" />
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {[
              {
                icon: Target,
                title: 'Our Mission',
                body: 'To empower churches with simple, affordable, secure and intelligent technology that makes church administration easier, so leaders and volunteers can focus more on ministry and serving people.',
              },
              {
                icon: Eye,
                title: 'Our Vision',
                body: 'To make modern church management technology accessible to every church, whatever its size, budget or technical expertise. A small church with limited resources deserves the same quality of tools as a large one.',
              },
              {
                icon: Sparkles,
                title: 'Our Philosophy',
                body: 'Technology should simplify ministry, not complicate it.',
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-brand-950/5">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-plum-700 text-white">
                    <c.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-slate-900">{c.title}</h3>
                  <p className={`mt-3 leading-relaxed ${i === 2 ? 'text-lg font-semibold text-brand-800' : 'text-slate-600'}`}>
                    {c.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Scripture */}
      <section aria-labelledby="scripture" className="bg-gradient-to-b from-gold-50/60 to-white py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <BookOpen className="mx-auto h-8 w-8 text-gold-600" aria-hidden="true" />
            <h2 id="scripture" className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              The verses behind our work
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              A few passages that shape why, and how, we build ChurchGeniusPro.
            </p>
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {verses.map((v, i) => (
              <Reveal key={v.ref} delay={i * 0.08}>
                <figure className="flex h-full flex-col rounded-3xl border border-gold-200 bg-white p-7 shadow-sm">
                  <Quote className="h-6 w-6 text-gold-500" aria-hidden="true" />
                  <blockquote className="mt-3 flex-1 font-serif text-lg italic leading-relaxed text-slate-800">
                    “{v.text}”
                  </blockquote>
                  <figcaption className="mt-4">
                    <cite className="not-italic font-bold text-brand-700">{v.ref}</cite>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{v.note}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-slate-400">Scripture quotations are from the NIV.</p>
        </div>
      </section>

      {/* 10. Invitation */}
      <section aria-labelledby="invitation" className="pb-24 pt-4">
        <div className="container-page">
          <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-plum-900 px-6 py-14 text-center text-white shadow-2xl sm:px-12">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold-400/20 blur-3xl"
              aria-hidden="true"
            />
            <HandHeart className="relative mx-auto h-10 w-10 text-gold-300" aria-hidden="true" />
            <h2 id="invitation" className="relative mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Built for your church, too
            </h2>
            <p className="relative mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
              What began as an effort to help our own church is now available to churches everywhere. We’d be
              honored to serve yours. Explore ChurchGeniusPro, try Genius Assistant, and tell us what would make
              your week easier.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-brand-800 shadow-lg transition hover:bg-gold-50"
              >
                Start Your 2-Month Free Trial <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/#genius-assistant"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" /> Meet Genius Assistant
              </Link>
              <Link
                to="/demo"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                <PlayCircle className="h-4 w-4" aria-hidden="true" /> Watch Demo
              </Link>
            </div>
            <p className="relative mt-6 text-sm text-white/60">
              Questions? Email{' '}
              <a href="mailto:support@churchgeniuspro.com" className="underline hover:text-white">
                support@churchgeniuspro.com
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
