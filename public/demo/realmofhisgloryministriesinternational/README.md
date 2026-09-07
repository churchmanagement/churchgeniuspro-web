# Realm of His Glory Ministries International — demo site

A standalone, static demo website served at:

    https://churchgeniuspro.com/demo/realmofhisgloryministriesinternational/

It is deliberately independent of the ChurchGeniusPro React app: plain HTML, one
stylesheet, one small script. Nothing here is imported by the main site's build,
and the main site imports nothing from here.

## Files

    index.html              Home
    about/index.html        About
    services/index.html     Services & Ministries
    contact/index.html      Contact Us (address, Google Map, contact form)
    give/index.html         Give
    assets/style.css        Design system + all page styles
    assets/site.js          Header, mobile drawer, scroll reveal, forms
    img/*.webp              Photography (Unsplash License — free commercial use)
    img/favicon.svg         Site icon

## Placeholder content to replace before launch

Everything below is demo data. Search for these strings to swap them.

| What              | Current value                              | Where |
|-------------------|--------------------------------------------|-------|
| Street address    | 4820 Kingdom Way, Suite 100, Houston, TX 77084 | All pages (footer + drawer), `contact/index.html` — marked `<!-- DEMO:ADDRESS -->` |
| Google Map        | Query `4820+Kingdom+Way,+Houston,+TX+77084` | `contact/index.html` iframe `src` |
| Phone             | (281) 555-0142                              | All pages |
| Email             | hello@realmofhisglory.org                   | All pages |
| Service times     | Sun 10:00 AM / Wed 7:00 PM / Fri 7:00 PM    | Home, Services, Contact, footer |
| Events            | Three sample events                         | `index.html` |
| Statistics        | 18 / 27 / 140 / 9                           | `index.html` |
| Leadership names  | "Name to be added" + roles                  | `about/index.html` |
| Social links      | `href="#"`                                  | Footer on all pages |
| Timeline years    | 2008 – today                                | `about/index.html` |

A short disclosure that these are placeholders is shown in the footer of every
page (`.demo-note`). Delete that block when the real content goes in.

## Google Map

The map uses Google's keyless embed:

    https://www.google.com/maps?q=<url-encoded address>&output=embed

To move the pin, URL-encode the church's real address and replace the `q=`
value. No API key or billing account is required for this embed form.

## Contact form

The form validates in the browser and shows a success panel. It does **not**
send anything yet. To wire it up, add a `data-endpoint` attribute to the form:

    <form id="contact-form" novalidate data-endpoint="https://api.web3forms.com/submit">

and add a hidden input with the Web3Forms access key:

    <input type="hidden" name="access_key" value="YOUR-WEB3FORMS-KEY">

`assets/site.js` will POST the form as JSON to that endpoint and then show the
success panel. Any endpoint accepting a JSON POST works the same way.

## Giving form

Demonstration only — no payment is taken and no card details are collected. On
the live site the submit handler should redirect to the church's payment
provider. This is stated on the page itself.

## Images

All photographs are from Unsplash and used under the Unsplash License, which
permits free commercial and non-commercial use with no attribution required.
They were downloaded, resized and re-encoded to WebP (24 files, ~1.1 MB total).
No copyrighted or third-party church content is used anywhere on this site.

## Routing note

`staticwebapp.config.json` excludes `/demo/*` from the SPA navigation fallback,
and the PWA service worker's `navigateFallbackDenylist` excludes `/demo/` — both
are required so Azure serves these static pages instead of the React app shell.
Every page carries `<meta name="robots" content="noindex, nofollow">` so the
demo never competes with churchgeniuspro.com in search.
