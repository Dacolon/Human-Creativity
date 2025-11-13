'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const types = [
  'Drawing — gesture, contour, charcoal, ink.',
  'Painting — acrylic, oil, watercolor, gouache.',
  'Mixed Media — collage, assemblage, textures.',
  'Digital Art — tablets, stylus, 3D, vector.',
  'Photography — composition, light, mood.',
  'Writing — prose, poetry, journaling.',
  'Sound — ambient, sampling, field recordings.',
  'Movement — dance, gesture, performance.'
];

export default function ArtTypesPage() {
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
        Art Forms & Techniques
      </motion.h1>

      <p className="text-slate-300 text-sm leading-relaxed">
        Explore different artistic mediums — each opens a different part of
        your mind.
      </p>

      <div className="card bg-gradient-to-br from-indigo-400/10 to-indigo-700/10">
        <ul className="space-y-3">
          {types.map((t, i) => (
            <li key={i} className="text-slate-200 text-sm flex gap-2">
              <span className="text-indigo-300">•</span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
