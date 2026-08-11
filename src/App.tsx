import { lazy, Suspense, useEffect, type ComponentType } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ChatWidget from './components/ChatWidget';
import Seo from './components/Seo';
import { getRouteMeta } from './data/seo';
import { landingPages, type LandingSlug } from './data/landing';

export interface PageComponents {
  Home: ComponentType;
  Features: ComponentType;
  Pricing: ComponentType;
  Compare: ComponentType;
  Support: ComponentType;
  Contact: ComponentType;
  HelpCenter: ComponentType;
  Admin: ComponentType;
  Legal: ComponentType<{ page: 'privacy' | 'terms' | 'cookies' }>;
  Landing: ComponentType<{ slug: LandingSlug }>;
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
  HelpCenter: lazy(() => import('./pages/HelpCenter')),
  Admin: lazy(() => import('./pages/Admin')),
  Legal: lazy(() => import('./pages/Legal')),
  Landing: lazy(() => import('./pages/Landing')),
  NotFound: lazy(() => import('./pages/NotFound')),
};

/** Per-route <title>, meta description, canonical, and og/twitter tags. */
function HeadManager() {
  const { pathname } = useLocation();
  const meta = getRouteMeta(pathname);
  if (!meta) {
    return (
      <Seo
        title="Page Not Found | ChurchGeniusPro"
        description="The page you are looking for does not exist."
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
    />
  );
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
    HelpCenter,
    Admin,
    Legal,
    Landing,
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
      <ScrollToTop />
      <Navbar />
      <main id="main" className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/support" element={<Support />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<Contact />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/help/:sectionId" element={<HelpCenter />} />
            {landingPages.map((p) => (
              <Route key={p.slug} path={`/${p.slug}`} element={<Landing slug={p.slug} />} />
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
