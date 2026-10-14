/**
 * Client side of the demo access gate (/demo).
 *
 * The browser only ever talks to the site's own managed functions
 * (/api/demo/*). Google sign-in uses Google Identity Services: Google hands the
 * page an ID token, the page forwards it to /api/demo/google, and the function
 * verifies it against Google's public keys using the OAuth *client ID* only —
 * no client secret exists on the website side. The session itself is a signed
 * HttpOnly cookie set by the function; this module never sees it.
 */

export interface DemoViewer {
  name: string;
  email: string;
  provider: 'google' | 'email';
}

export interface DemoAccessResult {
  ok: true;
  viewer: DemoViewer;
  /** True the first time this email registers or signs in. */
  firstTime: boolean;
  stored: boolean;
  welcomeEmail?: { sent: boolean; reason?: string };
}

export interface DemoAccessError {
  ok: false;
  error: string;
  errors?: Partial<Record<'name' | 'email', string>>;
  status: number;
}

/** OAuth Web client ID (public by design). Empty = Google button hidden. */
export const GOOGLE_CLIENT_ID: string = (import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined) ?? '';

const NETWORK_ERROR = 'Network error. Please check your connection and try again.';

async function post(path: string, body: unknown): Promise<DemoAccessResult | DemoAccessError> {
  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(body),
    });
    const json = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      viewer?: DemoViewer;
      firstTime?: boolean;
      stored?: boolean;
      welcomeEmail?: { sent: boolean; reason?: string };
      error?: string;
      errors?: DemoAccessError['errors'];
    };
    if (res.ok && json.ok && json.viewer) {
      return {
        ok: true,
        viewer: json.viewer,
        firstTime: json.firstTime === true,
        stored: json.stored === true,
        welcomeEmail: json.welcomeEmail,
      };
    }
    return {
      ok: false,
      status: res.status,
      error: json.error ?? 'Something went wrong. Please try again.',
      errors: json.errors,
    };
  } catch {
    return { ok: false, status: 0, error: NETWORK_ERROR };
  }
}

export function registerWithEmail(data: { name: string; email: string; church?: string; website?: string }) {
  return post('/api/demo/register', data);
}

export function signInWithGoogleCredential(credential: string) {
  return post('/api/demo/google', { credential });
}

export async function currentDemoViewer(): Promise<DemoViewer | null> {
  try {
    const res = await fetch('/api/demo/me', { credentials: 'same-origin', headers: { Accept: 'application/json' } });
    const json = (await res.json().catch(() => ({}))) as { ok?: boolean; viewer?: DemoViewer };
    return res.ok && json.ok && json.viewer ? json.viewer : null;
  } catch {
    return null;
  }
}

export async function signOutDemo(): Promise<void> {
  try {
    await fetch('/api/demo/logout', { method: 'POST', credentials: 'same-origin' });
  } catch {
    /* cookie simply stays until it expires */
  }
}

/* ------------------------------------------------------------------ */
/* Google Identity Services (loaded on demand, only on /demo)          */
/* ------------------------------------------------------------------ */

interface GsiCredentialResponse {
  credential: string;
}
interface GsiIdApi {
  initialize: (opts: {
    client_id: string;
    callback: (r: GsiCredentialResponse) => void;
    ux_mode?: 'popup' | 'redirect';
    auto_select?: boolean;
    itp_support?: boolean;
    use_fedcm_for_prompt?: boolean;
  }) => void;
  renderButton: (
    el: HTMLElement,
    opts: {
      type?: 'standard' | 'icon';
      theme?: 'outline' | 'filled_blue' | 'filled_black';
      size?: 'large' | 'medium' | 'small';
      text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
      shape?: 'rectangular' | 'pill' | 'circle' | 'square';
      width?: number;
      logo_alignment?: 'left' | 'center';
    }
  ) => void;
  cancel: () => void;
}
declare global {
  interface Window {
    google?: { accounts?: { id?: GsiIdApi } };
  }
}

let gsiPromise: Promise<GsiIdApi> | null = null;

/** Loads https://accounts.google.com/gsi/client once and resolves the API. */
export function loadGoogleIdentity(): Promise<GsiIdApi> {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'));
  if (window.google?.accounts?.id) return Promise.resolve(window.google.accounts.id);
  if (!gsiPromise) {
    gsiPromise = new Promise((resolve, reject) => {
      const tag = document.createElement('script');
      tag.src = 'https://accounts.google.com/gsi/client';
      tag.async = true;
      tag.defer = true;
      tag.onload = () => {
        const api = window.google?.accounts?.id;
        if (api) resolve(api);
        else reject(new Error('Google Identity Services did not initialise'));
      };
      tag.onerror = () => {
        gsiPromise = null;
        reject(new Error('Google Identity Services failed to load'));
      };
      document.head.appendChild(tag);
    });
  }
  return gsiPromise;
}
