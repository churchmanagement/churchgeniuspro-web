import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    react(),
    tailwindcss(),
    // The PWA plugin only applies to the client build; the SSR build is a
    // throwaway bundle used by scripts/prerender.mjs at build time.
    ...(isSsrBuild ? [] : [VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'logo.png', 'robots.txt'],
      manifest: {
        name: 'ChurchGeniusPro — AI Church Management & Accounting',
        short_name: 'ChurchGeniusPro',
        description:
          'The AI-powered all-in-one platform for church management, accounting, giving, events, and ministries.',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest}'],
        navigateFallback: '/index.html',
      },
    })]),
  ],
  // Bundle swiper into the SSR build so its CSS imports are handled by Vite
  // (Node cannot import .css files from an externalized package).
  ssr: { noExternal: ['swiper'] },
  build: isSsrBuild
    ? { outDir: 'dist-ssr', target: 'node18' }
    : {
        target: 'es2020',
        cssCodeSplit: true,
        rollupOptions: {
          output: {
            manualChunks: {
              react: ['react', 'react-dom', 'react-router-dom'],
              motion: ['framer-motion'],
              swiper: ['swiper', 'swiper/react'],
            },
          },
        },
      },
}));
