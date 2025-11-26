'use client';

import './globals.css';
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Orbital, Volume2, VolumeX } from 'lucide-react';
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
        <ThemeProvider attribute="class" defaultTheme="dark">
          {/* 🔊 wrap everything in SoundProvider */}
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
    const t = setTimeout(() => setShowSplash(false), 1400);
    return () => clearTimeout(t);
  }, []);

  if (showSplash) return <Splash />;

  return (
    <div className="min-h-screen">
      <header className="container pt-5 pb-3 relative">
        <div className="cosmic-orb" aria-hidden="true" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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

          <div className="flex items-center gap-3 justify-start md:justify-end">
            {/* 🔊 sound controls in header */}
            <SoundControls />
            {/* ✨ aura identity badge */}
            <AuraBadge />
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

/* 🔊 header sound controls */
function SoundControls() {
  const { playing, stop, play, volume, setVolume } = useSound();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => (playing ? stop() : play('flow'))}
        className="p-2 rounded-full hover:bg-slate-800/60 border border-slate-600/60 text-slate-200 transition"
        aria-label={playing ? 'Mute soundscape' : 'Play soundscape'}
      >
        {playing ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
      {playing && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-20 accent-cyan-400"
        />
      )}
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
