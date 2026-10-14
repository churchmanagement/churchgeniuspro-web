import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Clock3, Film, Lock, PlayCircle, Sparkles } from 'lucide-react';
import DemoGate from '../components/demo/DemoGate';
import DemoWelcome, { type WelcomeKind } from '../components/demo/DemoWelcome';
import DemoTheater from '../components/demo/DemoTheater';
import { currentDemoViewer, signOutDemo, type DemoAccessResult, type DemoViewer } from '../lib/demoAuth';
import { demoLibrary, demoTour } from '../data/videos';
import { trackDemoAccess } from '../lib/gtag';

type Stage =
  | { state: 'gate' }
  | { state: 'open'; viewer: DemoViewer; kind: WelcomeKind; emailSent: boolean };

const whatYouGet = [
  { icon: Clock3, text: 'The 5-minute tour of the whole application' },
  { icon: Film, text: `${demoLibrary.length} more feature demos, organised by topic` },
  { icon: PlayCircle, text: 'Everything plays right here — no detours to YouTube' },
  { icon: Lock, text: 'No password, no credit card, no obligation' },
];

/**
 * /demo — the gated product demo.
 * Before sign-in: what the visitor gets + the sign-in / registration card.
 * After sign-in:  welcome message (first-time vs returning), the 5-minute tour
 *                 and the categorised demo library.
 */
export default function Demo() {
  // The gate is the prerendered (crawler-visible) state; a still-valid demo
  // cookie reopens the videos on the client without asking again.
  const [stage, setStage] = useState<Stage>({ state: 'gate' });
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void currentDemoViewer().then((viewer) => {
      if (cancelled) return;
      if (viewer) setStage({ state: 'open', viewer, kind: 'resumed', emailSent: false });
      setChecked(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const onAccess = useCallback((r: DemoAccessResult) => {
    trackDemoAccess(r.firstTime, r.viewer.provider);
    setStage({
      state: 'open',
      viewer: r.viewer,
      kind: r.firstTime ? 'first-time' : 'returning',
      emailSent: r.welcomeEmail?.sent === true,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const onSignOut = useCallback(() => {
    void signOutDemo().then(() => setStage({ state: 'gate' }));
  }, []);

  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden pb-10 pt-32 md:pt-40">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-white to-white" aria-hidden="true" />
        <div
          className="absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(59,130,246,0.5), rgba(147,51,234,0.3), transparent)' }}
          aria-hidden="true"
        />
        <div className="container-page">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-purple-600" aria-hidden="true" /> Product demo
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              See <span className="gradient-text">ChurchGeniusPro</span> in action
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
              A 5-minute tour of the application, plus demonstration videos for every major feature — members, giving,
              accounting, events, check-in and the AI assistant.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-page">
          {stage.state === 'gate' && (
            <div
              className={`mx-auto grid max-w-6xl items-center gap-10 transition-opacity duration-300 lg:grid-cols-[1.15fr_1fr] lg:gap-14 ${checked ? '' : 'opacity-60'}`}
              aria-busy={!checked}
            >
              {/* Preview + what you get */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <div className="relative overflow-hidden rounded-3xl bg-slate-950 shadow-2xl shadow-slate-900/30 ring-1 ring-white/10">
                  <img
                    src={`https://i.ytimg.com/vi/${demoTour.id}/hqdefault.jpg`}
                    alt="Preview of the 5-minute ChurchGeniusPro application tour"
                    width={480}
                    height={360}
                    className="aspect-video h-auto w-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" aria-hidden="true" />
                  <div className="absolute inset-0 flex -translate-y-6 flex-col items-center justify-center text-center text-white sm:-translate-y-4">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur ring-1 ring-white/30 sm:h-20 sm:w-20">
                      <Lock className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden="true" />
                    </span>
                    <p className="mt-3 hidden text-sm font-semibold uppercase tracking-wider text-blue-200 sm:block">Sign in to play</p>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">Primary demo · 5 min · sign in to play</p>
                    <p className="mt-1 text-base font-bold leading-snug sm:text-lg">{demoTour.title}</p>
                  </div>
                </div>

                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {whatYouGet.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 text-blue-600">
                        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-medium text-slate-700">{text}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                  <Check className="h-4 w-4 text-emerald-500" aria-hidden="true" /> Already registered? Just sign in again with the same email or Google account.
                </p>
              </motion.div>

              {/* Gate */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <DemoGate onAccess={onAccess} />
              </motion.div>
            </div>
          )}

          {stage.state === 'open' && (
            <div className="mx-auto max-w-6xl space-y-10">
              <DemoWelcome viewer={stage.viewer} kind={stage.kind} emailSent={stage.emailSent} onSignOut={onSignOut} />
              <DemoTheater />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
