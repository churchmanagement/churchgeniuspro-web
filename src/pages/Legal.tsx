import { motion } from 'framer-motion';

const content: Record<'privacy' | 'terms' | 'cookies', { title: string; updated: string; sections: { heading: string; body: string }[] }> = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'July 1, 2026',
    sections: [
      {
        heading: '1. Information We Collect',
        body: 'We collect information you provide when creating an account (church name, contact details, email) and information generated through your use of the platform, such as member records your church enters. Your church remains the owner of its data at all times.',
      },
      {
        heading: '2. How We Use Information',
        body: 'We use your information to operate and improve ChurchGeniusPro, provide support, process payments, and send service communications. We never sell your data or your members\' data to third parties.',
      },
      {
        heading: '3. Children\'s Data',
        body: 'Children\'s profiles (including medical notes used for check-in) are protected with role-based access and are visible only to authorized staff and guardians your church designates. We process children\'s data solely on behalf of your church.',
      },
      {
        heading: '4. Security',
        body: 'We use industry-standard encryption in transit and at rest, role-based access controls, and optional network-restricted (Wi-Fi-only) pages for sensitive functions like check-in and temporary logins.',
      },
      {
        heading: '5. Your Rights',
        body: 'You may access, correct, export, or delete your data at any time. Contact privacy@churchgeniuspro.com for data requests, and we will respond within 30 days.',
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    updated: 'July 1, 2026',
    sections: [
      {
        heading: '1. Your Account',
        body: 'You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account. Accounts are for churches and ministry organizations.',
      },
      {
        heading: '2. Subscriptions & Trials',
        body: 'Paid plans are billed monthly and include a 1-month free trial. You may cancel at any time; access continues until the end of the billing period. The Free plan is free forever with the limits described on our Pricing page.',
      },
      {
        heading: '3. Your Data',
        body: 'Your church owns its data. We provide free migration support to help you import data, and export tools so you can take your data with you at any time.',
      },
      {
        heading: '4. Acceptable Use',
        body: 'You agree not to misuse the platform, attempt unauthorized access, or use it to send unlawful communications. We may suspend accounts that violate these terms.',
      },
      {
        heading: '5. Service Availability',
        body: 'We target 99.9% uptime. Scheduled maintenance is announced in advance. The service is provided "as is" to the maximum extent permitted by law.',
      },
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    updated: 'July 1, 2026',
    sections: [
      {
        heading: '1. What Are Cookies',
        body: 'Cookies are small text files stored on your device that help websites remember your preferences and understand how the site is used.',
      },
      {
        heading: '2. Cookies We Use',
        body: 'Essential cookies keep you signed in and secure. Analytics cookies help us understand which pages are useful so we can improve the site. We do not use advertising cookies.',
      },
      {
        heading: '3. Managing Cookies',
        body: 'You can control or delete cookies through your browser settings. Disabling essential cookies may prevent parts of the site (like login) from working properly.',
      },
    ],
  },
};

export default function Legal({ page }: { page: 'privacy' | 'terms' | 'cookies' }) {
  const doc = content[page];
  return (
    <section className="pb-24 pt-32 md:pt-40">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">{doc.title}</h1>
          <p className="mt-2 text-sm text-slate-500">Last updated: {doc.updated}</p>
          <div className="mt-10 space-y-8">
            {doc.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-xl font-bold text-slate-900">{s.heading}</h2>
                <p className="mt-3 leading-relaxed text-slate-600">{s.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 rounded-2xl bg-slate-50 p-6 text-sm text-slate-500">
            Questions about this policy? Contact us at{' '}
            <a href="mailto:legal@churchgeniuspro.com" className="font-semibold text-blue-600">
              legal@churchgeniuspro.com
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
