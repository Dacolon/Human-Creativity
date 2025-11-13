'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const insights = [
  'Solitude creates inner space where ideas can land.',
  'Deep work requires distance from noise.',
  'Spontaneous creation breaks patterns and reignites curiosity.',
  'Isolation is not avoidance — it is incubation.',
  'Tiny acts of creativity create momentum.'
];

export default function IsolationPage() {
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
        Solitude & Spontaneous Creation
      </motion.h1>

      <p className="text-slate-300 text-sm leading-relaxed">
        Solitude is not emptiness — it is a studio made of silence. In that
        space, creativity remembers how to breathe.
      </p>

      <div className="card bg-gradient-to-br from-fuchsia-400/10 to-fuchsia-700/10">
        <ul className="space-y-3">
          {insights.map((i, idx) => (
            <li key={idx} className="text-slate-200 text-sm flex gap-2">
              <span className="text-fuchsia-300">•</span>
              {i}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
