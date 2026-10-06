import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Quote, Star } from 'lucide-react';
import { testimonials } from '../../data/content';
import { SectionHeading } from './Section';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Testimonials() {
  return (
    <section className="section bg-gradient-to-b from-white to-slate-50">
      <div className="container-page">
        <SectionHeading
          eyebrow="Testimonials"
          title="Loved by churches of every size"
          subtitle="From one-person offices to large multi-ministry churches — hear what leaders say about ChurchGeniusPro."
        />
        <div className="mt-14">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 2 }, 1280: { slidesPerView: 3 } }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="!pb-12"
            a11y={{ enabled: true }}
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.name} className="!h-auto">
                <figure className="card flex h-full flex-col">
                  <Quote className="h-8 w-8 text-blue-600/20" aria-hidden="true" />
                  <div className="mt-2 flex gap-0.5" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-slate-600">“{t.quote}”</blockquote>
                  <figcaption className="mt-6 border-t border-slate-100 pt-4">
                    <p className="font-semibold text-slate-900">{t.name}</p>
                    <p className="text-sm text-slate-500">
                      {t.role} · {t.church}
                    </p>
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
