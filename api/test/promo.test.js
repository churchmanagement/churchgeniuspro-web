'use strict';
// Run: node --test test/   (Node 18+)
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { checkPromoCode } = require('../src/lib/promoCodes');

const during = new Date('2026-11-20T12:00:00-06:00');

test('valid code during the window (case and spaces ignored)', () => {
  for (const c of ['BLACK50', 'black50', '  Black 50 ']) {
    const r = checkPromoCode(c, during);
    assert.equal(r.valid, true, c);
    assert.equal(r.promo.percentOff, 50);
    assert.equal(r.promo.durationMonths, 24);
  }
});
test('blank code', () => assert.deepEqual(checkPromoCode('', during), { valid: false, reason: 'empty' }));
test('unknown code', () => assert.equal(checkPromoCode('FREE100', during).reason, 'invalid'));
test('junk input', () => assert.equal(checkPromoCode('<script>', during).reason, 'invalid'));
test('expired after Dec 31 CT', () =>
  assert.equal(checkPromoCode('BLACK50', new Date('2027-01-01T00:00:01-06:00')).reason, 'expired'));
test('last minute still valid', () =>
  assert.equal(checkPromoCode('BLACK50', new Date('2026-12-31T23:59:00-06:00')).valid, true));
test('not started before Nov 14', () =>
  assert.equal(checkPromoCode('BLACK50', new Date('2026-11-13T12:00:00-06:00')).reason, 'not_started'));
test('env override replaces defaults', () => {
  process.env.PROMO_CODES_JSON = JSON.stringify([{ code: 'TEST10', percentOff: 10, durationMonths: 1 }]);
  assert.equal(checkPromoCode('BLACK50', during).reason, 'invalid');
  assert.equal(checkPromoCode('test10', during).valid, true);
  delete process.env.PROMO_CODES_JSON;
});
