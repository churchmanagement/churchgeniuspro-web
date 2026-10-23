import { motion } from 'framer-motion';

type LegalPage = 'privacy' | 'terms' | 'cookies' | 'sms';

const SMS_LINKS = [
  { label: 'SMS Messaging & Opt-In (program details and sign-up form)', href: '/sms' },
];

const content: Record<LegalPage, { title: string; updated: string; sections: { heading: string; body: string; links?: { label: string; href: string }[] }[] }> = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'October 19, 2026',
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
        heading: '5. Text Messages (SMS)',
        body: 'Churches that use ChurchGeniusPro can send text messages, such as event and service reminders, RSVP confirmations, volunteer schedules and children\'s ministry pickup alerts, to people who have agreed to receive them. We collect a mobile phone number and the person\'s SMS consent only to deliver those messages. Mobile phone numbers and SMS opt-in consent are never sold, rented, or shared with third parties or affiliates for their marketing or promotional purposes. Text-messaging opt-in data and consent are not shared with any third party, except the service providers (such as our SMS delivery provider) that send messages on our behalf. Reply STOP to any message to stop receiving texts, or HELP for help. Message and data rates may apply.',
        links: SMS_LINKS,
      },
      {
        heading: '6. Your Rights',
        body: 'You may access, correct, export, or delete your data at any time. Contact privacy@churchgeniuspro.com for data requests, and we will respond within 30 days.',
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    updated: 'October 22, 2026',
    sections: [
      {
        heading: '1. Your Account',
        body: 'You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account. Accounts are for churches and ministry organizations.',
      },
      {
        heading: '2. Subscriptions & Trials',
        body: 'Paid plans are billed monthly. Free trials, when offered (currently 2 months), are described on our Pricing page. You may cancel at any time; access continues until the end of the billing period. Standard and Pro come with a 30-day money-back guarantee: if you cancel within 30 days of your first paid charge, we will refund that charge in full on request to support@churchgeniuspro.com. The Free plan is free forever with the limits described on our Pricing page.',
      },
      {
        heading: '3. Your Data',
        body: 'Your church owns its data. We provide free application setup, free migration from an existing application (described on our Pricing page), and export tools so you can take your data with you at any time.',
      },
      {
        heading: '4. Acceptable Use',
        body: 'You agree not to misuse the platform, attempt unauthorized access, or use it to send unlawful communications. We may suspend accounts that violate these terms.',
      },
      {
        heading: '5. Service Availability',
        body: 'We work to keep the service available at all times and announce scheduled maintenance in advance. The service is provided "as is" to the maximum extent permitted by law.',
      },
      {
        heading: '6. SMS Messaging Program',
        body: 'ChurchGeniusPro lets churches send informational text messages (event and service reminders, RSVP confirmations, volunteer scheduling, children\'s ministry pickup alerts and prayer updates) to people who opt in on their church\'s SMS sign-up form and confirm by replying YES. Messages begin with the church\'s name. Message frequency varies. Message and data rates may apply. Reply STOP to cancel at any time; you will receive one confirmation and no further messages. Reply HELP for help, or email support@churchgeniuspro.com. Carriers are not liable for delayed or undelivered messages. Consent to receive texts is not a condition of membership or of any purchase. Churches using ChurchGeniusPro must send texts only to people who have given consent.',
        links: SMS_LINKS,
      },
    ],
  },
  sms: {
    title: 'SMS Messaging & Opt-In',
    updated: 'October 19, 2026',
    sections: [
      {
        heading: '1. About This Program',
        body: 'ChurchGeniusPro, operated by ChurchGenius LLC, is church-management software. Churches that use it send informational text messages to their own members, guests and volunteers who have opted in: event and service reminders, RSVP confirmations, volunteer schedules, children\'s ministry pickup alerts and prayer-request updates. We do not send marketing or promotional text messages, and we never use purchased or shared phone lists.',
      },
      {
        heading: '2. How People Opt In',
        body: 'Each church shares its own SMS sign-up page. A person enters their name and mobile number and ticks a consent checkbox, which is never pre-checked (see the example below). We then send one text asking them to reply YES to confirm (double opt-in); no other messages are sent until they confirm. Consent is not a condition of membership or of any purchase.',
      },
      {
        heading: '3. Message Frequency and Cost',
        body: 'Message frequency varies with the church\'s activities. Message and data rates may apply.',
      },
      {
        heading: '4. Opting Out and Getting Help',
        body: 'Reply STOP to any message to stop receiving texts; you will receive one confirmation and no further messages. Reply START to sign up again. Reply HELP for help, or email support@churchgeniuspro.com. Carriers are not liable for delayed or undelivered messages.',
      },
      {
        heading: '5. Privacy',
        body: 'Mobile phone numbers and SMS opt-in consent are never sold, rented, or shared with third parties or affiliates for their marketing purposes. Read our Privacy Policy and Terms of Service for details.',
        links: [
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Terms of Service', href: '/terms' },
        ],
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

/**
 * A faithful, non-functional copy of the sign-up form each church shares
 * (ChurchGeniusPro app: smsOptIn.html), shown so carriers and reviewers can see
 * exactly how consent is collected. Same fields, same unchecked checkbox, same wording.
 */
function SmsOptInExample() {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold text-slate-900">Example: a church&apos;s SMS sign-up form</h2>
      <p className="mt-3 leading-relaxed text-slate-600">
        This is what a person sees on their church&apos;s sign-up page. &ldquo;Grace Community Church&rdquo; is an
        example name; each church&apos;s page shows its own name.
      </p>
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 shadow-sm" aria-label="Example SMS sign-up form">
        <div className="bg-slate-800 px-6 py-5 text-center text-white">
          <p className="text-lg font-bold">Grace Community Church</p>
          <p className="text-sm text-slate-300">SMS Notifications</p>
        </div>
        <form className="space-y-4 bg-white p-6" onSubmit={(e) => e.preventDefault()}>
          {[
            { id: 'ex-first', label: 'First Name', placeholder: 'Enter your first name', type: 'text' },
            { id: 'ex-last', label: 'Last Name', placeholder: 'Enter your last name', type: 'text' },
            { id: 'ex-phone', label: 'Phone Number', placeholder: '(555) 555-5555', type: 'tel' },
          ].map((f) => (
            <div key={f.id}>
              <label htmlFor={f.id} className="block text-sm font-semibold text-slate-700">
                {f.label} <span className="text-red-600">*</span>
              </label>
              <input
                id={f.id}
                type={f.type}
                placeholder={f.placeholder}
                disabled
                className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-500"
              />
            </div>
          ))}
          <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <input id="ex-consent" type="checkbox" disabled className="mt-1 h-4 w-4" />
            <label htmlFor="ex-consent" className="text-sm leading-relaxed text-slate-600">
              I agree to receive SMS text messages from <strong>Grace Community Church</strong>. Message &amp; data
              rates may apply. Message frequency varies. Reply <strong>STOP</strong> to opt out at any time. Reply{' '}
              <strong>HELP</strong> for help.
            </label>
          </div>
          <button
            type="submit"
            disabled
            className="w-full rounded-lg bg-slate-400 px-4 py-3 font-semibold text-white"
          >
            Sign Up for SMS
          </button>
          <p className="text-xs leading-relaxed text-slate-500">
            By submitting, you consent to receive automated text messages from Grace Community Church. Consent is not a
            condition of membership. Standard messaging rates apply.
          </p>
        </form>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        After submitting, the person receives: &ldquo;Grace Community Church: You have requested to receive SMS
        messages from us. Reply YES to confirm. Reply STOP to cancel. Msg &amp; data rates may apply.&rdquo;
      </p>
    </div>
  );
}

export default function Legal({ page }: { page: LegalPage }) {
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
          {page === 'sms' && <SmsOptInExample />}
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
