import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, RefreshCcw, HeartHandshake } from 'lucide-react';
import PricingCards from '../components/ui/PricingCards';
import FAQAccordion from '../components/ui/FAQAccordion';
import CTASection from '../components/ui/CTASection';
import { SectionHeading, Reveal } from '../components/ui/Section';
import { faqs } from '../data/content';

const assurances = [
  {
    icon: RefreshCcw,
    title: 'Switch anytime',
    description: 'Upgrade or downgrade whenever you like — your data stays exactly where it is.',
  },
  {
    icon: HeartHandshake,
    title: 'Free migration support',
    description: 'Our team moves your members, giving history, and financials from your old system for free.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure by design',
    description: 'Role-based access, tailored portals, and private pages protect your church data at every level.',
  },
];

export default function Pricing() {
  return (
    <>
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
              Pricing
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Simple, honest pricing for <span className="gradient-text">every church</span>
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              Start free forever. Upgrade when you're ready — every paid plan includes a 1-month
              free trial and free migration support.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page">
          <PricingCards />
        </div>
      </section>

      {/* Assurances */}
      <section className="section bg-slate-50">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-3">
            {assurances.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.1}>
                <div className="card h-full text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                    <a.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-bold text-slate-900">{a.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{a.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="Questions" title="Pricing questions, answered" />
          <div className="mt-12">
            <FAQAccordion
              items={faqs.filter((f) => ['Pricing', 'Getting Started'].includes(f.category))}
            />
          </div>
          <Reveal className="mt-10 text-center">
            <Link to="/compare" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
              Compare us with other tools <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
