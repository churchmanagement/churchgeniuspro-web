/**
 * Lightweight, privacy-friendly video engagement analytics.
 *
 * Events are POSTed to the Static Web App managed function `/api/track` and
 * aggregated server-side. Aggregates are only readable by users with the
 * `admin` role via `/api/stats` (see staticwebapp.config.json) and the
 * /admin dashboard. No cookies, no third-party trackers.
 */

export type VideoEvent = 'impression' | 'click' | 'play' | 'watch';

interface TrackPayload {
  videoId: string;
  title: string;
  event: VideoEvent;
  /** For `watch` events: seconds watched since the last beat. */
  seconds?: number;
  page: string;
  sessionId: string;
}

function getSessionId(): string {
  const KEY = 'cgp_session';
  try {
    let id = sessionStorage.getItem(KEY);
    if (!id) {
      id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return 'anon';
  }
}

export function trackVideo(videoId: string, title: string, event: VideoEvent, seconds?: number): void {
  const payload: TrackPayload = {
    videoId,
    title,
    event,
    seconds,
    page: window.location.pathname,
    sessionId: getSessionId(),
  };
  const body = JSON.stringify(payload);
  try {
    // sendBeacon survives page unloads; fall back to fetch.
    if (!navigator.sendBeacon?.('/api/track', new Blob([body], { type: 'application/json' }))) {
      void fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => undefined);
    }
  } catch {
    /* analytics must never break the page */
  }
}
