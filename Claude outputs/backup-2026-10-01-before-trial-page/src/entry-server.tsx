/**
 * Build-time prerender entry. Not shipped to the browser.
 *
 * scripts/prerender.mjs imports the SSR bundle built from this file and calls
 * `render(url)` for every route in `prerenderRoutes`, writing static HTML into
 * dist/ so crawlers get full content and correct meta without running JS.
 */
/* eslint-disable react-refresh/only-export-components -- server-only entry, never hot-reloaded */
import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router';
import App, { type PageComponents } from './App';
import Home from './pages/Home';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Compare from './pages/Compare';
import Support from './pages/Support';
import Contact from './pages/SignUp';
import HelpCenter from './pages/HelpCenter';
import Admin from './pages/Admin';
import Legal from './pages/Legal';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';

export { SITE, prerenderRoutes } from './data/seo';
export type { RouteMeta } from './data/seo';

// Eager imports: react-dom/static must be able to render every route to
// completion in one pass, without waiting on lazy chunks.
const eagerPages: PageComponents = {
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
};

export async function render(url: string): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={url}>
        <App pages={eagerPages} />
      </StaticRouter>
    </StrictMode>,
    {
      // Keep every completed Suspense boundary inline in the static HTML.
      // With the default chunk size React "outlines" large boundaries into
      // hidden segments + a relocation script, which crawlers without JS
      // would see as a loading spinner.
      progressiveChunkSize: 64 * 1024 * 1024,
    }
  );

  const reader = prelude.getReader();
  const decoder = new TextDecoder();
  let html = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    html += decoder.decode(value, { stream: true });
  }
  return html;
}
