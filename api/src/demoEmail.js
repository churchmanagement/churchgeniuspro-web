'use strict';

/**
 * Welcome email for first-time demo registrants, sent through Brevo's
 * transactional API (the verified sender configured in the Brevo account).
 *
 * Deliberately inert until BOTH settings exist in the Static Web App:
 *   BREVO_API_KEY  — Brevo → SMTP & API → API Keys (v3 key)
 *   BREVO_SENDER   — a sender address already verified in Brevo, e.g.
 *                    "ChurchGeniusPro <support@churchgeniuspro.com>"
 *
 * Without them sendWelcomeEmail() returns { sent: false, reason: 'not-configured' }
 * and the on-screen welcome is unaffected. A failed send never fails the
 * registration either — it is logged and reported in the response.
 */

const BREVO_ENDPOINT = 'https://api.brevo.com/v3/smtp/email';
const SITE = 'https://www.churchgeniuspro.com';

function parseSender(raw) {
  const text = String(raw || '').trim();
  if (!text) return null;
  const angle = /^(.*?)<([^<>\s]+@[^<>\s]+)>$/.exec(text);
  const name = angle ? angle[1].replace(/"/g, '').trim() : '';
  const email = angle ? angle[2].trim() : text;
  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) return null;
  return { name: name || 'ChurchGeniusPro', email };
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** The welcome message (same wording as the on-screen first-time panel). */
function welcomeHtml(name) {
  const greeting = name ? `Hi ${escapeHtml(name)},` : 'Hello,';
  return `<!doctype html><html><body style="margin:0;background:#f8fafc;font-family:Inter,Segoe UI,Arial,sans-serif;color:#1e293b">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;padding:32px 12px">
<tr><td align="center">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0">
<tr><td style="background:linear-gradient(90deg,#2563eb,#9333ea);padding:28px 32px;color:#fff">
  <div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;opacity:.85">Church Management Software</div>
  <h1 style="margin:8px 0 0;font-size:24px;line-height:1.25">Welcome to ChurchGeniusPro!</h1>
</td></tr>
<tr><td style="padding:28px 32px;font-size:16px;line-height:1.6">
  <p style="margin:0 0 16px">${greeting}</p>
  <p style="margin:0 0 16px">Thank you for your interest in ChurchGeniusPro, the all-in-one church management software designed to simplify church administration and help your ministry thrive.</p>
  <p style="margin:0 0 24px">Explore our 5-minute product tour and other demonstration videos to discover how ChurchGeniusPro can help your church manage its members, families, groups, finances, donations, and more.</p>
  <p style="margin:0 0 28px;text-align:center">
    <a href="${SITE}/demo" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;font-weight:600;padding:14px 26px;border-radius:12px">Watch the 5-minute tour</a>
  </p>
  <p style="margin:0;font-size:14px;color:#64748b">Questions? Reply to this email or write to <a href="mailto:support@churchgeniuspro.com" style="color:#2563eb">support@churchgeniuspro.com</a>. Ready to try it with your own church? <a href="${SITE}/signup" style="color:#2563eb">Start a 2-month free trial</a> — no credit card required.</p>
</td></tr>
<tr><td style="padding:16px 32px;background:#f1f5f9;font-size:12px;color:#94a3b8">Church Genius LLC · <a href="${SITE}" style="color:#94a3b8">churchgeniuspro.com</a></td></tr>
</table></td></tr></table></body></html>`;
}

function isConfigured() {
  return !!(process.env.BREVO_API_KEY && parseSender(process.env.BREVO_SENDER));
}

/**
 * Sends the welcome email. Never throws.
 * @returns {Promise<{sent: boolean, reason?: string}>}
 */
async function sendWelcomeEmail({ email, name }, context) {
  if (!isConfigured()) {
    context?.log?.('[demo] welcome email not configured (BREVO_API_KEY / BREVO_SENDER) — skipped');
    return { sent: false, reason: 'not-configured' };
  }
  const sender = parseSender(process.env.BREVO_SENDER);
  try {
    const res = await fetch(BREVO_ENDPOINT, {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        sender,
        to: [{ email, name: name || undefined }],
        replyTo: { email: 'support@churchgeniuspro.com', name: 'ChurchGeniusPro Support' },
        subject: 'Welcome to ChurchGeniusPro!',
        htmlContent: welcomeHtml(name),
        tags: ['demo-welcome'],
      }),
    });
    if (!res.ok) {
      const text = (await res.text().catch(() => '')).slice(0, 300);
      context?.warn?.(`[demo] welcome email failed: HTTP ${res.status} ${text}`);
      return { sent: false, reason: `http-${res.status}` };
    }
    return { sent: true };
  } catch (err) {
    context?.warn?.(`[demo] welcome email error: ${err?.message || err}`);
    return { sent: false, reason: 'network' };
  }
}

module.exports = { sendWelcomeEmail, isConfigured, welcomeHtml, parseSender };
