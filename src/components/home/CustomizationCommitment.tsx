import { Link } from 'react-router-dom';
import { ArrowRight, Ear, ClipboardList, Wrench, Mail, HeartHandshake } from 'lucide-react';
import { Reveal } from '../ui/Section';

/**
 * Homepage "Your Church. Your Needs. Our Commitment." section —
 * tells churches we will build, customize and enhance the app for them.
 * Copy supplied by the owner (2026-11-07); keep the fee note.
 */
const steps = [
  {
    icon: Ear,
    title: 'We listen to your ideas',
    description: 'Tell us about the feature, update, or change you have in mind.',
  },
  {
    icon: ClipboardList,
    title: 'We understand your requirements',
    description: 'We learn how your church works and what you need the software to do.',
  },
  {
    icon: Wrench,
    title: 'We build it with you',
    description: 'We work with you to build or customize ChurchGeniusPro to meet your needs.',
  },
];

export default function CustomizationCommitment() {
  return (
    <section id="your-needs" className="section">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-600 to-plum-600 p-[1px] shadow-xl shadow-brand-600/10">
            <div className="rounded-[calc(1.5rem-1px)] bg-white px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center">
                <div>
                  <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-600/10 to-plum-600/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-600">
                    <HeartHandshake className="h-4 w-4" aria-hidden="true" />
                    Built around your church
                  </span>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    Your Church. Your Needs.{' '}
                    <span className="bg-gradient-to-r from-brand-600 to-plum-600 bg-clip-text text-transparent">
                      Our Commitment.
                    </span>
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-slate-700">
                    Need a new feature, an update, or a customization to make ChurchGeniusPro work better for
                    your church?
                  </p>
                  <p className="mt-3 leading-relaxed text-slate-600">
                    <strong className="font-semibold text-slate-900">Just let us know!</strong> We are happy to
                    listen to your ideas, understand your requirements, and work with you to build or customize
                    the software to meet your needs.
                  </p>
                  <p className="mt-6 text-xl font-bold text-slate-900">
                    It&rsquo;s your software. We work for you!
                  </p>
                  <p className="mt-2 leading-relaxed text-slate-600">
                    Our goal is to make ChurchGeniusPro work the way your church needs it to.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link to="/contact" className="btn-primary justify-center">
                      Share Your Idea <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <a href="mailto:support@churchgeniuspro.com" className="btn-secondary justify-center">
                      <Mail className="h-4 w-4" aria-hidden="true" /> support@churchgeniuspro.com
                    </a>
                  </div>
                </div>

                <ol className="space-y-4">
                  {steps.map((s, i) => (
                    <li
                      key={s.title}
                      className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-plum-600 text-white shadow-lg shadow-brand-600/20">
                        <s.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-bold text-slate-900">
                          <span className="sr-only">Step {i + 1}: </span>
                          {s.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <p className="mt-10 border-t border-slate-200 pt-6 text-sm leading-relaxed text-slate-500">
                <strong className="font-semibold text-slate-700">Note:</strong> Some customizations or development
                requests may involve an additional fee. Please contact{' '}
                <a
                  href="mailto:support@churchgeniuspro.com"
                  className="font-semibold text-brand-600 underline-offset-4 hover:text-brand-700 hover:underline"
                >
                  support@churchgeniuspro.com
                </a>{' '}
                for details.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
