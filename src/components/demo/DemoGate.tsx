import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Lock, PlayCircle, ShieldCheck } from 'lucide-react';
import {
  GOOGLE_CLIENT_ID,
  loadGoogleIdentity,
  registerWithEmail,
  signInWithGoogleCredential,
  type DemoAccessResult,
} from '../../lib/demoAuth';

interface GateFields {
  name: string;
  email: string;
  church: string;
  /** Honeypot — hidden from people, filled by bots. */
  website: string;
}

interface DemoGateProps {
  onAccess: (result: DemoAccessResult) => void;
}

/**
 * The shared sign-in / registration card shown on /demo before the videos.
 * "Continue with Google" (Google Identity Services) and a password-less email
 * registration both end in the same place: a demo session cookie issued by
 * /api/demo/*. Nothing here stores or transmits a password.
 */
export default function DemoGate({ onAccess }: DemoGateProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [busy, setBusy] = useState<'google' | 'email' | null>(null);
  const [googleState, setGoogleState] = useState<'idle' | 'ready' | 'unavailable'>(
    GOOGLE_CLIENT_ID ? 'idle' : 'unavailable'
  );
  const googleHost = useRef<HTMLDivElement>(null);
  const onAccessRef = useRef(onAccess);
  onAccessRef.current = onAccess;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<GateFields>({ defaultValues: { name: '', email: '', church: '', website: '' } });

  // Render the official Google button once the GIS script is available.
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;
    let cancelled = false;
    loadGoogleIdentity()
      .then((gsi) => {
        if (cancelled || !googleHost.current) return;
        gsi.initialize({
          client_id: GOOGLE_CLIENT_ID,
          ux_mode: 'popup',
          itp_support: true,
          callback: (r) => {
            setBusy('google');
            setServerError(null);
            void signInWithGoogleCredential(r.credential).then((res) => {
              setBusy(null);
              if (res.ok) onAccessRef.current(res);
              else setServerError(res.error);
            });
          },
        });
        googleHost.current.innerHTML = '';
        const width = Math.min(400, Math.max(240, googleHost.current.clientWidth || 320));
        gsi.renderButton(googleHost.current, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          shape: 'pill',
          width,
          logo_alignment: 'center',
        });
        setGoogleState('ready');
      })
      .catch(() => {
        if (!cancelled) setGoogleState('unavailable');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const submitEmail = async (data: GateFields) => {
    setBusy('email');
    setServerError(null);
    const res = await registerWithEmail({
      name: data.name.trim(),
      email: data.email.trim(),
      church: data.church.trim(),
      website: data.website,
    });
    setBusy(null);
    if (res.ok) {
      onAccess(res);
      return;
    }
    if (res.errors?.name) setError('name', { message: res.errors.name });
    if (res.errors?.email) setError('email', { message: res.errors.email });
    if (!res.errors) setServerError(res.error);
  };

  return (
    <div className="glass rounded-3xl p-2 sm:p-3">
      <div className="rounded-2xl border border-slate-100 bg-white px-6 py-8 sm:px-10 sm:py-10">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/25">
            <PlayCircle className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Watch the demo</h2>
            <p className="text-sm text-slate-500">Sign in or register once — it takes a few seconds.</p>
          </div>
        </div>

        {/* Google */}
        {googleState !== 'unavailable' && (
          <div className="mt-7">
            <div
              ref={googleHost}
              className={`flex min-h-[44px] justify-center ${googleState === 'idle' ? 'animate-pulse rounded-full bg-slate-100' : ''}`}
              aria-busy={googleState === 'idle'}
              aria-label="Continue with Google"
            />
            <div className="my-6 flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span className="h-px flex-1 bg-slate-200" aria-hidden="true" />
              or register with your email
              <span className="h-px flex-1 bg-slate-200" aria-hidden="true" />
            </div>
          </div>
        )}

        {/* Email registration */}
        <form onSubmit={handleSubmit(submitEmail)} noValidate className={`relative ${googleState === 'unavailable' ? 'mt-7' : ''}`}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="demo-name" className="label">
                Your name <span className="text-rose-500">*</span>
              </label>
              <input
                id="demo-name"
                type="text"
                autoComplete="name"
                className="input"
                placeholder="Pastor Jane Doe"
                aria-invalid={!!errors.name}
                {...register('name', {
                  required: 'Please enter your name.',
                  minLength: { value: 2, message: 'Please enter your name.' },
                  maxLength: { value: 120, message: 'Please use a shorter name.' },
                })}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-rose-600" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="demo-email" className="label">
                Email address <span className="text-rose-500">*</span>
              </label>
              <input
                id="demo-email"
                type="email"
                autoComplete="email"
                inputMode="email"
                className="input"
                placeholder="you@yourchurch.org"
                aria-invalid={!!errors.email}
                {...register('email', {
                  required: 'Please enter your email address.',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i, message: 'Please enter a valid email address.' },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-rose-600" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="demo-church" className="label">
                Church name <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <input
                id="demo-church"
                type="text"
                autoComplete="organization"
                className="input"
                placeholder="Grace Community Church"
                {...register('church', { maxLength: 160 })}
              />
            </div>
            {/* Honeypot: off-screen, never shown; autocomplete off so browsers don't fill it. */}
            <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="demo-website">Website</label>
              <input id="demo-website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
            </div>
          </div>

          {serverError && (
            <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700" role="alert">
              {serverError}
            </p>
          )}

          <button type="submit" disabled={busy !== null} className="btn-primary mt-6 w-full !py-3.5 disabled:opacity-60">
            {busy === 'email' ? 'One moment…' : busy === 'google' ? 'Signing in with Google…' : 'Register & watch the demo'}
          </button>
        </form>

        <ul className="mt-6 space-y-2 text-xs text-slate-500">
          <li className="flex items-start gap-2">
            <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" aria-hidden="true" />
            No password to create. We only use your email to welcome you and answer your questions.
          </li>
          <li className="flex items-start gap-2">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" aria-hidden="true" />
            By continuing you agree to our{' '}
            <Link to="/privacy" className="font-medium text-blue-600 hover:underline">
              Privacy Policy
            </Link>
            .
          </li>
        </ul>
      </div>
    </div>
  );
}
