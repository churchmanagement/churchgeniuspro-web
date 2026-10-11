import { motion } from 'framer-motion';

const content: Record<'privacy' | 'terms' | 'cookies', { title: string; updated: string; sections: { heading: string; body: string; links?: { label: string; href: string }[] }[] }> = {
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
    updated: 'October 11, 2026',
    sections: [
      {
        heading: '1. Your Account',
        body: 'You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account. Accounts are for churches and ministry organizations.',
      },
      {
        heading: '2. Subscriptions & Trials',
        body: 'Paid plans are billed monthly. Free trials, when offered (currently 2 months), are described on our Pricing page. You may cancel at any time; access continues until the end of the billing period. The Free plan is free forever with the limits described on our Pricing page.',
      },
      {
        heading: '3. Your Data',
        body: 'Your church owns its data. We provide free application setup, optional paid migration from an existing application (described on our Pricing page), and export tools so you can take your data with you at any time.',
      },
      {
        heading: '4. Acceptable Use',
        body: 'You agree not to misuse the platform, attempt unauthorized access, or use it to send unlawful communications. We may suspend accounts that violate these terms.',
      },
      {
        heading: '5. Service Availability',
        body: 'We work to keep the service available at all times and announce scheduled maintenance in advance. The service is provided "as is" to the maximum extent permitted by law.',
      },
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    updated: 'October 11, 2026',
    sections: [
      {
        heading: '1. What Are Cookies',
        body: 'Cookies are small text files stored on your device that help websites remember your preferences and understand how the site is used. Similar browser storage (such as session storage) works in a comparable way, so this policy covers it too.',
      },
      {
        heading: '2. Essential Cookies',
        body: 'The ChurchGeniusPro application uses encrypted session cookies to keep you signed in and secure. They are required for login to work and expire when your session ends or times out.',
      },
      {
        heading: '3. Advertising and Measurement Cookies (Google Ads)',
        body: 'This website uses the Google tag for Google Ads. When you visit, Google may set or read cookies (for example, cookies whose names begin with _gcl_) that help us see whether people who click our ads go on to visit our pages or request a trial, and that Google uses to show and measure ads. Google processes this information under its own privacy policy. We do not sell your personal information.',
        links: [
          { label: 'How Google uses cookies', href: 'https://policies.google.com/technologies/cookies' },
          { label: 'Manage your Google ad settings (My Ad Center)', href: 'https://myadcenter.google.com/' },
        ],
      },
      {
        heading: '4. Video Statistics',
        body: 'To learn which product videos are helpful, the website records anonymous video events (such as a play) using a random identifier kept in your browser\'s session storage for the current tab only. It is not a cookie, contains no personal information, and is cleared when you close the tab.',
      },
      {
        heading: '5. YouTube Videos',
        body: 'Product videos are hosted on YouTube and load only when you click play. Once a video loads, YouTube may set its own cookies under Google\'s privacy policy.',
      },
      {
        heading: '6. Managing Cookies',
        body: 'You can control or delete cookies through your browser settings, and you can turn off personalized Google ads in My Ad Center. Disabling essential cookies may prevent parts of the application (like login) from working properly.',
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
          initial={false}
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
                {s.links && (
                  <ul className="mt-3 space-y-1.5">
                    {s.links.map((l) => (
                      <li key={l.href}>
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-blue-700 hover:text-blue-800"
                        >
                          {l.label}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
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
