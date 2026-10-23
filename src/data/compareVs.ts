/**
 * One-on-one comparison pages: /compare/<slug>.
 *
 * LEGAL RULES (same as /compare — see src/data/content.ts compare notes):
 *  - Every competitor cell must reflect that provider's OFFICIAL public
 *    website/documentation and carry the URL it was verified from (`src`).
 *  - `false` renders "—" = "not found as a built-in feature in the provider's
 *    official public materials as of `verified`" — never an absolute "No".
 *  - Strings render as neutral amber notes (plan, add-on, scope). No judgment
 *    words, no superlatives, no logos or screenshots of other products.
 *  - Every page concedes where the other product is stronger.
 *  - ChurchGeniusPro cells must match src/data/content.ts pricing exactly.
 *  - Re-verify every cell before changing `verified`.
 */

export type CellValue = boolean | string;

export interface CompareVsRow {
  feature: string;
  cgp: CellValue;
  them: CellValue;
  /** Official URL the competitor cell was verified from. */
  src: string;
}

export interface CompareVsFAQ {
  question: string;
  answer: string;
}

export interface CompareVsPage {
  slug: 'planning-center' | 'breeze' | 'tithely' | 'churchtrac';
  /** Competitor product name as the vendor writes it. */
  name: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  verified: string;
  /** Competitor pricing as published on its official pricing page. */
  pricing: { text: string; src: string };
  rows: CompareVsRow[];
  /** Where the competitor is stronger — honest concessions with sources. */
  theirStrengths: { text: string; src: string }[];
  /** ChurchGeniusPro differences that matter for this comparison (facts only). */
  ourDifferences: string[];
  chooseThem: string;
  chooseUs: string;
  faqs: CompareVsFAQ[];
}

export const compareVsVerified = 'October 10, 2026';

/** ChurchGeniusPro's own published pricing, used on every page. */
export const cgpPricingSummary =
  'Free plan at $0 (up to 50 people); Standard $20/month (up to 100 people, accounting with bank sync for up to 3 accounts, check-in, worship planning, volunteer scheduling); Pro $40/month (unlimited people, payroll, check scanning, and the advanced AI assistant). Application setup is free, and every feature can be tried free for 2 months with no credit card.';

