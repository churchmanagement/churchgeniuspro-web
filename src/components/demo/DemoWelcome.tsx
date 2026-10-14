import { motion } from 'framer-motion';
import { Sparkles, HandHeart, LogOut, Mail } from 'lucide-react';
import type { DemoViewer } from '../../lib/demoAuth';

export type WelcomeKind = 'first-time' | 'returning' | 'resumed';

interface DemoWelcomeProps {
  viewer: DemoViewer;
  kind: WelcomeKind;
  /** Set when the server reports it emailed the welcome message. */
  emailSent?: boolean;
  onSignOut: () => void;
}

const firstName = (v: DemoViewer) => (v.name || '').trim().split(/\s+/)[0] || '';

/**
 * Welcome panel shown above the demo videos.
 *  - first-time: the full ChurchGeniusPro welcome message (new registration or
 *    first Google sign-in)
 *  - returning:  a short "welcome back" after an existing viewer signs in again
 *  - resumed:    the compact bar when a still-valid session opens /demo later
 */
export default function DemoWelcome({ viewer, kind, emailSent, onSignOut }: DemoWelcomeProps) {
  const name = firstName(viewer);

  if (kind === 'first-time') {
    return (
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        aria-labelledby="demo-welcome-title"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-500 p-[1px] shadow-xl shadow-purple-600/20"
      >
        <div className="rounded-[calc(1.5rem-1px)] bg-white px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/25">
              <HandHeart className="h-7 w-7" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Church management software
              </span>
              <h2 id="demo-welcome-title" className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Welcome to ChurchGeniusPro{name ? `, ${name}` : ''}!
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                Thank you for your interest in ChurchGeniusPro, the all-in-one church management software designed to
                simplify church administration and help your ministry thrive.
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
                Explore our 5-minute product tour and other demonstration videos to discover how ChurchGeniusPro can
                help your church manage its members, families, groups, finances, donations, and more.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
                {emailSent && (
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" /> We also sent this welcome to{' '}
                    {viewer.email}.
                  </span>
                )}
                <span>Signed in as {viewer.email}</span>
                <button type="button" onClick={onSignOut} className="inline-flex items-center gap-1 font-medium text-blue-600 hover:underline">
                  <LogOut className="h-3.5 w-3.5" aria-hidden="true" /> Not you? Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      aria-labelledby="demo-welcome-title"
      className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 id="demo-welcome-title" className="text-base font-bold text-slate-900">
            Welcome back{name ? `, ${name}` : ''}!
          </h2>
          <p className="text-sm text-slate-500">
            {kind === 'returning'
              ? 'Good to see you again — pick up the tour where you left off, or explore the other demos below.'
              : 'You are signed in to the ChurchGeniusPro demo. Enjoy the tour and the feature demos below.'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 text-xs text-slate-500 sm:shrink-0">
        <span className="truncate">{viewer.email}</span>
        <button type="button" onClick={onSignOut} className="inline-flex items-center gap-1 font-medium text-blue-600 hover:underline">
          <LogOut className="h-3.5 w-3.5" aria-hidden="true" /> Sign out
        </button>
      </div>
    </motion.section>
  );
}
