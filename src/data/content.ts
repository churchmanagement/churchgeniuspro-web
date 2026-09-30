/** A plan feature: plain text, or a heading with sub-items (e.g. Accounting, Advanced AI). */
export type PlanFeature = string | { label: string; items: string[] };

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  badge?: string;
  cta: string;
  highlighted: boolean;
  /** Short lead-in shown above the list, e.g. "Everything in Free, plus:" */
  includesFrom?: string;
  features: PlanFeature[];
}

/** Limited-time offer headline shown on the Pricing page and in the pricing section. */
export const pricingOffer = {
  label: 'Limited Time Offer',
  trialLength: '2 months',
  summary: 'Free $0 · Standard $14.99/month · Pro $24.99/month',
};

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Free',
    price: '$0',
    period: 'month',
    description: 'Perfect for small churches getting started.',
    cta: 'Get Started Free',
    highlighted: false,
    features: [
      'People: up to 50',
      'Emails: 200/month',
      'SMS: 50/month (additional SMS can be purchased)',
      'Giving: 20/month',
      { label: 'Portals', items: ['3 Member Portals', '3 Kids Portals', '1 Church User'] },
      'Prayer Ministry',
      'Event Registration',
      'Attendance',
      'Groups',
      'Private Page Access',
      'Customize NTag',
      'Compose Emails',
      'Reminders',
      'Certificates',
      'Public Screens',
      'Follow-ups',
      'Song Books',
      'Advanced Help Documents',
      'Limited Customer Service',
      'Limited Assistance',
    ],
  },
  {
    name: 'Standard',
    price: '$14.99',
    period: 'month',
    description: 'The full ministry toolkit, with accounting, for growing churches.',
    badge: 'Most Popular',
    cta: 'Start 2-Month Free Trial',
    highlighted: true,
    includesFrom: 'Everything in Free, plus:',
    features: [
      'People: up to 100',
      'Emails: 500/month',
      'SMS: 100/month (additional SMS can be purchased)',
      'Giving: Unlimited',
      'Portals: Unlimited',
      {
        label: 'Accounting, including',
        items: [
          'Bank Imports',
          'Bank Sync (up to 3 accounts)',
          'Pledges',
          'Online Giving',
          'Reports',
          'and more',
        ],
      },
      'Event Check-ins & Kids Check-in',
      'Volunteer Scheduling',
      'Worship Planning',
      'Kids Ministry',
      'Mobile App',
      'Customer Service',
      'Assistance',
    ],
  },
  {
    name: 'Pro',
    price: '$24.99',
    period: 'month',
    description: 'Unlimited everything, all accounting features, and advanced AI.',
    badge: 'Includes AI',
    cta: 'Start 2-Month Free Trial',
    highlighted: false,
    includesFrom: 'Everything in Standard, plus:',
    features: [
      'People: Unlimited',
      'Emails: Unlimited',
      'SMS: 100/month (additional SMS can be purchased)',
      'Giving: Unlimited',
      'Member Portals: Unlimited (including unlimited Members and Kids)',
      {
        label: 'Accounting — all features, including',
        items: [
          'AI-Assisted Accounting',
          'Bank Imports',
          'Payroll',
          'Bank Sync',
          'Pledges',
          'Online Giving',
          'Reports',
          'Check Scanning',
          'and more',
        ],
      },
      'Event Check-ins & Kids Check-in',
      {
        label: 'Advanced AI',
        items: [
          'Type Search',
          'Auto-fill screens using Voice',
          'Converse',
          'Scan Checks and Documents',
          'File Uploads',
        ],
      },
      'Priority Customer Service',
      'Priority Application Setup & Assistance',
    ],
  },
];

/** Everything unlocked during the 2-month free trial. */
export const trialFeatures: PlanFeature[] = [
  'People: Unlimited',
  'Emails: Unlimited',
  'SMS: 100/month (additional SMS can be purchased)',
  'Giving: Unlimited',
  'Portals: Unlimited (including unlimited Members and Kids)',
  {
    label: 'Accounting — all features',
    items: [
      'AI-Assisted Accounting',
      'Bank Imports',
      'Payroll',
      'Bank Sync',
      'Pledges',
      'Online Giving',
      'Reports',
      'Check Scanning',
      'and more',
    ],
  },
  {
    label: 'Advanced AI',
    items: [
      'Type Search',
      'Auto-fill screens using Voice',
      'Converse',
      'Scan Checks and Documents',
      'File Uploads',
    ],
  },
  {
    label: 'Ministry tools',
    items: [
      'Event Check-ins & Kids Check-in',
      'Volunteer Scheduling',
      'Worship Planning',
      'Kids Ministry',
      'Prayer Ministry',
      'Event Registration',
      'Attendance',
      'Groups',
    ],
  },
  {
    label: 'Communication & more',
    items: [
      'Private Page Access',
      'Customize NTag',
      'Compose Emails',
      'Reminders',
      'Certificates',
      'Public Screens',
      'Follow-ups',
      'Song Books',
      'Advanced Help Documents',
      'Customer Service',
    ],
  },
];

