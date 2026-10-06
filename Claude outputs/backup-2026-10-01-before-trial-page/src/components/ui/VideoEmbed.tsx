import { useEffect, useRef, useState } from 'react';
import { PlayCircle } from 'lucide-react';
import { trackVideo } from '../../lib/analytics';

/* Minimal typings for the YouTube IFrame API (loaded on demand). */
interface YTPlayer {
  destroy: () => void;
}
interface YTPlayerEvent {
  data: number;
}
interface YTNamespace {
  Player: new (
    el: HTMLElement,
    opts: {
      videoId: string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: () => void;
        onStateChange?: (e: YTPlayerEvent) => void;
      };
    }
  ) => YTPlayer;
  PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
}
declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | null = null;
function loadYouTubeAPI(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        if (window.YT) resolve(window.YT);
      };
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    });
  }
  return apiPromise;
}

interface VideoEmbedProps {
  videoId: string;
  title: string;
  /** Shorts are portrait (9:16); regular videos are 16:9. */
  vertical?: boolean;
  className?: string;
}

/**
 * Click-to-play YouTube embed with engagement tracking.
 * Shows a lightweight thumbnail first (fast page load); on click it loads the
 * IFrame API so plays, pauses, and watch time can be measured and reported.
 */
export default function VideoEmbed({ videoId, title, vertical = false, className = '' }: VideoEmbedProps) {
  const [activated, setActivated] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const watchTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const impressionSent = useRef(false);

  // Report a single impression when the video scrolls into view.
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !impressionSent.current) {
          impressionSent.current = true;
          trackVideo(videoId, title, 'impression');
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [videoId, title]);

  // Create the player once activated.
  useEffect(() => {
    if (!activated) return;
    let cancelled = false;
    const host = hostRef.current;
    const stopWatchTimer = () => {
      if (watchTimer.current) {
        clearInterval(watchTimer.current);
        watchTimer.current = null;
      }
    };
    void loadYouTubeAPI().then((YT) => {
      if (cancelled || !host) return;
      const mount = document.createElement('div');
      host.innerHTML = '';
      host.appendChild(mount);
      playerRef.current = new YT.Player(mount, {
        videoId,
        playerVars: { autoplay: 1, rel: 0, modestbranding: 1, playsinline: 1 },
        events: {
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.PLAYING) {
              trackVideo(videoId, title, 'play');
              stopWatchTimer();
              // Heartbeat: 5 watched seconds per beat while playing.
              watchTimer.current = setInterval(() => trackVideo(videoId, title, 'watch', 5), 5000);
            } else {
              stopWatchTimer();
            }
          },
        },
      });
    });
    return () => {
      cancelled = true;
      stopWatchTimer();
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [activated, videoId, title]);

  const aspect = vertical ? 'aspect-[9/16]' : 'aspect-video';

  return (
    <div ref={hostRef} className={`relative overflow-hidden rounded-2xl bg-slate-950 ${aspect} ${className}`}>
      {!activated && (
        <button
          type="button"
          onClick={() => {
            trackVideo(videoId, title, 'click');
            setActivated(true);
          }}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Play video: ${title}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            srcSet={`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg 320w, https://i.ytimg.com/vi/${videoId}/hqdefault.jpg 480w`}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            alt=""
            width={480}
            height={360}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover opacity-80 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition group-hover:bg-black/10">
            <PlayCircle className="h-16 w-16 text-white drop-shadow-lg transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
          </span>
        </button>
      )}
    </div>
  );
}
