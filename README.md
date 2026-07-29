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
| `/support` | Support hub — searchable FAQ, latest YouTube Shorts tutorials, documentation links, contact form |
| `/help` | Help Center — full documentation generated from the official User Manual (13 guides, searchable) |
| `/contact` (also `/signup`) | Contact Us form → emails support@churchgeniuspro.com, CC churchgeniuspro@gmail.com (via Web3Forms) |
| `/admin` | **Admin-only** video engagement analytics (impressions, clicks, plays, watch time) |
| `/privacy`, `/terms`, `/cookies` | Legal pages |

The site also includes an **AI live chat assistant** (floating widget, powered by the Claude API via `/api/chat`) and a **Product Tour** on the homepage with demo videos embedded from the [ChurchGeniusPro YouTube channel](https://www.youtube.com/@ChurchGeniusPro).

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

`staticwebapp.config.json` configures the navigation fallback so React Router deep links (e.g. `/pricing`) resolve correctly, adds security headers, sets long-lived caching for hashed assets, and restricts `/admin` + `/api/stats` to the `admin` role.

## Required Configuration (one-time)

The new features need three settings:

| Setting | Where | Purpose |
|---|---|---|
| `WEB3FORMS_ACCESS_KEY` | GitHub repo → Settings → Secrets → Actions | Contact form delivery. Create a free access key at [web3forms.com](https://web3forms.com) using **support@churchgeniuspro.com** (submissions are CC'd to churchgeniuspro@gmail.com automatically). For local dev, put it in `.env` as `VITE_WEB3FORMS_KEY` (see `.env.example`). |
| `ANTHROPIC_API_KEY` | Azure Portal → Static Web App → **Environment variables** | Powers the AI chat assistant (`/api/chat`). Create at [console.anthropic.com](https://console.anthropic.com). Optional: `ANTHROPIC_MODEL` to override the default model. |
| `STORAGE_CONNECTION_STRING` | Azure Portal → Static Web App → **Environment variables** | Video analytics storage. Create a Storage account (Table service), copy its connection string. Without it, tracking events are accepted but dropped. |

**Admin access to `/admin`:** Azure Portal → your Static Web App → **Role management** → *Invite* → enter the administrator's email and role `admin`. Only invited users can open the analytics dashboard or call `/api/stats`. (Official YouTube view counts & retention are also available to channel owners in YouTube Studio.)

## API (`api/`)

Azure Static Web Apps managed functions (Node 18, Functions v4 model):

- `POST /api/chat` — Claude-powered assistant grounded in the User Manual + pricing (`api/src/kb.js`)
- `POST /api/track` — records video engagement events to Azure Table Storage
- `GET /api/stats` — aggregated analytics, **admin role required**

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
│   ├── content.ts     # pricing, testimonials, FAQs, stats, comparison table
│   ├── videos.ts      # YouTube demo videos & Shorts (Product Tour / Support)
│   └── helpContent.ts # Help Center docs (generated from the User Manual .docx)
├── lib/
│   ├── contact.ts     # Web3Forms contact-form delivery (info@ + CC gmail)
│   └── analytics.ts   # video engagement event tracking → /api/track
├── pages/             # Home, Features, Pricing, Compare, Support, SignUp (Contact),
│                      # HelpCenter, Admin, Legal, NotFound
├── App.tsx            # routes (lazy-loaded) + layout + ChatWidget
├── main.tsx
└── index.css          # Tailwind theme + design utilities

api/                   # Azure Functions: chat (Claude AI), track, stats
```

## PWA Icons

`public/` contains `favicon.svg` plus generated `pwa-192.png` / `pwa-512.png`. Replace them with branded assets when available (same filenames), along with `og-image.png` for social sharing.
