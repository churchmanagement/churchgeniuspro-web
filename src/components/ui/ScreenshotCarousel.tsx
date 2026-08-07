import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, A11y } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeading } from './Section';
import { screenshots, screenshotSrc, screenshotSrcSet, type Screenshot } from '../../data/screens';
import 'swiper/css';
import 'swiper/css/pagination';

function ScreenFrame({ shot, eager }: { shot: Screenshot; eager?: boolean }) {
  const largest = shot.sizes[shot.sizes.length - 1];
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-3 hidden flex-1 rounded-md bg-white px-3 py-1 text-[10px] text-slate-400 sm:block">
          app.churchgeniuspro.com
        </span>
      </div>
      {/* Real screenshot in a fixed 16:10 stage so mixed sizes align */}
      <div className="flex aspect-[16/10] items-center justify-center bg-white">
        <img
          src={screenshotSrc(shot)}
          srcSet={screenshotSrcSet(shot)}
          sizes="(min-width: 1280px) 42vw, (min-width: 768px) 58vw, 88vw"
          width={largest.w}
          height={largest.h}
          alt={`${shot.title} — ${shot.caption}`}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="max-h-full max-w-full object-contain"
          draggable={false}
        />
      </div>
    </div>
  );
}

export default function ScreenshotCarousel() {
  // State (not refs) so Swiper re-binds navigation once the buttons mount.
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  const navBtn =
    'absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full ' +
    'border border-slate-200 bg-white/90 text-slate-700 shadow-lg shadow-slate-900/10 backdrop-blur ' +
    'transition hover:bg-white hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500';

  return (
    <section className="section overflow-hidden bg-slate-50">
      <div className="container-page">
        <SectionHeading
          eyebrow="Product Tour"
          title="A beautiful home for every ministry"
          subtitle="Browse real screens from the app — giving, accounting, events, kids ministry, and more. Clean, fast, and friendly for non-experts."
        />
      </div>
      <div className="relative mt-14">
        <button ref={setPrevEl} type="button" aria-label="Previous screenshot" className={`${navBtn} left-3 sm:left-8`}>
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button ref={setNextEl} type="button" aria-label="Next screenshot" className={`${navBtn} right-3 sm:right-8`}>
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
        <Swiper
          modules={[Autoplay, Pagination, Navigation, A11y]}
          centeredSlides
          slidesPerView={1.08}
          spaceBetween={16}
          breakpoints={{
            768: { slidesPerView: 1.7, spaceBetween: 24 },
            1280: { slidesPerView: 2.3, spaceBetween: 32 },
          }}
          speed={700}
          autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          navigation={{ prevEl, nextEl }}
          loop
          className="!pb-14"
          a11y={{ enabled: true }}
        >
          {screenshots.map((shot, i) => (
            <SwiperSlide key={shot.slug}>
              <ScreenFrame shot={shot} eager={i === 0} />
              <p className="mt-4 text-center">
                <span className="font-semibold text-slate-900">{shot.title}</span>
                <span className="hidden text-slate-500 sm:inline"> — {shot.caption}</span>
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
