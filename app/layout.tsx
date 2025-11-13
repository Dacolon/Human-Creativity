'use client';

import './globals.css';
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Orbital } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Constellation' },
  { href: '/flow', label: 'Flow' },
  { href: '/practice', label: 'Practice' },
  { href: '/museum', label: 'Archive' },
  { href: '/wellbeing', label: 'Inner Studio' },
  { href: '/market', label: 'Market' },
  { href: '/marketing', label: 'Sharing' },
  { href: '/community', label: 'Community' },
  { href: '/codex', label: 'Creative Codex' }
];

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* layered background */}
        <div className="bg-anim" aria-hidden="true" />
        <div className="cosmic-noise" aria-hidden="true" />
        <ThemeProvider attribute="class" defaultTheme="dark">
          <UniverseShell>{children}</UniverseShell>
        </ThemeProvider>
      </body>
    </html>
  );
}

function UniverseShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 1400);
    return () => clearTimeout(t);
  }, []);

  if (showSplash) return <Splash />;

  return (
    <div className="min-h-screen">
      <header className="container pt-5 pb-3 relative">
        <div className="cosmic-orb" aria-hidden="true" />
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Orbital size={22} className="text-cyan-300" />
              <h1 className="text-2xl md:text-3xl font-extrabold header-accent">
                Human Creativity Universe
              </h1>
            </div>
            <p className="text-xs md:text-sm text-slate-300/80 mt-1 max-w-md">
              A cosmic operating system for your creative life — mind, body,
              spirit, and practice in one living world.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-300/90">
            <Sparkles size={16} className="text-amber-300" />
            <span>Your current realm adapts to you.</span>
          </div>
        </div>

        {/* nav bar */}
        <nav className="mt-5 flex flex-wrap gap-2">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <button
                  className={`nav-link ${
                    active
                      ? 'border-cyan-300/90 text-cyan-100 shadow-[0_0_0_1px_rgba(34,211,238,0.7),0_0_28px_rgba(34,211,238,0.35)]'
                      : 'text-slate-200/80'
                  }`}
                >
                  {link.label}
                </button>
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="container pb-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(3px)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="container pb-6 text-[0.7rem] text-slate-400/80">
        Built for human artists in a changing world. This space does not
        generate art for you — it helps you remember that you are the
        generator.
      </footer>
    </div>
  );
}

function Splash() {
  return (
    <div className="splash-bg">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
        className="text-center px-6"
      >
        <motion.div
          className="splash-title header-accent"
          initial={{ letterSpacing: '0.2em' }}
          animate={{ letterSpacing: '-0.06em' }}
          transition={{ duration: 0.9 }}
        >
          HUMAN CREATIVITY UNIVERSE
        </motion.div>
        <motion.p
          className="mt-4 text-sm text-slate-200/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Enter a living, cosmic space designed to protect and expand your
          creative life.
        </motion.p>
      </motion.div>
    </div>
  );
}
