'use strict';

/**
 * Demo access gate for /demo on churchgeniuspro.com.
 *
 *   POST /api/demo/google    { credential }            — "Sign in with Google" ID token
 *   POST /api/demo/register  { name, email, church? }  — email registration (no password)
 *   GET  /api/demo/me                                  — current demo session, if any
 *   POST /api/demo/logout                              — clears the session cookie
 *
 * Successful google/register responses set the signed HttpOnly `cgp_demo`
 * cookie (src/demoSession.js) and return
 *   { ok: true, viewer: { name, email, provider }, firstTime, stored, welcomeEmail }
 * `firstTime` is true the first time an email is seen (DemoViewers table).
 *
 * Application settings:
 *   DEMO_SESSION_SECRET        required — signs the cookie
 *   GOOGLE_CLIENT_ID           required for Google sign-in (the OAuth *Web client ID*;
 *                              comma-separated if several). No client secret is needed:
 *                              ID tokens are verified against Google's public keys.
 *   STORAGE_CONNECTION_STRING  optional — records viewers in Azure Table Storage
 *                              (same account as /api/track). Without it every sign-in
 *                              is treated as first-time and nothing is stored.
 *   BREVO_API_KEY, BREVO_SENDER optional — welcome email (src/demoEmail.js)
 *
 * Nothing secret is ever returned to the browser.
 */

const { app } = require('@azure/functions');
const { TableClient } = require('@azure/data-tables');
const { OAuth2Client } = require('google-auth-library');
const session = require('../demoSession');
const { sendWelcomeEmail } = require('../demoEmail');

const TABLE_NAME = 'DemoViewers';
const PARTITION = 'viewer';
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[a-z]{2,}$/i;
const NO_STORE = { 'Cache-Control': 'no-store', Pragma: 'no-cache' };

// ---------------------------------------------------------------- storage
let clientPromise = null;
function getTable() {
  const conn = process.env.STORAGE_CONNECTION_STRING;
  if (!conn) return null;
  if (!clientPromise) {
    const client = TableClient.fromConnectionString(conn, TABLE_NAME);
    clientPromise = client
      .createTable()
      .catch(() => undefined) // already exists
      .then(() => client);
  }
  return clientPromise;
}

/** Table row keys may not contain / \ # ? or control characters. */
function rowKeyFor(email) {
  return email.toLowerCase().replace(/[\\/#?\u0000-\u001f\u007f-\u009f]/g, '_');
}

/**
 * Upserts the viewer and reports whether this email was seen before.
 * @returns {Promise<{firstTime: boolean, stored: boolean}>}
 */
async function recordViewer(viewer, context) {
  const pending = getTable();
  if (!pending) {
    context.warn('[demo] STORAGE_CONNECTION_STRING not configured — viewer not stored');
    return { firstTime: true, stored: false };
  }
  try {
    const table = await pending;
    const rowKey = rowKeyFor(viewer.email);
    let existing = null;
    try {
      existing = await table.getEntity(PARTITION, rowKey);
    } catch (err) {
      if (err?.statusCode !== 404) throw err;
    }
    const now = new Date().toISOString();
    await table.upsertEntity(
      {
        partitionKey: PARTITION,
        rowKey,
        email: viewer.email,
        name: viewer.name || existing?.name || '',
        church: viewer.church || existing?.church || '',
        provider: viewer.provider,
        firstSeenAt: existing?.firstSeenAt || now,
        lastSeenAt: now,
        signIns: (Number(existing?.signIns) || 0) + 1,
        welcomeEmailSentAt: existing?.welcomeEmailSentAt || '',
      },
      'Merge'
    );
    return { firstTime: !existing, stored: true };
  } catch (err) {
    context.error('[demo] failed to record viewer', err);
    return { firstTime: true, stored: false };
  }
}

async function markWelcomeSent(email) {
  const pending = getTable();
  if (!pending) return;
  try {
    const table = await pending;
    await table.updateEntity(
      { partitionKey: PARTITION, rowKey: rowKeyFor(email), welcomeEmailSentAt: new Date().toISOString() },
      'Merge'
    );
  } catch {
    /* best effort */
  }
}

// ----------------------------------------------------------- rate limit
// Per function instance; enough to blunt form spam without any extra service.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 12;
const hits = new Map(); // ip -> number[] (timestamps)

function clientIp(request) {
  const xff = request.headers.get('x-forwarded-for') || '';
  const first = xff.split(',')[0].trim();
  // Azure front ends append ":port" to the client IP.
  return first.replace(/:\d+$/, '') || 'unknown';
}

function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= MAX_PER_WINDOW) {
    hits.set(ip, list);
    return true;
  }
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear(); // bound memory
  return false;
}

