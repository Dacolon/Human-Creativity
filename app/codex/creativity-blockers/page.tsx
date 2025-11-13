'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const blockers = [
  {
    title: 'Perfectionism',
    insight: 'Perfection is just fear wearing a fancy coat.'
  },
  {
    title: 'Comparison',
    insight:
      'Comparison kills creativity — no two artistic lifetimes are the same.'
  },
  {
    title: 'Overwhelm',
    insight: 'When everything matters, nothing moves. Choose one tiny action.'
  },
  {
    title: 'Fear of Being Seen',
    insight:
      'You don’t need to show everything to everyone. Create for yourself first.'
  }
];

export default function CreativityBlockersPage() {
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
        Creativity Blockers
      </motion.h1>

      <div className="grid gap-6">
        {blockers.map((b, i) => (
          <motion.div
            key={b.title}
            className="card bg-gradient-to-br from-purple-400/10 to-purple-700/10"
            initial={{ opacity: 0, y: 14 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.2 + i * 0.1 }
            }}
          >
            <h2 className="text-xl font-semibold text-purple-200">
              {b.title}
            </h2>
            <p className="mt-3 text-slate-300 text-sm">{b.insight}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
