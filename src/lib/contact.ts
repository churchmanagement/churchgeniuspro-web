/**
 * Contact form delivery via Web3Forms (https://web3forms.com).
 *
 * Setup (one time):
 * 1. Go to https://web3forms.com and create a free Access Key using
 *    info@churchgeniuspro.com — submissions are delivered to that inbox.
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
  (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) ?? '610387cd-198f-437e-8e27-f169516b8c44';
const CC_EMAIL = 'churchgeniuspro@gmail.com';

export interface ContactMessage {
  name: string;
  email: string;
  church?: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function submitContactForm(data: ContactMessage): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: `[ChurchGeniusPro] ${data.subject}`,
        from_name: data.name,
        email: data.email,
        ccemail: CC_EMAIL,
        name: data.name,
        church: data.church ?? '',
        phone: data.phone ?? '',
        message: data.message,
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
