'use client';

import './globals.css';
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Orbit, Volume2, VolumeX } from 'lucide-react';
import { AuraBadge } from './components/AuraBadge';
import { SoundProvider, useSound } from './components/SoundEngine';

const navLinks = [
  { href: '/', label: 'Constellation' },
  { href: '/flow', label: 'Flow' },
  { href: '/practice', label: 'Practice' },
  { href: '/museum', label: 'Archive' },
  { href: '/wellbeing', label: 'Inner Studio' },
  { href: '/journal', label: 'Journal' },
  { href: '/market', label: 'Market' },
  { href: '/marketing', label: 'Sharing' },
  { href: '/community', label: 'Community' },
  { href: '/codex', label: 'Creative Codex' },
  { href: '/profile', label: 'Your Aura' }
];

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* animated background layers */}
        <div className="bg-anim" aria-hidden="true" />
        <div className="cosmic-noise" aria-hidden="true" />
        <div className="cosmic-depth" aria-hidden="true" />
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SoundProvider>
            <UniverseShell>{children}</UniverseShell>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

function UniverseShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(t);
  }, []);

  if (showSplash) return <Splash />;

  return (
    <div className="min-h-screen">
      <header className="container pt-5 pb-3 relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Orbit size={22} className="text-cyan-300" />
              <h1 className="text-2xl md:text-3xl font-extrabold header-accent font-space">
                Human Creativity Universe
              </h1>
            </div>
            <p className="text-xs md:text-sm text-slate-300/80 mt-1 max-w-md">
              A cosmic operating system for your creative life — mind, body,
              spirit, and practice in one living world.
            </p>
          </div>

          <div className="flex items-center gap-3 justify-start md:justify-end">
            <SoundControls />
            <AuraBadge />
          </div>
        </div>

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
        Built for human artists
