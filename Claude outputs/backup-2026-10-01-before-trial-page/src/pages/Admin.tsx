import { useCallback, useEffect, useState } from 'react';
import { BarChart3, Eye, MousePointerClick, Play, RefreshCw, ShieldAlert, Timer } from 'lucide-react';
import { productTourVideos } from '../data/videos';

/**
 * Admin-only video engagement dashboard.
 *
 * Access control happens server-side: staticwebapp.config.json restricts both
 * /admin and /api/stats to the `admin` role using Azure Static Web Apps
 * built-in authentication. Grant yourself the role in Azure Portal →
 * your Static Web App → Role management → Invite (role: admin).
 *
 * Note: YouTube Studio (channel owners only) additionally provides official
 * view counts and audience-retention analytics for the same videos.
 */

interface VideoStats {
  videoId: string;
  title: string;
  impressions: number;
  clicks: number;
  plays: number;
  watchSeconds: number;
}

interface StatsResponse {
  videos: VideoStats[];
  totals: { impressions: number; clicks: number; plays: number; watchSeconds: number };
}

function formatDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.round(totalSeconds % 60);
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

const knownTitles = new Map(productTourVideos.map((v) => [v.id, v.title]));

export default function Admin() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'unauthorized' | 'error'>('loading');

  const load = useCallback(async () => {
    setStatus('loading');
    try {
      const res = await fetch('/api/stats');
      if (res.status === 401 || res.status === 403) {
        setStatus('unauthorized');
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      setStats((await res.json()) as StatsResponse);
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const tiles = stats
    ? [
        { icon: Eye, label: 'Impressions', value: stats.totals.impressions.toLocaleString() },
        { icon: MousePointerClick, label: 'Clicks', value: stats.totals.clicks.toLocaleString() },
        { icon: Play, label: 'Plays', value: stats.totals.plays.toLocaleString() },
        { icon: Timer, label: 'Watch time', value: formatDuration(stats.totals.watchSeconds) },
      ]
    : [];

  return (
    <section className="relative overflow-hidden pb-20 pt-32 md:pt-40">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-white to-white" aria-hidden="true" />
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600">
              <BarChart3 className="h-3.5 w-3.5" aria-hidden="true" /> Admin · Video Analytics
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Video engagement
            </h1>
            <p className="mt-2 max-w-2xl text-slate-600">
              Impressions, clicks, plays, and watch time for the demo videos on the website.
              Official view counts and retention live in YouTube Studio.
            </p>
          </div>
          <button type="button" onClick={() => void load()} className="btn-secondary" disabled={status === 'loading'}>
            <RefreshCw className={`h-4 w-4 ${status === 'loading' ? 'animate-spin' : ''}`} aria-hidden="true" />
            Refresh
          </button>
        </div>

        {status === 'unauthorized' && (
          <div className="card mx-auto mt-16 max-w-lg text-center">
            <ShieldAlert className="mx-auto h-12 w-12 text-amber-500" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold text-slate-900">Administrators only</h2>
            <p className="mt-2 text-slate-600">
              This dashboard is restricted to authorized users. Sign in with an account that has the{' '}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">admin</code> role.
            </p>
            <a href="/.auth/login/aad?post_login_redirect_uri=/admin" className="btn-primary mt-6">
              Sign in with Microsoft
            </a>
            <p className="mt-4 text-xs text-slate-500">
              Roles are granted in Azure Portal → Static Web App → Role management.
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="card mx-auto mt-16 max-w-lg text-center">
            <h2 className="text-xl font-bold text-slate-900">Analytics unavailable</h2>
            <p className="mt-2 text-slate-600">
              The stats API did not respond. Make sure the Azure Function app is deployed and the
              <code className="mx-1 rounded bg-slate-100 px-1.5 py-0.5 text-sm">STORAGE_CONNECTION_STRING</code>
              application setting is configured.
            </p>
          </div>
        )}

        {status === 'ready' && stats && (
          <>
            {/* Totals */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {tiles.map((t) => (
                <div key={t.label} className="card">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                      <t.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-2xl font-extrabold text-slate-900">{t.value}</p>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{t.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Per-video table */}
            <div className="card mt-8 overflow-x-auto !p-0">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                    <th scope="col" className="px-6 py-4">Video</th>
                    <th scope="col" className="px-6 py-4 text-right">Impressions</th>
                    <th scope="col" className="px-6 py-4 text-right">Clicks</th>
                    <th scope="col" className="px-6 py-4 text-right">Plays</th>
                    <th scope="col" className="px-6 py-4 text-right">Watch time</th>
                    <th scope="col" className="px-6 py-4 text-right">Avg / play</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.videos.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                        No events recorded yet — analytics appear as soon as visitors watch a video.
                      </td>
                    </tr>
                  )}
                  {stats.videos.map((v) => (
                    <tr key={v.videoId} className="border-b border-slate-50 last:border-0">
                      <td className="px-6 py-4">
                        <a
                          href={`https://www.youtube.com/watch?v=${v.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-slate-900 hover:text-blue-600"
                        >
                          {knownTitles.get(v.videoId) ?? v.title ?? v.videoId}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-right tabular-nums">{v.impressions.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right tabular-nums">{v.clicks.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right tabular-nums">{v.plays.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right tabular-nums">{formatDuration(v.watchSeconds)}</td>
                      <td className="px-6 py-4 text-right tabular-nums">
                        {v.plays > 0 ? formatDuration(v.watchSeconds / v.plays) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
