/**
 * Google Ads (gtag.js) helpers.
 *
 * The tag itself is loaded in index.html, which fires one page_view for the
 * initial document load. This module covers what that misses: client-side
 * route changes in the SPA, which send no page_view of their own.
 */

export const GTAG_ID = 'AW-18428227347';

/**
 * Conversion label for the "Trial request" conversion action in Google Ads
 * (Goals → Conversions → the action → Tag setup → "Use Google tag" → the part
 * after the slash in send_to 'AW-18428227347/XXXXXXXX').
 *
 * Created 2026-11-12 in Google Ads account 981-995-9642 (Goals → Sign-up →
 * "Trial request"). Can be overridden at build time with VITE_GADS_TRIAL_LABEL;
 * trackTrialConversion() is a no-op if this is ever blank.
 */
export const TRIAL_CONVERSION_LABEL: string =
  (import.meta.env.VITE_GADS_TRIAL_LABEL as string | undefined) || 'vdqKCM_-m7cdEJPeodNE';

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

/**
 * Reports a successful trial request to Google Ads as a conversion.
 * Called once, after the form submission succeeds — never on page load.
 */
export function trackTrialConversion(): void {
  if (!TRIAL_CONVERSION_LABEL) return;
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'conversion', {
    send_to: `${GTAG_ID}/${TRIAL_CONVERSION_LABEL}`,
  });
}

/**
 * Reports that a visitor opened the demo (/demo) after signing in or
 * registering. A plain event, not a conversion — useful in Google Ads reports.
 */
export function trackDemoAccess(firstTime: boolean, provider: string): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', firstTime ? 'demo_register' : 'demo_sign_in', {
    send_to: GTAG_ID,
    method: provider,
  });
}
