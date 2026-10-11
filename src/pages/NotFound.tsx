import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Home, LayoutGrid, MessageCircle, Tag } from 'lucide-react';

/**
 * Branded "Page not found" page.
 *
 * Rendered by the catch-all route and prerendered to dist/404.html, which
 * staticwebapp.config.json serves with a real HTTP 404. No entrance animation:
 * the static HTML must be visible before JavaScript loads.
 */
const destinations = [
  {
    to: '/features',
    label: 'Features',
    description: 'Everything the platform does',
    icon: LayoutGrid,
  },
  { to: '/pricing', label: 'Pricing', description: 'Free, Standard, and Pro plans', icon: Tag },
  {
    to: '/help',
    label: 'Help Center',
    description: 'Step-by-step guides for every role',
    icon: BookOpen,
  },
  {
    to: '/contact',
    label: 'Contact us',
    description: 'Ask the team a question',
    icon: MessageCircle,
  },
];

export default function NotFound() {
  return (
    <section className="section pt-32 md:pt-40">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="gradient-text text-7xl font-extrabold sm:text-8xl">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Page not found
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            The page you are looking for does not exist or has moved. These are good places to
            continue:
          </p>
        </div>

        <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          {destinations.map((d) => (
            <li key={d.to}>
              <Link to={d.to} className="card group flex h-full items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/10 to-purple-600/10">
                  <d.icon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                </span>
                <span>
                  <span className="flex items-center gap-1.5 font-semibold text-slate-900 group-hover:text-blue-700">
                    {d.label}
                    <ArrowRight
                      className="h-4 w-4 transition group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-1 block text-sm text-slate-600">{d.description}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Link to="/" className="btn-primary">
            <Home className="h-4 w-4" aria-hidden="true" /> Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
