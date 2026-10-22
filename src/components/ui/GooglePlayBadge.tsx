import { googlePlayUrl } from '../../data/apps';

const heights = {
  sm: 'h-10',
  md: 'h-12',
  lg: 'h-14',
} as const;

/**
 * Official "Get it on Google Play" badge (public/google-play-badge.svg,
 * unmodified Google artwork) linking to the ChurchGeniusPro Play Store listing.
 */
export default function GooglePlayBadge({
  size = 'md',
  className = '',
}: {
  size?: keyof typeof heights;
  className?: string;
}) {
  return (
    <a
      href={googlePlayUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get the ChurchGeniusPro Android app on Google Play (opens in a new tab)"
      className={`inline-block rounded-lg transition duration-300 hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${className}`}
    >
      <img
        src="/google-play-badge.svg"
        alt="Get it on Google Play"
        width={180}
        height={53}
        loading="lazy"
        className={`${heights[size]} w-auto`}
      />
    </a>
  );
}
