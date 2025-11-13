'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const items = [
  {
    title: 'Grants & Fellowships',
    bullets: [
      'Local arts councils often have yearly grants.',
      'Most require a simple project proposal + samples.',
      'You don’t need to be “established” — just committed.'
    ]
  },
  {
    title: 'Residencies',
    bullets: [
      'Live, create, and connect in a dedicated art space.',
      'Some residencies offer stipends or free housing.',
      'Your portfolio matters less than your story.'
    ]
  },
  {
    title: 'Crowdfunding',
    bullets: [
      'People support what feels meaningful, not perfect.',
      'Short videos explaining your “why” work best.',
      'Offer small rewards (prints, postcards, behind-the-scenes).'
    ]
  },
  {
    title: 'Commissions',
    bullets: [
      'Start with simple offerings: portraits, pets, small works.',
      'Use clear boundaries: pricing, revisions, timeline.',
      'Document your process — it builds trust.'
    ]
  }
];

export default function FundingPage() {
  return (
    <div className="space-y-8">
      <Link href="/codex" className="text-slate-400 text-sm hover:text-slate-200">
        ← Back to Codex
      </Link>

      <motion.h1
        className="text-3xl font-bold header-accent"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Funding & Creative Opportunities
      </motion.h1>

      <p className="text-slate-300 text-sm leading-relaxed">
        There has never been more support for artists — the challenge is knowing
        where to look and how to present your work clearly. All information here
        is general inspiration, not legal or financial advice.
      </p>

      <div className="grid gap-6">
        {items.map((it, idx) => (
          <motion.div
            key={it.title}
            className="card bg-gradient-to-br from-cyan-400/10 to-cyan-700/10"
            initial={{ opacity: 0, y: 14 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.2 + idx * 0.1 }
            }}
          >
            <h2 className="text-xl font-semibold text-cyan-100">{it.title}</h2>
            <ul className="mt-3 space-y-2">
              {it.bullets.map((b, i) => (
                <li key={i} className="text-slate-200 text-sm flex gap-2">
                  <span className="text-cyan-300">•</span>
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
