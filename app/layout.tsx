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
  children,
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

  if (showSplash) {
    return <Splash />;
  }

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
        Built for human artists in a changing world. This space does not
        generate art for you — it helps you remember that you are the
        generator.
      </footer>
    </div>
  );
}

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

/* ---------- Splash screen ---------- */

function Splash() {
  return (
    <div className="splash-bg">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className="relative w-full max-w-xs sm:max-w-sm aspect-[4/5] rounded-[2rem] border border-slate-700/70 bg-slate-950/70 shadow-[0_26px_70px_rgba(0,0,0,0.95)] overflow-hidden"
      >
        {/* inner nebula */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(56,189,248,0.55),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.55),transparent_60%),radial-gradient(circle_at_50%_85%,rgba(129,140,248,0.6),transparent_60%)] opacity-70" />

        {/* rotating ring */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 26, ease: 'linear' }}
        >
          <div className="h-40 w-40 rounded-full border border-cyan-300/50 border-t-transparent border-l-transparent opacity-70" />
        </motion.div>

        {/* orbiting dot */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-2 w-2 -ml-[5.5rem] -mt-[0.1rem] rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]"
          animate={{ rotate: 360 }}
          style={{ transformOrigin: '90px 0px' }}
          transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
        />

        {/* content */}
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="splash-title mb-3">HUMAN CREATIVITY UNIVERSE</p>
          <h2 className="font-space text-xl text-slate-50 mb-2">
            Preparing your orbit
          </h2>
          <p className="text-[0.8rem] text-slate-200/90 max-w-[16rem]">
            A quiet, cosmic space for your human mind, body, spirit and creative
            work. No feed. No noise. Just you.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
