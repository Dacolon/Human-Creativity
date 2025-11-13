'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const rituals = [
  {
    title: 'Breath Reset',
    desc: 'A 30-second slow inhale/exhale to clear your creative fog.',
    steps: [
      'Inhale for 4 seconds',
      'Hold for 2 seconds',
      'Exhale for 6 seconds',
      'Repeat 4 times'
    ],
    color: 'from-cyan-400/40 to-cyan-600/20'
  },
  {
    title: 'Body Shift',
    desc: 'A micro-movement ritual to restart your nervous system.',
    steps: [
      'Drop shoulders',
      'Unclench jaw',
      'Open palms',
      'Look away from screens for 10 seconds'
    ],
    color: 'from-emerald-400/40 to-emerald-600/20'
  },
  {
    title: 'Spirit Tune',
    desc: 'Reconnect with meaning before making.',
    steps: [
      'Recall WHY you create',
      'Recall WHO your art touches',
      'Recall WHAT feels alive to you today'
    ],
    color: 'from-amber-400/40 to-amber-600/20'
  }
];

export default function WellbeingPage() {
  return (
    <div className="relative">
      {/* Floating background animation */}
      <motion.div
        className="fixed inset-0 -z-10 opacity-[0.8]"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(34,211,238,0.16), transparent 60%), radial-gradient(circle at 80% 70%, rgba(251,191,36,0.18), transparent 60%), #020617'
        }}
      />

      {/* Page container */}
      <div className="container max-w-3xl mx-auto py-10 space-y-10">
        <Link
          href="/"
          className="text-slate-400 text-sm hover:text-slate-200 transition inline-block mb-4"
        >
          ← Back to Constellation
        </Link>

        <motion.h1
          className="text-4xl font-bold header-accent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          The Inner Studio
        </motion.h1>

        <motion.p
          className="text-slate-300 max-w-xl leading-relaxed text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Creativity doesn’t come from force — it comes from the state you’re in.
          This realm supports your mind, body, and spirit so your ideas flow
          effortlessly, without strain. None of this is medical advice; consider
          these simple grounding tools that many artists use to stay open and curious.
        </motion.p>

        {/* Ritual cards */}
        <div className="grid gap-6">
          {rituals.map((ritual, index) => (
            <motion.div
              key={ritual.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.3 + index * 0.15 }
              }}
              className={`card relative overflow-hidden bg-gradient-to-br ${ritual.color}`}
            >
              <motion.div
                className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_60%)]"
                animate={{
                  opacity: [0.15, 0.3, 0.15],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />

              <h2 className="text-xl font-semibold text-white relative z-10">
                {ritual.title}
              </h2>
              <p className="text-slate-200 text-sm mt-1 relative z-10">
                {ritual.desc}
              </p>

              <ul className="mt-4 space-y-2 relative z-10">
                {ritual.steps.map((step, i) => (
                  <li
                    key={i}
                    className="text-slate-100/90 text-sm flex items-center gap-2"
                  >
                    <span className="text-cyan-300">•</span> {step}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