export interface AddOn {
  name: string;
  price: string;
  emoji: string;
  description: string;
  features: string[];
  /** Optional important notice shown under the card's features. */
  note?: string;
}

/** "Extras" shown under the plans on the Pricing page. */
export const addOns: AddOn[] = [
  {
    name: 'Application Setup',
    price: 'Free',
    emoji: '🛠️',
    description: 'We help you get your church set up and running.',
    features: ['Application setup is free', 'Available on every plan'],
  },
  {
    name: 'Migration from an Existing Application',
    price: '$100 one-time',
    emoji: '🔄',
    description: 'Move your data over from the application you use today.',
    features: ['One-time fee of $100', 'Members, families, and giving history'],
    note: 'Migration is not guaranteed for complex databases or for applications with different functionality from ChurchGeniusPro.',
  },
  {
    name: 'Additional SMS',
    price: '$1.99 / 100 SMS',
    emoji: '📱',
    description: 'Top up any plan with extra text messages.',
    features: ['100 additional SMS for $1.99', 'Purchase additional packages as needed'],
  },
];

export interface PlanComparisonRow {
  feature: string;
  free: string;
  standard: string;
  pro: string;
}

export interface PlanComparisonGroup {
  group: string;
  rows: PlanComparisonRow[];
}

const allPlans = { free: '✓', standard: '✓', pro: '✓' };
const paidPlans = { free: '—', standard: '✓', pro: '✓' };
const proOnly = { free: '—', standard: '—', pro: '✓' };

export const planComparison: PlanComparisonGroup[] = [
  {
    group: 'Limits',
    rows: [
      { feature: 'People', free: 'Up to 50', standard: 'Up to 100', pro: 'Unlimited' },
      { feature: 'Emails', free: '200/month', standard: '500/month', pro: 'Unlimited' },
      {
        feature: 'SMS (more can be purchased)',
        free: '50/month',
        standard: '100/month',
        pro: '100/month',
      },
      { feature: 'Giving', free: '20/month', standard: 'Unlimited', pro: 'Unlimited' },
      { feature: 'Member & Kids Portals', free: '3 each', standard: 'Unlimited', pro: 'Unlimited' },
      { feature: 'Church Users', free: '1', standard: 'Unlimited', pro: 'Unlimited' },
    ],
  },
  {
    group: 'Accounting',
    rows: [
      { feature: 'Bank Imports', ...paidPlans },
      { feature: 'Bank Sync', free: '—', standard: 'Up to 3 accounts', pro: '✓' },
      { feature: 'Pledges', ...paidPlans },
      { feature: 'Financial Reports', ...paidPlans },
      { feature: 'AI-Assisted Accounting', ...proOnly },
      { feature: 'Payroll', ...proOnly },
      { feature: 'Check Scanning', ...proOnly },
    ],
  },
  {
    group: 'Ministry',
    rows: [
      { feature: 'Event Check-ins & Kids Check-in', ...paidPlans },
      { feature: 'Volunteer Scheduling', ...paidPlans },
      { feature: 'Worship Planning', ...paidPlans },
      { feature: 'Kids Ministry', ...paidPlans },
      { feature: 'Mobile App', ...paidPlans },
      { feature: 'Prayer Ministry', ...allPlans },
      { feature: 'Event Registration', ...allPlans },
      { feature: 'Attendance', ...allPlans },
      { feature: 'Groups', ...allPlans },
      { feature: 'Follow-ups', ...allPlans },
      { feature: 'Song Books', ...allPlans },
    ],
  },
  {
    group: 'Communication & tools',
    rows: [
      { feature: 'Compose Emails', ...allPlans },
      { feature: 'Reminders', ...allPlans },
      { feature: 'Certificates', ...allPlans },
      { feature: 'Public Screens', ...allPlans },
      { feature: 'Private Page Access', ...allPlans },
      { feature: 'Customize NTag', ...allPlans },
    ],
  },
  {
    group: 'Advanced AI',
    rows: [
      { feature: 'Type Search', ...proOnly },
      { feature: 'Auto-fill Screens Using Voice', ...proOnly },
      { feature: 'Converse', ...proOnly },
      { feature: 'Scan Checks & Documents', ...proOnly },
      { feature: 'File Uploads', ...proOnly },
    ],
  },
  {
    group: 'Help & support',
    rows: [
      { feature: 'Advanced Help Documents', ...allPlans },
      { feature: 'Customer Service', free: 'Limited', standard: '✓', pro: 'Priority' },
      {
        feature: 'Application Setup & Assistance',
        free: 'Limited',
        standard: '✓',
        pro: 'Priority',
      },
    ],
  },
];

