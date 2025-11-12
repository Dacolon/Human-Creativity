'use client';

import './globals.css';
import React, { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SunMedium, Moon } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/flow', label: 'Flow' },
  { href: '/practice', label: 'Practice' },
  { href: '/museum', label: 'Museum' },
  { href: '/market', label: 'Market' },
  { href: '/marketing', label: 'Marketing' }
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Background />
          <AppFrame>{children}</AppFrame>
        </ThemeProvider>
      </body>
    </html>
  );
}

function Background() {
  return <div className="bg-anim" aria-hidden="true" />;
}

function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (showSplash) return <Splash />;

  return (
    <div className="min-h-screen">
      <header className="container flex items-center justify-between mb-4 mt-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold header-accent">
            Human Creativity Toolkit
          </h1>
          <p className="text-xs md:text-sm text-purple-300">
            Tools to strengthen your creative practice — human-first.
          </p>
        </div>
        <button
          className="nav-link"
          onClick={() =>
            setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
          }
        >
          {resolvedTheme === 'dark' ? <SunMedium size={16} /> : <Moon size={16} />}
        </button>
      </header>

      <nav className="container flex flex-wrap gap-2 mb-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`nav-link ${
              pathname === link.href ? 'ring-2 ring-accent/60' : ''
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <main className="container">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8, filter: 'blur(2px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(2px)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="container mt-10 mb-8 text-xs text-purple-300/70">
        Built for artists, by artists. No AI generation — just tools to
        enhance your human creativity.
      </footer>
    </div>
  );
}

function Splash() {
  return (
    <div className="splash-bg">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <div className="splash-title header-accent">
          Human Creativity Toolkit
        </div>
        <div style={{ height: 10 }} />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-sm text-purple-200"
        >
          Minimal • Human-first • Practice
        </motion.div>
      </motion.div>
    </div>
  );
}