export const compareVsPages: CompareVsPage[] = [
  // ------------------------------------------------------------ Planning Center
  {
    slug: 'planning-center',
    name: 'Planning Center',
    title: 'ChurchGeniusPro vs Planning Center | ChurchGeniusPro',
    metaDescription:
      'ChurchGeniusPro vs Planning Center, compared from official sources: pricing, giving, check-in, accounting, payroll, AI, and mobile apps. Verified Oct 2026.',
    h1: 'ChurchGeniusPro vs Planning Center',
    intro:
      'Planning Center is a set of separate church products — People, Giving, Check-Ins, Groups, Services, Calendar, and more — each priced on its own. ChurchGeniusPro is one system with three plans that include accounting. This page compares the two using each provider’s official public information.',
    verified: compareVsVerified,
    pricing: {
      text: 'People (the church database) is free. Other products are subscribed to individually and priced by usage, each with a free level; paid levels for Giving, Check-Ins, Groups, Services, and Registrations start at $15/month. Card processing in Giving is 2.15% + $0.30 (US).',
      src: 'https://www.planningcenter.com/pricing',
    },
    rows: [
      {
        feature: 'Member & family management',
        cgp: true,
        them: 'People (free)',
        src: 'https://www.planningcenter.com/people',
      },
      {
        feature: 'Online giving & text-to-give',
        cgp: true,
        them: 'Giving product',
        src: 'https://www.planningcenter.com/giving',
      },
      {
        feature: 'Events & church calendar',
        cgp: true,
        them: true,
        src: 'https://www.planningcenter.com/calendar',
      },
      {
        feature: 'Worship & service planning',
        cgp: 'Standard & Pro',
        them: 'Services product',
        src: 'https://www.planningcenter.com/services',
      },
      {
        feature: 'Groups & attendance tracking',
        cgp: true,
        them: 'Groups product',
        src: 'https://www.planningcenter.com/groups',
      },
      {
        feature: 'Kids check-in with medical notes',
        cgp: 'Standard & Pro',
        them: 'Check-Ins product',
        src: 'https://www.planningcenter.com/check-ins',
      },
      {
        feature: 'Recurring giving & year-end statements',
        cgp: true,
        them: 'Giving product',
        src: 'https://www.planningcenter.com/giving',
      },
      {
        feature: 'Church accounting ledger (income, expenses, funds)',
        cgp: 'Standard & Pro',
        them: false,
        src: 'https://www.planningcenter.com/giving',
      },
      {
        feature: 'Payroll',
        cgp: 'Pro plan',
        them: false,
        src: 'https://www.planningcenter.com/pricing',
      },
      {
        feature: 'Check scanning',
        cgp: 'Pro plan',
        them: 'Giving product',
        src: 'https://www.planningcenter.com/giving',
      },
      {
        feature: 'AI features',
        cgp: 'Pro plan',
        them: 'AI list builder; ChatGPT/Claude connector',
        src: 'https://www.planningcenter.com/ai',
      },
      {
        feature: 'Voice commands & hands-free entry',
        cgp: 'Pro plan',
        them: false,
        src: 'https://www.planningcenter.com/ai',
      },
      {
        feature: 'Mobile apps',
        cgp: 'Android app (Google Play) + web app',
        them: 'App Store & Google Play apps',
        src: 'https://www.planningcenter.com/apps',
      },
      {
        feature: 'Free trial',
        cgp: '2 months, no card',
        them: '30 days',
        src: 'https://www.planningcenter.com/pricing',
      },
    ],
    theirStrengths: [
      {
        text: 'À la carte: People is free, and each other product has its own free level, so a church can pay only for the products it uses.',
        src: 'https://www.planningcenter.com/pricing',
      },
      {
        text: 'Native apps in the App Store and Google Play, including Church Center, Services, Check-Ins, and Music Stand.',
        src: 'https://www.planningcenter.com/apps',
      },
      {
        text: 'A dedicated service-planning product (Services) with a Music Stand add-on for worship teams.',
        src: 'https://www.planningcenter.com/services',
      },
      {
        text: 'A connector that lets AI assistants such as ChatGPT and Claude read data from several Planning Center products.',
        src: 'https://www.planningcenter.com/ai',
      },
    ],
    ourDifferences: [
      'Accounting is part of the Standard and Pro plans — income, expenses, fund reports, pledges, and bank sync — so gifts post to the books in the same system. Planning Center’s official materials describe CSV export rather than an accounting ledger.',
      'Payroll is included in Pro: employee records, payroll runs, a payroll register with tax liability, and a year-end W-2 export.',
      'One plan price covers people, giving, check-in, worship planning, and communication, instead of separate per-product subscriptions.',
      'On Pro, a built-in assistant takes typed or spoken requests and reads photographed checks and documents into entries.',
    ],
    chooseThem:
      'You want to start with a free database and add individual products over time, you rely on native iPhone and Android apps, or your worship team wants a dedicated service-planning product.',
    chooseUs:
      'You want church management, giving, and accounting — including payroll on Pro — in one system and one monthly price, with an AI assistant that does data entry.',
    faqs: [
      {
        question: 'Does Planning Center include accounting?',
        answer:
          'Planning Center’s official Giving page says it does not have a QuickBooks integration and offers CSV exports. We did not find an income-and-expense ledger in its official materials as of October 10, 2026.',
      },
      {
        question: 'Is Planning Center free?',
        answer:
          'Planning Center People is free, and each other product has a free level. Paid levels are priced per product by usage; see Planning Center’s pricing page for current amounts.',
      },
      {
        question: 'Can we move from Planning Center to ChurchGeniusPro?',
        answer:
          'Application setup and migration from an existing application are both free; it is not guaranteed for complex databases or for applications with different functionality from ChurchGeniusPro.',
      },
    ],
  },

  // ------------------------------------------------------------------- Breeze
  {
    slug: 'breeze',
    name: 'Breeze ChMS',
    title: 'ChurchGeniusPro vs Breeze ChMS | ChurchGeniusPro',
    metaDescription:
      'ChurchGeniusPro vs Breeze ChMS, compared from official sources: pricing, giving, check-in, accounting, payroll, check scanning, AI, and apps. Verified Oct 2026.',
    h1: 'ChurchGeniusPro vs Breeze ChMS',
    intro:
      'Breeze is web-based church management software sold at one flat monthly price; it is owned by Tithely. ChurchGeniusPro offers a Free plan and two paid plans that include accounting. This page compares the two using each provider’s official public information.',
    verified: compareVsVerified,
    pricing: {
      text: 'Breeze is $72/month with unlimited people and users and no setup fees. Worship Team Tools is a $29/month add-on, and the Tithely All Access bundle is $119/month. Online giving has no monthly fee; transaction fees apply.',
      src: 'https://support.breezechms.com/hc/en-us/articles/41089545597207-Learn-More-About-Breeze-ChMS',
    },
    rows: [
      {
        feature: 'Member & family management',
        cgp: true,
        them: true,
        src: 'https://support.breezechms.com/hc/en-us/articles/41089545597207-Learn-More-About-Breeze-ChMS',
      },
      {
        feature: 'Online giving & text-to-give',
        cgp: true,
        them: true,
        src: 'https://support.breezechms.com/hc/en-us/articles/360001278873-Getting-Started-with-Breeze-Online-Giving',
      },
      {
        feature: 'Events & church calendar',
        cgp: true,
        them: true,
        src: 'https://support.breezechms.com/hc/en-us/articles/360001184874-Creating-an-Event',
      },
      {
        feature: 'Worship & service planning',
        cgp: 'Standard & Pro',
        them: 'Service planning; worship tools add-on',
        src: 'https://support.breezechms.com/hc/en-us/articles/25674546533527-Understanding-Service-Planning-and-Worship-Team-Tools-in-Breeze',
      },
      {
        feature: 'Groups & attendance tracking',
        cgp: true,
        them: true,
        src: 'https://support.breezechms.com/hc/en-us/articles/360001548654-Managing-Small-Groups-with-Breeze',
      },
      {
        feature: 'Kids check-in with medical notes',
        cgp: 'Standard & Pro',
        them: 'Via custom profile field',
        src: 'https://support.breezechms.com/hc/en-us/articles/360025109653-Name-Tags-with-Allergy-Information',
      },
      {
        feature: 'Recurring giving & year-end statements',
        cgp: true,
        them: true,
        src: 'https://support.breezechms.com/hc/en-us/articles/360002436793-Complete-Guide-to-Creating-Giving-Statements',
      },
      {
        feature: 'Church accounting ledger (income, expenses, funds)',
        cgp: 'Standard & Pro',
        them: false,
        src: 'https://support.breezechms.com/hc/en-us/articles/360002437053-Using-an-Accounting-System-General-Ledger-with-Breeze',
      },
      {
        feature: 'Payroll',
        cgp: 'Pro plan',
        them: false,
        src: 'https://support.breezechms.com/hc/en-us/articles/360002438453-Pricing-Features-Tech-Requirements',
      },
      {
        feature: 'Check scanning',
        cgp: 'Pro plan',
        them: 'MICR reader (account & check no.)',
        src: 'https://support.breezechms.com/hc/en-us/articles/360024496794-Check-Scanner-For-Entering-Giving-Transactions',
      },
      {
        feature: 'AI assistant',
        cgp: 'Pro plan',
        them: false,
        src: 'https://support.breezechms.com/hc/en-us/articles/34347286186391-Tithely-AI-FAQs',
      },
      {
        feature: 'Voice commands & hands-free entry',
        cgp: 'Pro plan',
        them: false,
        src: 'https://support.breezechms.com/hc/en-us/articles/360002438453-Pricing-Features-Tech-Requirements',
      },
      {
        feature: 'Mobile apps',
        cgp: 'Android app (Google Play) + web app',
        them: 'App Store & Google Play apps',
        src: 'https://support.breezechms.com/hc/en-us/articles/360002329954-Breeze-ChMS-Mobile-App-Guide',
      },
      {
        feature: 'Free trial',
        cgp: '2 months, no card',
        them: '30 days, card required',
        src: 'https://support.breezechms.com/hc/en-us/articles/360003969834-Experience-Breeze-with-a-30-Day-Free-Trial',
      },
    ],
    theirStrengths: [
      {
        text: 'One flat price with unlimited people and unlimited users, and no setup fees.',
        src: 'https://support.breezechms.com/hc/en-us/articles/41089545597207-Learn-More-About-Breeze-ChMS',
      },
      {
        text: 'A Breeze ChMS app in the App Store and Google Play, plus separate worship and check-in apps.',
        src: 'https://support.breezechms.com/hc/en-us/articles/360002329954-Breeze-ChMS-Mobile-App-Guide',
      },
      {
        text: 'Service planning is included for all customers at no additional cost.',
        src: 'https://support.breezechms.com/hc/en-us/articles/25674546533527-Understanding-Service-Planning-and-Worship-Team-Tools-in-Breeze',
      },
    ],
    ourDifferences: [
      'Accounting is built in on Standard and Pro. Breeze’s official help center recommends using an accounting system such as QuickBooks or Aplos for fund accounting and the general ledger.',
      'Payroll is included in Pro; we did not find payroll in Breeze’s official feature list.',
      'A Free plan for up to 50 people, and Standard at $20/month for up to 100 people.',
      'On Pro, the check-scanning AI reads the check image into an entry, and a built-in assistant takes typed or spoken requests.',
    ],
    chooseThem:
      'You want unlimited people and users at one flat price today, native iPhone and Android apps, and you are happy to keep accounting in a separate system.',
    chooseUs:
      'You want your church management and accounting in one system, payroll on Pro, or a free plan while your church is under 50 people.',
    faqs: [
      {
        question: 'Does Breeze include accounting?',
        answer:
          'Breeze’s official help center says it does not attempt to be a full accounting program and recommends an accounting system such as QuickBooks or Aplos for the general ledger.',
      },
      {
        question: 'How much does Breeze cost?',
        answer:
          'Breeze’s official materials list $72/month with unlimited people and users, a $29/month Worship Team Tools add-on, and a $119/month Tithely All Access bundle, as of October 10, 2026.',
      },
      {
        question: 'Can we move from Breeze to ChurchGeniusPro?',
        answer:
          'Application setup and migration from an existing application are both free; it is not guaranteed for complex databases or for applications with different functionality from ChurchGeniusPro.',
      },
    ],
  },

  // ------------------------------------------------------------------ Tithe.ly
  {
    slug: 'tithely',
    name: 'Tithe.ly',
    title: 'ChurchGeniusPro vs Tithe.ly | ChurchGeniusPro',
    metaDescription:
      'ChurchGeniusPro vs Tithe.ly, compared from official sources: free giving plan, church management pricing, accounting, payroll, check scanning, AI, and apps.',
    h1: 'ChurchGeniusPro vs Tithe.ly',
    intro:
      'Tithely offers a free online giving plan plus paid church management, church app, and website plans. ChurchGeniusPro offers a Free plan and two paid plans that include accounting. This page compares the two using each provider’s official public information.',
    verified: compareVsVerified,
    pricing: {
      text: 'Free Online Giving is $0/month plus processing fees (card 2.9% + $0.30; ACH 1% + $0.30). Church Management is $72/month, Mobile Church App $89/month, Website $19/month, and All-Access $119/month. Paid plans include a 30-day free trial.',
      src: 'https://get.tithe.ly/pricing',
    },
    rows: [
      {
        feature: 'Member & family management',
        cgp: true,
        them: 'Church Management plan',
        src: 'https://get.tithe.ly/product/church-management-software',
      },
      {
        feature: 'Online giving & text-to-give',
        cgp: true,
        them: 'Free giving plan; text giving add-on',
        src: 'https://get.tithe.ly/pricing',
      },
      {
        feature: 'Events & church calendar',
        cgp: true,
        them: 'Church Management plan',
        src: 'https://get.tithe.ly/product/church-management-software',
      },
      {
        feature: 'Worship & service planning',
        cgp: 'Standard & Pro',
        them: 'Basic planning; worship tools add-on',
        src: 'https://get.tithe.ly/product/service-planning',
      },
      {
        feature: 'Groups & attendance tracking',
        cgp: true,
        them: 'Church Management plan',
        src: 'https://get.tithe.ly/product/groups',
      },
      {
        feature: 'Kids check-in with allergy alerts',
        cgp: 'Standard & Pro',
        them: 'Church Management plan',
        src: 'https://get.tithe.ly/pricing',
      },
      {
        feature: 'Recurring giving & year-end statements',
        cgp: true,
        them: true,
        src: 'https://get.tithe.ly/pricing',
      },
      {
        feature: 'Church accounting ledger (income, expenses, funds)',
        cgp: 'Standard & Pro',
        them: 'QuickBooks Online integration',
        src: 'https://get.tithe.ly/pricing',
      },
      {
        feature: 'Payroll',
        cgp: 'Pro plan',
        them: false,
        src: 'https://get.tithe.ly/integrations',
      },
      {
        feature: 'Check scanning',
        cgp: 'Pro plan',
        them: 'Beta, one scanner model',
        src: 'https://help.tithe.ly/hc/en-us/articles/39798695881111--BETA-Users-Getting-Started-with-Check-Scanning-in-Admin-Batch-Giving',
      },
      {
        feature: 'AI features',
        cgp: 'Pro plan',
        them: 'AI app builder',
        src: 'https://get.tithe.ly/product/church-app',
      },
      {
        feature: 'Voice commands & hands-free entry',
        cgp: 'Pro plan',
        them: false,
        src: 'https://get.tithe.ly/pricing',
      },
      {
        feature: 'Mobile apps',
        cgp: 'Android app (Google Play) + web app',
        them: 'Giving app; custom app $89/mo',
        src: 'https://get.tithe.ly/product/church-app',
      },
      {
        feature: 'Free trial',
        cgp: '2 months, no card',
        them: '30 days on paid plans',
        src: 'https://get.tithe.ly/pricing',
      },
    ],
    theirStrengths: [
      {
        text: 'A free online giving plan with no monthly fee, including recurring giving, pledges, tax receipts, and check recording.',
        src: 'https://get.tithe.ly/pricing',
      },
      {
        text: 'A free Tithely Giving app on iOS and Android, and a custom church app plan.',
        src: 'https://get.tithe.ly/product/church-app',
      },
      {
        text: 'Website and church app products from the same vendor, bundled in All-Access.',
        src: 'https://get.tithe.ly/pricing',
      },
      {
        text: 'A direct QuickBooks Online integration for churches that already keep their books there.',
        src: 'https://get.tithe.ly/pricing',
      },
    ],
    ourDifferences: [
      'Accounting is built in on Standard and Pro. Tithely’s official materials say it does not provide general-ledger accounting and integrate with QuickBooks Online instead.',
      'Payroll is included in Pro; we did not find payroll in Tithely’s official materials.',
      'ChurchGeniusPro charges a flat plan price and does not take a percentage of gifts; online gifts are processed through your own Stripe account at Stripe’s standard fees.',
      'On Pro, a built-in assistant takes typed or spoken requests and reads photographed checks and documents into entries.',
    ],
    chooseThem:
      'Your first need is online giving at no monthly cost, you want a custom church app or website from the same vendor, or you already keep your books in QuickBooks Online.',
    chooseUs:
      'You want church management and accounting in one system, payroll on Pro, and one monthly price for people, giving, check-in, and worship planning.',
    faqs: [
      {
        question: 'Does Tithely include accounting?',
        answer:
          'Tithely’s official materials say it does not provide general-ledger accounting services; it integrates directly with QuickBooks Online.',
      },
      {
        question: 'Is Tithely free?',
        answer:
          'Tithely’s Free Online Giving plan is $0/month plus processing fees. Church management, the custom church app, and the website are paid plans; see Tithely’s pricing page for current amounts.',
      },
      {
        question: 'Can we move from Tithely to ChurchGeniusPro?',
        answer:
          'Application setup and migration from an existing application are both free; it is not guaranteed for complex databases or for applications with different functionality from ChurchGeniusPro.',
      },
    ],
  },

  // ---------------------------------------------------------------- ChurchTrac
  {
    slug: 'churchtrac',
    name: 'ChurchTrac',
    title: 'ChurchGeniusPro vs ChurchTrac | ChurchGeniusPro',
    metaDescription:
      'ChurchGeniusPro vs ChurchTrac, compared from official sources: pricing by people tracked, fund accounting, bank sync, payroll, check scanning, AI, and apps.',
    h1: 'ChurchGeniusPro vs ChurchTrac',
    intro:
      'ChurchTrac is church management software with built-in fund accounting, priced by the number of people you track. ChurchGeniusPro also includes accounting, with a Free plan and two paid plans. This page compares the two using each provider’s official public information.',
    verified: compareVsVerified,
    pricing: {
      text: 'Priced by names tracked, with every feature on every tier: 75 names $29/month, 125 $39, 250 $59, 500 $79, 1,000 $99, and the top tier $119. Yearly billing saves 10%. Optional: Enhanced Messaging $7/month, website and app build from $477, accounting setup from $399.',
      src: 'https://www.churchtrac.com/pricing',
    },
    rows: [
      {
        feature: 'Member & family management',
        cgp: true,
        them: true,
        src: 'https://www.churchtrac.com/features/church-admin-software',
      },
      {
        feature: 'Online giving & text-to-give',
        cgp: true,
        them: true,
        src: 'https://www.churchtrac.com/features/online-giving',
      },
      {
        feature: 'Events & church calendar',
        cgp: true,
        them: true,
        src: 'https://www.churchtrac.com/features/church-calendar',
      },
      {
        feature: 'Worship & service planning',
        cgp: 'Standard & Pro',
        them: true,
        src: 'https://www.churchtrac.com/features/worship-planning-scheduling',
      },
      {
        feature: 'Groups & attendance tracking',
        cgp: true,
        them: true,
        src: 'https://www.churchtrac.com/features/church-admin-software',
      },
      {
        feature: 'Kids check-in with medical notes',
        cgp: 'Standard & Pro',
        them: true,
        src: 'https://www.churchtrac.com/features/church-check-in',
      },
      {
        feature: 'Recurring giving & year-end statements',
        cgp: true,
        them: true,
        src: 'https://www.churchtrac.com/features/church-giving',
      },
      {
        feature: 'Fund accounting & financial reports',
        cgp: 'Standard & Pro',
        them: true,
        src: 'https://www.churchtrac.com/features/church-accounting',
      },
      {
        feature: 'Bank sync',
        cgp: 'Standard (3 accounts) & Pro',
        them: true,
        src: 'https://www.churchtrac.com/support/accounting/bank-sync',
      },
      {
        feature: 'Payroll',
        cgp: 'Pro plan',
        them: false,
        src: 'https://www.churchtrac.com/features/church-accounting',
      },
      {
        feature: 'Check scanning',
        cgp: 'Pro plan',
        them: false,
        src: 'https://www.churchtrac.com/features/church-giving',
      },
      {
        feature: 'AI assistant in the product',
        cgp: 'Pro plan',
        them: false,
        src: 'https://www.churchtrac.com/support',
      },
      {
        feature: 'Voice commands & hands-free entry',
        cgp: 'Pro plan',
        them: false,
        src: 'https://www.churchtrac.com/features/church-admin-software',
      },
      {
        feature: 'Mobile apps',
        cgp: 'Android app (Google Play) + web app',
        them: 'App Store & Google Play apps',
        src: 'https://www.churchtrac.com/features/church-app-builder',
      },
      {
        feature: 'Free trial',
        cgp: '2 months, no card',
        them: '30 days, no card',
        src: 'https://www.churchtrac.com/pricing',
      },
    ],
    theirStrengths: [
      {
        text: 'Every feature, including fund accounting, is on every pricing tier; tiers differ only by the number of names tracked.',
        src: 'https://www.churchtrac.com/pricing',
      },
      {
        text: 'Published accounting tools include budgets with budget-vs-actual reports, bank reconciliation, and check printing.',
        src: 'https://www.churchtrac.com/features/church-accounting',
      },
      {
        text: 'A Church Connect app on iOS and Android, free with every subscription, plus a worship app.',
        src: 'https://www.churchtrac.com/features/church-app-builder',
      },
    ],
    ourDifferences: [
      'Payroll is included in Pro. ChurchTrac’s official accounting page says a separate payroll software is needed for calculations and direct deposit.',
      'A Free plan for up to 50 people, at $0 with no time limit.',
      'On Pro, AI reads photographed checks and bank statements into entries, and a built-in assistant takes typed or spoken requests. We found only a help-center support assistant in ChurchTrac’s official materials.',
    ],
    chooseThem:
      'You want every feature at every size, the published reconciliation and check-printing tools, or native iPhone and Android apps.',
    chooseUs:
      'You want payroll in the same system as your books, a free plan while you are small, or an AI assistant that does data entry for you.',
    faqs: [
      {
        question: 'Does ChurchTrac include payroll?',
        answer:
          'ChurchTrac’s official accounting page says you will need a separate payroll software for calculations and direct deposit, as of October 10, 2026.',
      },
      {
        question: 'How is ChurchTrac priced?',
        answer:
          'By the number of names you track, from $29/month for 75 names up to $119/month for the top tier, with every feature on every tier. See ChurchTrac’s pricing page for current amounts.',
      },
      {
        question: 'Can we move from ChurchTrac to ChurchGeniusPro?',
        answer:
          'Application setup and migration from an existing application are both free; it is not guaranteed for complex databases or for applications with different functionality from ChurchGeniusPro.',
      },
    ],
  },
];

export function getCompareVsPage(slug: CompareVsPage['slug']): CompareVsPage {
  const page = compareVsPages.find((p) => p.slug === slug);
  if (!page) throw new Error(`Unknown comparison page: ${slug}`);
  return page;
}
