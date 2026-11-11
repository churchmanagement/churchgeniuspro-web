import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { ComponentType } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  Cloud,
  Database,
  FileLock2,
  Flag,
  KeyRound,
  Layers,
  LockKeyhole,
  Mail,
  RefreshCcw,
  ShieldCheck,
  UserCheck,
  UserCog,
  UserMinus,
  Users,
  Workflow,
} from 'lucide-react';
import FAQAccordion from '../components/ui/FAQAccordion';
import { SectionHeading, Reveal } from '../components/ui/Section';
import type { FAQ } from '../data/content';
import { SITE } from '../data/seo';
import { googlePlayUrl } from '../data/apps';

/*
 * Security, Technology & US-Based Development page (/security).
 *
 * Content rules (approved 2026-10-31):
 * - Plain-language, customer-facing only. Never add versions, configuration,
 *   endpoints, schemas, key handling or other implementation details.
 * - No "100% secure", "unhackable" or certification claims (no SOC 2 / HIPAA).
 * - Facts confirmed by the owner: app + database on Microsoft Azure in a US
 *   region (Azure Database for PostgreSQL — encrypted at rest and in transit);
 *   developed and maintained solely in the USA, no contractors; regular
 *   security reviews; 30-minute idle logout is the default (user can opt out).
 */

interface Card {
  icon: ComponentType<{ className?: string }>;
  title: string;
  tag?: string;
  description: string;
}

const technologies: Card[] = [
  {
    icon: Layers,
    title: 'Java & Spring Boot',
    tag: 'The foundation',
    description:
      'The same proven foundation many banks, hospitals, and large businesses use for their important software. It’s built for stability, so ChurchGeniusPro works reliably every day — including Sunday morning.',
  },
  {
    icon: KeyRound,
    title: 'Spring Security',
    tag: 'The front-door lock',
    description:
      'A widely used, actively maintained security framework that handles signing in and decides what each person is allowed to see and do.',
  },
  {
    icon: Database,
    title: 'PostgreSQL',
    tag: 'Where your records live',
    description:
      'A respected database with decades of development behind it, known for keeping information accurate, consistent, and safe from loss.',
  },
  {
    icon: Workflow,
    title: 'Hibernate / JPA',
    tag: 'The careful record-keeper',
    description:
      'Moves information between the app and the database in a consistent, structured way — helping keep records accurate and guarding against common database attacks.',
  },
  {
    icon: Cloud,
    title: 'Microsoft Azure',
    tag: 'Our home in the cloud',
    description:
      'ChurchGeniusPro and its database run on Microsoft’s enterprise cloud, in US data centers. Microsoft secures and operates the facilities and infrastructure underneath.',
  },
];

const protections: Card[] = [
  {
    icon: UserCheck,
    title: 'Secure sign-in',
    description:
      'Everyone signs in with their own account, and by default sessions end automatically after a period of inactivity.',
  },
  {
    icon: Users,
    title: 'Role-based access',
    description:
      'Staff, members, and children’s ministry each have their own portal. People see only what their role allows — a volunteer can’t open giving records, and a member can’t see someone else’s profile.',
  },
  {
    icon: LockKeyhole,
    title: 'Protected features and pages',
    description:
      'The app checks permissions before showing any information. Sensitive pages can be limited to your church’s Wi-Fi, and volunteers can receive temporary logins that expire after their shift.',
  },
  {
    icon: FileLock2,
    title: 'Careful data handling',
    description:
      'Your information is encrypted while it travels to the app and while it is stored, and your records are reached only through the app’s security checks.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy you can count on',
    description:
      'We never sell your data or your members’ data. Children’s information is visible only to the staff and guardians your church chooses, and you can export or delete your data at any time.',
  },
  {
    icon: RefreshCcw,
    title: 'Always improving',
    description:
      'We regularly review the application’s security, keep its underlying technology updated with security fixes, and keep strengthening the platform.',
  },
];

const yourPart: Card[] = [
  {
    icon: UserCog,
    title: 'One login per person',
    description: 'Give each staff member and volunteer their own account — never a shared one.',
  },
  {
    icon: Boxes,
    title: 'Only the access they need',
    description: 'Assign each person the role that fits their work, and nothing more.',
  },
  {
    icon: UserMinus,
    title: 'Remove access promptly',
    description: 'When a volunteer or staff member leaves, remove or change their access right away.',
  },
];

const securityFaqs: FAQ[] = [
  {
    category: 'Security',
    question: 'Where is my church’s data stored?',
    answer:
      'In the United States, on Microsoft Azure. Your data is encrypted while it is stored and while it travels between your device and ChurchGeniusPro.',
  },
  {
    category: 'Security',
    question: 'Do you sell or share our data?',
    answer:
      'No. We never sell your data or your members’ data. We use it only to run ChurchGeniusPro for your church, as described in our Privacy Policy.',
  },
  {
    category: 'Security',
    question: 'Can we export or delete our data?',
    answer:
      'Yes. You can export or delete your church’s data at any time. Contact privacy@churchgeniuspro.com for data requests and we will respond within 30 days.',
  },
  {
    category: 'Security',
    question: 'Who builds and maintains ChurchGeniusPro?',
    answer:
      'ChurchGeniusPro is designed, developed, reviewed, and maintained in the United States by ChurchGenius LLC. We do not outsource development overseas.',
  },
  {
    category: 'Security',
    question: 'Can I use ChurchGeniusPro on my phone?',
    answer:
      'Yes. ChurchGeniusPro works in any modern web browser, and our Android app is available on Google Play. Both use the same secure sign-in and role-based access.',
  },
];

const faqJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE}/security#faq`,
  mainEntity: securityFaqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}).replace(/</g, '\\u003c');

const badges = [
  { icon: Layers, label: 'Enterprise-grade technology' },
  { icon: ShieldCheck, label: 'Security-focused design' },
  { icon: Flag, label: 'Developed in the USA' },
];

export default function Security() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-32 md:pt-40">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-white to-white" aria-hidden="true" />
        <div
          className="absolute -right-32 top-24 -z-10 h-[420px] w-[420px] rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(233,162,59,0.16), transparent)' }}
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
              Security, Technology &amp; Our Commitment to Your Church
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:leading-[1.1]">
              Modern Technology. Security at Our Core.{' '}
              <span className="gradient-text">Built with Churches in Mind.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              Your church trusts you with people’s names, families, children’s information, and giving
              records. You should know what protects it. Here’s how ChurchGeniusPro is built — in plain
              English.
            </p>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {badges.map((b) => (
                <li
                  key={b.label}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
                >
                  <b.icon className="h-4 w-4 text-brand-600" aria-hidden="true" />
                  {b.label}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/features" className="btn-primary !px-7 !py-3.5">
                Explore ChurchGeniusPro <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/signup" className="btn-secondary !px-7 !py-3.5">
                Request a Free Trial
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technology */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Advanced, enterprise-grade technology"
            title="Built on technology trusted by large organizations"
            subtitle="ChurchGeniusPro isn’t a hobby project or a patchwork of plug-ins. It’s built on established, professional technologies used for business-critical software around the world."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {technologies.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.08}>
                <div className="card h-full">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-plum-600 text-white shadow-lg shadow-brand-600/20">
                    <t.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-plum-600">{t.tag}</p>
                  <h3 className="mt-1 text-lg font-bold text-slate-900">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{t.description}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.4}>
              <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-brand-200 bg-brand-50/60 p-6">
                <p className="text-lg font-bold text-slate-900">What this means for you</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  You don’t need to know any of these names. They simply mean your church management
                  platform rests on the same kind of proven, well-supported foundation that serious
                  businesses rely on.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="section relative overflow-hidden bg-slate-950">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(45% 55% at 10% 15%, rgba(164,85,124,0.45), transparent 60%), radial-gradient(45% 55% at 90% 85%, rgba(233,162,59,0.16), transparent 60%)',
          }}
          aria-hidden="true"
        />
        <div className="container-page relative">
          <SectionHeading
            dark
            eyebrow="Security-focused architecture"
            title="Security at every level"
            subtitle="Protection is designed into how ChurchGeniusPro works — from the moment someone signs in to the way every record is stored."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {protections.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-gold-500 text-white">
                    <p.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{p.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-slate-400">
            Read the details in our{' '}
            <Link to="/privacy" className="font-semibold text-brand-300 underline-offset-4 hover:text-white hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Made in USA */}
      <section className="section">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-brand-600/5 sm:p-12">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-red-500 via-white to-brand-600"
                aria-hidden="true"
              />
              <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
                <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-red-600 text-white shadow-lg md:mx-0">
                  <Flag className="h-10 w-10" aria-hidden="true" />
                </span>
                <div className="text-center md:text-left">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                    US-based development
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Proudly developed and maintained in the USA
                  </h2>
                  <p className="mt-4 leading-relaxed text-slate-600">
                    ChurchGeniusPro is designed, developed, reviewed, and maintained in the United States by
                    ChurchGenius LLC. We don’t outsource development overseas. The people who build the
                    software stand behind it — and when you email{' '}
                    <a href="mailto:support@churchgeniuspro.com" className="font-semibold text-brand-700 hover:text-brand-800">
                      support@churchgeniuspro.com
                    </a>
                    , you reach the team that builds the product.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Honest commitment + your part */}
      <section className="pb-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Our honest commitment</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              No online system can promise to be 100% secure, and we won’t claim to be. What we promise
              is security built into every part of the design, careful handling of your data, and a team
              that keeps improving it.
            </p>
          </Reveal>
          <Reveal className="mt-12">
            <p className="text-center text-sm font-semibold uppercase tracking-wider text-slate-500">
              Your part — three simple habits
            </p>
          </Reveal>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {yourPart.map((y, i) => (
              <Reveal key={y.title} delay={i * 0.08}>
                <div className="card h-full text-center">
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                    <y.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-bold text-slate-900">{y.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{y.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-slate-50/60">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
        <div className="container-page">
          <SectionHeading eyebrow="Questions" title="Security questions, answered" />
          <div className="mt-12">
            <FAQAccordion items={securityFaqs} />
          </div>
          <p className="mt-8 text-center text-sm text-slate-500">
            Get the Android app on{' '}
            <a href={googlePlayUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 hover:text-brand-800">
              Google Play
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </p>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-plum-600 to-gold-500 px-6 py-14 text-center shadow-2xl shadow-plum-600/25 sm:px-16">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold text-white sm:text-4xl">
                See what ChurchGeniusPro can do for your church
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-brand-50">
                Modern tools, built securely, with a 2-month free trial of every feature.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  to="/features"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-brand-700 shadow-lg transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Explore ChurchGeniusPro <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Home
                </Link>
              </div>
              <p className="mt-6 flex flex-wrap items-center justify-center gap-1.5 text-sm text-brand-50">
                <Mail className="h-4 w-4" aria-hidden="true" /> Security questions? Email{' '}
                <a href="mailto:support@churchgeniuspro.com" className="font-semibold text-white underline underline-offset-4">
                  support@churchgeniuspro.com
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