export const pricingPerks = [
  'Free version available',
  '2-month free trial',
  'Free application setup',
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  church: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'We replaced five different tools with ChurchGeniusPro. The AI assistant does our data entry now — I photograph a bank statement and every transaction is in the books in minutes.',
    name: 'Pastor Michael Reynolds',
    role: 'Senior Pastor',
    church: 'Grace Community Church',
  },
  {
    quote:
      'Kids check-in used to be chaos on Sunday mornings. Now parents scan a code, children are placed in the right classroom automatically, and volunteers see medical notes instantly.',
    name: 'Sarah Okafor',
    role: "Children's Ministry Director",
    church: 'New Life Fellowship',
  },
  {
    quote:
      'I am not an accountant, but our books have never been cleaner. Board-ready reports in one click, and tax statements that used to take a week now take minutes.',
    name: 'David Chen',
    role: 'Church Administrator',
    church: 'Cornerstone Chapel',
  },
  {
    quote:
      'The voice commands feel like magic. I say "add a new family" while walking through the lobby and it is done before I reach my office.',
    name: 'Rev. Angela Martinez',
    role: 'Executive Pastor',
    church: 'Hillside Church',
  },
  {
    quote:
      'Migration was completely free and painless — their team moved years of member and giving data for us. We were live in a week.',
    name: 'James Whitfield',
    role: 'Operations Director',
    church: 'Redemption City Church',
  },
];

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQ[] = [
  {
    question: 'Is there really a free version?',
    answer:
      'Yes. The Free plan includes core church management for a limited number of members, with basic reports — free forever, no credit card required. For a limited time, you can also try every feature free for 2 months.',
    category: 'Pricing',
  },
  {
    question: 'Do I need technical or accounting experience?',
    answer:
      'No. ChurchGeniusPro is built for non-experts, with clear screens, helpful prompts, and a step-by-step Help Center. The built-in AI does most of the typing for you — speak, scan, or type a single word.',
    category: 'Getting Started',
  },
  {
    question: 'How does the AI assistant work?',
    answer:
      'Type or speak in plain language — "show last month\'s giving", "add a new family" — and the assistant takes you there or completes the action. It can also read checks, bank statements, and membership forms from a photo and fill in the data automatically.',
    category: 'AI',
  },
  {
    question: 'Can you migrate our data from another system?',
    answer:
      'Yes. Application setup is free, and migration from an existing application is available for a $100 one-time fee. We help you move members, families, and giving history. Migration is not guaranteed for complex databases or for applications with different functionality from ChurchGeniusPro.',
    category: 'Getting Started',
  },
  {
    question: "Is our data safe? What about children's information?",
    answer:
      'Security is built in at every level: role-based access, separate staff/member/child portals, secure code and barcode kids check-in, and Wi-Fi-only private pages that only open on your church network.',
    category: 'Security',
  },
  {
    question: 'Does it replace our accounting software?',
    answer:
      'Yes. Accounting is included in the paid plans. Standard ($14.99/month) includes bank imports, bank sync for up to 3 accounts, pledges, online giving, and reports. Pro ($24.99/month) includes all accounting features, adding AI-assisted accounting, payroll, and check scanning — all connected to your giving records.',
    category: 'Accounting',
  },
  {
    question: 'Is there a mobile app?',
    answer:
      'Yes. The mobile app puts giving, check-in, communication, and your everyday tools in your pocket. The website itself also installs as a Progressive Web App.',
    category: 'Mobile',
  },
  {
    question: 'Can members give online?',
    answer:
      'Yes — share your giving link or text-to-give number. Donations arrive instantly and are matched to the right donor and fund, so there is nothing to reconcile by hand.',
    category: 'Giving',
  },
  {
    question: 'What happens when we outgrow our plan?',
    answer:
      'Upgrade any time — your data stays exactly where it is. Whether you are a one-person office or a large multi-ministry church, ChurchGeniusPro grows with you.',
    category: 'Pricing',
  },
  {
    question: 'How do volunteers and guests log in without accounts?',
    answer:
      'Temporary login via barcode or NFC tag gives quick, secure, time-limited access — convenient for them, secure for you. Access ends automatically after their shift.',
    category: 'Security',
  },
];

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 40, suffix: '+', label: 'Features in one platform' },
  { value: 12, suffix: '', label: 'Tools replaced by one system' },
  { value: 90, suffix: '%', label: 'Less manual data entry with AI' },
  { value: 99.9, suffix: '%', label: 'Uptime you can rely on' },
];

export interface CompareRow {
  feature: string;
  cgp: boolean | string;
  spreadsheets: boolean | string;
  quickbooks: boolean | string;
  breeze: boolean | string;
  planningCenter: boolean | string;
  tithely: boolean | string;
}

