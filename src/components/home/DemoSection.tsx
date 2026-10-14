import { Link } from 'react-router-dom';
import { ArrowRight, Clock3, Film, Lock, PlayCircle } from 'lucide-react';
import { SectionHeading, Reveal } from '../ui/Section';
import { demoLibrary, demoTour } from '../../data/videos';

const strip = demoLibrary.slice(0, 6);

/**
 * Home-page "Watch Demo" section. A teaser only: the poster of the 5-minute
 * tour and a strip of feature demos, every one of which leads to /demo, where
 * a visitor signs in or registers once and then watches everything in place.
 */
export default function DemoSection() {
  return (
    <section id="product-tour" className="section scroll-mt-20 relative overflow-hidden bg-slate-950 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(60% 50% at 20% 10%, rgba(37,99,235,0.45), transparent 60%), radial-gradient(50% 45% at 85% 90%, rgba(147,51,234,0.4), transparent 60%)',
        }}
        aria-hidden="true"
      />
      <div className="container-page relative">
        <SectionHeading
          eyebrow="Watch Demo"
          title="See ChurchGeniusPro in action"
          subtitle="A 5-minute tour of the whole application, plus short demos of every major feature — real screens, real workflows, no slideware."
          dark
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          {/* Tour poster */}
          <Reveal>
            <Link
              to="/demo"
              className="group relative block overflow-hidden rounded-3xl bg-black shadow-2xl shadow-black/50 ring-1 ring-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              aria-label="Watch the 5-minute ChurchGeniusPro tour (sign in or register first)"
            >
              <img
                src={`https://i.ytimg.com/vi/${demoTour.id}/hqdefault.jpg`}
                srcSet={`https://i.ytimg.com/vi/${demoTour.id}/mqdefault.jpg 320w, https://i.ytimg.com/vi/${demoTour.id}/hqdefault.jpg 480w, https://i.ytimg.com/vi/${demoTour.id}/maxresdefault.jpg 1280w`}
                sizes="(min-width: 1024px) 55vw, 100vw"
                alt=""
                width={480}
                height={360}
                loading="lazy"
                decoding="async"
                className="aspect-video h-auto w-full object-cover opacity-80 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" aria-hidden="true" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/15 backdrop-blur ring-1 ring-white/40 transition group-hover:scale-110 group-hover:bg-white/25">
                  <PlayCircle className="h-11 w-11 text-white drop-shadow-lg" aria-hidden="true" />
                </span>
              </span>
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold backdrop-blur">
                <Clock3 className="h-3.5 w-3.5 text-blue-300" aria-hidden="true" /> 5-minute tour
              </span>
              <span className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <span className="block text-lg font-bold leading-snug sm:text-xl">{demoTour.title}</span>
                <span className="mt-1 block text-sm text-slate-300">{demoTour.description}</span>
              </span>
            </Link>
          </Reveal>

          {/* Pitch + CTA */}
          <Reveal delay={0.1}>
            <ul className="space-y-4">
              {[
                { icon: Clock3, title: 'Five minutes, the whole app', text: 'Members, families, groups, giving, accounting, events and the AI assistant.' },
                { icon: Film, title: `${demoLibrary.length} more feature demos`, text: 'Short videos grouped by topic — watch just the parts your church needs.' },
                { icon: Lock, title: 'One quick sign-in', text: 'Continue with Google or register with your email. No password, no credit card.' },
              ].map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-blue-300 ring-1 ring-white/10">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="mt-0.5 text-sm text-slate-400">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/demo" className="btn-primary !px-8 !py-4 !text-base">
                <PlayCircle className="h-5 w-5" aria-hidden="true" /> Watch Demo
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Start 2-Month Free Trial <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Feature-demo strip */}
        <Reveal className="mt-14">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {strip.map((v) => (
              <Link
                key={v.id}
                to="/demo"
                className="group overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 transition hover:-translate-y-1 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                aria-label={`${v.title} demo — opens the demo page`}
              >
                <span className="relative block aspect-video overflow-hidden bg-black">
                  <img
                    src={`https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`}
                    alt=""
                    width={320}
                    height={180}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover opacity-70 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle className="h-8 w-8 text-white/90 drop-shadow" aria-hidden="true" />
                  </span>
                </span>
                <span className="block px-3 py-2.5">
                  <span className="block text-[11px] font-semibold uppercase tracking-wide text-blue-300">{v.category}</span>
                  <span className="block truncate text-sm font-semibold text-white">{v.title}</span>
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-slate-400">
            {demoLibrary.length + 1} videos in all —{' '}
            <Link to="/demo" className="font-semibold text-blue-300 hover:text-white">
              open the demo library <ArrowRight className="inline h-4 w-4" aria-hidden="true" />
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
