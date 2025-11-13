'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const points = [
  'Use AI for idea expansion — never as a replacement.',
  'Generate variations of your own sketches or compositions.',
  'Use AI as a collaborator, not a ghostwriter.',
  'Keep your human imperfections — they are your signature.',
  'Use AI to draft, not to finalize.',
  'Protect your identity and your uniqueness at all costs.'
];

export default function AICreationPage() {
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
        AI & Your Creative Edge
      </motion.h1>

      <p className="text-slate-300 text-sm leading-relaxed">
        AI is a powerful tool — but your humanity is more powerful. Use AI to
        amplify your ideas, not replace them.
      </p>

      <div className="card bg-gradient-to-br from-rose-400/10 to-rose-700/10">
        <ul className="space-y-2">
          {points.map((p, i) => (
            <li key={i} className="text-slate-200 text-sm flex gap-2">
              <span className="text-rose-300">•</span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
