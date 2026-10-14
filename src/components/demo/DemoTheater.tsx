import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Clock3, PlayCircle, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import VideoEmbed from '../ui/VideoEmbed';
import {
  allDemoVideos,
  demoCategories,
  demoLibrary,
  demoTour,
  youtubeChannelUrl,
  type DemoCategory,
  type DemoVideo,
} from '../../data/videos';

type Filter = 'All' | DemoCategory;

/**
 * The demo "theater": one stage that plays whichever video the visitor picks,
 * with the 5-minute tour first, and a categorised library underneath. Every
 * video plays in place — nothing here sends the visitor to YouTube.
 */
export default function DemoTheater() {
  const [current, setCurrent] = useState<DemoVideo>(demoTour);
  const [filter, setFilter] = useState<Filter>('All');
  // The tour starts as a click-to-play poster; anything picked afterwards plays at once.
  const [autoplay, setAutoplay] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const index = allDemoVideos.findIndex((v) => v.id === current.id);
  const next = allDemoVideos[(index + 1) % allDemoVideos.length];
  const prev = allDemoVideos[(index - 1 + allDemoVideos.length) % allDemoVideos.length];

  const play = (video: DemoVideo) => {
    if (video.id === current.id) return;
    setCurrent(video);
    setAutoplay(true);
  };

  // Keep the stage in view when a library card is chosen further down the page.
  useEffect(() => {
    if (!autoplay) return;
    stageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [current.id, autoplay]);

  const visible = useMemo(
    () => (filter === 'All' ? demoLibrary : demoLibrary.filter((v) => v.category === filter)),
    [filter]
  );
  const grouped = useMemo(
    () => demoCategories.map((c) => ({ category: c, videos: visible.filter((v) => v.category === c) })).filter((g) => g.videos.length),
    [visible]
  );

  return (
    <div>
      {/* Stage */}
      <section ref={stageRef} className="scroll-mt-28" aria-labelledby="demo-stage-title">
        <div className="overflow-hidden rounded-3xl bg-slate-950 shadow-2xl shadow-slate-900/30 ring-1 ring-white/10">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              Now playing · {current.category}
            </p>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => play(prev)} className="rounded-lg p-1.5 text-slate-300 transition hover:bg-white/10 hover:text-white" aria-label={`Previous video: ${prev.title}`}>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => play(next)} className="rounded-lg p-1.5 text-slate-300 transition hover:bg-white/10 hover:text-white" aria-label={`Next video: ${next.title}`}>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="bg-black p-2 sm:p-3">
            {current.isShort ? (
              <div className="mx-auto max-w-[min(100%,calc((100vh-16rem)*9/16))]">
                <VideoEmbed key={current.id} videoId={current.id} title={current.title} vertical autoActivate={autoplay} className="!rounded-xl" />
              </div>
            ) : (
              <VideoEmbed key={current.id} videoId={current.id} title={current.title} autoActivate={autoplay} className="!rounded-xl" />
            )}
          </div>
          <div className="flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="min-w-0">
              <h2 id="demo-stage-title" className="text-lg font-bold text-white sm:text-xl">
                {current.title}
              </h2>
              <p className="mt-1 text-sm text-slate-400">{current.description}</p>
            </div>
            <button
              type="button"
              onClick={() => play(next)}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Up next: <span className="max-w-[12rem] truncate font-medium text-slate-300">{next.title}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
        {current.id !== demoTour.id && (
          <p className="mt-3 text-center text-sm text-slate-500">
            <button type="button" onClick={() => play(demoTour)} className="font-semibold text-blue-600 hover:underline">
              ← Back to the 5-minute tour
            </button>
          </p>
        )}
      </section>

      {/* Library */}
      <section className="mt-14" aria-labelledby="demo-library-title">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="demo-library-title" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              More demonstration videos
            </h2>
            <p className="mt-1 text-slate-600">
              {demoLibrary.length} short demos, grouped by what they show. Pick one and it plays above.
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Filter demos by category">
          {(['All', ...demoCategories] as Filter[]).map((f) => {
            const active = f === filter;
            const count = f === 'All' ? demoLibrary.length : demoLibrary.filter((v) => v.category === f).length;
            return (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? 'border-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-blue-600/20'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                {f}
                <span className={`rounded-full px-1.5 text-xs ${active ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>{count}</span>
              </button>
            );
          })}
        </div>

        {grouped.map((g) => (
          <div key={g.category} className="mt-10">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-600">{g.category}</h3>
            <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {g.videos.map((v) => {
                const active = v.id === current.id;
                return (
                  <li key={v.id}>
                    <button
                      type="button"
                      onClick={() => play(v)}
                      aria-current={active ? 'true' : undefined}
                      className={`group block w-full overflow-hidden rounded-2xl border bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                        active ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-slate-100'
                      }`}
                    >
                      <div className="relative aspect-video overflow-hidden bg-slate-900">
                        <img
                          src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                          alt=""
                          width={480}
                          height={360}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition group-hover:bg-black/10">
                          <PlayCircle className="h-12 w-12 text-white drop-shadow-lg transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                        </span>
                        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur">
                          {v.isShort ? (
                            <>
                              <Smartphone className="h-3 w-3" aria-hidden="true" /> Short
                            </>
                          ) : (
                            <>
                              <Clock3 className="h-3 w-3" aria-hidden="true" /> Video
                            </>
                          )}
                        </span>
                        {active && (
                          <span className="absolute bottom-3 right-3 rounded-full bg-emerald-500 px-2 py-0.5 text-[11px] font-semibold text-white">
                            Now playing
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="font-semibold text-slate-900">{v.title}</p>
                        <p className="mt-1 line-clamp-2 text-sm text-slate-500">{v.description}</p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <div className="mt-14 rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-500 px-6 py-10 text-center text-white shadow-xl shadow-purple-600/20 sm:px-12">
          <h3 className="text-2xl font-bold">Ready to see it with your own church?</h3>
          <p className="mx-auto mt-2 max-w-xl text-blue-50">
            Start a 2-month free trial — every feature, no credit card, and a real person sets it up with you.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/signup" className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">
              Start 2-Month Free Trial <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10">
              Ask us a question
            </Link>
          </div>
          <p className="mt-6 text-xs text-blue-100">
            New videos are published on{' '}
            <a href={youtubeChannelUrl} target="_blank" rel="noopener noreferrer" className="underline">
              our YouTube channel
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
