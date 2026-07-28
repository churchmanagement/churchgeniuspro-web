import { ArrowRight } from 'lucide-react';
import { SectionHeading, Reveal } from '../ui/Section';
import VideoEmbed from '../ui/VideoEmbed';
import { featuredVideo, shorts, youtubeChannelUrl } from '../../data/videos';

/**
 * Product Tour — real demo videos from the ChurchGeniusPro YouTube channel.
 * Engagement (impressions, clicks, plays, watch time) is tracked via /api/track
 * and visible to administrators on /admin.
 */
export default function ProductTour() {
  return (
    <section className="section overflow-hidden bg-slate-50">
      <div className="container-page">
        <SectionHeading
          eyebrow="Product Tour"
          title="See ChurchGeniusPro in action"
          subtitle="Watch the full product overview, then explore quick feature demos — real screens, real workflows, no slideware."
        />

        {/* Featured overview video */}
        <Reveal className="mx-auto mt-14 max-w-3xl">
          <VideoEmbed videoId={featuredVideo.id} title={featuredVideo.title} className="shadow-2xl shadow-slate-900/15" />
          <p className="mt-4 text-center">
            <span className="font-semibold text-slate-900">{featuredVideo.title}</span>
          </p>
        </Reveal>

        {/* Feature demo shorts */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {shorts.map((v, i) => (
            <Reveal key={v.id} delay={(i % 6) * 0.06}>
              <VideoEmbed videoId={v.id} title={v.title} vertical className="shadow-lg shadow-slate-900/10" />
              <p className="mt-2 text-center text-xs font-semibold uppercase tracking-wide text-blue-600">{v.topic}</p>
              <p className="text-center text-sm font-semibold text-slate-900">{v.title}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <a
            href={youtubeChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            Watch more on our YouTube channel <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
