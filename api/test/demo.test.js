'use strict';
// Run: node --test test/   (Node 18+)
const { test } = require('node:test');
const assert = require('node:assert/strict');
const Module = require('node:module');

process.env.DEMO_SESSION_SECRET = 'test-secret-test-secret-test-secret';
process.env.STORAGE_CONNECTION_STRING = 'UseDevelopmentStorage=true';
delete process.env.BREVO_API_KEY;

// --- fakes for @azure/functions and @azure/data-tables ---------------------
const rows = new Map();
class FakeTable {
  static fromConnectionString() { return new FakeTable(); }
  async createTable() {}
  async getEntity(pk, rk) {
    const r = rows.get(`${pk}|${rk}`);
    if (!r) { const e = new Error('not found'); e.statusCode = 404; throw e; }
    return r;
  }
  async upsertEntity(e) { rows.set(`${e.partitionKey}|${e.rowKey}`, { ...(rows.get(`${e.partitionKey}|${e.rowKey}`) || {}), ...e }); }
  async updateEntity(e) { rows.set(`${e.partitionKey}|${e.rowKey}`, { ...(rows.get(`${e.partitionKey}|${e.rowKey}`) || {}), ...e }); }
}
let registered = null;
const origLoad = Module._load;
Module._load = function (req, ...rest) {
  if (req === '@azure/functions') return { app: { http: (_n, def) => { registered = def; } } };
  if (req === '@azure/data-tables') return { TableClient: FakeTable };
  if (req === 'google-auth-library') {
    return { OAuth2Client: class { async verifyIdToken({ idToken, audience }) {
      if (idToken !== 'GOOD') throw new Error('bad token');
      assert.deepEqual(audience, ['client-id-1']);
      return { getPayload: () => ({ email: 'Pat@Example.com', email_verified: true, name: 'Pat Example' }) };
    } } };
  }
  return origLoad.call(this, req, ...rest);
};
require('../src/functions/demo.js');
const session = require('../src/demoSession');
const demoEmail = require('../src/demoEmail');

const ctx = { log() {}, warn() {}, error() {} };
function req(method, action, body, { ip = '1.2.3.4', cookie = '' } = {}) {
  const headers = new Map([['x-forwarded-for', `${ip}:51234`], ['cookie', cookie]]);
  return {
    method, params: { action },
    headers: { get: (k) => headers.get(k.toLowerCase()) ?? null },
    json: async () => { if (body === undefined) throw new Error('no body'); return body; },
  };
}
const cookieOf = (res) => (res.headers['Set-Cookie'] || '').split(';')[0].split('=').slice(1).join('=');

test('session cookie round-trips and rejects tampering/expiry', () => {
  const v = session.issue({ email: 'a@b.co', name: 'A', provider: 'email' });
  assert.equal(session.verify(v).email, 'a@b.co');
  assert.equal(session.verify(v.slice(0, -2) + 'xx'), null);
  const [p] = v.split('.');
  assert.equal(session.verify(p + '.' + 'A'.repeat(43)), null);
  const expired = Buffer.from(JSON.stringify({ e: 'a@b.co', n: 'A', p: 'email', exp: 1 })).toString('base64url');
  assert.equal(session.verify(expired + '.' + v.split('.')[1]), null);
  assert.match(session.setCookieHeader(v), /HttpOnly; Secure; SameSite=Lax; Max-Age=2592000/);
  assert.match(session.setCookieHeader('', { clear: true }), /Max-Age=0/);
});