// ------------------------------------------------------------- helpers
function clean(v, max) {
  return typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, max) : '';
}

function json(status, body, extraHeaders = {}) {
  return { status, jsonBody: body, headers: { ...NO_STORE, ...extraHeaders } };
}

function publicViewer(v) {
  return { name: v.name, email: v.email, provider: v.provider };
}

async function finishSignIn(viewer, context) {
  const { firstTime, stored } = await recordViewer(viewer, context);
  let welcomeEmail = { sent: false, reason: 'not-first-time' };
  if (firstTime) {
    welcomeEmail = await sendWelcomeEmail(viewer, context);
    if (welcomeEmail.sent) await markWelcomeSent(viewer.email);
  }
  context.log(`[demo] ${viewer.provider} sign-in ${firstTime ? 'NEW' : 'returning'} stored=${stored} email=${welcomeEmail.sent}`);
  return json(
    200,
    { ok: true, viewer: publicViewer(viewer), firstTime, stored, welcomeEmail },
    { 'Set-Cookie': session.setCookieHeader(session.issue(viewer)) }
  );
}

// -------------------------------------------------------------- google
let googleClient = null;
function googleAudiences() {
  return (process.env.GOOGLE_CLIENT_ID || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

async function handleGoogle(request, context) {
  const audience = googleAudiences();
  if (audience.length === 0) {
    context.warn('[demo] GOOGLE_CLIENT_ID not configured');
    return json(503, { ok: false, error: 'Google sign-in is not set up yet. Please register with your email instead.' });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return json(400, { ok: false, error: 'Invalid request.' });
  }
  const credential = clean(body?.credential, 4096);
  if (!credential) return json(400, { ok: false, error: 'Missing Google credential.' });

  try {
    googleClient ??= new OAuth2Client();
    const ticket = await googleClient.verifyIdToken({ idToken: credential, audience });
    const payload = ticket.getPayload();
    const email = clean(payload?.email, 254).toLowerCase();
    if (!email || payload.email_verified !== true || !EMAIL_RE.test(email)) {
      return json(401, { ok: false, error: 'Your Google account has no verified email address.' });
    }
    return await finishSignIn(
      { email, name: clean(payload.name || payload.given_name, 120), provider: 'google' },
      context
    );
  } catch (err) {
    context.warn(`[demo] Google token rejected: ${err?.message || err}`);
    return json(401, { ok: false, error: 'Google sign-in could not be verified. Please try again.' });
  }
}

// ------------------------------------------------------------ register
async function handleRegister(request, context) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json(400, { ok: false, error: 'Invalid request.' });
  }
  // Honeypot: real visitors never fill this hidden field. Answer like success.
  if (clean(body?.website, 10)) {
    return json(200, { ok: true, viewer: { name: '', email: '', provider: 'email' }, firstTime: false, stored: false });
  }
  const name = clean(body?.name, 120);
  const email = clean(body?.email, 254).toLowerCase();
  const church = clean(body?.church, 160);
  const errors = {};
  if (name.length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';
  if (Object.keys(errors).length) return json(400, { ok: false, error: 'Please check the highlighted fields.', errors });

  return finishSignIn({ email, name, church, provider: 'email' }, context);
}

// ------------------------------------------------------------- handler
app.http('demo', {
  route: 'demo/{action}',
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    const action = (request.params.action || '').toLowerCase();

    if (!session.hasSecret()) {
      context.error('[demo] DEMO_SESSION_SECRET is not configured');
      return json(503, { ok: false, error: 'The demo is temporarily unavailable. Please try again later.' });
    }

    if (request.method === 'GET' && action === 'me') {
      const viewer = session.fromRequest(request);
      return json(200, viewer ? { ok: true, viewer: publicViewer(viewer) } : { ok: false });
    }
    if (request.method !== 'POST') return json(405, { ok: false, error: 'Method not allowed.' });

    if (action === 'logout') {
      return json(200, { ok: true }, { 'Set-Cookie': session.setCookieHeader('', { clear: true }) });
    }
    if (action === 'google' || action === 'register') {
      if (rateLimited(clientIp(request))) {
        return json(429, { ok: false, error: 'Too many attempts. Please wait a few minutes and try again.' }, { 'Retry-After': '600' });
      }
      return action === 'google' ? handleGoogle(request, context) : handleRegister(request, context);
    }
    return json(404, { ok: false, error: 'Not found.' });
  },
});
