'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const sections = [
  {
    href: '/codex/funding',
    title: 'Funding & Opportunities',
    color: 'from-cyan-400/30 to-cyan-600/10',
    desc: 'Learn how creative projects get funded: grants, residencies, commissions, and more.'
  },
  {
    href: '/codex/art-history',
    title: 'Art History & The Human Future',
    color: 'from-amber-400/30 to-amber-600/10',
    desc: 'Why art matters in an accelerating world — and what past movements teach us today.'
  },
  {
    href: '/codex/ai-creation',
    title: 'AI & Your Creative Edge',
    color: 'from-rose-400/30 to-rose-600/10',
    desc: 'How to collaborate with AI ethically while protecting and amplifying your human voice.'
  },
  {
    href: '/codex/hobbies',
    title: 'The Power of Hobbies',
    color: 'from-emerald-400/30 to-emerald-600/10',
    desc: 'Why non-productive hobbies strengthen your identity, joy, and imagination.'
  },
  {
    href: '/codex/creativity-blockers',
    title: 'Creativity Blockers',
    color: 'from-purple-400/30 to-purple-600/10',
    desc: 'Understand perfectionism, comparison, fear, and overwhelm — and how to dissolve them.'
  },
  {
    href: '/codex/art-types',
    title: 'Art Forms & Techniques',
    color: 'from-indigo-400/30 to-indigo-600/10',
    desc: 'A map of different artistic practices to explore and experiment with.'
  },
  {
    href: '/codex/isolation',
    title: 'Solitude & Spontaneous Creation',
    color: 'from-fuchsia-400/30 to-fuchsia-600/10',
    desc: 'Why isolation, downtime, and tiny acts of creation matter more than you think.'
  }
];

export default function CreativeCodex() {
  return (
    <div>
      <motion.h1
        className="text-4xl font-bold header-accent mb-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        The Creative Codex
      </motion.h1>

      <motion.p
        className="text-slate-300 text-sm max-w-xl mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        This realm holds the core knowledge that strengthens your creative life:
        your history, psychology, well-being, opportunities, and future tools.
        Wander freely — everything here expands your artistic universe.
      </motion.p>

      <div className="grid md:grid-cols-2 gap-6">
        {sections.map((sec, i) => (
          <motion.div
            key={sec.href}
            initial={{ opacity: 0, y: 16 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.25 + i * 0.1 }
            }}
          >
            <Link href={sec.href}>
              <div
                className={`card bg-gradient-to-br ${sec.color} cursor-pointer hover:scale-[1.02] transition`}
              >
                <h2 className="text-xl font-semibold text-white">
                  {sec.title}
                </h2>
                <p className="text-slate-300 text-sm mt-2">{sec.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
