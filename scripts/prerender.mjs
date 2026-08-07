/**
 * Post-build prerender: renders every marketing route to static HTML and
 * generates sitemap.xml. Pure Node (no headless browser), so it runs anywhere
 * `npm run build` runs — including the Azure Static Web Apps CI build.
 *
 * Run automatically as part of `npm run build`:
 *   tsc -b && vite build && vite build --ssr src/entry-server.tsx && node scripts/prerender.mjs
 */
import { mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');

const template = readFileSync(resolve(dist, 'index.html'), 'utf8');
const { render, prerenderRoutes, SITE } = await import(
  pathToFileURL(resolve(root, 'dist-ssr', 'entry-server.js')).href
);

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function applyHead(html, meta) {
  const canonicalPath = meta.canonicalPath ?? meta.path;
  const url = SITE + (canonicalPath === '/' ? '/' : canonicalPath);
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${description}" />`)
    .replace(/<link rel="canonical"[^>]*\/>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:title"[\s\S]*?\/>/, `<meta property="og:title" content="${title}" />`)
    .replace(
      /<meta\s+property="og:description"[\s\S]*?\/>/,
      `<meta property="og:description" content="${description}" />`
    )
    .replace(/<meta property="og:url"[\s\S]*?\/>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta name="twitter:title"[\s\S]*?\/>/, `<meta name="twitter:title" content="${title}" />`)
    .replace(
      /<meta\s+name="twitter:description"[\s\S]*?\/>/,
      `<meta name="twitter:description" content="${description}" />`
    );
}

let ok = 0;
for (const meta of prerenderRoutes) {
  if (meta.noindex) continue;
  const appHtml = await render(meta.path);
  let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  html = applyHead(html, meta);
  // Record which route this HTML belongs to; the client only hydrates when it
  // matches (the PWA service worker serves "/" HTML as a navigation fallback
  // for other routes, which must client-render instead of hydrating).
  html = html.replace('</head>', `  <script>window.__PRERENDERED_PATH=${JSON.stringify(meta.path)};</script>\n  </head>`);
  const outFile =
    meta.path === '/' ? resolve(dist, 'index.html') : resolve(dist, `.${meta.path}`, 'index.html');
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, html);
  ok += 1;
}
console.log(`[prerender] wrote ${ok} static pages`);

// --- sitemap.xml -----------------------------------------------------------
const today = new Date().toISOString().slice(0, 10);
const urls = prerenderRoutes
  .filter((m) => !m.noindex && !m.excludeFromSitemap)
  .map((m) => {
    const loc = SITE + (m.path === '/' ? '/' : m.path);
    return `  <url><loc>${loc}</loc><lastmod>${today}</lastmod></url>`;
  })
  .join('\n');
writeFileSync(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);
console.log('[prerender] sitemap.xml generated');

// The SSR bundle is only needed during the build.
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true });
