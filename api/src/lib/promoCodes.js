'use strict';

/**
 * Server-side source of truth for website promotional codes.
 *
 * The /signup form only accepts a code that this list says is valid right
 * now. Dates are ISO strings with an explicit offset (US Central).
 *
 * Optional override without a redeploy of code: set the application setting
 * PROMO_CODES_JSON to a JSON array with the same shape.
 *
 * IMPORTANT: a code here is a promise shown to churches. Only add or extend a
 * code once the matching discount exists in billing (Stripe coupon / app
 * promotional pricing) so the offer can actually be honored.
 */
const DEFAULT_CODES = [
  {
    code: 'BLACK50',
    label: 'Black Friday — 50% off for 2 years',
    percentOff: 50,
    durationMonths: 24,
    // Applies to paid plans only, after the 2-month free trial.
    plans: ['Standard', 'Pro'],
    startsAt: '2026-11-14T00:00:00-06:00',
    endsAt: '2026-11-30T23:59:59-06:00',
  },
];

function loadCodes() {
  const raw = process.env.PROMO_CODES_JSON;
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      /* fall back to defaults */
    }
  }
  return DEFAULT_CODES;
}

/** Normalizes user input: trims, uppercases, removes inner spaces. */
function normalize(code) {
  return String(code ?? '')
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '');
}

/**
 * Checks a code at a point in time.
 * Returns { valid: true, promo } or { valid: false, reason: 'empty'|'invalid'|'expired'|'not_started' }.
 */
function checkPromoCode(input, now = new Date()) {
  const code = normalize(input);
  if (!code) return { valid: false, reason: 'empty' };
  if (code.length > 32 || !/^[A-Z0-9_-]+$/.test(code)) return { valid: false, reason: 'invalid' };
  const promo = loadCodes().find((p) => normalize(p.code) === code);
  if (!promo) return { valid: false, reason: 'invalid' };
  if (promo.startsAt && now < new Date(promo.startsAt)) return { valid: false, reason: 'not_started' };
  if (promo.endsAt && now > new Date(promo.endsAt)) return { valid: false, reason: 'expired' };
  return { valid: true, promo };
}

module.exports = { checkPromoCode, normalize, DEFAULT_CODES };
