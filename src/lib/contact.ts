/**
 * Contact form delivery via Web3Forms (https://web3forms.com).
 *
 * Setup (one time):
 * 1. Go to https://web3forms.com and create a free Access Key using
 *    support@churchgeniuspro.com — submissions are delivered to that inbox.
 * 2. Add the key as a build-time variable: create a `.env` file (or a GitHub
 *    Actions secret exposed as an env var) with
 *      VITE_WEB3FORMS_KEY=your-access-key-here
 * 3. Every submission is CC'd to churchgeniuspro@gmail.com via the `ccemail`
 *    field below.
 */

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
// Web3Forms access keys are public-by-design (they appear in page source on any
// plain-HTML integration); they can only cause mail to be sent to your own inbox.
// The env var, when set at build time, overrides this default.
const ACCESS_KEY =
  (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) || '610387cd-198f-437e-8e27-f169516b8c44';
// Backup copy: a second Web3Forms access key registered to
// churchgeniuspro@gmail.com. Web3Forms' `ccemail` field is Pro-only, so every
// form is sent twice — once per key — and counts as delivered if either works.
// Leave blank to disable. VITE_WEB3FORMS_BACKUP_KEY overrides at build time.
const BACKUP_ACCESS_KEY =
  (import.meta.env.VITE_WEB3FORMS_BACKUP_KEY as string | undefined) || '';

export interface ContactMessage {
  name: string;
  email: string;
  church?: string;
  phone?: string;
  subject: string;
  message: string;
  /** Trial request: "How did you hear about ChurchGeniusPro?" (required on /signup). */
  heardAbout?: string;
  /** Optional detail: friend's name, which social network, or where (Others). */
  heardAboutDetail?: string;
  /** Trial request: server-validated promotional code (e.g. HOLIDAY50), if any. */
  promoCode?: string;
}

async function sendWithKey(
  accessKey: string,
  data: ContactMessage,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `[ChurchGeniusPro] ${data.subject}`,
        from_name: data.name,
        email: data.email,
        name: data.name,
        church: data.church ?? '',
        phone: data.phone ?? '',
        message: data.message,
        ...(data.heardAbout
          ? {
              how_did_you_hear: data.heardAboutDetail?.trim()
                ? `${data.heardAbout} — ${data.heardAboutDetail.trim()}`
                : data.heardAbout,
            }
          : {}),
        ...(data.promoCode ? { promo_code: data.promoCode } : {}),
        botcheck: '',
      }),
    });
    const json = (await res.json()) as { success?: boolean; message?: string };
    if (res.ok && json.success) return { ok: true };
    return { ok: false, error: json.message ?? 'Something went wrong. Please try again.' };
  } catch {
    return { ok: false, error: 'Network error. Please check your connection and try again.' };
  }
}

/**
 * Sends the form to support@churchgeniuspro.com and, when a backup key is set,
 * also to churchgeniuspro@gmail.com. Succeeds if at least one copy is accepted.
 */
export async function submitContactForm(data: ContactMessage): Promise<{ ok: boolean; error?: string }> {
  const keys = [ACCESS_KEY, BACKUP_ACCESS_KEY].filter((k, i, all) => k && all.indexOf(k) === i);
  const results = await Promise.all(keys.map((k) => sendWithKey(k, data)));
  return results.find((r) => r.ok) ?? results[0];
}
