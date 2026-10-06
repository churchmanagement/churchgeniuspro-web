/**
 * Google Ads (gtag.js) helpers.
 *
 * The tag itself is loaded in index.html, which fires one page_view for the
 * initial document load. This module covers what that misses: client-side
 * route changes in the SPA, which send no page_view of their own.
 */

export const GTAG_ID = 'AW-18428227347';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Sends a page_view for a client-side navigation.
 *
 * Safe to call anywhere: it no-ops during server-side rendering and when the
 * tag has not loaded (ad blockers, consent tooling, offline).
 */
export function trackPageView(path: string): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    send_to: GTAG_ID,
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
