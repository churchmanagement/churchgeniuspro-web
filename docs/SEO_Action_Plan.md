# ChurchGeniusPro — SEO Action Plan

*Prepared 2026-08-07. Companion doc: `SEO_Keyword_Content_Strategy.md`.*

## What was just changed in the codebase

The site previously served one identical `index.html` (homepage title, description, and canonical) for every route, and crawlers received an empty `<div id="root">` until JavaScript ran. Both problems are now fixed at build time — no framework migration was needed.

**Per-page metadata.** Every route now has a unique title, meta description, canonical URL, and Open Graph/Twitter tags, defined in one place (`src/data/seo.ts`). A `HeadManager` in `App.tsx` keeps the head in sync during client-side navigation, and the same values are baked into the static HTML at build time. `/signup` canonicalizes to `/contact` so the duplicate route doesn't split ranking signals. `/admin` is noindexed.

**Build-time prerendering.** `npm run build` now renders 24 routes to complete static HTML (all 10 marketing/legal pages plus all 13 Help Center sections). Crawlers — and users on slow connections — get the full page content with zero JavaScript required. The prerender is pure Node (`scripts/prerender.mjs` + `src/entry-server.tsx`), so it runs unchanged in the Azure Static Web Apps CI build. The browser still gets the same code-split SPA; it hydrates the prerendered HTML instead of re-rendering it.

**Sitemap.** `sitemap.xml` is now generated on every build with all 23 indexable URLs (previously 10) and `lastmod` dates. The 13 Help Center sections are new indexable, content-rich pages generated from your user manual.

**Structured data cleanup.** The `aggregateRating` (4.9 stars, 312 reviews) was removed from the schema.org markup. Google's guidelines require review markup to reflect real, displayed reviews; fabricated ratings risk a manual spam action that can tank the whole domain. Re-add it only when you have genuine on-page reviews.

**Verification done in this session:** production build passes, ESLint clean, every prerendered route loads and hydrates with no React errors in a headless Chromium test, canonicals verified (including /signup → /contact), and raw no-JS HTML confirmed to contain full page text.

## Step 1 — Deploy

Commit and push everything. The GitHub Actions build needs no workflow changes for this (it already runs `npm run build`). After the deploy finishes, spot-check in an incognito window:

1. `view-source:https://www.churchgeniuspro.com/pricing` — you should see the pricing title tag and full pricing content in the raw HTML.
2. Same check for a help page, e.g. `/help/accountant-guide`.
3. https://search.google.com/test/rich-results on the homepage — the SoftwareApplication schema should validate with no rating warnings.

## Step 2 — Fix the apex domain (important for SEO trust)

`churchgeniuspro.com` (no www) still points to the old server with a certificate that expired in June. Any visitor or crawler hitting the apex gets a security error, and links people share without "www" are wasted. Fix (about 15 minutes):

1. Azure Portal → your Static Web App (proud-flower-032097b10) → **Custom domains** → **Add** → enter `churchgeniuspro.com` → choose TXT validation and copy the TXT record.
2. Porkbun DNS for churchgeniuspro.com: add that TXT record, and replace the apex `A 208.66.192.100` record with an **ALIAS** to `proud-flower-032097b10.7.azurestatic apps.net`.
3. Back in Azure, complete validation. Azure issues a free managed certificate.
4. In the SWA custom domains list, keep `www.churchgeniuspro.com` as the default domain so the apex redirects to www (matching your canonicals).

## Step 3 — Google Search Console (site is already verified)

1. **Sitemaps** (left menu) → enter `sitemap.xml` → Submit. Even if it was submitted before, resubmit so Google picks up the 13 new help URLs.
2. **URL Inspection** (top bar) → paste each key URL → **Request Indexing**. Do these first: `/`, `/features`, `/pricing`, `/compare`, `/contact`, `/help`. Google rate-limits this to roughly 10–12/day; do the help section pages the next day.
3. **Pages** (Indexing → Pages): over the next 2–4 weeks, watch "Why pages aren't indexed". "Crawled – currently not indexed" on new pages is normal early; "Duplicate without user-selected canonical" or "Soft 404" would indicate a problem worth revisiting.
4. **Performance report**: after ~4 weeks, look at which queries show impressions. Queries sitting at positions 8–20 are your best optimization targets — strengthen those pages first (more on this in the strategy doc).

Bing is already verified (`BingSiteAuth.xml`) and an IndexNow key is in place; resubmit the sitemap at bing.com/webmasters too — it takes one minute and Bing/DuckDuckGo traffic is free.

## Step 4 — Ongoing hygiene

When you add a page, add one entry to `src/data/seo.ts` and (if it's a new top-level route) a `<Route>` in `App.tsx` — the sitemap and prerender pick it up automatically on the next build. Keep titles under ~60 characters and descriptions 140–160. Run the HubSpot grader or PageSpeed Insights after significant changes; your 2026-08-07 baseline was 97/100.

## What to expect

Indexing of the new pages: days to a few weeks. Movement on long-tail queries ("church accounting software with fund accounting", help-content queries): typically 4–8 weeks. Competitive head terms ("church management software"): months, and mostly a function of the content and backlink work in the strategy doc — the technical foundation is no longer the bottleneck.
