import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { FaFacebookF, FaXTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa6';

const columns = [
  {
    heading: 'Quick Links',
    links: [
      { name: 'Home', to: '/' },
      { name: 'Features', to: '/features' },
      { name: 'Pricing', to: '/pricing' },
      { name: 'Compare', to: '/compare' },
      { name: 'Sign Up', to: '/signup' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { name: 'About Us', to: '/support' },
      { name: 'Contact', to: '/support#contact' },
      { name: 'Careers', to: '/support' },
      { name: 'Partners', to: '/support' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { name: 'Help Center', to: '/support' },
      { name: 'Documentation', to: '/support#docs' },
      { name: 'Video Tutorials', to: '/support#videos' },
      { name: 'Community', to: '/support#community' },
      { name: 'FAQ', to: '/support#faq' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { name: 'Privacy Policy', to: '/privacy' },
      { name: 'Terms of Service', to: '/terms' },
      { name: 'Cookie Policy', to: '/cookies' },
    ],
  },
];

const socials = [
  { icon: FaFacebookF, label: 'Facebook', href: 'https://facebook.com/churchgeniuspro' },
  { icon: FaXTwitter, label: 'X (Twitter)', href: 'https://x.com/churchgeniuspro' },
  { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com/churchgeniuspro' },
  { icon: FaYoutube, label: 'YouTube', href: 'https://youtube.com/@churchgeniuspro' },
  { icon: FaLinkedinIn, label: 'LinkedIn', href: 'https://linkedin.com/company/churchgeniuspro' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="border-t border-slate-100 bg-slate-950 text-slate-300">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-6">
          {/* Brand + newsletter */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block" aria-label="ChurchGeniusPro home">
              <span className="inline-block rounded-2xl bg-white px-4 py-2.5">
                <img src="/logo.png" alt="ChurchGeniusPro" className="h-12 w-auto" />
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              One platform for every part of church life — people, giving, accounting, events,
              ministries, and communication, all powered by AI.
            </p>

            <h3 className="mt-8 text-sm font-semibold text-white">Subscribe to our newsletter</h3>
            {subscribed ? (
              <p className="mt-3 flex items-center gap-2 text-sm text-emerald-400">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Thanks for subscribing!
              </p>
            ) : (
              <form
                className="mt-3 flex max-w-sm gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.includes('@')) setSubscribed(true);
                }}
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@church.org"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 text-white transition hover:opacity-90"
                  aria-label="Subscribe"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>
            )}
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="text-sm font-semibold text-white">{col.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.name}>
                    <Link to={l.to} className="text-sm text-slate-400 transition hover:text-white">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Contact + socials */}
        <div className="mt-12 flex flex-col gap-6 border-t border-slate-800 pt-8 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:gap-6">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-400" aria-hidden="true" />
              <a href="mailto:hello@churchgeniuspro.com" className="hover:text-white">
                hello@churchgeniuspro.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-blue-400" aria-hidden="true" />
              <a href="tel:+18005551234" className="hover:text-white">
                +1 (800) 555-1234
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-400" aria-hidden="true" />
              <span>Serving churches worldwide</span>
            </li>
          </ul>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-slate-400 transition hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 hover:text-white"
              >
                <s.icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} ChurchGeniusPro. All rights reserved. Built with care for
          churches everywhere.
        </p>
      </div>
    </footer>
  );
}
