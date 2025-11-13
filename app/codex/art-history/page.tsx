'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const eras = [
  {
    name: 'Renaissance — Rebirth of Perspective',
    insight:
      'Artists used new tools to reshape reality. Technology changed art — and artists adapted creatively.'
  },
  {
    name: 'Impressionism — Feeling Over Accuracy',
    insight:
      'Artists followed emotion instead of rules. A reminder that expression matters more than perfection.'
  },
  {
    name: 'Modernism — Breaking Structures',
    insight:
      'New forms emerge whenever society shifts. You are part of the next shift.'
  },
  {
    name: 'Digital Age — New Mediums',
    insight:
      'Technology expands creativity — but the human eye, story, and emotion remain irreplaceable.'
  }
];

export default function ArtHistoryPage() {
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
        Art History & The Future of Human Creativity
      </motion.h1>

      <p className="text-slate-300 text-sm leading-relaxed">
        For thousands of years, humans have used art to understand the world.
        Every new technology changed the tools — but never the purpose.
      </p>

      <div className="grid gap-6">
        {eras.map((era, i) => (
          <motion.div
            key={era.name}
            className="card bg-gradient-to-br from-amber-400/10 to-amber-700/10"
            initial={{ opacity: 0, y: 14 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.25 + i * 0.1 }
            }}
          >
            <h2 className="text-xl font-semibold text-amber-200">{era.name}</h2>
            <p className="mt-3 text-slate-300 text-sm leading-relaxed">
              {era.insight}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
