# ChurchGeniusPro — Marketing Website

A modern, production-ready marketing website for **ChurchGeniusPro**, the AI-powered Church Management & Accounting platform. Built with React 19, Vite, TypeScript, and Tailwind CSS, and designed for deployment as an **Azure Static Web App**.

## Tech Stack

- **React 19** + **TypeScript** + **Vite 6**
- **Tailwind CSS 4** (via `@tailwindcss/vite`)
- **React Router 7** (with lazy-loaded, code-split pages)
- **Framer Motion** — entrance, scroll, and hover animations
- **Swiper** — testimonial & screenshot carousels
- **React Hook Form** — validated Sign Up and Contact forms
- **Lucide Icons** + **React Icons**
- **PWA** via `vite-plugin-pwa` (installable, offline-capable)
- **ESLint + Prettier**

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, animated dashboard mockup, AI highlights, benefits, feature cards, product tour carousel, testimonials, pricing preview, stats, FAQ |
| `/features` | All 40+ features grouped into 9 categories with anchor navigation |
| `/pricing` | Free / Standard ($15) / Pro ($25) plans + add-ons + plan comparison + pricing FAQ |
| `/compare` | Comparison table vs. Excel, QuickBooks, Breeze, Planning Center, Tithe.ly, and other ChMS |
| `/support` | Searchable Help Center, FAQ, video tutorials, documentation, community, contact form |
| `/signup` | Registration form with validation + Google/Microsoft sign-in buttons |
| `/privacy`, `/terms`, `/cookies` | Legal pages |

## Local Development

```bash
npm install
npm run dev        # start dev server at http://localhost:5173
```

## Production Build

```bash
npm install
npm run build      # outputs the dist/ folder
npm run preview    # preview the production build locally
```

Other scripts: `npm run lint`, `npm run format`.

## Deploying to Azure Static Web Apps

### Option A — GitHub Actions (recommended)

1. Push this repository to GitHub.
2. In the [Azure Portal](https://portal.azure.com), create a **Static Web App**:
   - **Source**: GitHub → select your repo and `main` branch
   - **Build presets**: Custom
   - **App location**: `/`
   - **Output location**: `dist`
3. Azure creates a deployment token. Add it to your repo as a secret named `AZURE_STATIC_WEB_APPS_API_TOKEN` (Azure does this automatically if you connect via the portal).
4. The included workflow at `.github/workflows/azure-static-web-apps.yml` lints, builds, and deploys on every push to `main`, and creates preview environments for pull requests.

### Option B — SWA CLI (manual)

```bash
npm run build
npx @azure/static-web-apps-cli deploy ./dist --deployment-token <YOUR_TOKEN>
```

### SPA Routing

`staticwebapp.config.json` configures the navigation fallback so React Router deep links (e.g. `/pricing`) resolve correctly, adds security headers, and sets long-lived caching for hashed assets.

## SEO & Performance

- Meta tags, Open Graph, Twitter Cards, canonical URL, and Schema.org `SoftwareApplication` structured data in `index.html`
- `public/robots.txt` and `public/sitemap.xml`
- Code splitting per route (`React.lazy`) + vendor chunking (react / motion / swiper)
- Lazy-rendered sections with scroll-triggered animations
- WCAG AA: semantic landmarks, ARIA labels, keyboard-accessible navigation and accordions, skip-to-content link, visible focus rings

> Update the domain in `index.html`, `robots.txt`, and `sitemap.xml` if you deploy under a different hostname.

## Project Structure

```
src/
├── components/
│   ├── layout/        # Navbar, Footer
│   ├── home/          # Hero (animated dashboard mockup)
│   └── ui/            # Section, PricingCards, Testimonials, FAQAccordion,
│                      # ScreenshotCarousel, Stats, CTASection
├── data/
│   ├── features.ts    # 9 feature categories (from the User Guide)
│   └── content.ts     # pricing, testimonials, FAQs, stats, comparison table
├── pages/             # Home, Features, Pricing, Compare, Support, SignUp, Legal, NotFound
├── App.tsx            # routes (lazy-loaded) + layout
├── main.tsx
└── index.css          # Tailwind theme + design utilities
```

## PWA Icons

`public/` contains `favicon.svg` plus generated `pwa-192.png` / `pwa-512.png`. Replace them with branded assets when available (same filenames), along with `og-image.png` for social sharing.
