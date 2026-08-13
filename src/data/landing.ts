/**
 * Dedicated SEO landing pages.
 *
 * Each entry becomes a fully prerendered page at /<slug> via:
 *  - a <Route> in App.tsx rendering <Landing slug=... />
 *  - a RouteMeta entry generated in src/data/seo.ts (title/description/canonical,
 *    sitemap + prerender pick it up automatically)
 *
 * Content guidelines (see docs/SEO_Keyword_Content_Strategy.md):
 *  - one primary keyword per page, in the title tag, H1, and first paragraph
 *  - honest, substantial copy — real limits, real prices, no "#1" claims
 *  - every page interlinks with related landing pages, /features, and /pricing
 */

export type LandingSlug =
  | 'church-management-software'
  | 'free-church-management-software'
  | 'ai-church-management-software'
  | 'church-accounting-software'
  | 'small-church-management-software'
  | 'church-app';

export interface LandingSection {
  eyebrow?: string;
  title: string;
  /** Prose paragraphs — rendered as real <p> content, not bullets. */
  body: string[];
  /** Optional supporting points rendered as cards under the prose. */
  bullets?: { title: string; description: string }[];
  /** Optional screenshot slug from src/data/screens.ts. */
  screenshotSlug?: string;
}

export interface LandingFAQ {
  question: string;
  answer: string;
}

export interface RelatedLink {
  name: string;
  to: string;
  description: string;
}

export interface LandingPageData {
  slug: LandingSlug;
  /** <title> tag — primary keyword first. */
  title: string;
  metaDescription: string;
  eyebrow: string;
  /** H1 — plain part. */
  h1: string;
  /** H1 — gradient-highlighted part. */
  h1Gradient: string;
  /** Hero paragraphs. The first contains the primary keyword naturally. */
  intro: string[];
  sections: LandingSection[];
  faqs: LandingFAQ[];
  related: RelatedLink[];
  /** Render the compact 3-plan pricing strip. */
  showPricingTeaser?: boolean;
}

