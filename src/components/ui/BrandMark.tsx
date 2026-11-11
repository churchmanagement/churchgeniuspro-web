/**
 * ChurchGeniusPro brand mark: the app icon plus the wordmark.
 * `dark` is for use on dark backgrounds (footer).
 */
export default function BrandMark({ dark = false, size = 'md' }: { dark?: boolean; size?: 'md' | 'lg' }) {
  const px = size === 'lg' ? 48 : 40;
  return (
    <span className="inline-flex items-center gap-2.5">
      <img
        src="/icon-96.webp"
        srcSet="/icon-48.webp 1x, /icon-96.webp 2x, /icon-144.webp 3x"
        alt=""
        width={px}
        height={px}
        className={`${size === 'lg' ? 'h-12 w-12' : 'h-10 w-10'} rounded-xl shadow-md shadow-brand-950/20`}
      />
      <span
        className={`font-display text-xl font-extrabold tracking-tight ${dark ? 'text-white' : 'text-brand-800'}`}
      >
        ChurchGenius<span className={dark ? 'text-gold-400' : 'text-gold-600'}>Pro</span>
      </span>
    </span>
  );
}