/**
 * IMPORTANT — legal/accuracy notes for maintaining this table:
 * - Every non-ChurchGeniusPro cell must reflect the provider's OFFICIAL public
 *   website/documentation. Re-verify before changing, and update
 *   compareLastVerified whenever cells are re-checked.
 * - `false` renders as "—" and means "not offered as a built-in feature per the
 *   provider's official public materials as of the last-verified date" — never
 *   an absolute claim that a capability is impossible.
 * - String cells describe partial/add-on capability neutrally. No "Limited",
 *   "worse", or other judgment words about competitors.
 * Last verification: 2026-08-13 against quickbooks.intuit.com, breezechms.com,
 * planningcenter.com, tithe.ly official pages and support docs.
 */
export const compareLastVerified = 'August 13, 2026';

export const compareColumns = [
  'ChurchGeniusPro',
  'Spreadsheets',
  'QuickBooks Online',
  'Breeze ChMS',
  'Planning Center',
  'Tithe.ly',
];

export const compareRows: CompareRow[] = [
  {
    feature: 'Member & family management',
    cgp: true,
    spreadsheets: 'Manual',
    quickbooks: false,
    breeze: true,
    planningCenter: true,
    tithely: true,
  },
  {
    feature: 'Online giving & text-to-give',
    cgp: true,
    spreadsheets: false,
    quickbooks: 'Donations only',
    breeze: true,
    planningCenter: true,
    tithely: true,
  },
  {
    feature: 'Events & church calendar',
    cgp: true,
    spreadsheets: 'Manual',
    quickbooks: false,
    breeze: true,
    planningCenter: true,
    tithely: true,
  },
  {
    feature: 'Worship & service planning',
    cgp: true,
    spreadsheets: false,
    quickbooks: false,
    breeze: 'Add-on',
    planningCenter: true,
    tithely: 'Add-on',
  },
  {
    feature: 'Classes, groups & attendance tracking',
    cgp: true,
    spreadsheets: 'Manual',
    quickbooks: false,
    breeze: true,
    planningCenter: true,
    tithely: true,
  },
  {
    feature: 'Automatic Sunday School exams & grading',
    cgp: true,
    spreadsheets: false,
    quickbooks: false,
    breeze: false,
    planningCenter: false,
    tithely: false,
  },
  {
    feature: 'Kids check-in with medical & allergy notes',
    cgp: true,
    spreadsheets: false,
    quickbooks: false,
    breeze: true,
    planningCenter: true,
    tithely: true,
  },
  {
    feature: 'Recurring giving, reminders & year-end statements',
    cgp: true,
    spreadsheets: 'Manual',
    quickbooks: 'Partial',
    breeze: true,
    planningCenter: true,
    tithely: true,
  },
  {
    feature: 'Church accounting: income, expenses & fund reports',
    cgp: 'Standard & Pro',
    spreadsheets: 'Manual',
    quickbooks: 'Via class tracking',
    breeze: false,
    planningCenter: false,
    tithely: false,
  },
  {
    feature: 'Payroll',
    cgp: 'Pro plan',
    spreadsheets: false,
    quickbooks: 'Add-on',
    breeze: false,
    planningCenter: false,
    tithely: false,
  },
  {
    feature: 'Scanning & OCR (checks, bank statements, forms)',
    cgp: 'Pro plan',
    spreadsheets: false,
    quickbooks: 'Receipts',
    breeze: 'Check reader',
    planningCenter: 'Checks',
    tithely: 'Checks (beta)',
  },
  {
    feature: 'Built-in conversational AI assistant',
    cgp: 'Pro plan',
    spreadsheets: false,
    quickbooks: 'Chat AI (beta)',
    breeze: false,
    planningCenter: 'Via integration',
    tithely: 'Some AI tools',
  },
  {
    feature: 'Voice commands & hands-free entry',
    cgp: 'Pro plan',
    spreadsheets: false,
    quickbooks: false,
    breeze: false,
    planningCenter: false,
    tithely: false,
  },
  {
    feature: 'Temporary barcode / NFC guest login',
    cgp: 'Pro plan',
    spreadsheets: false,
    quickbooks: false,
    breeze: false,
    planningCenter: false,
    tithely: false,
  },
  {
    feature: 'Mobile app',
    cgp: true,
    spreadsheets: 'Varies',
    quickbooks: true,
    breeze: true,
    planningCenter: true,
    tithely: true,
  },
  {
    feature: 'Church management & accounting in one platform',
    cgp: 'Standard & Pro',
    spreadsheets: false,
    quickbooks: false,
    breeze: false,
    planningCenter: false,
    tithely: false,
  },
];

export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Features', path: '/features' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Compare', path: '/compare' },
  { name: 'Help Center', path: '/help' },
  { name: 'Support', path: '/support' },
];
