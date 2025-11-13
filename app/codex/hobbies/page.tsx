'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const ideas = [
  'Have a hobby that doesn’t need to be good.',
  'Make something small and pointless once a week.',
  'Let joy guide your curiosity instead of productivity.',
  'Try something you’re bad at — liberation lives there.',
  'Play like a child: with no audience.'
];

export default function HobbiesPage() {
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
        The Power of Hobbies
      </motion.h1>

      <p className="text-slate-300 text-sm leading-relaxed">
        Hobbies are portals into joy, play, and identity. They protect you from
        burnout and reconnect you with curiosity.
      </p>

      <div className="card bg-gradient-to-br from-emerald-400/10 to-emerald-700/10">
        <ul className="space-y-3">
          {ideas.map((p, i) => (
            <li key={i} className="text-slate-200 text-sm flex gap-3">
              <span className="text-emerald-300">•</span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
