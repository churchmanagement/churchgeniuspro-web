import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { stats } from '../../data/content';

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Number((target * eased).toFixed(target % 1 !== 0 ? 1 : 0)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref} className="gradient-text text-4xl font-extrabold sm:text-5xl">
      {value}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="section bg-slate-50" aria-label="Platform statistics">
      <div className="container-page">
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <Counter target={s.value} suffix={s.suffix} />
                <p className="mt-2 text-sm font-medium text-slate-600">{s.label}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
