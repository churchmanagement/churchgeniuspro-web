import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Check, CheckCircle2, Mail, Send, Sparkles, Clock, HeartHandshake } from 'lucide-react';
import { submitContactForm, type ContactMessage } from '../lib/contact';
import { pricingOffer } from '../data/content';

/**
 * Trial Version request page (served at /signup).
 * Same layout, fields, styling and validation as the Contact page
 * (src/pages/SignUp.tsx) minus the topic dropdown — every submission is a
 * trial request. Delivered via Web3Forms (src/lib/contact.ts) with the fixed
 * subject "[ChurchGeniusPro] Trial Version Request".
 */

const TRIAL_SUBJECT = 'Trial Version Request';

type TrialFormFields = Omit<ContactMessage, 'subject'> & {
  church: string;
  phone: string;
};

const perks = [
  '2-month free trial with every feature',
  'Accounting, giving, check-in and advanced AI included',
  'Free application setup',
  'AI assistant that does the typing for you',
  'Secure role-based access from day one',
];

const promises = [
  { icon: Clock, text: 'Every request is reviewed by our team' },
  { icon: HeartHandshake, text: 'A real person sets up your church with you' },
  { icon: Mail, text: 'support@churchgeniuspro.com' },
];

export default function TrialRequest() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TrialFormFields>();

  const onSubmit = handleSubmit(async (data) => {
    setSending(true);
    setServerError(null);
    const result = await submitContactForm({ ...data, subject: TRIAL_SUBJECT });
    setSending(false);
    if (result.ok) setSent(true);
    else setServerError(result.error ?? 'Something went wrong. Please try again.');
  });

  return (
    <section className="relative overflow-hidden pb-20 pt-32 md:pt-40">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-50 via-white to-white" aria-hidden="true" />
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: pitch */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:pt-10"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Free Trial
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Request your ChurchGeniusPro <span className="gradient-text">Trial Version</span>
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              Fill out this form to request access to the ChurchGeniusPro Trial Version — every feature,
              free for {pricingOffer.trialLength}. Our team will review your request, send you the trial
              details, and help set everything up with you.
            </p>
            <ul className="mt-8 space-y-4">
              {perks.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                    <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                  </span>
                  <span className="text-slate-700">{p}</span>
                </li>
              ))}
            </ul>
            <ul className="mt-10 space-y-3 border-t border-slate-200 pt-8">
              {promises.map((p) => (
                <li key={p.text} className="flex items-center gap-3 text-sm text-slate-600">
                  <p.icon className="h-4 w-4 text-blue-600" aria-hidden="true" />
                  {p.text === 'support@churchgeniuspro.com' ? (
                    <a href="mailto:support@churchgeniuspro.com" className="font-semibold text-blue-600 hover:text-blue-700">
                      support@churchgeniuspro.com
                    </a>
                  ) : (
                    p.text
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: trial request form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {sent ? (
              <div className="glass rounded-3xl p-10 text-center" role="status">
                <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" aria-hidden="true" />
                <h2 className="mt-4 text-2xl font-bold text-slate-900">Request received!</h2>
                <p className="mt-3 text-slate-600">
                  Thank you for your interest in our application. We will review your request and send the
                  trial version details very soon.
                </p>
                <Link to="/" className="btn-primary mt-8">
                  Back to Home
                </Link>
              </div>
            ) : (
              <form
                className="glass space-y-4 rounded-3xl p-6 sm:p-8"
                onSubmit={onSubmit}
                noValidate
                aria-label="Request the ChurchGeniusPro Trial Version"
              >
                <div className="grid gap-4 sm:grid-cols-2">
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
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="church" className="label">
                      Church Name
                    </label>
                    <input id="church" className="input" autoComplete="organization" {...register('church')} />
                  </div>
                  <div>
                    <label htmlFor="phone" className="label">
                      Phone
                    </label>
                    <input id="phone" type="tel" className="input" autoComplete="tel" {...register('phone')} />
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
                  {errors.message && <p className="mt-1 text-xs text-rose-600">{errors.message.message}</p>}
                </div>
                {serverError && (
                  <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {serverError}
                  </p>
                )}
                <button type="submit" disabled={sending} className="btn-primary w-full !py-4 disabled:opacity-60">
                  {sending ? 'Sending…' : 'Request Free Trial'} <Send className="h-4 w-4" aria-hidden="true" />
                </button>
                <p className="text-center text-xs text-slate-500">
                  Your trial request goes straight to our team at support@churchgeniuspro.com.
                </p>
                <p className="text-center text-xs text-slate-500">
                  Have a general question instead?{' '}
                  <Link to="/contact" className="font-semibold text-blue-600 hover:text-blue-700">
                    Contact us
                  </Link>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
