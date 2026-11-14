/**
 * Client for GET /api/promo — the promotional code is always validated by the
 * server (api/src/functions/promo.js), never only in the browser.
 */
export type PromoCheck =
  | { valid: true; code: string; label: string; percentOff: number; durationMonths: number; plans: string[] }
  | { valid: false; reason: 'empty' | 'invalid' | 'expired' | 'not_started' | 'unavailable'; message: string };

export async function checkPromoCode(code: string): Promise<PromoCheck> {
  try {
    const res = await fetch(`/api/promo?code=${encodeURIComponent(code.trim())}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(String(res.status));
    return (await res.json()) as PromoCheck;
  } catch {
    return {
      valid: false,
      reason: 'unavailable',
      message: "We couldn't check the code right now. Please try again in a moment, or leave the field blank.",
    };
  }
}
