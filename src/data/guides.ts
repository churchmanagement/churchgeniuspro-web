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

export const guidesUpdatedLabel = 'October 11, 2026';

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
  // ------------------------------------------------------- minister taxes
  {
    slug: 'pastor-pay-minister-housing-allowance-taxes',
    title: 'Pastor Pay & Housing Allowance Tax Rules | ChurchGeniusPro',
    metaDescription:
      'How churches handle a minister’s pay under IRS rules: dual tax status, no FICA withholding, the housing allowance, Form W-2, and how pastors cover SE tax.',
    h1: 'Paying your pastor: minister tax rules for churches',
    summary:
      'Ministers have a dual tax status. For income tax a pastor is usually the church’s employee and gets a Form W-2, but for Social Security and Medicare they are treated as self-employed — so the church does not withhold or pay FICA on ministerial wages. A housing allowance designated in advance can be excluded from income tax, but not from self-employment tax. Here is how the pieces fit together.',
    datePublished: '2026-10-11',
    dateModified: '2026-10-11',
    readingMinutes: 6,
    sections: [
      {
        heading: 'Who counts as a minister',
        paragraphs: [
          'These rules apply to a minister who is duly ordained, commissioned, or licensed by a church, and only to pay for ministerial services — preaching, leading worship, performing sacraments, and similar duties. Church staff who are not ministers (an administrator, a custodian, a worship assistant without ministerial credentials) are ordinary employees, and normal payroll rules apply to them.',
        ],
      },
      {
        heading: 'Dual status: employee for income tax, self-employed for Social Security',
        paragraphs: [
          'IRS Publication 517 explains that a minister’s earnings from ministerial services are subject to self-employment (SE) tax, even when the minister is an employee for income tax purposes. In practice that means:',
        ],
        bullets: [
          'The church does not withhold Social Security or Medicare (FICA) from ministerial wages and does not pay the employer share.',
          'The church is not required to withhold federal income tax from ministerial wages either.',
          'The minister pays SE tax on their own return. For 2025 the rate is 15.3% (12.4% Social Security plus 2.9% Medicare) on net SE earnings, with the Social Security part capped at an annual wage base.',
        ],
      },
      {
        heading: 'Covering the tax: estimated payments or voluntary withholding',
        paragraphs: [
          'Because nothing is withheld by default, a pastor who expects to owe $1,000 or more (including SE tax) generally needs to make quarterly estimated payments using Form 1040-ES to avoid an underpayment penalty.',
          'Alternatively, a minister who is a common-law employee can make a voluntary withholding agreement with the church, so the church withholds extra federal income tax from each paycheck to cover both income tax and SE tax. Many churches find this simpler for everyone.',
        ],
      },
      {
        heading: 'The housing allowance',
        paragraphs: [
          'A church can designate part of a minister’s pay as a housing (parsonage) allowance. The church must officially designate the amount before it makes the payment — a board or council resolution recorded in the minutes is the common way to do this.',
          'For income tax, the minister can exclude the allowance up to the smallest of these amounts:',
        ],
        bullets: [
          'The amount the church officially designated.',
          'The amount actually spent on housing (rent or mortgage, utilities, furnishings, repairs, and similar costs).',
          'The fair rental value of the home, furnished, plus utilities.',
        ],
      },
      {
        heading: 'The housing allowance is still subject to SE tax',
        paragraphs: [
          'The exclusion applies to income tax only. Publication 517 is clear that the housing allowance — or the fair rental value of a church-provided parsonage — still counts toward the minister’s net earnings for self-employment tax.',
        ],
      },
      {
        heading: 'What the church reports on Form W-2',
        paragraphs: [
          'A pastor who is an employee for income tax receives a Form W-2 for their salary. Publication 517 notes the church may show the housing allowance (or the parsonage’s fair rental value plus utilities) in box 14 of Form W-2 so the minister has the figure for their return. Ask your tax professional which boxes apply to your pastor’s situation.',
        ],
      },
      {
        heading: 'Ministers who opt out of Social Security',
        paragraphs: [
          'A minister who is opposed, on religious grounds, to accepting public insurance for ministerial services can apply for an exemption from SE tax on Form 4361. The deadline is the due date (including extensions) of the tax return for the second year in which they had at least $400 of net SE earnings, part of it from ministerial services. The exemption must be approved by the IRS, and it covers ministerial earnings only.',
        ],
      },
      {
        heading: 'A checklist for your church',
        paragraphs: [],
        bullets: [
          'Confirm in writing which staff are ministers performing ministerial services.',
          'Set the housing allowance by board resolution before the year (or the pay period) it applies to, and record it in the minutes.',
          'Make sure payroll does not withhold Social Security or Medicare on ministerial wages.',
          'Offer a voluntary withholding agreement, or remind the pastor about quarterly estimated payments.',
          'Report the housing allowance to the minister — box 14 of Form W-2 is one option.',
        ],
      },
      {
        heading: 'Using ChurchGeniusPro',
        paragraphs: [
          'ChurchGeniusPro’s Pro plan includes payroll with a payroll register and a year-end W-2 export. Because a minister’s pay follows the rules above, contact us before running your pastor’s pay so we can confirm how payroll fits your church’s setup.',
        ],
      },
    ],
    sources: [
      {
        name: 'IRS Publication 517 (2025): Social Security and Other Information for Members of the Clergy and Religious Workers',
        url: 'https://www.irs.gov/publications/p517',
      },
      {
        name: 'IRS Publication 1828: Tax Guide for Churches & Religious Organizations',
        url: 'https://www.irs.gov/pub/irs-pdf/p1828.pdf',
      },
      {
        name: 'IRS Form 1040-ES: Estimated Tax for Individuals',
        url: 'https://www.irs.gov/forms-pubs/about-form-1040-es',
      },
      {
        name: 'IRS Form 4361: Application for Exemption From Self-Employment Tax',
        url: 'https://www.irs.gov/forms-pubs/about-form-4361',
      },
    ],
    related: [
      {
        name: 'Church Payroll Software',
        to: '/church-payroll-software',
        description: 'Payroll runs, register, and W-2 export.',
      },
      {
        name: 'Guide: Form 1099-NEC',
        to: '/guides/form-1099-nec-for-churches',
        description: 'Guest speakers and contractors.',
      },
      {
        name: 'Church Accounting Software',
        to: '/church-accounting-software',
        description: 'Payroll in the same books as your funds.',
      },
    ],
  },

  // -------------------------------------------------------------- 1099-NEC
  {
    slug: 'form-1099-nec-for-churches',
    title: 'Form 1099-NEC for Churches: 2026 Rules | ChurchGeniusPro',
    metaDescription:
      'When a church must file Form 1099-NEC for guest speakers and contractors: the new $2,000 threshold for 2026, the January 31 deadline, W-9s, and exceptions.',
    h1: 'Form 1099-NEC for churches: guest speakers and contractors',
    summary:
      'Churches are not exempt from information reporting. If your church pays a person who is not its employee for services — a guest preacher, a musician, a contractor — and the year’s total reaches the reporting threshold, you file Form 1099-NEC. Starting with 2026 payments, that threshold rises from $600 to $2,000. The form goes to the payee and the IRS by January 31.',
    datePublished: '2026-10-11',
    dateModified: '2026-10-11',
    readingMinutes: 5,
    sections: [
      {
        heading: 'Yes, churches have to file',
        paragraphs: [
          'The reporting rule applies to payments made in the course of a trade or business. The IRS instructions for Form 1099-NEC state that nonprofit organizations are considered to be engaged in a trade or business for this purpose, so churches and ministries are subject to the same requirement.',
        ],
      },
      {
        heading: 'Who gets a 1099-NEC',
        paragraphs: ['Under the IRS instructions, a payment is reportable on Form 1099-NEC when all of these are true:'],
        bullets: [
          'The person is not your employee.',
          'The payment is for services performed for your church.',
          'The payee is an individual, partnership, or estate (and, in a few cases, a corporation).',
          'Your total payments to that payee for the year reach the threshold.',
        ],
      },
      {
        heading: 'The threshold: $600 before 2026, $2,000 from 2026',
        paragraphs: [
          'The One Big Beautiful Bill raised the reporting threshold. The IRS instructions now set it at $2,000 for tax years beginning after 2025, so payments made during 2026 (reported in January 2027) use the $2,000 threshold. Payments made in 2025 and reported in January 2026 still used the $600 threshold.',
          'Count the year’s total per payee, not each check — three $800 honoraria to the same speaker in 2026 add up to $2,400 and are reportable.',
        ],
      },
      {
        heading: 'Common church examples',
        paragraphs: [],
        bullets: [
          'A guest preacher or visiting evangelist who is not on your staff.',
          'A pianist, organist, or sound technician paid per service as an independent contractor.',
          'A cleaning, landscaping, or repair business run by an individual or partnership.',
          'A bookkeeper or consultant you pay as a contractor rather than an employee.',
        ],
      },
      {
        heading: 'Common exceptions',
        paragraphs: [],
        bullets: [
          'Your employees — their wages go on Form W-2, not a 1099-NEC. This includes a pastor who is the church’s employee for income tax.',
          'Payments to most corporations (including an LLC taxed as a C or S corporation). Attorneys’ fees are an exception: they are reportable even when paid to a corporation.',
          'Totals for the year below the threshold.',
        ],
      },
      {
        heading: 'Collect a Form W-9 before you pay',
        paragraphs: [
          'Ask every contractor for a Form W-9 before the first payment. It gives you their legal name, tax classification, and taxpayer identification number (TIN). If a payee does not provide a TIN, the payment is subject to backup withholding — currently 24% — and you must file a Form 1099-NEC for anyone you withheld from, regardless of the amount.',
        ],
      },
      {
        heading: 'Deadline: January 31',
        paragraphs: [
          'Form 1099-NEC must be given to the payee and filed with the IRS by January 31 of the year after the payments were made. If January 31 falls on a weekend or legal holiday, the deadline moves to the next business day.',
        ],
      },
      {
        heading: 'Year-end checklist',
        paragraphs: [],
        bullets: [
          'Run a report of every non-employee payee and their total for the year.',
          'Flag totals at or above the threshold ($2,000 for 2026 payments).',
          'Remove payments to corporations (except attorneys) and to employees.',
          'Check that you have a W-9 on file for each remaining payee.',
          'Furnish and file Form 1099-NEC by January 31.',
        ],
      },
      {
        heading: 'Using ChurchGeniusPro',
        paragraphs: [
          'In ChurchGeniusPro, each expense is recorded with its date, amount, category, vendor name, and an attached receipt, so the records behind the checklist above — who you paid, how much, and when — are already in one place.',
        ],
      },
    ],
    sources: [
      {
        name: 'IRS: Instructions for Forms 1099-MISC and 1099-NEC',
        url: 'https://www.irs.gov/instructions/i1099mec',
      },
      {
        name: 'IRS: About Form 1099-NEC, Nonemployee Compensation',
        url: 'https://www.irs.gov/forms-pubs/about-form-1099-nec',
      },
      {
        name: 'IRS: About Form W-9, Request for Taxpayer Identification Number',
        url: 'https://www.irs.gov/forms-pubs/about-form-w-9',
      },
      {
        name: 'IRS: Backup withholding',
        url: 'https://www.irs.gov/businesses/small-businesses-self-employed/backup-withholding',
      },
      {
        name: 'IRS: One Big Beautiful Bill provisions',
        url: 'https://www.irs.gov/newsroom/one-big-beautiful-bill-provisions',
      },
    ],
    related: [
      {
        name: 'Guide: Paying Your Pastor',
        to: '/guides/pastor-pay-minister-housing-allowance-taxes',
        description: 'Housing allowance and SE tax.',
      },
      {
        name: 'Church Accounting Software',
        to: '/church-accounting-software',
        description: 'Expenses with vendor, category, and receipt.',
      },
      {
        name: 'Church Payroll Software',
        to: '/church-payroll-software',
        description: 'W-2s for your employees.',
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
