export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  badge?: string;
  dealValue?: string;
  cta: string;
  highlighted: boolean;
  features: string[];
}

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Free',
    price: '$0',
    period: 'month',
    description: 'Perfect for small churches getting started.',
    dealValue: '$25',
    cta: 'Get Started',
    highlighted: false,
    features: [
      'People management — up to 50 people',
      'Online & text giving — 10 transactions/month',
      '30 emails + 10 SMS per month',
      'Up to 3 staff portals',
      'Up to 2 meetings per month',
      'Basic event management & group management',
      'Membership management & prayer ministry',
      'Limited public screens & favorites',
      'Help Center',
    ],
  },
  {
    name: 'Standard',
    price: '$15',
    period: 'month',
    description: 'The full ministry toolkit for growing churches.',
    badge: 'Most Popular',
    dealValue: '$50',
    cta: 'Start Free Trial',
    highlighted: true,
    features: [
      'Everything in Free, plus:',
      'People management — up to 200 people',
      'Online & text giving — 30 transactions/month',
      '3 staff, 3 kids & 3 child portals',
      'Full event management, registration & calendar',
      'Event check-in & kids check-in',
      'Kids ministry & Sunday School registration',
      'Worship planning & song book',
      'Attendance tracking, follow-ups & volunteers',
      'Member directory & in-app chat',
      'Certificates, reminders & giving management',
      '30 SMS per month',
    ],
  },
  {
    name: 'Pro',
    price: '$25',
    period: 'month',
    description: 'Unlimited everything, powered by AI.',
    badge: 'Includes AI',
    dealValue: '$75',
    cta: 'Start Free Trial',
    highlighted: false,
    features: [
      'Everything in Standard, plus:',
      'Unlimited people management',
      'Unlimited online & text giving',
      'Unlimited staff, kids & child portals',
      'AI features',
      '100 SMS/month included (more available)',
      'NFC tag & barcode login',
      'Private page access',
      'Pledges & full public screens',
      'Unlimited meetings & compose emails',
    ],
  },
];

export interface AddOn {
  name: string;
  price: string;
  emoji: string;
  description: string;
  features: string[];
}

export const addOns: AddOn[] = [
  {
    name: 'Accounting Module',
    price: '+$10/month',
    emoji: '📊',
    description: 'Proper church books, connected to your giving.',
    features: ['Income management', 'Expense management', 'Financial reports'],
  },
  {
    name: 'Advanced Accounting with AI',
    price: '+$25/month',
    emoji: '🤖',
    description: 'Everything in the Accounting Module, plus AI that does the typing.',
    features: [
      'AI-assisted accounting',
      'Check scanning',
      'Payroll',
      'Pledges',
      'Bank statement import',
      'Bank synchronization',
      'Advanced financial reporting',
    ],
  },
  {
    name: 'Additional SMS',
    price: '$1.50 / 100 SMS',
    emoji: '📱',
    description: 'Top up any plan with extra text messages.',
    features: ['100 SMS for $1.50', 'Purchase additional packages as needed', 'No expiration'],
  },
];

export interface PlanComparisonRow {
  feature: string;
  free: string;
  standard: string;
  pro: string;
}

export const planComparison: PlanComparisonRow[] = [
  { feature: 'People Management', free: '50', standard: '200', pro: 'Unlimited' },
  { feature: 'Staff Portals', free: '3', standard: '3', pro: 'Unlimited' },
  { feature: 'Kids & Child Portals', free: '—', standard: '3 each', pro: 'Unlimited' },
  { feature: 'Meetings', free: '2/month', standard: 'Unlimited', pro: 'Unlimited' },
  { feature: 'Event Management', free: 'Basic', standard: 'Full', pro: 'Full' },
  { feature: 'Event Registration', free: '—', standard: '✓', pro: '✓' },
  { feature: 'Kids Ministry', free: '—', standard: '✓', pro: '✓' },
  { feature: 'Sunday School', free: '—', standard: '✓', pro: '✓' },
  { feature: 'Volunteer Management', free: '—', standard: '✓', pro: '✓' },
  { feature: 'Worship Planning', free: '—', standard: '✓', pro: '✓' },
  { feature: 'Attendance', free: '—', standard: '✓', pro: '✓' },
  { feature: 'Event & Kids Check-in', free: '—', standard: '✓', pro: '✓' },
  { feature: 'Member Directory', free: '—', standard: '✓', pro: '✓' },
  { feature: 'Song Book', free: '—', standard: '✓', pro: '✓' },
  { feature: 'AI Features', free: '—', standard: '—', pro: '✓' },
  { feature: 'Public Screens', free: 'Limited', standard: 'Limited', pro: 'Full' },
  { feature: 'SMS Included', free: '10/month', standard: '30/month', pro: '100/month' },
  { feature: 'Help Center', free: '✓', standard: '✓', pro: '✓' },
];

export const pricingPerks = [
  'Free version available',
  '1-month free trial',
  'Free migration support',
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
      'Yes. The Free plan includes core church management for a limited number of members, with basic reports — free forever, no credit card required. Paid plans also come with a 1-month free trial.',
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
      'Yes — migration support is free. We help you move members, families, giving history, and financial data from spreadsheets or other church management systems.',
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
      'Yes. Add the Accounting Module (+$10/month) for income, expenses, and financial reports — or Advanced Accounting with AI (+$25/month) for check scanning, payroll, bank statement import, bank sync, and AI-assisted entry, all connected to your giving records.',
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
    cgp: 'Add-on',
    spreadsheets: 'Manual',
    quickbooks: 'Via class tracking',
    breeze: false,
    planningCenter: false,
    tithely: false,
  },
  {
    feature: 'Payroll',
    cgp: 'Add-on',
    spreadsheets: false,
    quickbooks: 'Add-on',
    breeze: false,
    planningCenter: false,
    tithely: false,
  },
  {
    feature: 'Scanning & OCR (checks, bank statements, forms)',
    cgp: 'Add-on',
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
    cgp: 'With add-on',
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
