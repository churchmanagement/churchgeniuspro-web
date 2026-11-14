'use strict';

/**
 * GET /api/promo?code=HOLIDAY50 — validates a promotional code server-side.
 *
 * Used by the /signup trial request form. Responds 200 with
 *   { valid: true, code, label, percentOff, durationMonths, plans, endsAt }
 * or
 *   { valid: false, reason: 'empty' | 'invalid' | 'expired' | 'not_started', message }
 * Never throws to the client; no customer data is stored.
 */

const { app } = require('@azure/functions');
const { checkPromoCode } = require('../lib/promoCodes');

const MESSAGES = {
  empty: 'Enter a promotional code, or leave the field blank.',
  invalid: "That promotional code isn't valid. Check the spelling, or leave the field blank.",
  expired: 'That promotional code has expired. You can still request the regular free trial.',
  not_started: "That promotional code isn't active yet.",
};

app.http('promo', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async (request) => {
    const result = checkPromoCode(request.query.get('code'));
    const headers = { 'Cache-Control': 'no-store' };
    if (!result.valid) {
      return { headers, jsonBody: { valid: false, reason: result.reason, message: MESSAGES[result.reason] } };
    }
    const p = result.promo;
    return {
      headers,
      jsonBody: {
        valid: true,
        code: p.code,
        label: p.label,
        percentOff: p.percentOff,
        durationMonths: p.durationMonths,
        plans: p.plans,
        endsAt: p.endsAt,
      },
    };
  },
});
