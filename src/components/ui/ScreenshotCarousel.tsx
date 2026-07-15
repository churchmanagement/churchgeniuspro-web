import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import {
  Users,
  Landmark,
  Sparkles,
  CalendarDays,
  Baby,
  PieChart,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeading } from './Section';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

interface Shot {
  icon: LucideIcon;
  title: string;
  caption: string;
  gradient: string;
  bars: number[];
}

const shots: Shot[] = [
  { icon: Users, title: 'Member Directory', caption: 'Every member and family in one living directory', gradient: 'from-blue-500 to-cyan-500', bars: [70, 45, 85, 60, 75] },
  { icon: Landmark, title: 'Accounting Dashboard', caption: 'Fund-based books with board-ready reports', gradient: 'from-emerald-500 to-teal-500', bars: [55, 80, 40, 90, 65] },
  { icon: Sparkles, title: 'AI Assistant', caption: 'Speak, scan, or type one word — the AI does the rest', gradient: 'from-purple-500 to-violet-500', bars: [65, 50, 90, 70, 55] },
  { icon: CalendarDays, title: 'Events & Worship', caption: 'One shared calendar and full service planning', gradient: 'from-amber-500 to-orange-500', bars: [45, 75, 60, 85, 50] },
  { icon: Baby, title: 'Kids Check-In', caption: 'Secure barcode check-in with automatic classrooms', gradient: 'from-rose-500 to-pink-500', bars: [80, 55, 70, 45, 85] },
  { icon: PieChart, title: 'Giving Analytics', caption: 'Real-time donations, pledges, and campaigns', gradient: 'from-indigo-500 to-blue-500', bars: [60, 85, 50, 75, 90] },
];

function MockScreen({ shot }: { shot: Shot }) {
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
      {/* Mock UI */}
      <div className="grid grid-cols-4 gap-3 p-4 sm:p-5">
        <div className="col-span-1 hidden space-y-2 sm:block">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`h-6 rounded-lg ${i === 0 ? `bg-gradient-to-r ${shot.gradient} opacity-80` : 'bg-slate-100'}`} />
          ))}
        </div>
        <div className="col-span-4 space-y-3 sm:col-span-3">
          <div className="flex items-center gap-3">
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${shot.gradient} text-white`}>
              <shot.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="space-y-1.5">
              <div className="h-3 w-32 rounded bg-slate-200" />
              <div className="h-2 w-20 rounded bg-slate-100" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-xl bg-slate-50 p-3">
                <div className={`h-2 w-8 rounded bg-gradient-to-r ${shot.gradient} opacity-60`} />
                <div className="mt-2 h-3 w-12 rounded bg-slate-200" />
              </div>
            ))}
          </div>
          <div className="flex h-24 items-end gap-2 rounded-xl bg-slate-50 p-3">
            {shot.bars.map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t-md bg-gradient-to-t ${shot.gradient}`}
                style={{ height: `${h}%`, opacity: i % 2 ? 0.7 : 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ScreenshotCarousel() {
  return (
    <section className="section overflow-hidden bg-slate-50">
      <div className="container-page">
        <SectionHeading
          eyebrow="Product Tour"
          title="A beautiful home for every ministry"
          subtitle="Explore the dashboards your team will use every day — clean, fast, and friendly for non-experts."
        />
      </div>
      <div className="mt-14">
        <Swiper
          modules={[Autoplay, Pagination, EffectCoverflow]}
          effect="coverflow"
          centeredSlides
          slidesPerView={1.15}
          breakpoints={{ 768: { slidesPerView: 1.8 }, 1280: { slidesPerView: 2.4 } }}
          coverflowEffect={{ rotate: 0, stretch: 0, depth: 120, modifier: 1.6, slideShadows: false }}
          autoplay={{ delay: 3800, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="!pb-14"
          a11y={{ enabled: true }}
        >
          {shots.map((shot) => (
            <SwiperSlide key={shot.title}>
              <MockScreen shot={shot} />
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
