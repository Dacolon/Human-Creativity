'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { constraints, challenges } from '../data/constants';
import { generateRandomColor } from '../utils/colors';

const nodes = [
  { href: '/flow', label: 'Flow', ring: 'cyan' },
  { href: '/practice', label: 'Practice', ring: 'amber' },
  { href: '/museum', label: 'Archive', ring: 'green' },
  { href: '/market', label: 'Market Sense', ring: 'cyan' },
  { href: '/marketing', label: 'Sharing', ring: 'amber' },
  { href: '/community', label: 'Community', ring: 'green' },
  { href: '/funding', label: 'Funding', ring: 'cyan' },
  { href: '/wellbeing', label: 'Wellbeing', ring: 'amber' },
  { href: '/obstacles', label: 'Obstacles', ring: 'cyan' },
  { href: '/techniques', label: 'Techniques', ring: 'green' },
  { href: '/arthistory', label: 'Art & History', ring: 'amber' },
  { href: '/solitude', label: 'Solitude', ring: 'cyan' }
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
    <div className="grid md:grid-cols-[1.2fr_1fr] gap-8">
      {/* Left: Constellation */}
      <section className="card relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <motion.div
            className="absolute rounded-full border border-cyan-400/30"
            style={{ width: 260, height: 260, top: '10%', left: '8%' }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute rounded-full border border-amber-300/25"
            style={{ width: 340, height: 340, top: '32%', left: '28%' }}
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <div className="relative z-10">
          <h2 className="text-xl font-semibold text-slate-100 mb-2">
            Your Creative Constellation
          </h2>
          <p className="text-xs text-slate-300/80 mb-6">
            Each node is a realm of your creative life. Dive into wherever
            pulls you the most today.
          </p>

          <div className="relative h-80">
            {nodes.map((node, index) => {
              const angle = (index / nodes.length) * Math.PI * 2;
              const radius = 90 + (index % 3) * 26;
              const x = 50 + Math.cos(angle) * radius;
              const y = 50 + Math.sin(angle) * radius;

              const ringColor =
                node.ring === 'cyan'
                  ? 'shadow-[0_0_0_2px_rgba(34,211,238,0.4)]'
                  : node.ring === 'amber'
                  ? 'shadow-[0_0_0_2px_rgba(251,191,36,0.4)]'
                  : 'shadow-[0_0_0_2px_rgba(74,222,128,0.4)]';

              return (
                <motion.div
                  key={node.href}
                  className="absolute"
                  style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                >
                  <Link href={node.href}>
                    <motion.div
                      className={`rounded-full px-3 py-1 text-[0.7rem] bg-slate-900/90 border border-slate-500/80 ${ringColor}`}
                      style={{
                        boxShadow:
                          '0 0 20px rgba(15,23,42,1), 0 0 38px rgba(15,23,42,0.9)'
                      }}
                      animate={{
                        y: [0, -4, 0],
                        opacity: [0.9, 1, 0.95]
                      }}
                      transition={{
                        duration: 5 + (index % 4),
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

      {/* Right: Daily Pulse */}
      <section className="space-y-4">
        <div className="card">
          <h3 className="text-sm font-semibold text-slate-100 mb-2">
            Today&apos;s Creative Pulse
          </h3>
          <p className="text-xs text-slate-300 mb-2">
            Constraint:
          </p>
          <p className="text-sm text-cyan-200 mb-3">{constraint}</p>
          <p className="text-xs text-slate-300 mb-2">
            Inner question:
          </p>
          <p className="text-sm text-amber-100 mb-3">{challenge}</p>

          <div className="flex gap-2 mt-3">
            {miniPalette.map((c, i) => (
              <div
                key={i}
                className="flex-1 h-6 rounded-full"
                style={{ background: c }}
              />
            ))}
          </div>

          <button
            onClick={() => setSeed(Date.now())}
            className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-500 text-[0.7rem]"
          >
            Shuffle today
          </button>
        </div>

        <div className="card">
          <h3 className="text-sm font-semibold text-slate-100 mb-2">
            How to use this universe
          </h3>
          <ul className="text-[0.7rem] text-slate-300 space-y-1">
            <li>Pick the node that pulls you the most — don&apos;t overthink.</li>
            <li>Give yourself 10–20 minutes; treat it like a ritual.</li>
            <li>Let artifacts accumulate over time as proof of your practice.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
