'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { constraints, challenges } from '../data/constants';
import { generateRandomColor } from '../utils/colors';

const nodes = [
  { href: '/flow', label: 'Flow', ring: 'cyan' },
  { href: '/practice', label: 'Practice', ring: 'emerald' },
  { href: '/museum', label: 'Archive', ring: 'gold' },
  { href: '/wellbeing', label: 'Inner Studio', ring: 'rose' },
  { href: '/market', label: 'Market', ring: 'cyan' },
  { href: '/marketing', label: 'Sharing', ring: 'gold' },
  { href: '/community', label: 'Community', ring: 'emerald' },
  { href: '/codex', label: 'Creative Codex', ring: 'rose' },
  { href: '/codex/funding', label: 'Funding', ring: 'cyan' },
  { href: '/codex/art-history', label: 'Art & History', ring: 'gold' },
  { href: '/codex/ai-creation', label: 'AI & Creation', ring: 'emerald' },
  { href: '/codex/isolation', label: 'Solitude', ring: 'rose' }
];

function pick(seed: number, arr: string[]) {
  return arr[Math.abs(Math.floor(Math.sin(seed) * 10000)) % arr.length];
}

export default function HomePage() {
  const [seed, setSeed] = React.useState(() => Date.now());
  const constraint = pick(seed, constraints);
  const challenge = pick(seed + 1, challenges);
  const miniPalette = [
    generateRandomColor(),
    generateRandomColor(),
    generateRandomColor()
  ];

  return (
    <div className="grid md:grid-cols-[1.4fr_1fr] gap-8 items-stretch">
      {/* Constellation */}
      <section className="card relative overflow-hidden">
        <motion.div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <motion.div
            className="absolute rounded-full border border-cyan-400/25"
            style={{ width: 260, height: 260, top: '6%', left: '6%' }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute rounded-full border border-amber-300/20"
            style={{ width: 360, height: 360, top: '28%', left: '24%' }}
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 62, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute rounded-full border border-emerald-300/18"
            style={{ width: 460, height: 460, top: '38%', left: '8%' }}
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        <div className="relative z-10">
          <h2 className="text-lg font-semibold text-slate-100 mb-2">
            Your Creative Constellation
          </h2>
          <p className="text-xs text-slate-300/80 mb-5 max-w-md">
            Each glowing point is a realm of your creative life: practice,
            rest, history, community, and future tech. Go where your curiosity
            feels warmest.
          </p>

          <div className="relative h-80">
            {nodes.map((node, index) => {
              const angle = (index / nodes.length) * Math.PI * 2;
              const radius = 85 + (index % 3) * 28;
              const x = 50 + Math.cos(angle) * radius;
              const y = 50 + Math.sin(angle) * radius;

              const ringGlow =
                node.ring === 'cyan'
                  ? 'shadow-[0_0_0_1px_rgba(34,211,238,0.7),0_0_26px_rgba(34,211,238,0.45)] text-cyan-100'
                  : node.ring === 'gold'
                  ? 'shadow-[0_0_0_1px_rgba(251,191,36,0.7),0_0_26px_rgba(251,191,36,0.45)] text-amber-100'
                  : node.ring === 'emerald'
                  ? 'shadow-[0_0_0_1px_rgba(34,197,94,0.7),0_0_26px_rgba(34,197,94,0.45)] text-emerald-100'
                  : 'shadow-[0_0_0_1px_rgba(244,114,182,0.7),0_0_26px_rgba(244,114,182,0.45)] text-rose-100';

              return (
                <motion.div
                  key={node.href}
                  className="absolute"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  whileHover={{ scale: 1.16 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                >
                  <Link href={node.href}>
                    <motion.div
                      className={`rounded-full px-3 py-1 text-[0.7rem] bg-slate-950/95 border border-slate-500/80 ${ringGlow}`}
                      animate={{
                        y: [0, index % 2 === 0 ? -4 : 4, 0],
                        opacity: [0.9, 1, 0.95]
                      }}
                      transition={{
                        duration: 6 + (index % 4),
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    >
                      {node.label}
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Daily Pulse / Ritual */}
      <section className="space-y-4">
        <div className="card">
          <h3 className="text-sm font-semibold text-slate-100 mb-2">
            Today&apos;s Creative Pulse
          </h3>
          <p className="text-xs text-slate-400 mb-1">Constraint</p>
          <p className="text-sm text-cyan-200 mb-3">{constraint}</p>
          <p className="text-xs text-slate-400 mb-1">Inner question</p>
          <p className="text-sm text-amber-100 mb-4">{challenge}</p>

          <div className="flex gap-2 mt-2">
            {miniPalette.map((c, i) => (
              <div
                key={i}
                className="flex-1 h-7 rounded-full"
                style={{ background: c }}
              />
            ))}
          </div>

          <button
            onClick={() => setSeed(Date.now())}
            className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-500 text-[0.7rem]"
          >
            Shuffle today
          </button>
        </div>

        <div className="card">
          <h3 className="text-sm font-semibold text-slate-100 mb-2">
            How to travel this universe
          </h3>
          <ul className="text-[0.7rem] text-slate-300 space-y-1">
            <li>Choose the realm that feels warmest or most uncomfortable.</li>
            <li>Give it 10–20 minutes. No doomscrolling in between.</li>
            <li>
              Let your sessions become small stars in a long-term creative sky.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
