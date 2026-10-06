import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

declare global {
  interface Window {
    /** Set by scripts/prerender.mjs in each prerendered page. */
    __PRERENDERED_PATH?: string;
  }
}

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Marketing routes are prerendered to static HTML at build time; hydrate them
// so the crawler-visible content is reused instead of re-rendered from scratch.
// Only hydrate when the HTML actually belongs to the current URL — the PWA
// service worker (and the SWA 404 rewrite) can serve the "/" page's HTML for
// any route, and hydrating mismatched content would flash the wrong page.
const normalize = (p: string) => p.replace(/\/+$/, '') || '/';
const matchesRoute =
  window.__PRERENDERED_PATH !== undefined &&
  normalize(window.location.pathname) === normalize(window.__PRERENDERED_PATH);

if (container.hasChildNodes() && matchesRoute) {
  hydrateRoot(container, app);
} else {
  if (container.hasChildNodes()) container.replaceChildren();
  createRoot(container).render(app);
}
