import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  Search,
  PlayCircle,
  BookOpen,
  MessagesSquare,
  Mail,
  LifeBuoy,
  Users,
  CheckCircle2,
  FileText,
  Send,
} from 'lucide-react';
import { SectionHeading, Reveal } from '../components/ui/Section';
import FAQAccordion from '../components/ui/FAQAccordion';
import CTASection from '../components/ui/CTASection';
import { faqs } from '../data/content';

interface ContactForm {
  name: string;
  email: string;
  church: string;
  subject: string;
  message: string;
}

const videos = [
  { title: 'Getting Started in 10 Minutes', duration: '10:24', topic: 'Basics' },
  { title: 'Setting Up Online Giving', duration: '7:12', topic: 'Giving' },
  { title: 'AI Assistant: Voice & Photo Entry', duration: '8:45', topic: 'AI' },
  { title: 'Kids Check-In on Sunday Morning', duration: '6:30', topic: 'Ministries' },
  { title: 'Board-Ready Financial Reports', duration: '9:18', topic: 'Accounting' },
  { title: 'Events, Worship & Volunteers', duration: '11:02', topic: 'Events' },
];

const supportOptions = [
  {
    icon: LifeBuoy,
    title: 'Help Center',
    description: 'Step-by-step instructions and tutorials for every feature, built right into the platform.',
  },
  {
    icon: MessagesSquare,
    title: 'Live Chat',
    description: 'Chat with our support team from inside the app. Priority response on the Pro plan.',
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Write to support@churchgeniuspro.com — we respond within one business day.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Join thousands of church administrators sharing tips, templates, and best practices.',
  },
];

export default function Support() {
  const [query, setQuery] = useState('');
  const filteredFaqs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
    );
  }, [query]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ContactForm>();

  return (
    <>
      {/* Hero with search */}
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
              Help & Support
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              How can we <span className="gradient-text">help you?</span>
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              You're never on your own. Search the Help Center, watch a tutorial, or talk to a real
              person.
            </p>
            <div className="relative mx-auto mt-8 max-w-xl">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search help articles, e.g. “giving”, “check-in”, “AI”…"
                className="input !py-4 !pl-12 shadow-lg shadow-slate-900/5"
                aria-label="Search help articles"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support options */}
      <section className="pb-20">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {supportOptions.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.08}>
                <div className="card h-full text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                    <o.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-bold text-slate-900">{o.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{o.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (searchable) */}
      <section id="faq" className="section scroll-mt-24 bg-slate-50">
        <div className="container-page">
          <SectionHeading
            eyebrow="FAQ"
            title={query ? `Results for “${query}”` : 'Frequently asked questions'}
          />
          <div className="mt-12">
            {filteredFaqs.length > 0 ? (
              <FAQAccordion items={filteredFaqs} />
            ) : (
              <p className="text-center text-slate-500">
                No results for “{query}”. Try a different term, or contact us below.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Video tutorials */}
      <section id="videos" className="section scroll-mt-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Video Tutorials"
            title="Learn by watching"
            subtitle="Short, friendly walkthroughs that turn first-time users into confident pros."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 0.08}>
                <button
                  type="button"
                  className="card group w-full text-left"
                  aria-label={`Play video: ${v.title}`}
                >
                  <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-950">
                    <PlayCircle
                      className="h-14 w-14 text-white/80 transition-transform duration-300 group-hover:scale-110"
                      aria-hidden="true"
                    />
                    <span className="absolute bottom-2 right-2 rounded-md bg-black/60 px-2 py-0.5 text-xs text-white">
                      {v.duration}
                    </span>
                  </div>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-blue-600">
                    {v.topic}
                  </p>
                  <h3 className="mt-1 font-bold text-slate-900">{v.title}</h3>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation + community */}
      <section id="docs" className="scroll-mt-24 pb-20">
        <div className="container-page grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card flex h-full items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                <FileText className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-bold text-slate-900">Documentation</h3>
                <p className="mt-1 text-sm text-slate-600">
                  The complete User Guide & Feature Overview — every feature explained in plain
                  language, with “How you'll use it” notes for everyday tasks.
                </p>
                <a href="#" className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Browse the docs →
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div id="community" className="card flex h-full scroll-mt-24 items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 text-white">
                <BookOpen className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-bold text-slate-900">Community</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Connect with other churches, share templates and workflows, and get answers from
                  people who run ministries just like yours.
                </p>
                <a href="#" className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Join the community →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact form */}
      <section id="contact" className="section scroll-mt-24 bg-slate-50">
        <div className="container-page">
          <SectionHeading
            eyebrow="Contact Us"
            title="Talk to a real person"
            subtitle="Questions about pricing, migration, or a specific feature? We'd love to help."
          />
          <Reveal className="mx-auto mt-12 max-w-2xl">
            {isSubmitSuccessful ? (
              <div className="card text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-bold text-slate-900">Message sent!</h3>
                <p className="mt-2 text-slate-600">
                  Thanks for reaching out — our team will get back to you within one business day.
                </p>
              </div>
            ) : (
              <form
                className="card space-y-5 !p-8"
                onSubmit={handleSubmit(() => {
                  /* Wire to your support API or service like Azure Functions */
                })}
                noValidate
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="label">
                      Your Name *
                    </label>
                    <input
                      id="name"
                      className="input"
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      {...register('name', { required: 'Please enter your name' })}
                    />
                    {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="label">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="input"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      {...register('email', {
                        required: 'Please enter your email',
                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
                      })}
                    />
                    {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="church" className="label">
                      Church Name
                    </label>
                    <input id="church" className="input" autoComplete="organization" {...register('church')} />
                  </div>
                  <div>
                    <label htmlFor="subject" className="label">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      className="input"
                      aria-invalid={!!errors.subject}
                      {...register('subject', { required: 'Please choose a subject' })}
                    >
                      <option value="">Choose a topic…</option>
                      <option>Sales & pricing</option>
                      <option>Migration help</option>
                      <option>Technical support</option>
                      <option>Billing</option>
                      <option>Something else</option>
                    </select>
                    {errors.subject && (
                      <p className="mt-1 text-xs text-rose-600">{errors.subject.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="label">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="input resize-y"
                    aria-invalid={!!errors.message}
                    {...register('message', {
                      required: 'Please write a message',
                      minLength: { value: 10, message: 'Tell us a little more (at least 10 characters)' },
                    })}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-rose-600">{errors.message.message}</p>
                  )}
                </div>
                <button type="submit" className="btn-primary w-full !py-4">
                  Send Message <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
