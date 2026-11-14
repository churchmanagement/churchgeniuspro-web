import { useEffect, useState } from 'react';

/**
 * Black Friday 2026 offer — single source for the home banner, the Pricing
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
  code: 'BLACK50',
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
    'Use promo code BLACK50',
    '50% off subscription pricing for 2 years',
    'First 2 months FREE as a trial',
    'No contract',
    '30-day money-back guarantee',
    'Limited-time offer',
  ],
  /** Plain-language terms, repeated wherever the offer appears. */
  terms:
    'Applies to new Standard and Pro subscriptions requested with code BLACK50 by December 31, 2026. The 50% discount starts when paid billing begins after your 2-month free trial and lasts 2 years; after that the regular plan price applies. Not applicable to the Free plan.',
} as const;

/** True while the Black Friday offer should be shown on the website. */
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

/** From this moment the offer is presented as the "Holiday Special". */
const HOLIDAY_FROM = '2026-12-01T00:00:00-06:00';

/** Offer name for the given date: "Black Friday" through Nov 30, "Holiday" from Dec 1. */
export function offerName(now: Date = new Date()): 'Black Friday' | 'Holiday' {
  return now >= new Date(HOLIDAY_FROM) ? 'Holiday' : 'Black Friday';
}

/** Hydration-safe offer name (prerendered as "Black Friday", corrected after mount). */
export function useOfferName(): 'Black Friday' | 'Holiday' {
  const [name, setName] = useState<'Black Friday' | 'Holiday'>('Black Friday');
  useEffect(() => setName(offerName()), []);
  return name;
}
