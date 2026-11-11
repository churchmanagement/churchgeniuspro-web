/**
 * Product Tour screenshots — optimized WebP variants generated from
 * website_screens/ (top-cropped to 16:10 for full-page captures, quality 82).
 * Files live in public/screens/ as <slug>-<width>.webp.
 */

export interface ScreenshotSize {
  w: number;
  h: number;
}

export interface Screenshot {
  slug: string;
  title: string;
  caption: string;
  /** Available rendered widths, smallest first. */
  sizes: ScreenshotSize[];
}

export const screenshots: Screenshot[] = [
  {
    slug: 'dashboard',
    title: 'Dashboard',
    caption: 'Members, growth, calendar, and finances at a glance',
    sizes: [
      { w: 720, h: 383 },
      { w: 1280, h: 681 },
    ],
  },
  {
    slug: 'families',
    title: 'Families',
    caption: 'Family records with members, groups, and alerts',
    sizes: [
      { w: 720, h: 280 },
      { w: 1280, h: 498 },
    ],
  },
  {
    slug: 'groups',
    title: 'Groups',
    caption: 'Define and manage church groups and their members',
    sizes: [
      { w: 720, h: 323 },
      { w: 1280, h: 574 },
    ],
  },
  {
    slug: 'attendance',
    title: 'Attendance',
    caption: 'Track check-ins, visitors, and attendance trends',
    sizes: [
      { w: 720, h: 460 },
      { w: 1096, h: 700 },
    ],
  },
  {
    slug: 'kids-checkin-kiosk',
    title: 'Kids Check-In',
    caption: 'Find children by parent or guardian phone number',
    sizes: [
      { w: 720, h: 230 },
      { w: 1096, h: 350 },
    ],
  },
  {
    slug: 'online-giving',
    title: 'Online Giving',
    caption: 'Record and track donations, with receipts in seconds',
    sizes: [
      { w: 720, h: 419 },
      { w: 1280, h: 746 },
    ],
  },
  {
    slug: 'accounting-reports',
    title: 'Accounting Reports',
    caption: 'Fund-based income and expenses at a glance',
    sizes: [{ w: 720, h: 403 }],
  },
  {
    slug: 'financial-reports',
    title: 'Financial Reports',
    caption: 'Board-ready statements in one click',
    sizes: [
      { w: 720, h: 450 },
      { w: 1280, h: 800 },
    ],
  },
  {
    slug: 'payroll',
    title: 'Payroll',
    caption: 'Payroll runs with a register and tax liability totals',
    sizes: [
      { w: 720, h: 522 },
      { w: 1280, h: 929 },
    ],
  },
  {
    slug: 'year-end-giving',
    title: 'Year-End Giving Statements',
    caption: 'Annual giving statements for every donor',
    sizes: [{ w: 720, h: 481 }],
  },
  {
    slug: 'pledge-campaigns',
    title: 'Pledge Campaigns',
    caption: 'Track campaigns and auto-allocate contributions',
    sizes: [{ w: 498, h: 311 }],
  },
  {
    slug: 'pledges',
    title: 'Pledges',
    caption: 'Pledged vs. collected, in real time',
    sizes: [{ w: 720, h: 368 }],
  },
  {
    slug: 'events-calendar',
    title: 'Events Calendar',
    caption: 'Every service and gathering in one place',
    sizes: [
      { w: 720, h: 302 },
      { w: 1280, h: 537 },
    ],
  },
  {
    slug: 'event-setup',
    title: 'Event Setup',
    caption: 'RSVPs, registration, fees, and QR check-in',
    sizes: [
      { w: 720, h: 450 },
      { w: 1280, h: 800 },
    ],
  },
  {
    slug: 'meetings',
    title: 'Meetings',
    caption: 'Schedule, invite, and track attendance',
    sizes: [
      { w: 720, h: 450 },
      { w: 1280, h: 800 },
    ],
  },
  {
    slug: 'worship-planning',
    title: 'Worship Planning',
    caption: 'Plan services and teams, week by week',
    sizes: [
      { w: 720, h: 299 },
      { w: 1280, h: 532 },
    ],
  },
  {
    slug: 'kids-checkin',
    title: 'Kids Check-In',
    caption: 'Secure code and barcode check-in for children',
    sizes: [{ w: 653, h: 426 }],
  },
  {
    slug: 'kids-ministry',
    title: 'Kids Ministry',
    caption: 'Classrooms, rosters, and the parents portal',
    sizes: [
      { w: 720, h: 296 },
      { w: 1280, h: 527 },
    ],
  },
  {
    slug: 'volunteer-management',
    title: 'Volunteer Management',
    caption: 'Recruit, schedule, and appreciate volunteers',
    sizes: [
      { w: 720, h: 497 },
      { w: 1280, h: 883 },
    ],
  },
  {
    slug: 'certificates',
    title: 'Certificates',
    caption: 'Design and print baptism and membership certificates',
    sizes: [
      { w: 720, h: 491 },
      { w: 1280, h: 874 },
    ],
  },
  {
    slug: 'help-center',
    title: 'In-App Help Center',
    caption: 'Searchable guides plus a built-in AI assistant',
    sizes: [
      { w: 720, h: 450 },
      { w: 1280, h: 800 },
    ],
  },
];

/** Real screenshots of the AI writing tools, shown in the Advanced AI section. */
export const aiEmailDraftShot: Screenshot = {
  slug: 'ai-email-draft',
  title: 'Draft with AI in Compose Email',
  caption: 'Describe the email, pick tone, length and language, then draft, rewrite or translate',
  sizes: [
    { w: 720, h: 361 },
    { w: 1096, h: 550 },
  ],
};

export const aiEventBuilderShot: Screenshot = {
  slug: 'ai-event-builder',
  title: 'Describe your event',
  caption: 'One sentence fills the event form for you to review',
  sizes: [
    { w: 720, h: 533 },
    { w: 1096, h: 812 },
  ],
};

export const dashboardShot: Screenshot = screenshots[0];

export function screenshotSrc(s: Screenshot): string {
  const smallest = s.sizes[0];
  return `/screens/${s.slug}-${smallest.w}.webp`;
}

export function screenshotSrcSet(s: Screenshot): string {
  return s.sizes.map((z) => `/screens/${s.slug}-${z.w}.webp ${z.w}w`).join(', ');
}
