/**
 * Videos from the official ChurchGeniusPro YouTube channel.
 * Channel: https://www.youtube.com/@ChurchGeniusPro (UCyfQvpuUT_k4enhyr7hbQww)
 *
 * The same demo videos live in C:\workspace\ChurchGeniusPro\ChurchGeniusPro\demo-videos —
 * they are embedded from YouTube here so the site stays fast and YouTube Studio
 * provides channel-owner-only view and watch-time analytics automatically.
 */

export interface SiteVideo {
  id: string; // YouTube video ID
  title: string;
  topic: string;
  isShort: boolean;
}

/** Featured product demo (regular video). */
export const featuredVideo: SiteVideo = {
  id: 'DSp_YUROchY',
  title: 'ChurchGeniusPro — Full Product Overview',
  topic: 'Overview',
  isShort: false,
};

/** Latest Shorts from the channel, newest first. */
export const shorts: SiteVideo[] = [
  { id: 'iPJEUQaE8E8', title: 'Help Center', topic: 'Support', isShort: true },
  { id: 'dH3oAXGy50M', title: 'Groups', topic: 'People', isShort: true },
  { id: 'bw4q2N9Sj3k', title: 'Follow Ups', topic: 'Ministry', isShort: true },
  { id: 'Ra6fFOUcxq4', title: 'Certificates', topic: 'People', isShort: true },
  { id: 's16nFiE3gEw', title: 'Attendance', topic: 'Events', isShort: true },
  { id: 'CcAMdz084S0', title: 'Accounting AI', topic: 'Accounting', isShort: true },
];

export const productTourVideos: SiteVideo[] = [featuredVideo, ...shorts];

export const youtubeChannelUrl = 'https://www.youtube.com/@ChurchGeniusPro';
