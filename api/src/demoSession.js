'use strict';

/**
 * Demo-viewer session: a signed, HttpOnly cookie issued after a visitor signs
 * in with Google or registers with their email on /demo.
 *
 * Format:  base64url(JSON payload) "." base64url(HMAC-SHA256(payload))
 * Payload: { e: email, n: name, p: 'google'|'email', iat, exp }
 *
 * Required application setting:
 *   DEMO_SESSION_SECRET — any random string of 32+ bytes. Without it the demo
 *   endpoints answer 503 (they never fall back to an unsigned cookie).
 */

const crypto = require('node:crypto');

const COOKIE_NAME = 'cgp_demo';
const MAX_AGE_SECONDS = 30 * 24 * 60 * 60; // 30 days

function secret() {
  const s = process.env.DEMO_SESSION_SECRET;
  return s && s.length >= 16 ? s : null;
}

function b64url(buf) {
  return Buffer.from(buf).toString('base64url');
}

function sign(payloadB64) {
  return crypto.createHmac('sha256', secret()).update(payloadB64).digest('base64url');
}

/** Builds the signed cookie value for a viewer. */
function issue(viewer) {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    e: viewer.email,
    n: viewer.name,
    p: viewer.provider,
    iat: now,
    exp: now + MAX_AGE_SECONDS,
  };
  const p = b64url(JSON.stringify(payload));
  return `${p}.${sign(p)}`;
}

/** Verifies a cookie value; returns the viewer or null. */
function verify(value) {
  if (!value || typeof value !== 'string' || !secret()) return null;
  const dot = value.indexOf('.');
  if (dot <= 0) return null;
  const p = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  const expected = sign(p);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  let payload;
  try {
    payload = JSON.parse(Buffer.from(p, 'base64url').toString('utf8'));
  } catch {
    return null;
  }
  if (!payload || typeof payload.e !== 'string' || !Number.isFinite(payload.exp)) return null;
  if (payload.exp < Math.floor(Date.now() / 1000)) return null;
  return { email: payload.e, name: typeof payload.n === 'string' ? payload.n : '', provider: payload.p };
}

/** Reads the session from an incoming request's Cookie header. */
function fromRequest(request) {
  const header = request.headers.get('cookie') || '';
  for (const part of header.split(';')) {
    const [k, ...rest] = part.trim().split('=');
    if (k === COOKIE_NAME) return verify(decodeURIComponent(rest.join('=')));
  }
  return null;
}

function setCookieHeader(value, { clear = false } = {}) {
  const attrs = [
    `${COOKIE_NAME}=${clear ? '' : encodeURIComponent(value)}`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    `Max-Age=${clear ? 0 : MAX_AGE_SECONDS}`,
  ];
  return attrs.join('; ');
}

module.exports = { COOKIE_NAME, MAX_AGE_SECONDS, issue, verify, fromRequest, setCookieHeader, hasSecret: () => !!secret() };
