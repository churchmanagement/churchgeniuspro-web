/**
 * Guides: educational articles for church administrators.
 *
 * Each guide becomes a prerendered page at /guides/<slug> (routes in App.tsx,
 * metadata in src/data/seo.ts). Rules for this content:
 *  - every rule or number comes from a primary source listed in `sources`
 *    (irs.gov, fasb.org, …) — paraphrase, never invent
 *  - say "as of" the review date; tax rules change
 *  - general information only, never tax or legal advice
 *  - product mentions describe only what ChurchGeniusPro actually does
 */
import type { RelatedLink } from './landing';

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface GuideSource {
  name: string;
  url: string;
}

export interface Guide {
  slug: string;
  /** <title> tag (≤ 60 characters). */
  title: string;
  /** Meta description (120–160 characters). */
  metaDescription: string;
  h1: string;
  /** One-paragraph answer shown under the H1. */
  summary: string;
  /** ISO dates. */
  datePublished: string;
  dateModified: string;
  readingMinutes: number;
  sections: GuideSection[];
  sources: GuideSource[];
  related: RelatedLink[];
}

export const guidesUpdatedLabel = 'October 10, 2026';

export const guides: Guide[] = [
  // ------------------------------------------------ contribution statements
  {
    slug: 'church-contribution-statements-irs-requirements',
    title: 'Church Contribution Statements: IRS Rules | ChurchGeniusPro',
    metaDescription:
      'What a church contribution statement must include under IRS rules: the $250 written acknowledgment, deadlines, $75 quid pro quo disclosures, and a checklist.',
    h1: 'Church contribution statements: what the IRS requires',
    summary:
      'For any single gift of $250 or more, a donor needs a written acknowledgment from the church before they file their tax return. The church files nothing with the IRS, one annual statement can cover the whole year, and the statement must say whether the donor received anything in return. Here is what that means in practice.',
    datePublished: '2026-10-10',
    dateModified: '2026-10-10',
    readingMinutes: 7,
    sections: [
      {
        heading: 'Who needs the acknowledgment',
        paragraphs: [
          'The IRS puts the responsibility on the donor: to deduct any single contribution of $250 or more, the donor must have a contemporaneous written acknowledgment from the church. A church that does not provide one faces no IRS penalty for it, but its donors may lose the deduction — which is why most churches send statements as a matter of course.',
          'The same rule covers non-cash gifts valued at $250 or more.',
        ],
      },
      {
        heading: 'What the acknowledgment must include',
        paragraphs: ['IRS Publication 1771 lists what a written acknowledgment must contain:'],
        bullets: [
          'The name of the church.',
          'The amount of any cash contribution.',
          'A description — but not the value — of any non-cash property given.',
          'A statement that no goods or services were provided in return, if that is the case.',
          'If goods or services were provided, a description and a good-faith estimate of their value.',
          'If the only benefit was an intangible religious benefit, a statement saying so. It does not need to be described or valued.',
        ],
      },
      {
        heading: 'What it does not need',
        paragraphs: [
          'The donor’s Social Security number is not required. The acknowledgment can be on paper or sent electronically, for example by email. There is no IRS form for it, the church does not report it to the IRS, and the donor keeps it with their records rather than attaching it to their return.',
        ],
      },
      {
        heading: 'The deadline: “contemporaneous”',
        paragraphs: [
          'The donor must receive the acknowledgment by the earlier of the date they file their return for the year of the gift, or the return’s due date including extensions. In practice, the IRS notes that charities typically send acknowledgments by January 31 of the following year.',
        ],
      },
      {
        heading: 'Weekly offerings and the $250 threshold',
        paragraphs: [
          'Each contribution is treated separately. Separate gifts of less than $250 are not added together, so a member who gives $50 every Sunday has no single gift that triggers the rule, even though the yearly total is well over $250. Any single gift of $250 or more does trigger it.',
          'One acknowledgment, such as an annual statement, may cover several gifts of $250 or more. Listing every gift on a year-end statement handles both cases.',
          'Smaller gifts still need records: for a cash gift of any amount, the donor needs either a bank record or a written communication from the church showing the church’s name, the date, and the amount. A year-end statement that lists every gift serves that purpose too.',
        ],
      },
      {
        heading: 'When the donor gets something back: payments over $75',
        paragraphs: [
          'If a donor pays more than $75 partly as a gift and partly for goods or services — a fundraising dinner ticket, for example — the church must give a written disclosure. It must say that only the amount above the value of what was received is deductible, and give a good-faith estimate of that value.',
          'The penalty for failing to disclose is $10 per contribution, up to $5,000 per fundraising event or mailing, unless the church shows reasonable cause. No disclosure is needed when the donor receives only token items, certain membership benefits, or intangible religious benefits.',
        ],
      },
      {
        heading: 'Non-cash gifts',
        paragraphs: [
          'For donated property, describe the item but do not state its value — valuing it is the donor’s job. Separately, if the church sells, exchanges, or otherwise disposes of certain donated property within three years, it may need to file Form 8282. This applies to property valued at more than $5,000 when it was donated, and the form is due within 125 days of the disposition.',
        ],
      },
      {
        heading: 'What changed for 2026 (on the donor’s side)',
        paragraphs: [
          'Beginning with tax year 2026, people who do not itemize may deduct up to $1,000 of cash gifts to charity ($2,000 for married couples filing jointly). People who do itemize may deduct only the portion of their charitable gifts above 0.5% of their adjusted gross income.',
          'These changes affect how much donors can deduct, not what the church must send. As of this guide’s review date, Publication 1771 (revised November 2023) is still the IRS’s current guide to acknowledgments.',
        ],
      },
      {
        heading: 'A year-end statement checklist',
        paragraphs: [
          'The IRS-required items, plus common practice, in one list. Before you send statements, check that each one has:',
        ],
        bullets: [
          'Your church’s name.',
          'The donor’s name and the tax year covered.',
          'Each cash contribution with its date and amount, and the year’s total.',
          'A description, without a value, of any non-cash gifts.',
          'A statement that no goods or services were provided, or a description and good-faith value of what was, or a statement that only intangible religious benefits were provided.',
          'Delivery by January 31, so donors have it before they file.',
        ],
      },
      {
        heading: 'How ChurchGeniusPro helps',
        paragraphs: [
          'Every gift recorded in ChurchGeniusPro — online, by text, by check, or in cash — is tied to a donor, a fund, and a date. Online gifts get an emailed receipt automatically, administrators can generate giving statements for every donor and email or print them, and members can generate their own statement for any tax year from their portal.',
          'Before you send statements for the first time, compare your statement template against the checklist above, especially the goods-or-services wording.',
        ],
      },
    ],
    sources: [
      {
        name: 'IRS Publication 1771: Charitable Contributions — Substantiation and Disclosure Requirements',
        url: 'https://www.irs.gov/pub/irs-pdf/p1771.pdf',
      },
      {
        name: 'IRS: Charitable contributions — written acknowledgments',
        url: 'https://www.irs.gov/charities-non-profits/charitable-organizations/charitable-contributions-written-acknowledgments',
      },
      {
        name: 'IRS: Substantiating charitable contributions',
        url: 'https://www.irs.gov/charities-non-profits/substantiating-charitable-contributions',
      },
      {
        name: 'IRS: Charitable contributions — quid pro quo contributions',
        url: 'https://www.irs.gov/charities-non-profits/charitable-organizations/charitable-contributions-quid-pro-quo-contributions',
      },
      {
        name: 'IRS Publication 1828: Tax Guide for Churches & Religious Organizations',
        url: 'https://www.irs.gov/pub/irs-pdf/p1828.pdf',
      },
      {
        name: 'IRS: One Big Beautiful Bill provisions',
        url: 'https://www.irs.gov/newsroom/one-big-beautiful-bill-provisions',
      },
      {
        name: 'IRS Publication 505 (2026): Tax Withholding and Estimated Tax',
        url: 'https://www.irs.gov/publications/p505',
      },
    ],
    related: [
      {
        name: 'Church Giving Software',
        to: '/church-giving-software',
        description: 'Online giving, receipts, and year-end statements.',
      },
      {
        name: 'Guide: Fund Accounting',
        to: '/guides/church-fund-accounting-explained',
        description: 'Restricted and unrestricted funds, explained.',
      },
      {
        name: 'Church Accounting Software',
        to: '/church-accounting-software',
        description: 'Every gift matched to a donor and a fund.',
      },
    ],
  },

  // ------------------------------------------------------- fund accounting
  {
    slug: 'church-fund-accounting-explained',
    title: 'Church Fund Accounting, Explained | ChurchGeniusPro',
    metaDescription:
      'Fund accounting for churches in plain English: donor-restricted vs unrestricted gifts, board-designated funds, releasing restrictions, and Form 990 rules.',
    h1: 'Fund accounting for churches, explained',
    summary:
      'Fund accounting tracks money by the purpose it was given for, not just in one pool. Under current US accounting standards, a church’s net assets fall into two groups: with donor restrictions and without donor restrictions. Here is how that works, with examples you can apply to your own funds.',
    datePublished: '2026-10-10',
    dateModified: '2026-10-10',
    readingMinutes: 6,
    sections: [
      {
        heading: 'Why churches need fund accounting',
        paragraphs: [
          'Much of a church’s income arrives with a purpose attached: the building fund, missions, benevolence, a youth trip. Donors expect that money to be used as they asked, and boards need to report what was given, spent, and still held for each purpose. A single bank balance cannot answer those questions; fund accounting can.',
        ],
      },
      {
        heading: 'The two classes of net assets',
        paragraphs: [
          'The Financial Accounting Standards Board’s Accounting Standards Update 2016-14 simplified not-for-profit reporting to two classes of net assets: net assets with donor restrictions, and net assets without donor restrictions. These replaced the earlier three classes — unrestricted, temporarily restricted, and permanently restricted.',
          'The update took effect for annual financial statements for fiscal years beginning after December 15, 2017, so it is the standard today for organizations that prepare financial statements under US generally accepted accounting principles (GAAP).',
        ],
      },
      {
        heading: 'What counts as a donor restriction',
        paragraphs: [
          'A donor restriction is a stipulation by the donor that limits how a gift may be used more narrowly than the church’s general purposes. Restrictions are usually about purpose (“for the roof”) or time (“to be used next year”), and some are perpetual, such as an endowment whose principal must be kept.',
          'A restriction expires when the stated time has passed, when the stated purpose has been fulfilled, or both. At that point the amount is reclassified from “with donor restrictions” to “without donor restrictions.”',
        ],
      },
      {
        heading: 'Board-designated funds are not donor-restricted',
        paragraphs: [
          'When your board sets money aside — a reserve for repairs, say — that is a board designation, not a donor restriction. Under ASU 2016-14, board-designated amounts are part of net assets without donor restrictions, because the board can change its own decision. Financial statements prepared under GAAP disclose the amounts and purposes of board designations.',
        ],
      },
      {
        heading: 'Examples',
        paragraphs: ['How common church gifts are classified:'],
        bullets: [
          'A member’s Sunday offering to the general fund: without donor restrictions.',
          'A gift a donor designates for the building fund: with donor restrictions (purpose) until it is spent on the building.',
          'A gift a donor gives for next year’s missions trip: with donor restrictions (purpose and time).',
          'The board moves $10,000 of general funds into a roof reserve: without donor restrictions (board-designated).',
          'An endowment gift whose principal must be kept forever: with donor restrictions (perpetual).',
        ],
      },
      {
        heading: 'Do churches have to file Form 990 or follow GAAP?',
        paragraphs: [
          'IRS Publication 1828 lists churches among the organizations that are not required to file Form 990, 990-EZ, or 990-N. A church may still need to file Form 990-T if it has $1,000 or more of gross unrelated business income. The IRS does require churches to keep books and records, but it sets no specific format for them.',
          'Whether your church needs GAAP-basis financial statements usually depends on who asks for them — a lender, an auditor, or your denomination, for example. Ask your accountant what applies to you.',
        ],
      },
      {
        heading: 'Setting up funds in practice',
        paragraphs: [
          'Start with a general fund for unrestricted giving, then create a fund for each purpose donors actually give to. Record every gift to the right fund at the time it is received, track spending against each fund, and review restricted balances before each board meeting so released restrictions are reclassified.',
        ],
      },
      {
        heading: 'How ChurchGeniusPro helps',
        paragraphs: [
          'In ChurchGeniusPro, every income entry is recorded to a fund and subcategory with its donor and date, online gifts are recorded automatically, and pledge campaigns credit gifts to the campaign’s fund. Fund-based income and expense reports show what each fund received and spent.',
        ],
      },
    ],
    sources: [
      {
        name: 'FASB Accounting Standards Update 2016-14: Presentation of Financial Statements of Not-for-Profit Entities',
        url: 'https://storage.fasb.org/ASU_2016-14.pdf',
      },
      {
        name: 'IRS Publication 1828: Tax Guide for Churches & Religious Organizations',
        url: 'https://www.irs.gov/pub/irs-pdf/p1828.pdf',
      },
    ],
    related: [
      {
        name: 'Church Accounting Software',
        to: '/church-accounting-software',
        description: 'Fund accounting connected to your giving.',
      },
      {
        name: 'Guide: Contribution Statements',
        to: '/guides/church-contribution-statements-irs-requirements',
        description: 'What the IRS requires from your year-end statements.',
      },
      {
        name: 'Church Payroll Software',
        to: '/church-payroll-software',
        description: 'Payroll in the same system as your funds.',
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
