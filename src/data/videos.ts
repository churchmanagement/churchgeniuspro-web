/**
 * Videos from the official ChurchGeniusPro YouTube channel.
 * Channel: https://www.youtube.com/@ChurchGeniusPro (UCyfQvpuUT_k4enhyr7hbQww)
 *
 * The same demo videos live in C:\workspace\ChurchGeniusPro\ChurchGeniusPro\demo-videos —
 * they are embedded from YouTube here so the site stays fast and YouTube Studio
 * provides channel-owner-only view and watch-time analytics automatically.
 *
 * To add a video: append it to `demoLibrary` (and to `shorts` if it should also
 * appear on the public Support page). IDs come from the channel feed:
 * https://www.youtube.com/feeds/videos.xml?channel_id=UCyfQvpuUT_k4enhyr7hbQww
 */

export interface SiteVideo {
  id: string; // YouTube video ID
  title: string;
  topic: string;
  isShort: boolean;
}

/** Featured product demo (regular video). */
export const featuredVideo: SiteVideo = {
  id: 'DSp_YUROchY',
  title: 'ChurchGeniusPro — Full Product Overview',
  topic: 'Overview',
  isShort: false,
};

/** Latest Shorts from the channel, newest first. */
export const shorts: SiteVideo[] = [
  { id: 'iPJEUQaE8E8', title: 'Help Center', topic: 'Support', isShort: true },
  { id: 'dH3oAXGy50M', title: 'Groups', topic: 'People', isShort: true },
  { id: 'bw4q2N9Sj3k', title: 'Follow Ups', topic: 'Ministry', isShort: true },
  { id: 'Ra6fFOUcxq4', title: 'Certificates', topic: 'People', isShort: true },
  { id: 's16nFiE3gEw', title: 'Attendance', topic: 'Events', isShort: true },
  { id: 'CcAMdz084S0', title: 'Accounting AI', topic: 'Accounting', isShort: true },
];

export const productTourVideos: SiteVideo[] = [featuredVideo, ...shorts];

export const youtubeChannelUrl = 'https://www.youtube.com/@ChurchGeniusPro';

/* ------------------------------------------------------------------ */
/* Demo library — shown on /demo after a visitor signs in or registers */
/* ------------------------------------------------------------------ */

export type DemoCategory =
  | 'Overview'
  | 'People & Ministry'
  | 'Events & Check-in'
  | 'Accounting & Giving'
  | 'Access & Support';

export const demoCategories: DemoCategory[] = [
  'Overview',
  'People & Ministry',
  'Events & Check-in',
  'Accounting & Giving',
  'Access & Support',
];

export interface DemoVideo extends SiteVideo {
  category: DemoCategory;
  /** One line shown under the title in the library. */
  description: string;
}

/** The primary demo: the 5-minute application tour. */
export const demoTour: DemoVideo = {
  id: 'BrvHZXAd880',
  title: 'Take a 5-minute tour of the ChurchGeniusPro application',
  topic: 'Overview',
  category: 'Overview',
  isShort: false,
  description:
    'Members, families, groups, giving, accounting, events and the AI assistant — the whole application in five minutes.',
};

/** Every other demonstration video on the channel, grouped by category on /demo. */
export const demoLibrary: DemoVideo[] = [
  // Overview
  {
    id: 'f2n94IqKA9U',
    title: 'AI Search',
    topic: 'AI',
    category: 'Overview',
    isShort: false,
    description: 'Ask in plain words and the AI finds the right people, records or page for you.',
  },
  {
    id: 'DSp_YUROchY',
    title: 'Full Product Overview',
    topic: 'Overview',
    category: 'Overview',
    isShort: false,
    description: 'The original end-to-end walkthrough of ChurchGeniusPro.',
  },
  {
    id: '12yGv6BMErk',
    title: 'Be a commander, not a worker',
    topic: 'Overview',
    category: 'Overview',
    isShort: true,
    description: 'Why church leaders choose software that does the busywork for them.',
  },
  {
    id: 'UU-HhuBU-oY',
    title: 'Panda',
    topic: 'Overview',
    category: 'Overview',
    isShort: true,
    description: 'A light-hearted look at life before and after ChurchGeniusPro.',
  },
  // People & Ministry
  {
    id: 'dH3oAXGy50M',
    title: 'Groups',
    topic: 'People',
    category: 'People & Ministry',
    isShort: true,
    description: 'Create ministry groups, manage members and email a whole group at once.',
  },
  {
    id: 'bw4q2N9Sj3k',
    title: 'Follow Ups',
    topic: 'Ministry',
    category: 'People & Ministry',
    isShort: true,
    description: 'Track visitors, prayer requests and pastoral follow-up tasks.',
  },
  {
    id: 'Ra6fFOUcxq4',
    title: 'Certificates',
    topic: 'People',
    category: 'People & Ministry',
    isShort: true,
    description: 'Print baptism, membership and appreciation certificates in seconds.',
  },
  {
    id: 's16nFiE3gEw',
    title: 'Attendance',
    topic: 'Events',
    category: 'People & Ministry',
    isShort: true,
    description: 'Record Sunday and mid-week attendance and see the trends.',
  },
  // Events & Check-in
  {
    id: '6XT_voAA-08',
    title: 'Event Creation & Registration',
    topic: 'Events',
    category: 'Events & Check-in',
    isShort: false,
    description: 'Set up an event, publish registration and send reminders automatically.',
  },
  {
    id: 'TMER6RrGP40',
    title: 'Event Check-in',
    topic: 'Events',
    category: 'Events & Check-in',
    isShort: true,
    description: 'Fast check-in with codes and barcodes on event day.',
  },
  {
    id: 'uhzGszCi6s4',
    title: 'Kids Event',
    topic: 'Kids',
    category: 'Events & Check-in',
    isShort: true,
    description: 'Secure kids check-in and pickup for Sunday school and kids events.',
  },
  // Accounting & Giving
  {
    id: 'bZzCdMeBQls',
    title: 'Advanced Accounting with AI',
    topic: 'Accounting',
    category: 'Accounting & Giving',
    isShort: true,
    description: 'Income, expenses and reports — with the AI assistant doing the typing.',
  },
  {
    id: '7oAx2aGcDKA',
    title: 'Accounting with Advanced AI',
    topic: 'Accounting',
    category: 'Accounting & Giving',
    isShort: true,
    description: 'Snap a check or bank statement and let the AI record it.',
  },
  {
    id: 'CcAMdz084S0',
    title: 'Accounting AI',
    topic: 'Accounting',
    category: 'Accounting & Giving',
    isShort: true,
    description: 'Voice and one-word commands for everyday bookkeeping.',
  },
  // Access & Support
  {
    id: 'KJ9kgi9az7U',
    title: 'Tap your phone',
    topic: 'Access',
    category: 'Access & Support',
    isShort: true,
    description: 'NFC tag sign-in: tap a phone to open the right page, no password typed.',
  },
  {
    id: 'iPJEUQaE8E8',
    title: 'Help Center',
    topic: 'Support',
    category: 'Access & Support',
    isShort: true,
    description: 'Step-by-step help built into the app, with an AI assistant to guide you.',
  },
];

/** The tour plus every library video, in display order. */
export const allDemoVideos: DemoVideo[] = [demoTour, ...demoLibrary];
