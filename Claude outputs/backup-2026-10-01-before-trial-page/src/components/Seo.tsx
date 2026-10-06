import { useEffect } from 'react';
import { SITE } from '../data/seo';

interface SeoProps {
  title: string;
  description: string;
  /** Canonical path for this page (e.g. '/pricing'). */
  path: string;
  noindex?: boolean;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Keeps the document head in sync on client-side navigation. The same values
 * are baked into the prerendered HTML at build time (scripts/prerender.mjs),
 * so crawlers see them without running JavaScript; this component keeps the
 * SPA experience consistent after hydration.
 */
export default function Seo({ title, description, path, noindex }: SeoProps) {
  useEffect(() => {
    const url = SITE + (path === '/' ? '/' : path);
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    const robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (noindex) {
      if (robots) {
        robots.content = 'noindex, nofollow';
      } else {
        upsertMeta('name', 'robots', 'noindex, nofollow');
      }
    } else if (robots) {
      robots.remove();
    }
  }, [title, description, path, noindex]);

  return null;
}
