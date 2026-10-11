/**
 * Single source of truth for per-route SEO metadata.
 *
 * Used in two places:
 *  1. The <Seo /> component updates the document head on client-side navigation.
 *  2. scripts/prerender.mjs (via src/entry-server.tsx) bakes these values into
 *     the static HTML emitted for each route at build time, and generates
 *     sitemap.xml from `prerenderRoutes`.
 */
import { helpSections } from './helpContent';
import { landingPages } from './landing';
import { guides } from './guides';
import { compareVsPages } from './compareVs';

export const SITE = 'https://www.churchgeniuspro.com';

export interface RouteMeta {
  /** Route path as served (e.g. '/pricing'). */
  path: string;
  title: string;
  description: string;
  /** Canonical path if different from `path` (e.g. /signup → /contact). */
  canonicalPath?: string;
  /** Exclude from sitemap.xml (still prerendered unless noindex). */
  excludeFromSitemap?: boolean;
  /** Not prerendered and marked noindex on the client. */
  noindex?: boolean;
  /** Social share image (path under public/), 1200×630. Defaults to DEFAULT_OG_IMAGE. */
  ogImage?: string;
}

/** Share image used by every page that does not set its own `ogImage`. */
export const DEFAULT_OG_IMAGE = '/og-image.png';

const staticRoutes: RouteMeta[] = [
  {
    path: '/',
    title: 'Church Management Software with AI | ChurchGeniusPro',
    description:
      'All-in-one church management software: members, attendance, giving, accounting with payroll, and an AI assistant. Free plan and 2-month trial, no credit card.',
    ogImage: '/og/home.jpg',
  },
  {
    path: '/features',
    title: 'Church Management Software Features | ChurchGeniusPro',
    description:
      'Explore every ChurchGeniusPro feature: member management, online giving, fund accounting, payroll, events, kids check-in, communication, and AI analytics.',
  },
  {
    path: '/pricing',
    title: 'Pricing: Free, Standard $20, Pro $40 | ChurchGeniusPro',
    description:
      'Limited time: Free $0, Standard $20/month, Pro $40/month — with accounting included. Try every feature free for 2 months. Free setup.',
  },
  {
    path: '/compare',
    title: 'Compare Church Management Software | ChurchGeniusPro',
    description:
      'Feature-by-feature comparison of ChurchGeniusPro with Breeze, Planning Center, and Tithe.ly church management software, verified from official sources.',
  },
  {
    path: '/support',
    title: 'Support, Tutorials & Video Guides | ChurchGeniusPro',
    description:
      'Get help fast: video tutorials, step-by-step guides, and a support team that knows church workflows — attendance, follow-ups, giving, and accounting AI.',
  },
  {
    path: '/contact',
    title: 'Contact Us — Ask a Question or Get Started | ChurchGeniusPro',
    description:
      'Talk to the ChurchGeniusPro team. Ask about features, pricing, or migrating from your current church management system, and get set up for your church.',
  },
  {
    path: '/signup',
    title: 'Request Your Free 2-Month Trial | ChurchGeniusPro',
    description:
      'Request the ChurchGeniusPro Trial Version: every feature free for 2 months, including accounting and AI. Free setup, and our team reviews every request.',
  },
  {
    path: '/help',
    title: 'Help Center — Guides for Every Role | ChurchGeniusPro',
    description:
      'Step-by-step guides for administrators, pastors, accountants, volunteers, and members. Everything you need to get the most out of ChurchGeniusPro.',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | ChurchGeniusPro',
    description:
      'How ChurchGeniusPro collects, uses, and protects your church’s data: what we collect, how it is used, children’s data, security, and your data rights.',
  },
  {
    path: '/terms',
    title: 'Terms of Service | ChurchGeniusPro',
    description:
      'The terms for using ChurchGeniusPro: your account, subscriptions and free trials, ownership of your church’s data, acceptable use, and service availability.',
  },
  {
    path: '/cookies',
    title: 'Cookie Policy | ChurchGeniusPro',
    description:
      'What cookies are, the types of cookies the ChurchGeniusPro website uses, and how to manage or delete cookies through your browser settings.',
  },
  {
    path: '/admin',
    title: 'Admin Dashboard | ChurchGeniusPro',
    description: 'Internal video analytics dashboard.',
    noindex: true,
    excludeFromSitemap: true,
  },
];

/**
 * Search-result descriptions for help chapters whose in-app summary is shorter
 * than 120 characters. Written from each chapter's own articles.
 */
const helpMetaDescriptions: Record<string, string> = {
  'getting-started':
    'Start here: what ChurchGeniusPro is, who uses it, how to log in for the first time, find your way around the app, and log out safely.',
  'volunteer-guide':
    'Volunteer guide for ChurchGeniusPro: find your assignments, accept or decline requests, update your volunteer profile, and learn about special roles.',
  glossary:
    'ChurchGeniusPro glossary: plain-English definitions of the terms used across the app, so administrators, volunteers, and members speak the same language.',
};

const helpRoutes: RouteMeta[] = helpSections.map((s) => ({
  path: `/help/${s.id}`,
  title: `${s.title} — Help Center | ChurchGeniusPro`,
  description: helpMetaDescriptions[s.id] ?? s.description,
}));

/** Dedicated SEO landing pages (src/data/landing.ts). */
const landingRoutes: RouteMeta[] = landingPages.map((p) => ({
  path: `/${p.slug}`,
  title: p.title,
  description: p.metaDescription,
  ogImage: `/og/${p.slug}.jpg`,
}));

/** Guides index + one page per guide (src/data/guides.ts). */
const guideRoutes: RouteMeta[] = [
  {
    path: '/guides',
    title: 'Guides for Church Administrators | ChurchGeniusPro',
    description:
      'Plain-English guides for church administrators: contribution statements, fund accounting, pastor pay, and Form 1099-NEC, each linked to official sources.',
  },
  ...guides.map((g) => ({
    path: `/guides/${g.slug}`,
    title: g.title,
    description: g.metaDescription,
  })),
];

/** One-on-one comparison pages (src/data/compareVs.ts). */
const compareVsRoutes: RouteMeta[] = compareVsPages.map((p) => ({
  path: `/compare/${p.slug}`,
  title: p.title,
  description: p.metaDescription,
}));

/** Routes baked to static HTML at build time (and listed in sitemap.xml unless excluded). */
export const prerenderRoutes: RouteMeta[] = [
  ...staticRoutes,
  ...landingRoutes,
  ...helpRoutes,
  ...guideRoutes,
  ...compareVsRoutes,
];

/**
 * The branded "Page not found" page. Prerendered to dist/404.html (noindex, no
 * canonical, never in the sitemap) and served by staticwebapp.config.json with a
 * real HTTP 404 for any URL that has no file. The client uses the same title.
 */
export const notFoundMeta = {
  path: '/404',
  title: 'Page Not Found | ChurchGeniusPro',
  description:
    'This page does not exist or has moved. Explore ChurchGeniusPro church management software features, pricing, and step-by-step help guides.',
} as const;

const byPath = new Map(prerenderRoutes.map((m) => [m.path, m]));

export function getRouteMeta(path: string): RouteMeta | undefined {
  return byPath.get(path.replace(/\/+$/, '') || '/');
}
