import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="gradient-text text-8xl font-extrabold">404</p>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-2 text-slate-600">The page you're looking for doesn't exist or was moved.</p>
        <Link to="/" className="btn-primary mt-8">
          <Home className="h-4 w-4" aria-hidden="true" /> Back to Home
        </Link>
      </motion.div>
    </section>
  );
}
