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
  | 'church-app'
  | 'church-membership-software'
  | 'church-attendance-tracking'
  | 'church-giving-software'
  | 'church-payroll-software';

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
    h1: 'Church management software',
    h1Gradient: 'for your entire church.',
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
            description:
              'Profiles, households, milestones, and custom fields for your congregation.',
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
            description:
              'Secure code and barcode check-in with medical notes volunteers can see instantly.',
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
          'Most church management systems stop at people and giving, and send you to QuickBooks for the books. ChurchGeniusPro includes real church accounting in its paid plans: bank imports, bank sync, pledges, online giving, and reports on Standard, plus AI-assisted accounting, payroll, and check scanning on Pro — all connected to your giving records, so there is nothing to re-enter or reconcile by hand.',
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
          'For a limited time: a Free plan for up to 50 people, a Standard plan at $20/month with accounting, and a Pro plan at $40/month with all accounting features and advanced AI. You can try every feature free for 2 months, and application setup is free.',
      },
      {
        question: 'Can we switch from our current system without losing data?',
        answer:
          'Yes — migration from an existing application is available for a $100 one-time fee, and application setup is free. Migration is not guaranteed for complex databases or for applications with different functionality from ChurchGeniusPro.',
      },
      {
        question: 'Does it work for churches of any size?',
        answer:
          'Yes. Small churches often start on the Free plan and upgrade as they grow; larger churches use Pro with unlimited people, portals, and giving. Your data stays in place whenever you change plans.',
      },
      {
        question: 'Is there a mobile app?',
        answer:
          'Not in the app stores yet. ChurchGeniusPro is a web app that works in the browser on any phone or tablet, and on Android phones and desktops it installs from the browser as an app, with notifications where supported.',
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
        description: 'Installable web app for giving, check-in, and connection.',
      },
      {
        name: 'Church Membership Software',
        to: '/church-membership-software',
        description: 'Families, a private directory, membership requests, and follow-ups.',
      },
      {
        name: 'Church Attendance Tracking',
        to: '/church-attendance-tracking',
        description: 'Services, groups, classes, events, and kids check-in.',
      },
      {
        name: 'Church Giving Software',
        to: '/church-giving-software',
        description: 'Online and text giving, pledges, and year-end statements.',
      },
      {
        name: 'Church Payroll Software',
        to: '/church-payroll-software',
        description: 'Payroll runs, register, and W-2 export on the Pro plan.',
      },
      {
        name: 'Compare Systems',
        to: '/compare',
        description: 'ChurchGeniusPro vs. Breeze, Planning Center, and Tithe.ly.',
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
      "When your church grows past the Free plan's limits, upgrade in place — your data never moves.",
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
            description: 'Member and family profiles, prayer ministry, attendance, and follow-ups.',
          },
          {
            title: 'Online & text giving',
            description: '20 gifts per month, matched to the right donor automatically.',
          },
          {
            title: 'Communication',
            description:
              '200 emails and 50 SMS per month, plus reminders, to keep your congregation informed.',
          },
          {
            title: 'Events & groups',
            description:
              'Event registration, groups, certificates, public screens, and song books.',
          },
          {
            title: 'Portals',
            description: '3 member portals, 3 kids portals, and 1 church user.',
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
          "ChurchGeniusPro's Free plan is neither. It is a permanent tier with clear limits, so a small church can run indefinitely at $0. We are equally clear about what it does not include: kids check-in, worship planning, volunteer scheduling, kids ministry, and accounting live in the paid plans, which start at $20/month — and you can try every feature free for 2 months.",
        ],
      },
      {
        eyebrow: 'Growing?',
        title: 'An upgrade path that respects your data',
        body: [
          'Churches outgrow the Free plan in predictable ways: more than 50 people, more than 20 gifts a month, or a need for check-in and accounting. When that happens, upgrading to Standard ($20/month) or Pro ($40/month) is one click — every member record, giving entry, and event you created stays exactly where it is.',
          'Getting started is simple too: application setup is free, and if your records live in another application, migration is available for a $100 one-time fee.',
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
        question: "What are the Free plan's limits?",
        answer:
          'Up to 50 people, 20 gifts per month, 200 emails and 50 SMS per month, and 3 member portals, 3 kids portals, and 1 church user. Check-in, worship planning, volunteer scheduling, kids ministry, the installable web app with notifications, and accounting require a paid plan.',
      },
      {
        question: 'Do you take a percentage of donations on the Free plan?',
        answer:
          "No. ChurchGeniusPro's pricing is a flat monthly fee per plan — the Free plan is $0/month. We do not fund the free tier by skimming donations.",
      },
      {
        question: 'What happens when we pass 50 people?',
        answer:
          'Upgrade to Standard ($20/month, up to 100 people) or Pro ($40/month, unlimited) whenever you are ready. All your data stays in place.',
      },
      {
        question: 'Can you move our data in from another system for free?',
        answer:
          'Application setup is free on every plan, including Free. Migration from an existing application is available for a $100 one-time fee; it is not guaranteed for complex databases or for applications with different functionality from ChurchGeniusPro.',
      },
    ],
    related: [
      {
        name: 'View Full Pricing',
        to: '/pricing',
        description: 'Free $0, Standard $20/month, Pro $40/month — and what each includes.',
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
        description: 'Accounting is included in Standard and Pro.',
      },
    ],
    showPricingTeaser: true,
  },

  // ------------------------------------------------------------ AI page
  {
    slug: 'ai-church-management-software',
    title: 'AI Church Management Software | ChurchGeniusPro',
    metaDescription:
      'AI church management software: a conversational assistant, voice commands, and OCR that reads checks, statements, and forms, so far less is typed by hand.',
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
            description:
              'Photograph or import a statement and every transaction lands in your books.',
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
          'Bank imports and bank sync are included from the Standard plan; Pro adds AI-assisted accounting and check scanning, so income and expenses stay current with minimal typing. Board-ready financial reports and year-end giving statements are one click.',
        ],
        screenshotSlug: 'payroll',
      },
      {
        eyebrow: 'Where to find it',
        title: 'Which plans include AI?',
        body: [
          'Advanced AI — type search, auto-filling screens by voice, conversation, scanning checks and documents, and file uploads — plus AI-assisted accounting are included in the Pro plan at $40/month. For a limited time you can try every feature free for 2 months, so you can measure the time savings before paying anything.',
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
          'The Pro plan ($40/month) includes advanced AI — type search, voice auto-fill, conversation, and check and document scanning — plus AI-assisted accounting.',
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
        description: "The AI's biggest win: bookkeeping without the typing.",
      },
      {
        name: 'Church Management Software',
        to: '/church-management-software',
        description: 'Everything the platform does, beyond the AI.',
      },
      {
        name: 'View Pricing',
        to: '/pricing',
        description: 'Pro plan at $40/month includes AI. 2-month free trial.',
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
      'Church accounting software connected to your giving: fund-based income and expenses, payroll, and reports — included from $20/month.',
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
        title: 'Board-ready reports and year-end statements',
        body: [
          'Financial reports that used to take a spreadsheet weekend are one click: income and expense summaries, fund balances, and giving analyses formatted for a board meeting.',
          'At year end, generate giving statements for every donor in minutes — the task churches dread most in January becomes an afternoon, not a week.',
        ],
        bullets: [
          {
            title: 'Financial reports',
            description: 'Board-ready statements in one click, always current.',
          },
          {
            title: 'Year-end giving statements',
            description: 'Annual giving statements for every donor, generated in minutes.',
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
          'The Pro plan includes payroll, bank imports, and bank sync. Its AI reads checks and statements from a photo and posts the transactions — you review and approve instead of typing.',
          'Not an accountant? That is the point. Administrators without bookkeeping backgrounds keep clean, current books because the software does the double-entry thinking.',
        ],
        screenshotSlug: 'payroll',
      },
      {
        eyebrow: 'Pricing',
        title: 'Accounting included in your plan',
        body: [
          'Standard ($20/month) includes accounting with bank imports, bank sync for up to 3 accounts, pledges, online giving, and reports. Pro ($40/month) includes all accounting features, adding AI-assisted accounting, payroll, and check scanning. Compare that to standalone accounting software plus a giving platform plus the hours of re-entering data between them.',
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
          'Accounting is included in the paid plans. Standard ($20/month) includes bank imports, bank sync (up to 3 accounts), pledges, online giving, and reports. Pro ($40/month) includes all accounting features, adding AI-assisted accounting, payroll, and check scanning.',
      },
      {
        question: 'Is payroll included?',
        answer:
          'Yes — payroll is included in the Pro plan. Ministers’ pay follows special IRS rules (such as the housing allowance and self-employment tax), so contact us to confirm how payroll fits your pastor’s situation.',
      },
      {
        question: 'Do we need an accountant on staff to use it?',
        answer:
          'No. It is designed for church administrators without accounting backgrounds: clear screens, AI-assisted entry, and reports that generate themselves. Many churches run their books with volunteer treasurers.',
      },
      {
        question: 'Can we import our existing financial data?',
        answer:
          'Migration from an existing application is available for a $100 one-time fee. It is not guaranteed for complex databases or for applications with different functionality from ChurchGeniusPro.',
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
        description: 'Free $0, Standard $20/month, Pro $40/month.',
      },
      {
        name: 'Compare Systems',
        to: '/compare',
        description: 'ChurchGeniusPro vs. other church software on accounting.',
      },
    ],
  },

  // ------------------------------------------------------ small church page
  {
    slug: 'small-church-management-software',
    title: 'Small Church Management Software | ChurchGeniusPro',
    metaDescription:
      'Church management software for small churches: start free for up to 50 people, run giving and events without technical skills, upgrade from $20/mo.',
    eyebrow: 'Small Churches',
    h1: 'Small church management software.',
    h1Gradient: 'Start free. Grow when you do.',
    intro: [
      'ChurchGeniusPro is church management software for small churches first: the Free plan runs a congregation of up to 50 people at $0/month, and everything is designed to be run by a volunteer or a part-time administrator — not an IT department.',
      "Most small churches today run on a spreadsheet, a shoebox of check stubs, and one exhausted volunteer's memory. Moving that into one simple system changes what Sunday feels like.",
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
            title: 'Free setup',
            description: 'Application setup is free — we help you get up and running.',
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
          'When attendance grows, upgrade to Standard at $20/month for up to 100 people plus accounting, kids check-in, worship planning, volunteer scheduling, and the installable web app with notifications. Pro at $40/month removes the limits and adds advanced AI. Your data never moves, and you can try every feature free for 2 months.',
          'Need proper books? Accounting is included in Standard and Pro — so the treasurer retires the shoebox too.',
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
          'Application setup is free, and migration from an existing application is available for a $100 one-time fee (not guaranteed for complex databases or applications with different functionality).',
      },
      {
        question: 'Our administrator is a volunteer. Will they manage?',
        answer:
          'ChurchGeniusPro is built for non-experts — clear screens, helpful prompts, and a step-by-step Help Center. If your volunteer can use email, they can run this.',
      },
      {
        question: 'What does it cost when we outgrow the Free plan?',
        answer:
          'Standard is $20/month (up to 100 people) and Pro is $40/month (unlimited, with AI). For a limited time, you can try every feature free for 2 months, and your data stays in place when you upgrade.',
      },
      {
        question: 'Can members give online even on the Free plan?',
        answer:
          'Yes — online and text giving are included on the Free plan (20 gifts per month), matched automatically to the right donor.',
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
        description: 'Free $0, $20/month, and $40/month — simple pricing that scales.',
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
      "ChurchGeniusPro's church app puts giving, kids check-in, events, directory, and chat on every phone — as a web app you install right from the browser.",
    eyebrow: 'Church App',
    h1: 'The church app',
    h1Gradient: 'your whole congregation will use.',
    intro: [
      'ChurchGeniusPro includes a church app for your members and staff: giving, event registration, kids check-in, the member directory, and chat, from any phone — as a web app that runs in the browser and installs as an app on Android phones and desktops.',
      'It is not a separate product to buy and sync. The app is a window into the same system your church already runs on, so everything members do in it lands in the right record instantly.',
    ],
    sections: [
      {
        eyebrow: 'For members',
        title: 'Give, register, and stay connected',
        body: [
          'Members give in seconds — online or by text — and the gift is matched to their record and fund automatically. They register for events, RSVP to gatherings, browse the member directory, and message their groups with in-app chat.',
          'On Android phones and desktops, members can install ChurchGeniusPro straight from the browser for an app-like experience, with notifications where supported. Everyone else uses it in any modern browser — there is no app-store download to manage.',
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
          "Parents check children in with a secure code or barcode from their phone; volunteers see classroom rosters and medical notes instantly. A dedicated parents portal keeps families connected to their kids' classes, and child portals give age-appropriate access.",
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
          'It is included — there is no separate per-app fee. Every plan works in the browser on a phone, and the installable web app with notifications is part of the Standard and Pro plans.',
      },
      {
        question: 'Do members need to create accounts?',
        answer:
          'Members get member portal access, and guests or volunteers can use temporary barcode or NFC logins that expire automatically — no permanent account needed for one-time helpers.',
      },
      {
        question: 'Does the app work on both iPhone and Android?',
        answer:
          'It runs in the browser on any modern iPhone or Android phone. On Android you can also install it from the browser as an app, with notifications where supported. There is no Google Play or Apple App Store app yet.',
      },
      {
        question: 'Can parents check kids in from their phones?',
        answer:
          "Yes — secure code and barcode check-in works from a parent's phone, and volunteers instantly see rosters and medical notes on theirs.",
      },
      {
        question: "Is members' data safe in the app?",
        answer:
          "Access is role-based: staff, members, kids, and child portals each see only what they should. Sensitive pages can be limited to your church's Wi-Fi network, and volunteer logins expire after their shift.",
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
  // ------------------------------------------------------ membership page
  {
    slug: 'church-membership-software',
    title: 'Church Membership Software for Families | ChurchGeniusPro',
    metaDescription:
      'Church membership software for families and households, a private member directory, membership requests, groups, and follow-ups. Free for up to 50 people.',
    eyebrow: 'Membership',
    h1: 'Church membership software',
    h1Gradient: 'that keeps every family in view.',
    intro: [
      'ChurchGeniusPro is church membership software that organizes your congregation the way your church actually works: by families and households, with each person’s role, contact details, groups, and history in one record.',
      'Members can keep their own details up to date through their portal, new people can apply for membership online, and your staff can see at a glance who needs a follow-up.',
    ],
    sections: [
      {
        eyebrow: 'Families first',
        title: 'Households, not just names',
        body: [
          'Every person belongs to a family record — head of household, spouse, children, and other relatives, each with their own role. That lets you email a whole household at once, track contributions per family, and keep relationships clear.',
          'Members marked inactive stay in your records but drop out of active member lists, so your directory stays accurate without losing history.',
        ],
        bullets: [
          {
            title: 'Family and member profiles',
            description: 'Contact details, family roles, member type, and photos in one place.',
          },
          {
            title: 'Membership requests',
            description:
              'People apply through your online form; approve or decline, and the family record is created for you.',
          },
          {
            title: 'Member directory with privacy controls',
            description:
              'Members can find and message each other; anyone who opts out stays hidden.',
          },
        ],
        screenshotSlug: 'certificates',
      },
      {
        eyebrow: 'Connected',
        title: 'Groups, ministries, and follow-ups on the same record',
        body: [
          'Organize small groups, ministries, teams, and age groups, then email or message any of them from inside the group. Ministries such as worship, outreach, and hospitality are managed the same way.',
          'Follow-ups give each action item — a visitor to call, a hospital visit, a new-member check-in — an owner and a due date, so nobody falls through the cracks.',
        ],
        screenshotSlug: 'volunteer-management',
      },
      {
        eyebrow: 'Self-service',
        title: 'A member portal that saves the office time',
        body: [
          'Each member gets a private portal to update their phone, email, and address, see their family, view their giving history, and generate their own year-end giving statement. Built-in chat and group messaging keep people connected between Sundays.',
          'On the Pro plan, the AI assistant can read a photographed membership form and fill in the member’s details for you to review.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is the membership software free?',
        answer:
          'Member and family management is included on every plan. The Free plan covers up to 50 people with 3 member portals; Standard ($20/month) covers up to 100 people with unlimited portals; Pro ($40/month) is unlimited.',
      },
      {
        question: 'Can people apply for membership online?',
        answer:
          'Yes. Applications from your online form appear on the Membership Requests page. Approving one creates the family record automatically, and the applicant is emailed the outcome.',
      },
      {
        question: 'Can members update their own information?',
        answer:
          'Yes. Members update their contact details and photo from their portal. Your administrator can lock fields that only the church office should change.',
      },
      {
        question: 'Can we bring our existing member list over?',
        answer:
          'Application setup is free. Migration from an existing application is available for a $100 one-time fee; it is not guaranteed for complex databases or for applications with different functionality from ChurchGeniusPro.',
      },
    ],
    related: [
      {
        name: 'Church Attendance Tracking',
        to: '/church-attendance-tracking',
        description: 'Attendance for services, groups, classes, and kids check-in.',
      },
      {
        name: 'Church Giving Software',
        to: '/church-giving-software',
        description: 'Giving history and statements on every member record.',
      },
      {
        name: 'Church Management Software',
        to: '/church-management-software',
        description: 'The full platform your membership records connect to.',
      },
      {
        name: 'View Pricing',
        to: '/pricing',
        description: 'Free $0, Standard $20/month, Pro $40/month.',
      },
    ],
    showPricingTeaser: true,
  },

  // ------------------------------------------------------ attendance page
  {
    slug: 'church-attendance-tracking',
    title: 'Church Attendance Tracking Software | ChurchGeniusPro',
    metaDescription:
      'Church attendance tracking for services, classes, groups, and events, plus secure kids check-in with codes and barcodes. Attendance is on every plan.',
    eyebrow: 'Attendance',
    h1: 'Church attendance tracking',
    h1Gradient: 'without the clipboard.',
    intro: [
      'ChurchGeniusPro includes church attendance tracking for services, classes, groups, meetings, and events, recorded on the same member records the rest of your church runs on.',
      'Attendance is part of every plan, including Free. Standard and Pro add event check-ins and secure kids check-in, so arrival and attendance are captured in one step.',
    ],
    sections: [
      {
        eyebrow: 'Everywhere people gather',
        title: 'One attendance record across your whole church',
        body: [
          'Track attendance for Sunday services, classes, small groups, and events, with trends over time so you can see where to focus care and outreach. Meetings can be scheduled with invitations and attendance tracked in the same place.',
          'Kids Ministry teachers see their classroom roster and take attendance with a single tap.',
        ],
        screenshotSlug: 'meetings',
      },
      {
        eyebrow: 'Kids check-in',
        title: 'Check-in that doubles as attendance',
        body: [
          'Parents check children in at a tablet or kiosk, or by scanning a QR code on their phone, using the phone number the child is registered with. A security code prints or appears on the phone, and the child can only be picked up with it.',
          'Children are placed in a classroom automatically by age or grade, and allergies and medical needs are on hand for volunteers.',
        ],
        bullets: [
          {
            title: 'Code and barcode check-in',
            description: 'Fast, secure drop-off and pick-up, including mobile check-in.',
          },
          {
            title: 'Automatic classroom placement',
            description: 'By age or grade, adjustable by your kids ministry leader.',
          },
          {
            title: 'Event check-in',
            description:
              'QR check-in for events on Standard and Pro; event registration on every plan.',
          },
        ],
        screenshotSlug: 'kids-checkin',
      },
      {
        eyebrow: 'Follow through',
        title: 'Turn attendance into care',
        body: [
          'Attendance lives next to follow-ups, groups, and messaging. When someone stops coming, assign a follow-up with an owner and a due date, or message their group — without exporting a spreadsheet to another tool.',
        ],
        screenshotSlug: 'event-setup',
      },
    ],
    faqs: [
      {
        question: 'Which plans include attendance tracking?',
        answer:
          'Attendance is included on every plan, including Free. Event check-ins and kids check-in are included in Standard ($20/month) and Pro ($40/month).',
      },
      {
        question: 'How does kids check-in work?',
        answer:
          'Parents check in at a tablet or kiosk, or scan a QR code with their phone, then enter their registered phone number and tap each child. A security code is printed or shown on the phone and is needed at pick-up.',
      },
      {
        question: 'Can volunteers take attendance in their classroom?',
        answer:
          'Yes. Kids Ministry teachers see their classroom roster and take attendance with a single tap, and can check children in and out using their security code.',
      },
      {
        question: 'Can we try check-in before paying?',
        answer:
          'Yes. The 2-month free trial includes every feature in the Pro plan, including kids and event check-in. No credit card is required.',
      },
    ],
    related: [
      {
        name: 'Church Membership Software',
        to: '/church-membership-software',
        description: 'Families, directory, groups, and follow-ups.',
      },
      {
        name: 'Church App',
        to: '/church-app',
        description: 'Check-in, giving, and events from members’ phones.',
      },
      {
        name: 'Small Church Software',
        to: '/small-church-management-software',
        description: 'Start free and grow when you do.',
      },
      {
        name: 'View Pricing',
        to: '/pricing',
        description: 'Free $0, Standard $20/month, Pro $40/month.',
      },
    ],
    showPricingTeaser: true,
  },

  // ------------------------------------------------------ giving page
  {
    slug: 'church-giving-software',
    title: 'Church Giving & Donation Software | ChurchGeniusPro',
    metaDescription:
      'Church giving software: online and text-to-give, recurring gifts, pledge campaigns, automatic receipts, and year-end giving statements, tied to your books.',
    eyebrow: 'Giving',
    h1: 'Church giving software',
    h1Gradient: 'that posts straight to your books.',
    intro: [
      'ChurchGeniusPro is church giving software and accounting in one system. Online gifts, text-to-give, recurring giving, and recorded cash and checks all land in the same income records, matched to the right donor and fund.',
      'Donors get automatic emailed receipts, members can see their own giving history, and year-end giving statements take a few clicks instead of a week.',
    ],
    sections: [
      {
        eyebrow: 'Ways to give',
        title: 'Online, by text, or every month automatically',
        body: [
          'Once your church connects its Stripe account, members and visitors can give through your public donation page, set up recurring monthly gifts, pay event fees, or text a code to give from their phone. Every online gift appears in your income list with a Stripe reference, and receipts are emailed automatically.',
          'Cash and checks are recorded with the contributor, fund, date, transaction type, and check number — or, on the Pro plan, by photographing the check and letting the AI fill in the entry.',
        ],
        screenshotSlug: 'online-giving',
      },
      {
        eyebrow: 'Campaigns',
        title: 'Pledge campaigns that track themselves',
        body: [
          'Create a campaign for a building fund, missions trip, or capital project with a target amount and an optional end date. Gifts recorded to the campaign’s fund are applied to each member’s pledge automatically, so every campaign card shows pledged, collected, pending, and percent complete.',
        ],
        screenshotSlug: 'pledge-campaigns',
      },
      {
        eyebrow: 'Year end',
        title: 'Giving statements in minutes',
        body: [
          'Generate giving statements for every donor and email or print them, and let members generate their own statement from their portal for any tax year. The Donation Review page lets your treasurer match each Stripe payout to the gifts it covered and resend a lost receipt.',
          'Not sure what a statement must include? Read our guide to church contribution statements and the IRS rules behind them.',
        ],
        screenshotSlug: 'year-end-giving',
      },
    ],
    faqs: [
      {
        question: 'Does ChurchGeniusPro take a percentage of donations?',
        answer:
          'No. ChurchGeniusPro charges a flat monthly plan price. Online gifts are processed through your church’s own Stripe account, so Stripe’s standard processing fees apply to card and bank payments.',
      },
      {
        question: 'Which plans include online giving?',
        answer:
          'The Free plan includes up to 20 gifts per month. Standard ($20/month) and Pro ($40/month) include unlimited giving, plus pledges and accounting; Pro adds check scanning.',
      },
      {
        question: 'Can members set up recurring gifts?',
        answer:
          'Yes. Members choose a fund and an amount and select recurring monthly giving from their portal; gifts then run automatically.',
      },
      {
        question: 'Can members download their own giving statement?',
        answer:
          'Yes. From the Contributions page in their portal, members choose a tax year and generate a statement they can print or save as a PDF.',
      },
    ],
    related: [
      {
        name: 'Guide: Contribution Statements',
        to: '/guides/church-contribution-statements-irs-requirements',
        description: 'What the IRS requires in a donor acknowledgment.',
      },
      {
        name: 'Church Accounting Software',
        to: '/church-accounting-software',
        description: 'Fund accounting connected to every gift.',
      },
      {
        name: 'Free Church Software',
        to: '/free-church-management-software',
        description: '20 gifts a month on the $0 plan.',
      },
      {
        name: 'View Pricing',
        to: '/pricing',
        description: 'Free $0, Standard $20/month, Pro $40/month.',
      },
    ],
    showPricingTeaser: true,
  },

  // ------------------------------------------------------ payroll page
  {
    slug: 'church-payroll-software',
    title: 'Church Payroll Software with Accounting | ChurchGeniusPro',
    metaDescription:
      'Church payroll software inside your accounting: employee records, payroll runs, a payroll register with tax liability, and year-end W-2 export. Pro plan.',
    eyebrow: 'Payroll',
    h1: 'Church payroll software',
    h1Gradient: 'inside your accounting.',
    intro: [
      'ChurchGeniusPro includes church payroll software in the same system as your giving and fund accounting, so staff records, payroll runs, and reports sit next to the books they affect.',
      'Payroll is part of the Pro plan ($40/month), and you can try it free for 2 months with every other Pro feature. No credit card is required.',
    ],
    sections: [
      {
        eyebrow: 'What it covers',
        title: 'Employees, payroll runs, and the reports your treasurer needs',
        body: [
          'Keep employee records, create payroll runs on your pay schedule, and approve them. For each run, the payroll register shows gross pay, federal and state income tax, Social Security, Medicare, pre-tax and post-tax deductions, and net pay, with the employer tax liability totaled at the top.',
        ],
        bullets: [
          {
            title: 'Employee records',
            description: 'Staff details kept in order, alongside the rest of your church data.',
          },
          {
            title: 'Payroll runs',
            description: 'Runs by pay schedule, each with its approval status.',
          },
          {
            title: 'Payroll register & tax liability',
            description:
              'Per-run register plus employer federal, Social Security, Medicare, state, and local totals.',
          },
          {
            title: 'Year-end W-2 export',
            description: 'Download W-2 data for all employees as CSV, or a W-2 PDF per employee.',
          },
        ],
        screenshotSlug: 'payroll',
      },
      {
        eyebrow: 'One system',
        title: 'Why payroll belongs next to your books',
        body: [
          'When payroll lives in a separate service, someone re-enters totals into the church’s books every pay period. Keeping payroll in the same system as income, expenses, funds, and financial reports means one place to look when the board asks where the money went.',
          'Recurring entries such as salaries can also be set up once and entered on schedule.',
        ],
        screenshotSlug: 'financial-reports',
      },
    ],
    faqs: [
      {
        question: 'Which plan includes payroll?',
        answer:
          'Payroll is included in the Pro plan ($40/month), together with AI-assisted accounting, check scanning, and the advanced AI assistant. The 2-month free trial includes it too.',
      },
      {
        question: 'What payroll reports are included?',
        answer:
          'A payroll register for each run (gross, federal, Social Security, Medicare, state, deductions, and net), an employer tax liability summary, and a year-end W-2 export as CSV or per-employee PDF.',
      },
      {
        question: 'Does ChurchGeniusPro file payroll taxes for us?',
        answer:
          'The payroll register and W-2 export give you the figures for your records and filings. Contact us to confirm whether ChurchGeniusPro covers tax deposits and filings for your church’s situation.',
      },
      {
        question: 'Do we still need separate accounting software?',
        answer:
          'For most churches, no. Payroll, income, expenses, funds, and financial reports are in one system.',
      },
    ],
    related: [
      {
        name: 'Church Accounting Software',
        to: '/church-accounting-software',
        description: 'Fund accounting, reports, bank sync, and pledges.',
      },
      {
        name: 'Guide: Paying Your Pastor',
        to: '/guides/pastor-pay-minister-housing-allowance-taxes',
        description: 'Minister tax rules: housing allowance and SE tax.',
      },
      {
        name: 'AI Church Software',
        to: '/ai-church-management-software',
        description: 'The Pro plan’s AI assistant and check scanning.',
      },
      {
        name: 'View Pricing',
        to: '/pricing',
        description: 'Pro plan $40/month includes payroll.',
      },
    ],
    showPricingTeaser: true,
  },
];

const bySlug = new Map(landingPages.map((p) => [p.slug, p]));

export function getLandingPage(slug: LandingSlug): LandingPageData {
  const page = bySlug.get(slug);
  if (!page) throw new Error(`Unknown landing page: ${slug}`);
  return page;
}
