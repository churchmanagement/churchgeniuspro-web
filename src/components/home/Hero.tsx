import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, Sparkles, Mic, Camera, Check } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-44">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-white to-white" aria-hidden="true" />
      <div
        className="absolute -top-40 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(59,130,246,0.5), rgba(147,51,234,0.3), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="container-page">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.12 }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-purple-600" aria-hidden="true" />
              AI-Powered Church Management & Accounting
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl md:text-6xl"
          >
            The All-in-One Platform for <span className="gradient-text">Modern Churches</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl"
          >
            Run your church effortlessly — members, giving, accounting, events, and ministries in
            one connected system, with built-in AI that lets you talk, snap a photo, or type a
            single word instead of filling out forms.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link to="/signup" className="btn-primary !px-8 !py-4 !text-base">
              Start Free Trial <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href="#product-tour" className="btn-secondary !px-8 !py-4 !text-base">
              <PlayCircle className="h-5 w-5 text-blue-600" aria-hidden="true" /> Watch Demo
            </a>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500"
          >
            {['Free version available', '1-month free trial', 'Free migration support', 'No credit card required'].map(
              (item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500" aria-hidden="true" /> {item}
                </li>
              )
            )}
          </motion.ul>
        </motion.div>

        {/* Animated dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="glass overflow-hidden rounded-3xl p-2 sm:p-3">
            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
              {/* Chrome */}
              <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-4 hidden rounded-lg bg-white px-3 py-1 text-xs text-slate-400 shadow-sm sm:block">
                  app.churchgeniuspro.com/dashboard
                </span>
              </div>
              {/* Dashboard body */}
              <div className="grid gap-4 p-4 sm:grid-cols-3 sm:p-6">
                {[
                  { label: 'Total Members', value: '1,248', delta: '+12 this week', color: 'from-blue-500 to-cyan-500' },
                  { label: 'Giving This Month', value: '$42,850', delta: '+8.4%', color: 'from-emerald-500 to-teal-500' },
                  { label: 'Sunday Attendance', value: '731', delta: '+5.2%', color: 'from-purple-500 to-violet-500' },
                ].map((kpi, i) => (
                  <motion.div
                    key={kpi.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.15 }}
                    className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
                  >
                    <div className={`h-1.5 w-10 rounded-full bg-gradient-to-r ${kpi.color}`} />
                    <p className="mt-3 text-xs font-medium text-slate-500">{kpi.label}</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">{kpi.value}</p>
                    <p className="mt-1 text-xs font-medium text-emerald-600">{kpi.delta}</p>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                  className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:col-span-2"
                >
                  <p className="text-xs font-medium text-slate-500">Giving by Fund</p>
                  <div className="mt-3 flex h-28 items-end gap-2">
                    {[60, 85, 45, 70, 95, 55, 75, 65, 88, 50, 72, 92].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 1.6 + i * 0.05, duration: 0.5 }}
                        className="flex-1 rounded-t-md bg-gradient-to-t from-blue-600 to-purple-500 opacity-80"
                      />
                    ))}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 p-4 text-white shadow-lg"
                >
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide">
                    <Sparkles className="h-3 w-3" aria-hidden="true" /> AI Assistant
                  </span>
                  <p className="mt-3 text-sm font-medium text-blue-50">
                    “Show last month's giving”
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-blue-100">
                    <Mic className="h-3.5 w-3.5" aria-hidden="true" /> Voice
                    <Camera className="ml-2 h-3.5 w-3.5" aria-hidden="true" /> Scan
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Floating chips */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="glass absolute -left-4 top-16 hidden rounded-2xl px-4 py-3 lg:block"
          >
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Camera className="h-4 w-4 text-purple-600" aria-hidden="true" /> Check scanned →
              entry filled
            </p>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            className="glass absolute -right-4 bottom-16 hidden rounded-2xl px-4 py-3 lg:block"
          >
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Check className="h-4 w-4 text-emerald-500" aria-hidden="true" /> 34 kids checked in
              safely
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
