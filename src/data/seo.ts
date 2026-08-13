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
}

const staticRoutes: RouteMeta[] = [
  {
    path: '/',
    title: 'ChurchGeniusPro — AI-Powered Church Management & Accounting',
    description:
      'ChurchGeniusPro replaces a dozen disconnected tools with one AI-powered platform: member management, accounting, giving, events, kids check-in, and more.',
  },
  {
    path: '/features',
    title: 'Church Management Software Features | ChurchGeniusPro',
    description:
      'Explore every ChurchGeniusPro feature: member management, online giving, fund accounting, payroll, events, kids check-in, communication, and AI analytics.',
  },
  {
    path: '/pricing',
    title: 'Pricing: Free, Standard $15/mo, Pro $25/mo | ChurchGeniusPro',
    description:
      'Simple, transparent pricing for churches. Start free, then upgrade to Standard ($15/mo) or Pro ($25/mo) when ready. No setup fees, cancel anytime.',
  },
  {
    path: '/compare',
    title: 'Compare Church Management Software | ChurchGeniusPro',
    description:
      'Feature-by-feature comparison of ChurchGeniusPro with spreadsheets, QuickBooks Online, Breeze, Planning Center, and Tithe.ly, verified from official sources.',
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
    title: 'Contact Us — Ask a Question or Get Started | ChurchGeniusPro',
    description:
      'Talk to the ChurchGeniusPro team. Ask about features, pricing, or migrating from your current church management system, and get set up for your church.',
    canonicalPath: '/contact',
    excludeFromSitemap: true,
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
    description: 'How ChurchGeniusPro collects, uses, and protects your church’s data.',
  },
  {
    path: '/terms',
    title: 'Terms of Service | ChurchGeniusPro',
    description: 'The terms that govern your use of ChurchGeniusPro.',
  },
  {
    path: '/cookies',
    title: 'Cookie Policy | ChurchGeniusPro',
    description: 'How ChurchGeniusPro uses cookies and similar technologies.',
  },
  {
    path: '/admin',
    title: 'Admin Dashboard | ChurchGeniusPro',
    description: 'Internal video analytics dashboard.',
    noindex: true,
    excludeFromSitemap: true,
  },
];

const helpRoutes: RouteMeta[] = helpSections.map((s) => ({
  path: `/help/${s.id}`,
  title: `${s.title} — Help Center | ChurchGeniusPro`,
  description: s.description,
}));

/** Dedicated SEO landing pages (src/data/landing.ts). */
const landingRoutes: RouteMeta[] = landingPages.map((p) => ({
  path: `/${p.slug}`,
  title: p.title,
  description: p.metaDescription,
}));

/** Routes baked to static HTML at build time (and listed in sitemap.xml unless excluded). */
export const prerenderRoutes: RouteMeta[] = [...staticRoutes, ...landingRoutes, ...helpRoutes];

const byPath = new Map(prerenderRoutes.map((m) => [m.path, m]));

export function getRouteMeta(path: string): RouteMeta | undefined {
  return byPath.get(path.replace(/\/+$/, '') || '/');
}
