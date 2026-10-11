import { lazy, Suspense, useEffect, useRef, type ComponentType } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ChatWidget from './components/ChatWidget';
import Seo from './components/Seo';
import { getRouteMeta, notFoundMeta } from './data/seo';
import { landingPages, type LandingSlug } from './data/landing';
import { guides } from './data/guides';
import { compareVsPages, type CompareVsPage } from './data/compareVs';
import { trackPageView } from './lib/gtag';

export interface PageComponents {
  Home: ComponentType;
  Features: ComponentType;
  Pricing: ComponentType;
  Compare: ComponentType;
  Support: ComponentType;
  Contact: ComponentType;
  TrialRequest: ComponentType;
  HelpCenter: ComponentType;
  Admin: ComponentType;
  Legal: ComponentType<{ page: 'privacy' | 'terms' | 'cookies' }>;
  Landing: ComponentType<{ slug: LandingSlug }>;
  Guides: ComponentType<{ slug?: string }>;
  CompareVs: ComponentType<{ slug: CompareVsPage['slug'] }>;
  NotFound: ComponentType;
}

/**
 * Code-split pages for the browser. The build-time prerender
 * (src/entry-server.tsx) passes eager imports instead so every route renders
 * to complete static HTML.
 */
const lazyPages: PageComponents = {
  Home: lazy(() => import('./pages/Home')),
  Features: lazy(() => import('./pages/Features')),
  Pricing: lazy(() => import('./pages/Pricing')),
  Compare: lazy(() => import('./pages/Compare')),
  Support: lazy(() => import('./pages/Support')),
  Contact: lazy(() => import('./pages/SignUp')),
  TrialRequest: lazy(() => import('./pages/TrialRequest')),
  HelpCenter: lazy(() => import('./pages/HelpCenter')),
  Admin: lazy(() => import('./pages/Admin')),
  Legal: lazy(() => import('./pages/Legal')),
  Landing: lazy(() => import('./pages/Landing')),
  Guides: lazy(() => import('./pages/Guides')),
  CompareVs: lazy(() => import('./pages/CompareVs')),
  NotFound: lazy(() => import('./pages/NotFound')),
};

/** Per-route <title>, meta description, canonical, and og/twitter tags. */
function HeadManager() {
  const { pathname } = useLocation();
  const meta = getRouteMeta(pathname);
  if (!meta) {
    return (
      <Seo
        title={notFoundMeta.title}
        description={notFoundMeta.description}
        path={pathname}
        noindex
      />
    );
  }
  return (
    <Seo
      title={meta.title}
      description={meta.description}
      path={meta.canonicalPath ?? meta.path}
      noindex={meta.noindex}
      image={meta.ogImage}
    />
  );
}

/**
 * Reports client-side route changes to Google Ads. The gtag('config') call in
 * index.html already counts the initial document load, so the first run is
 * skipped to avoid double-counting the landing page.
 */
function PageViews() {
  const { pathname, search } = useLocation();
  const isInitialLoad = useRef(true);
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    trackPageView(pathname + search);
  }, [pathname, search]);
  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="Loading page">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
    </div>
  );
}

export default function App({ pages = lazyPages }: { pages?: PageComponents }) {
  const {
    Home,
    Features,
    Pricing,
    Compare,
    Support,
    Contact,
    TrialRequest,
    HelpCenter,
    Admin,
    Legal,
    Landing,
    Guides,
    CompareVs,
    NotFound,
  } = pages;
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <HeadManager />
      <PageViews />
      <ScrollToTop />
      <Navbar />
      <main id="main" className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/compare" element={<Compare />} />
            {compareVsPages.map((p) => (
              <Route key={p.slug} path={`/compare/${p.slug}`} element={<CompareVs slug={p.slug} />} />
            ))}
            <Route path="/support" element={<Support />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<TrialRequest />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/help/:sectionId" element={<HelpCenter />} />
            {landingPages.map((p) => (
              <Route key={p.slug} path={`/${p.slug}`} element={<Landing slug={p.slug} />} />
            ))}
            <Route path="/guides" element={<Guides />} />
            {guides.map((g) => (
              <Route key={g.slug} path={`/guides/${g.slug}`} element={<Guides slug={g.slug} />} />
            ))}
            <Route path="/admin" element={<Admin />} />
            <Route path="/privacy" element={<Legal page="privacy" />} />
            <Route path="/terms" element={<Legal page="terms" />} />
            <Route path="/cookies" element={<Legal page="cookies" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
