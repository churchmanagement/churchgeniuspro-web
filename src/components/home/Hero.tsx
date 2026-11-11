import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, Sparkles, Camera, Check } from 'lucide-react';
import { dashboardShot, screenshotSrc, screenshotSrcSet } from '../../data/screens';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-44">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-white to-white"
        aria-hidden="true"
      />
      <div
        className="absolute -top-48 left-1/2 -z-10 h-[640px] w-[1100px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(164,85,124,0.45), rgba(233,162,59,0.18), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="container-page">
        <motion.div
          initial={false}
          animate="show"
          transition={{ staggerChildren: 0.12 }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
            <a
              href="#genius-assistant"
              className="group inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/90 py-1.5 pl-1.5 pr-4 text-xs font-semibold text-brand-800 shadow-sm backdrop-blur transition hover:border-brand-400"
            >
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-br from-brand-600 to-plum-600 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
                <Sparkles className="h-3 w-3 text-gold-300" aria-hidden="true" /> New
              </span>
              Meet Genius Assistant — type, speak, or converse
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl md:text-6xl"
          >
            The All-in-One <span className="gradient-text">Church Management Software</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mx-auto mt-5 text-xl font-bold tracking-tight md:text-2xl"
          >
            <span className="gradient-text">Be a leader, not just a worker</span>
            <span className="text-slate-900"> — ChurchGeniusPro.</span>
          </motion.p>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl"
          >
            ChurchGeniusPro brings membership, attendance, giving, accounting and payroll, events,
            and ministries into one connected system — with a built-in AI assistant that lets you
            talk, snap a photo, or type a single word instead of filling out forms.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link to="/signup" className="btn-primary !px-8 !py-4 !text-base">
              Start 2-Month Free Trial <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/demo" className="btn-secondary !px-8 !py-4 !text-base">
              <PlayCircle className="h-5 w-5 text-brand-600" aria-hidden="true" /> Watch Demo
            </Link>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500"
          >
            {[
              'Free version available',
              '2-month free trial',
              'Free setup & migration',
              '30-day money-back guarantee',
              'No credit card required',
            ].map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-500" aria-hidden="true" /> {item}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Real dashboard screenshot */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mx-auto mt-16 max-w-6xl"
        >
          <div
            className="absolute -inset-x-6 -bottom-6 top-10 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-600 to-plum-600 opacity-95"
            aria-hidden="true"
          />
          <div className="shot-frame">
            {/* Chrome */}
            <div className="flex items-center gap-1.5 border-b border-brand-100 bg-brand-50/70 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <img
              src={screenshotSrc(dashboardShot)}
              srcSet={screenshotSrcSet(dashboardShot)}
              sizes="(min-width: 1280px) 1150px, 94vw"
              width={1280}
              height={681}
              alt="ChurchGeniusPro dashboard showing members, families, groups, church growth, calendar, and income and expense statistics"
              fetchPriority="high"
              decoding="async"
              className="block h-auto w-full"
            />
          </div>

          {/* Floating chips */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="glass absolute -top-6 left-10 hidden rounded-2xl px-4 py-3 xl:block"
          >
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Camera className="h-4 w-4 text-plum-600" aria-hidden="true" /> Check scanned →
              entry filled
            </p>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            className="glass absolute -bottom-5 right-12 hidden rounded-2xl px-4 py-3 xl:block"
          >
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Sparkles className="h-4 w-4 text-gold-600" aria-hidden="true" /> “Record an income of $500
              for Sunday offerings”
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