export const landingPages: LandingPageData[] = [
  // ---------------------------------------------------------------- hub page
  {
    slug: 'church-management-software',
    title: 'Church Management Software — AI-Powered | ChurchGeniusPro',
    metaDescription:
      'All-in-one church management software: members, giving, events, kids check-in, volunteers, and built-in accounting — with an AI assistant. Start free.',
    eyebrow: 'Church Management Software',
    h1: 'One platform for your',
    h1Gradient: 'entire church.',
    intro: [
      'ChurchGeniusPro is church management software that brings members, families, attendance, events, online giving, volunteers, worship services, communication, and accounting into a single connected system — with AI-powered tools that save your staff hours every week.',
      'Instead of juggling a spreadsheet for members, a separate giving platform, a calendar app, and QuickBooks for the books, everything lives in one place and talks to everything else.',
    ],
    sections: [
      {
        eyebrow: 'People first',
        title: 'Members, families, and attendance in one database',
        body: [
          'Every person in your church gets one profile that connects to everything they do: the family they belong to, the groups they serve in, the services they attend, and the gifts they give. Update a phone number once and it is current everywhere.',
          'Attendance tracking, automated follow-ups, a member directory, and separate portals for staff, members, and children mean each person sees exactly what they should — and nothing they should not.',
        ],
        bullets: [
          {
            title: 'Member & family management',
            description: 'Profiles, households, milestones, and custom fields for your congregation.',
          },
          {
            title: 'Attendance & follow-ups',
            description: 'Track who attended, spot who is missing, and follow up automatically.',
          },
          {
            title: 'Role-based portals',
            description: 'Staff, member, kids, and child portals with access that fits each role.',
          },
        ],
        screenshotSlug: 'meetings',
      },
      {
        eyebrow: 'Ministry tools',
        title: 'Events, kids ministry, worship, and volunteers',
        body: [
          'Plan services and events with registration, fees, and QR check-in. Run kids ministry with secure code and barcode check-in, classroom rosters, and a parents portal. Schedule worship teams and volunteers week by week — and let automatic reminders do the chasing.',
        ],
        bullets: [
          {
            title: 'Events & calendar',
            description: 'Registration, RSVPs, fees, and check-in for every service and gathering.',
          },
          {
            title: 'Kids check-in',
            description: 'Secure code and barcode check-in with medical notes volunteers can see instantly.',
          },
          {
            title: 'Worship planning',
            description: 'Plan services, teams, and songs — connected to your song book.',
          },
          {
            title: 'Volunteer management',
            description: 'Recruit, schedule, and appreciate the people who make Sunday happen.',
          },
        ],
        screenshotSlug: 'events-calendar',
      },
      {
        eyebrow: 'The difference',
        title: 'Accounting built in — not bolted on',
        body: [
          'Most church management systems stop at people and giving, and send you to QuickBooks for the books. ChurchGeniusPro includes real church accounting as an add-on module: income and expense management, fund-based reports, payroll, pledges, and year-end giving statements — all connected to your giving records, so there is nothing to re-enter or reconcile by hand.',
          'With Advanced Accounting with AI, you can photograph a check or a bank statement and watch the transactions appear in your books.',
        ],
        screenshotSlug: 'accounting-reports',
      },
      {
        eyebrow: 'Work smarter',
        title: 'An AI assistant that does the typing',
        body: [
          'Say or type plain language — "add a new family", "show last month\'s giving" — and the assistant completes the action. It reads checks, bank statements, and membership forms from a photo, fills in the data, and answers questions from a help center that knows church workflows.',
        ],
        screenshotSlug: 'help-center',
      },
    ],
    faqs: [
      {
        question: 'What is church management software?',
        answer:
          'Church management software (often called ChMS) is a system that helps churches organize membership records, attendance, giving, events, volunteers, and communication in one place. ChurchGeniusPro also adds built-in accounting and an AI assistant, so churches do not need separate bookkeeping or data-entry tools.',
      },
      {
        question: 'How much does ChurchGeniusPro cost?',
        answer:
          'There is a Free plan for up to 50 people, a Standard plan at $15/month, and a Pro plan at $25/month with AI features. Accounting is available as an add-on from $10/month. Paid plans include a 1-month free trial and free migration support.',
      },
      {
        question: 'Can we switch from our current system without losing data?',
        answer:
          'Yes — migration support is free. The team helps you move members, families, giving history, and financial data from spreadsheets or other church management systems, and most churches are live within a week.',
      },
      {
        question: 'Does it work for churches of any size?',
        answer:
          'Yes. Small churches often start on the Free plan and upgrade as they grow; larger churches use Pro with unlimited people, portals, and giving. Your data stays in place whenever you change plans.',
      },
      {
        question: 'Is there a mobile app?',
        answer:
          'Yes. ChurchGeniusPro has a mobile app and the website installs as a Progressive Web App, so giving, check-in, and everyday tools work from any phone or tablet.',
      },
    ],
    related: [
      {
        name: 'Free Church Management Software',
        to: '/free-church-management-software',
        description: 'A real $0 plan — not a trial. See exactly what is included.',
      },
      {
        name: 'AI Church Management Software',
        to: '/ai-church-management-software',
        description: 'Voice commands, OCR, and an assistant that does data entry.',
      },
      {
        name: 'Church Accounting Software',
        to: '/church-accounting-software',
        description: 'Fund accounting, payroll, and year-end statements built in.',
      },
      {
        name: 'For Small Churches',
        to: '/small-church-management-software',
        description: 'Simple to run, free to start, grows when you do.',
      },
      {
        name: 'Church App',
        to: '/church-app',
        description: 'Mobile app + web app for giving, check-in, and connection.',
      },
      {
        name: 'Compare Systems',
        to: '/compare',
        description: 'ChurchGeniusPro vs. spreadsheets, QuickBooks, and other ChMS.',
      },
    ],
    showPricingTeaser: true,
  },

  // ---------------------------------------------------------- free plan page
  {
    slug: 'free-church-management-software',
    title: 'Free Church Management Software — $0 Plan | ChurchGeniusPro',
    metaDescription:
      'Genuinely free church management software: up to 50 people, online giving, events, and membership tools at $0/month — free forever, no credit card.',
    eyebrow: 'Free Plan',
    h1: 'Free church management software.',
    h1Gradient: 'Actually free.',
    intro: [
      'ChurchGeniusPro\'s Free plan is real free church management software — not a 30-day trial and not a "free" plan funded by fees on every donation. Manage up to 50 people, record giving, run events and groups, and organize membership at $0/month, forever, with no credit card required.',
      'When your church grows past the Free plan\'s limits, upgrade in place — your data never moves.',
    ],
    sections: [
      {
        eyebrow: 'What you get',
        title: 'What the Free plan includes',
        body: [
          'The Free plan is designed for small churches getting started, and it covers the essentials of everyday church administration:',
        ],
        bullets: [
          {
            title: 'People management — up to 50 people',
            description: 'Member and family profiles, membership management, and prayer ministry.',
          },
          {
            title: 'Online & text giving',
            description: '10 transactions per month, matched to the right donor automatically.',
          },
          {
            title: 'Communication',
            description: '30 emails and 10 SMS per month to keep your congregation informed.',
          },
          {
            title: 'Events & groups',
            description: 'Basic event management, group management, and 2 meetings per month.',
          },
          {
            title: 'Staff portals',
            description: 'Up to 3 staff portals with role-based access.',
          },
          {
            title: 'Help Center',
            description: 'Step-by-step guides for administrators, volunteers, and members.',
          },
        ],
        screenshotSlug: 'online-giving',
      },
      {
        eyebrow: 'Honest comparison',
        title: '"Free trial" and "donation-fee" plans are not free',
        body: [
          'Most church software advertised as free is one of two things: a time-limited trial that starts billing after 30 days, or a plan that takes a percentage of every donation your members give. Both cost real money — the second one costs more the more generous your church is.',
          'ChurchGeniusPro\'s Free plan is neither. It is a permanent tier with clear limits, so a small church can run indefinitely at $0. We are equally clear about what it does not include: attendance tracking, kids check-in, worship planning, volunteer scheduling, and accounting live in the paid plans, which start at $15/month with a 1-month free trial.',
        ],
      },
      {
        eyebrow: 'Growing?',
        title: 'An upgrade path that respects your data',
        body: [
          'Churches outgrow the Free plan in predictable ways: more than 50 people, more than 10 gifts a month, or a need for check-in and attendance. When that happens, upgrading to Standard ($15/month) or Pro ($25/month) is one click — every member record, giving entry, and event you created stays exactly where it is.',
          'Migration in the other direction is free too: if your records currently live in spreadsheets or another system, the team moves them for you at no cost.',
        ],
        screenshotSlug: 'events-calendar',
      },
    ],
    faqs: [
      {
        question: 'Is the Free plan really free forever?',
        answer:
          'Yes. The Free plan is a permanent $0 tier, not a trial. It requires no credit card and never converts to a paid plan on its own.',
      },
      {
        question: 'What are the Free plan\'s limits?',
        answer:
          'Up to 50 people, 10 giving transactions per month, 30 emails and 10 SMS per month, 3 staff portals, 2 meetings per month, and basic event and group management. Attendance, check-in, worship planning, volunteers, and accounting require a paid plan.',
      },
      {
        question: 'Do you take a percentage of donations on the Free plan?',
        answer:
          'No. ChurchGeniusPro\'s pricing is a flat monthly fee per plan — the Free plan is $0/month. We do not fund the free tier by skimming donations.',
      },
      {
        question: 'What happens when we pass 50 people?',
        answer:
          'Upgrade to Standard ($15/month, up to 200 people) or Pro ($25/month, unlimited) whenever you are ready. All your data stays in place, and paid plans start with a 1-month free trial.',
      },
      {
        question: 'Can you move our data in from another system for free?',
        answer:
          'Yes — migration support is free on every plan, including Free. We move members, families, and giving history from spreadsheets or other church management software.',
      },
    ],
    related: [
      {
        name: 'View Full Pricing',
        to: '/pricing',
        description: 'Free, Standard $15/mo, Pro $25/mo — and what each includes.',
      },
      {
        name: 'For Small Churches',
        to: '/small-church-management-software',
        description: 'Why small churches pick ChurchGeniusPro to get organized.',
      },
      {
        name: 'Church Management Software',
        to: '/church-management-software',
        description: 'The full platform: people, ministry tools, accounting, and AI.',
      },
      {
        name: 'Church Accounting Software',
        to: '/church-accounting-software',
        description: 'Add real fund accounting from $10/month when you need it.',
      },
    ],
    showPricingTeaser: true,
  },

  // ------------------------------------------------------------ AI page
  {
    slug: 'ai-church-management-software',
    title: 'AI Church Management Software | ChurchGeniusPro',
    metaDescription:
      'AI church management software: a conversational assistant, voice commands, and OCR that reads checks, statements, and forms — up to 90% less data entry.',
    eyebrow: 'AI-Powered',
    h1: 'Church management software',
    h1Gradient: 'with AI built in.',
    intro: [
      'ChurchGeniusPro is AI church management software: a conversational assistant, voice commands, and document scanning are part of the platform itself — not a chatbot widget stapled onto an old system.',
      'The result is simple: your staff and volunteers stop typing data into screens, and the software does the busywork instead.',
    ],
    sections: [
      {
        eyebrow: 'Conversational',
        title: 'Tell it what you want. It does it.',
        body: [
          'The assistant understands plain language, typed or spoken. "Add a new family." "Show me last month\'s giving." "Take me to kids check-in." It navigates, completes actions, and answers questions — grounded in your church\'s data and a help center that knows church workflows.',
          'Voice commands work hands-free: pastors add follow-ups while walking the lobby, and administrators pull reports without hunting through menus.',
        ],
        screenshotSlug: 'help-center',
      },
      {
        eyebrow: 'OCR & scanning',
        title: 'Photograph it. It becomes data.',
        body: [
          'The AI reads documents your church already handles every week and turns them into structured records:',
        ],
        bullets: [
          {
            title: 'Checks',
            description: 'Scan a check and the donation is recorded to the right donor and fund.',
          },
          {
            title: 'Bank statements',
            description: 'Photograph or import a statement and every transaction lands in your books.',
          },
          {
            title: 'Membership forms',
            description: 'Paper forms become complete member profiles — no retyping.',
          },
        ],
        screenshotSlug: 'financial-reports',
      },
      {
        eyebrow: 'AI accounting',
        title: 'Books that keep themselves',
        body: [
          'With the Advanced Accounting with AI add-on, AI-assisted entry, check scanning, bank statement import, and bank synchronization keep your income and expenses current with minimal typing. Board-ready financial reports and compliant year-end giving statements are one click — churches report up to 90% less manual data entry.',
        ],
        screenshotSlug: 'payroll',
      },
      {
        eyebrow: 'Where to find it',
        title: 'Which plans include AI?',
        body: [
          'AI platform features — the assistant, voice commands, and OCR — are included in the Pro plan at $25/month. AI-assisted accounting is part of the Advanced Accounting with AI add-on at $25/month on top of any paid plan. Both come with a 1-month free trial, so you can measure the time savings before paying anything.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What can the AI assistant actually do?',
        answer:
          'It navigates the system, completes actions ("add a new family", "record this donation"), answers questions about your data, and reads checks, bank statements, and membership forms from photos to fill in records automatically. It works by text or voice.',
      },
      {
        question: 'Which plan includes the AI features?',
        answer:
          'The Pro plan ($25/month) includes the AI assistant, voice commands, and OCR. AI-assisted bookkeeping is part of the Advanced Accounting with AI add-on ($25/month) available on any paid plan.',
      },
      {
        question: 'Do we need technical skills to use the AI?',
        answer:
          'No. If you can send a text message or take a photo, you can use it. The assistant is built for church administrators and volunteers, not developers.',
      },
      {
        question: 'Is our church data used to train AI models?',
        answer:
          'No. Your data is used to serve your church — answering your questions and filling in your records. Role-based access controls what each user (and the assistant acting for them) can see.',
      },
      {
        question: 'How accurate is the check and statement scanning?',
        answer:
          'The AI fills in each field and shows you the result before it is saved, so you confirm entries rather than typing them. You always have the final say on what lands in your books.',
      },
    ],
    related: [
      {
        name: 'Church Accounting Software',
        to: '/church-accounting-software',
        description: 'The AI\'s biggest win: bookkeeping without the typing.',
      },
      {
        name: 'Church Management Software',
        to: '/church-management-software',
        description: 'Everything the platform does, beyond the AI.',
      },
      {
        name: 'View Pricing',
        to: '/pricing',
        description: 'Pro plan at $25/mo includes AI. 1-month free trial.',
      },
      {
        name: 'Watch It In Action',
        to: '/support',
        description: 'Video tutorials showing the assistant and OCR at work.',
      },
    ],
  },

  // ----------------------------------------------------- accounting hub page
  {
    slug: 'church-accounting-software',
    title: 'Church Accounting Software with Payroll | ChurchGeniusPro',
    metaDescription:
      'Church accounting software connected to your giving: fund-based income and expenses, payroll, and year-end giving statements — from $10/month.',
    eyebrow: 'Accounting',
    h1: 'Church accounting software',
    h1Gradient: 'connected to your giving.',
    intro: [
      'ChurchGeniusPro includes church accounting software as a built-in module — fund-based income and expenses, financial reports, payroll, pledges, and year-end giving statements, all connected to the same member and giving records the rest of your church runs on.',
      'No exporting donations to QuickBooks. No reconciling two systems that disagree. When a gift is recorded, your books already know.',
    ],
    sections: [
      {
        eyebrow: 'Fund accounting',
        title: 'Built for how church money actually works',
        body: [
          'Church finances are not small-business finances. Money arrives designated — the building fund, missions, benevolence — and it has to be tracked, spent, and reported by fund. General-purpose accounting tools make you fake this with classes and workarounds; ChurchGeniusPro tracks income and expenses by fund natively.',
          'Every donation is matched to a donor and a fund the moment it is recorded, whether it came in online, by text, or from a scanned check. Fund balances and fund-based reports are always current.',
        ],
        screenshotSlug: 'accounting-reports',
      },
      {
        eyebrow: 'Reporting',
        title: 'Board-ready reports and compliant statements',
        body: [
          'Financial reports that used to take a spreadsheet weekend are one click: income and expense summaries, fund balances, and giving analyses formatted for a board meeting.',
          'At year end, generate compliant giving statements for every donor in minutes — the task churches dread most in January becomes an afternoon, not a week.',
        ],
        bullets: [
          {
            title: 'Financial reports',
            description: 'Board-ready statements in one click, always current.',
          },
          {
            title: 'Year-end giving statements',
            description: 'Compliant annual statements for every donor, generated in minutes.',
          },
          {
            title: 'Pledge tracking',
            description: 'Campaigns with pledged vs. collected in real time, auto-allocated.',
          },
        ],
        screenshotSlug: 'year-end-giving',
      },
      {
        eyebrow: 'Payroll & AI',
        title: 'Payroll, bank sync, and books that fill themselves in',
        body: [
          'The Advanced Accounting with AI add-on covers staff and clergy payroll, bank statement import, and bank synchronization. Its AI reads checks and statements from a photo and posts the transactions — you review and approve instead of typing.',
          'Not an accountant? That is the point. Administrators without bookkeeping backgrounds keep clean, current books because the software does the double-entry thinking.',
        ],
        screenshotSlug: 'payroll',
      },
      {
        eyebrow: 'Pricing',
        title: 'Simple add-on pricing',
        body: [
          'The Accounting Module — income management, expense management, and financial reports — is $10/month on top of any paid plan. Advanced Accounting with AI — adding AI-assisted entry, check scanning, payroll, pledges, bank import, bank sync, and advanced reporting — is $25/month. Compare that to standalone accounting software plus a giving platform plus the hours of re-entering data between them.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can ChurchGeniusPro replace QuickBooks for our church?',
        answer:
          'For most churches, yes. It handles fund-based income and expenses, financial reports, payroll, and year-end giving statements — the jobs churches use QuickBooks for — while staying connected to your member and giving records so nothing is entered twice.',
      },
      {
        question: 'What is fund accounting, and why does it matter?',
        answer:
          'Fund accounting tracks money by its designated purpose — building fund, missions, benevolence — rather than in one pool. Churches need it because donors give to specific purposes and boards must report by fund. ChurchGeniusPro tracks funds natively instead of through workarounds.',
      },
      {
        question: 'How much does the accounting module cost?',
        answer:
          'The Accounting Module is $10/month (income, expenses, financial reports). Advanced Accounting with AI is $25/month and adds AI-assisted entry, check scanning, payroll, pledges, bank statement import, bank sync, and advanced reporting.',
      },
      {
        question: 'Does it handle payroll for clergy and staff?',
        answer:
          'Yes — payroll is included in the Advanced Accounting with AI add-on, covering both staff and clergy.',
      },
      {
        question: 'Do we need an accountant on staff to use it?',
        answer:
          'No. It is designed for church administrators without accounting backgrounds: clear screens, AI-assisted entry, and reports that generate themselves. Many churches run their books with volunteer treasurers.',
      },
      {
        question: 'Can we import our existing financial data?',
        answer:
          'Yes — free migration support includes financial data. The team helps you bring in balances and history from spreadsheets or other systems.',
      },
    ],
    related: [
      {
        name: 'AI Church Management Software',
        to: '/ai-church-management-software',
        description: 'The AI that scans checks and statements into your books.',
      },
      {
        name: 'Church Management Software',
        to: '/church-management-software',
        description: 'The full platform your accounting connects to.',
      },
      {
        name: 'View Pricing',
        to: '/pricing',
        description: 'Plans from $0 plus accounting add-ons from $10/mo.',
      },
      {
        name: 'Compare Systems',
        to: '/compare',
        description: 'ChurchGeniusPro vs. QuickBooks and other ChMS on accounting.',
      },
    ],
  },

  // ------------------------------------------------------ small church page
  {
    slug: 'small-church-management-software',
    title: 'Small Church Management Software | ChurchGeniusPro',
    metaDescription:
      'Church management software for small churches: start free for up to 50 people, run giving and events without technical skills, upgrade from $15/mo.',
    eyebrow: 'Small Churches',
    h1: 'Small church?',
    h1Gradient: 'Start free. Grow when you do.',
    intro: [
      'ChurchGeniusPro is church management software for small churches first: the Free plan runs a congregation of up to 50 people at $0/month, and everything is designed to be run by a volunteer or a part-time administrator — not an IT department.',
      'Most small churches today run on a spreadsheet, a shoebox of check stubs, and one exhausted volunteer\'s memory. Moving that into one simple system changes what Sunday feels like.',
    ],
    sections: [
      {
        eyebrow: 'Why it fits',
        title: 'Built for the church office of one',
        body: [
          'In a small church, the same person answers email, tracks giving, plans events, and prints the bulletin. ChurchGeniusPro is designed so that person can do it all in one place, with clear screens, helpful prompts, and a step-by-step Help Center — no technical or accounting experience needed.',
          'And because it starts free, there is no budget line to defend to the board. Try it with your real congregation and see.',
        ],
        bullets: [
          {
            title: 'No training required',
            description: 'Clear screens and a Help Center written for volunteers, not developers.',
          },
          {
            title: 'Free migration',
            description: 'The team moves your spreadsheet or old system\'s data at no cost.',
          },
          {
            title: 'One login',
            description: 'Members, giving, events, and communication — one place, one password.',
          },
        ],
        screenshotSlug: 'meetings',
      },
      {
        eyebrow: 'The essentials',
        title: 'Everything a small church needs on day one',
        body: [
          'The Free plan covers the essentials: member and family profiles for up to 50 people, online and text giving, basic events and groups, membership management, prayer ministry, and email and SMS to keep everyone informed.',
          'That is enough for many congregations to run indefinitely. Nothing expires, and no one asks for a credit card.',
        ],
        screenshotSlug: 'online-giving',
      },
      {
        eyebrow: 'When you grow',
        title: 'Growing past 50 people is a good problem',
        body: [
          'When attendance grows, upgrade to Standard at $15/month for up to 200 people plus attendance tracking, kids check-in, worship planning, volunteers, and a member directory. Pro at $25/month removes the limits and adds AI. Your data never moves, and both paid plans start with a 1-month free trial.',
          'Need proper books? The accounting module adds fund-based income, expenses, and reports from $10/month — so the treasurer retires the shoebox too.',
        ],
        screenshotSlug: 'kids-checkin',
      },
    ],
    faqs: [
      {
        question: 'Is ChurchGeniusPro really practical for a church under 50 people?',
        answer:
          'Yes — that is exactly who the Free plan is for. Up to 50 people, giving, events, groups, and membership tools at $0/month, forever, with no credit card required.',
      },
      {
        question: 'We run everything from spreadsheets. How hard is switching?',
        answer:
          'Migration support is free: the team moves your members, families, and giving history for you. Most small churches are fully switched within a week.',
      },
      {
        question: 'Our administrator is a volunteer. Will they manage?',
        answer:
          'ChurchGeniusPro is built for non-experts — clear screens, helpful prompts, and a step-by-step Help Center. If your volunteer can use email, they can run this.',
      },
      {
        question: 'What does it cost when we outgrow the Free plan?',
        answer:
          'Standard is $15/month (up to 200 people) and Pro is $25/month (unlimited, with AI). Both include a 1-month free trial, and your data stays in place when you upgrade.',
      },
      {
        question: 'Can members give online even on the Free plan?',
        answer:
          'Yes — online and text giving are included on the Free plan (10 transactions per month), matched automatically to the right donor.',
      },
    ],
    related: [
      {
        name: 'Free Church Management Software',
        to: '/free-church-management-software',
        description: 'The Free plan in detail: what is included and what is not.',
      },
      {
        name: 'View Pricing',
        to: '/pricing',
        description: 'Free, $15/mo, and $25/mo — simple pricing that scales.',
      },
      {
        name: 'Church Management Software',
        to: '/church-management-software',
        description: 'The full platform you grow into.',
      },
      {
        name: 'Church App',
        to: '/church-app',
        description: 'Give your members a church app from day one.',
      },
    ],
    showPricingTeaser: true,
  },

  // ------------------------------------------------------------- church app
  {
    slug: 'church-app',
    title: 'Church App — Giving, Check-In & More | ChurchGeniusPro',
    metaDescription:
      'ChurchGeniusPro\'s church app puts giving, kids check-in, events, directory, and chat in every pocket — as a mobile app and installable web app.',
    eyebrow: 'Church App',
    h1: 'A church app your',
    h1Gradient: 'whole congregation will use.',
    intro: [
      'ChurchGeniusPro includes a church app for your members and staff: giving, event registration, kids check-in, the member directory, and chat, from any phone — available as a mobile app and as an installable Progressive Web App.',
      'It is not a separate product to buy and sync. The app is a window into the same system your church already runs on, so everything members do in it lands in the right record instantly.',
    ],
    sections: [
      {
        eyebrow: 'For members',
        title: 'Give, register, and stay connected',
        body: [
          'Members give in seconds — online or by text — and the gift is matched to their record and fund automatically. They register for events, RSVP to gatherings, browse the member directory, and message their groups with in-app chat.',
          'Because the website installs as a Progressive Web App, members on any device get an app-like experience without visiting an app store.',
        ],
        bullets: [
          {
            title: 'Online & text giving',
            description: 'Share a link or a text-to-give number; receipts arrive in seconds.',
          },
          {
            title: 'Events & RSVPs',
            description: 'See the calendar, register, pay fees, and get reminders.',
          },
          {
            title: 'Directory & chat',
            description: 'Find people, message groups, and stay in the loop between Sundays.',
          },
        ],
        screenshotSlug: 'online-giving',
      },
      {
        eyebrow: 'For families',
        title: 'Sunday morning check-in that parents trust',
        body: [
          'Parents check children in with a secure code or barcode from their phone; volunteers see classroom rosters and medical notes instantly. A dedicated parents portal keeps families connected to their kids\' classes, and child portals give age-appropriate access.',
        ],
        screenshotSlug: 'kids-checkin',
      },
      {
        eyebrow: 'For staff & volunteers',
        title: 'The church office, in your pocket',
        body: [
          'Staff manage people, attendance, and events from a phone; volunteers get temporary barcode or NFC tag logins that expire after their shift — quick for them, secure for you. On Pro, the AI assistant answers by voice, so "add a new family" works from the lobby.',
          'Public screens support turns any display into an announcement board, and Wi-Fi-only private pages open only on your church network.',
        ],
        screenshotSlug: 'volunteer-management',
      },
    ],
    faqs: [
      {
        question: 'Is the church app included, or does it cost extra?',
        answer:
          'It is included. Every plan — including Free — comes with the mobile experience and the installable Progressive Web App. There is no separate per-app fee.',
      },
      {
        question: 'Do members need to create accounts?',
        answer:
          'Members get member portal access, and guests or volunteers can use temporary barcode or NFC logins that expire automatically — no permanent account needed for one-time helpers.',
      },
      {
        question: 'Does the app work on both iPhone and Android?',
        answer:
          'Yes. The Progressive Web App installs from the browser on any modern phone, and the mobile app covers everyday tools like giving, check-in, and communication.',
      },
      {
        question: 'Can parents check kids in from their phones?',
        answer:
          'Yes — secure code and barcode check-in works from a parent\'s phone, and volunteers instantly see rosters and medical notes on theirs.',
      },
      {
        question: 'Is members\' data safe in the app?',
        answer:
          'Access is role-based: staff, members, kids, and child portals each see only what they should. Sensitive pages can be limited to your church\'s Wi-Fi network, and volunteer logins expire after their shift.',
      },
    ],
    related: [
      {
        name: 'Church Management Software',
        to: '/church-management-software',
        description: 'The platform behind the app.',
      },
      {
        name: 'Free Church Management Software',
        to: '/free-church-management-software',
        description: 'Get the app free with the $0 plan.',
      },
      {
        name: 'Features',
        to: '/features',
        description: 'Every tool in the platform, in detail.',
      },
      {
        name: 'View Pricing',
        to: '/pricing',
        description: 'The app is included on every plan, starting at $0.',
      },
    ],
  },
];

const bySlug = new Map(landingPages.map((p) => [p.slug, p]));

export function getLandingPage(slug: LandingSlug): LandingPageData {
  const page = bySlug.get(slug);
  if (!page) throw new Error(`Unknown landing page: ${slug}`);
  return page;
}
