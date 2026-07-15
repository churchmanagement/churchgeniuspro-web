import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Mic,
  Camera,
  MessageSquareText,
  ArrowRight,
  Layers,
  Clock,
  ShieldCheck,
  Smile,
} from 'lucide-react';
import Hero from '../components/home/Hero';
import { SectionHeading, Reveal } from '../components/ui/Section';
import Stats from '../components/ui/Stats';
import Testimonials from '../components/ui/Testimonials';
import PricingCards from '../components/ui/PricingCards';
import ScreenshotCarousel from '../components/ui/ScreenshotCarousel';
import FAQAccordion from '../components/ui/FAQAccordion';
import CTASection from '../components/ui/CTASection';
import { featureCategories } from '../data/features';
import { faqs } from '../data/content';

const aiHighlights = [
  {
    icon: MessageSquareText,
    title: 'Type the way you think',
    description:
      '“Show last month\'s giving.” “Add a new family.” Plain-English search and one-word commands take you straight there.',
  },
  {
    icon: Mic,
    title: 'Just say it',
    description:
      'Record income, create meetings, and navigate hands-free. Speak naturally and the AI fills in amounts, dates, and categories.',
  },
  {
    icon: Camera,
    title: 'Snap a photo',
    description:
      'Checks, bank statements, and membership forms are read automatically — hours of data entry become a few seconds.',
  },
  {
    icon: Sparkles,
    title: 'A colleague, not a form',
    description:
      'Conversational AI asks the right questions, confirms details, and completes multi-step tasks with you, step by step.',
  },
];

const benefits = [
  {
    icon: Layers,
    title: 'One system instead of many',
    description:
      'Replace a dozen disconnected tools. One login, one connected system — no more copying the same information between apps.',
  },
  {
    icon: Clock,
    title: 'AI that does the typing',
    description:
      'Speak, scan, or use one-word commands to get things done in seconds. Up to 90% less manual data entry.',
  },
  {
    icon: Smile,
    title: 'Built for non-experts',
    description:
      'Clear screens, helpful prompts, and a step-by-step Help Center. No technical background required.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe and private',
    description:
      'Role-based access, Wi-Fi-only private pages, and secure code & barcode check-in for children.',
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Benefits */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why churches love it"
            title="Less time on admin. More time with people."
            subtitle="Most churches run on a patchwork of spreadsheets, paper forms, and half a dozen disconnected apps. ChurchGeniusPro replaces all of it."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.1}>
                <div className="card h-full">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/20">
                    <b.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AI Highlights */}
      <section className="section relative overflow-hidden bg-slate-950">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(circle at 20% 30%, rgba(59,130,246,0.25), transparent 45%), radial-gradient(circle at 80% 70%, rgba(147,51,234,0.25), transparent 45%)',
          }}
          aria-hidden="true"
        />
        <div className="container-page relative">
          <SectionHeading
            eyebrow="Built-In AI Assistant"
            title="Like a staff member living inside your software"
            subtitle="Instead of hunting through menus and filling out forms, simply talk, snap a photo, or type a single word — the assistant does the work."
            dark
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aiHighlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/40 hover:bg-white/10">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                    <h.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-white">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{h.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3} className="mt-12 text-center">
            <Link
              to="/features"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
            >
              Explore the AI assistant in depth <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Feature category cards */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Everything included"
            title="One platform. Every part of church life."
            subtitle="Nine complete toolkits — people, giving, accounting, AI, communication, events, ministries, security, and reporting — working together as one."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featureCategories.map((cat, i) => (
              <Reveal key={cat.id} delay={(i % 3) * 0.1}>
                <Link to={`/features#${cat.id}`} className="card group block h-full">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${cat.gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    <cat.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">{cat.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{cat.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                    {cat.features.length} features{' '}
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots carousel */}
      <div id="product-tour">
        <ScreenshotCarousel />
      </div>

      <Testimonials />

      {/* Pricing preview */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Pricing"
            title="Simple pricing that grows with you"
            subtitle="Start free, upgrade when you're ready. Every paid plan includes a 1-month free trial and free migration support."
          />
          <div className="mt-16">
            <PricingCards />
          </div>
          <Reveal className="mt-10 text-center">
            <Link to="/compare" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
              See how we compare to other tools <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Stats />

      {/* FAQ */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions"
            subtitle="Everything you need to know before getting started."
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <FAQAccordion items={faqs.slice(0, 6)} />
          </motion.div>
          <Reveal className="mt-8 text-center">
            <Link to="/support" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              Visit the Help Center for more →
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
