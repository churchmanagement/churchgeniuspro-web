import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionHeading, Reveal } from '../components/ui/Section';
import CTASection from '../components/ui/CTASection';
import { featureCategories } from '../data/features';

export default function Features() {
  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden pb-16 pt-32 md:pt-40">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-50 via-white to-white" aria-hidden="true" />
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-block rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600">
              Features
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Every tool your church needs.{' '}
              <span className="gradient-text">In one place.</span>
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              ChurchGeniusPro combines member management, accounting, AI, communication, events,
              ministries, security, and reporting into one integrated system.
            </p>
          </motion.div>

          {/* Category quick nav */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10 flex flex-wrap justify-center gap-2"
            aria-label="Feature categories"
          >
            {featureCategories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-blue-300 hover:text-blue-600"
              >
                <cat.icon className="h-3.5 w-3.5" aria-hidden="true" />
                {cat.name}
              </a>
            ))}
          </motion.nav>
        </div>
      </section>

      {/* Categories */}
      {featureCategories.map((cat, ci) => (
        <section
          key={cat.id}
          id={cat.id}
          className={`section scroll-mt-24 ${ci % 2 === 1 ? 'bg-slate-50' : ''}`}
        >
          <div className="container-page">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <span
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.gradient} text-white shadow-lg`}
                >
                  <cat.icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-blue-600">
                  {cat.tagline}
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  {cat.name}
                </h2>
                <p className="mt-4 text-lg text-slate-600">{cat.description}</p>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cat.features.map((f, i) => (
                <Reveal key={f.title} delay={(i % 3) * 0.08}>
                  <div className="card group h-full">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${cat.gradient} text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <f.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-bold text-slate-900">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* It all works together */}
      <section className="section bg-slate-950">
        <div className="container-page">
          <SectionHeading
            eyebrow="And it all works together"
            title="One login. One connected system."
            subtitle="No re-typing between tools. Each member profile becomes the single source of truth that giving, attendance, events, and accounting connect to automatically."
            dark
          />
          <Reveal className="mt-10 text-center">
            <Link
              to="/signup"
              className="btn-primary !px-8 !py-4 !text-base"
            >
              Start Free Trial <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
