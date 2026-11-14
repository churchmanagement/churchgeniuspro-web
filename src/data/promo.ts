import { useEffect, useState } from 'react';

/**
 * Holiday Special 2026 offer (code HOLIDAY50) — single source for the home banner, the Pricing
 * page section and the /signup promo field.
 *
 * The code is validated server-side by /api/promo (api/src/lib/promoCodes.js),
 * which holds its own copy of the dates. Keep both in sync.
 *
 * `enabled` is the master switch. Even when enabled, the offer only shows
 * between `startsAt` and `endsAt`, so it disappears on its own when it ends.
 */
export const blackFriday = {
  enabled: true,
  code: 'HOLIDAY50',
  percentOff: 50,
  durationLabel: '2 years',
  startsAt: '2026-11-14T00:00:00-06:00',
  endsAt: '2026-12-31T23:59:59-06:00',
  /** Human-readable end date shown in the fine print. */
  endsLabel: 'December 31, 2026',
  plans: [
    { name: 'Standard', regular: 20, promo: 10 },
    { name: 'Pro', regular: 40, promo: 20 },
  ],
  highlights: [
    'Use promo code HOLIDAY50',
    '50% off subscription pricing for 2 years',
    'First 2 months FREE as a trial',
    'No contract',
    '30-day money-back guarantee',
    'Limited-time offer',
  ],
  /** Plain-language terms, repeated wherever the offer appears. */
  terms:
    'Applies to new Standard and Pro subscriptions requested with code HOLIDAY50 by December 31, 2026. The 50% discount starts when paid billing begins after your 2-month free trial and lasts 2 years; after that the regular plan price applies. Not applicable to the Free plan.',
} as const;

/** True while the Holiday Special offer should be shown on the website. */
export function isBlackFridayLive(now: Date = new Date()): boolean {
  if (!blackFriday.enabled) return false;
  return now >= new Date(blackFriday.startsAt) && now <= new Date(blackFriday.endsAt);
}

/**
 * Hydration-safe version for components. The prerendered HTML and the first
 * client render both use the master switch; after mount the real date window
 * is checked, so the offer disappears on its own once it ends (even before the
 * site is rebuilt).
 */
export function useBlackFridayLive(): boolean {
  const [live, setLive] = useState<boolean>(blackFriday.enabled);
  useEffect(() => setLive(isBlackFridayLive()), []);
  return live;
}


/** Offer name shown on the website. */
export function offerName(): 'Holiday' {
  return 'Holiday';
}

/** Offer name for components. */
export function useOfferName(): 'Holiday' {
  return offerName();
}