test('register: validation errors, then first-time, then returning', async () => {
  let res = await registered.handler(req('POST', 'register', { name: 'X', email: 'nope' }), ctx);
  assert.equal(res.status, 400);
  assert.deepEqual(Object.keys(res.jsonBody.errors).sort(), ['email', 'name']);

  res = await registered.handler(req('POST', 'register', { name: 'Jane Doe', email: 'Jane@Church.ORG', church: 'Grace' }), ctx);
  assert.equal(res.status, 200);
  assert.equal(res.jsonBody.firstTime, true);
  assert.equal(res.jsonBody.stored, true);
  assert.equal(res.jsonBody.viewer.email, 'jane@church.org');
  assert.equal(res.jsonBody.welcomeEmail.reason, 'not-configured');
  assert.equal(res.headers['Cache-Control'], 'no-store');
  const cookie = cookieOf(res);
  assert.equal(session.verify(decodeURIComponent(cookie)).name, 'Jane Doe');

  res = await registered.handler(req('POST', 'register', { name: 'Jane Doe', email: 'jane@church.org' }), ctx);
  assert.equal(res.jsonBody.firstTime, false);
  assert.equal(res.jsonBody.welcomeEmail.reason, 'not-first-time');
  assert.equal(rows.get('viewer|jane@church.org').signIns, 2);

  const me = await registered.handler(req('GET', 'me', undefined, { cookie: `cgp_demo=${cookie}` }), ctx);
  assert.equal(me.jsonBody.ok, true);
  assert.equal(me.jsonBody.viewer.email, 'jane@church.org');
  assert.equal(me.jsonBody.viewer.password, undefined);
  const anon = await registered.handler(req('GET', 'me'), ctx);
  assert.equal(anon.jsonBody.ok, false);
});

test('honeypot answers like success but stores nothing', async () => {
  const before = rows.size;
  const res = await registered.handler(req('POST', 'register', { name: 'Bot', email: 'bot@x.com', website: 'http://spam' }), ctx);
  assert.equal(res.status, 200);
  assert.equal(res.headers['Set-Cookie'], undefined);
  assert.equal(rows.size, before);
});

test('google: 503 without client id, 401 on bad token, signs in on good token', async () => {
  delete process.env.GOOGLE_CLIENT_ID;
  let res = await registered.handler(req('POST', 'google', { credential: 'GOOD' }), ctx);
  assert.equal(res.status, 503);
  process.env.GOOGLE_CLIENT_ID = 'client-id-1';
  res = await registered.handler(req('POST', 'google', { credential: 'BAD' }), ctx);
  assert.equal(res.status, 401);
  res = await registered.handler(req('POST', 'google', { credential: 'GOOD' }), ctx);
  assert.equal(res.status, 200);
  assert.equal(res.jsonBody.viewer.email, 'pat@example.com');
  assert.equal(res.jsonBody.viewer.provider, 'google');
  assert.equal(res.jsonBody.firstTime, true);
});

test('logout clears cookie; unknown action 404; rate limit 429', async () => {
  const out = await registered.handler(req('POST', 'logout'), ctx);
  assert.match(out.headers['Set-Cookie'], /cgp_demo=; .*Max-Age=0/);
  assert.equal((await registered.handler(req('POST', 'nothing'), ctx)).status, 404);
  let last;
  for (let i = 0; i < 13; i++) last = await registered.handler(req('POST', 'register', { name: 'R', email: 'bad' }, { ip: '9.9.9.9' }), ctx);
  assert.equal(last.status, 429);
});

test('missing DEMO_SESSION_SECRET → 503', async () => {
  const saved = process.env.DEMO_SESSION_SECRET;
  delete process.env.DEMO_SESSION_SECRET;
  assert.equal((await registered.handler(req('GET', 'me'), ctx)).status, 503);
  process.env.DEMO_SESSION_SECRET = saved;
});

test('welcome email: sender parsing and inert without config', async () => {
  assert.deepEqual(demoEmail.parseSender('ChurchGeniusPro <info@churchgeniuspro.com>'), { name: 'ChurchGeniusPro', email: 'info@churchgeniuspro.com' });
  assert.deepEqual(demoEmail.parseSender('info@churchgeniuspro.com'), { name: 'ChurchGeniusPro', email: 'info@churchgeniuspro.com' });
  assert.equal(demoEmail.isConfigured(), false);
  assert.deepEqual(await demoEmail.sendWelcomeEmail({ email: 'a@b.co', name: '<b>' }), { sent: false, reason: 'not-configured' });
  assert.match(demoEmail.welcomeHtml('<b>'), /Hi &lt;b&gt;,/);
  assert.match(demoEmail.welcomeHtml(''), /Thank you for your interest in ChurchGeniusPro, the all-in-one church management software/);
});
