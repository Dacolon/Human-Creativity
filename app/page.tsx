'use client';

import { motion } from 'framer-motion';
import { Compass, Clock, Sparkles, PenTool } from 'lucide-react';
import Link from 'next/link';

const floatTransition = {
  duration: 10,
  repeat: Infinity,
  repeatType: 'reverse' as const,
  ease: 'easeInOut' as const
};

export default function HomePage() {
  return (
    <div className="space-y-5 pb-4">
      {/* Row 1: Today in your universe */}
      <motion.section
        className="card float-slow"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 border border-cyan-400/60">
            <Sparkles size={16} className="text-cyan-300" />
          </div>
          <h2 className="cosmic-section-title font-space">
            Today in your universe
          </h2>
        </div>
        <p className="cosmic-subtle mb-4">
          Pick one tiny action to keep your creative orbit moving. No pressure,
          no perfection — just momentum.
        </p>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-900/70 border border-slate-700/70 p-3">
            <p className="text-[0.7rem] uppercase tracking-wide text-slate-400 mb-1">
              10-minute ritual
            </p>
            <p className="text-sm text-slate-50">
              Put your phone on airplane mode and fill a page with marks:
              circles, lines, dots — no images, just movement.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-900/70 border border-slate-700/70 p-3">
            <p className="text-[0.7rem] uppercase tracking-wide text-slate-400 mb-1">
              Reflection
            </p>
            <p className="text-sm text-slate-50">
              What feeling are you secretly making art about today, even if you
              don&apos;t say it out loud?
            </p>
          </div>
          <div className="rounded-2xl bg-slate-900/70 border border-slate-700/70 p-3">
            <p className="text-[0.7rem] uppercase tracking-wide text-slate-400 mb-1">
              Micro-commitment
            </p>
            <p className="text-sm text-slate-50">
              Choose one realm — <span className="font-semibold">Flow</span>,{' '}
              <span className="font-semibold">Practice</span>, or{' '}
              <span className="font-semibold">Journal</span> — and promise
              yourself just 5 focused minutes inside it.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Row 2: Quick portals into other realms */}
      <motion.section
        className="card float-delay"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/25 border border-indigo-400/60">
            <Compass size={16} className="text-indigo-200" />
          </div>
          <h2 className="cosmic-section-title font-space">
            Portals you can step through now
          </h2>
        </div>
        <p className="cosmic-subtle mb-4">
          Each realm is a different kind of space: practice, reflection,
          history, community. Tap one to drift deeper.
        </p>

        <div className="grid gap-3 md:grid-cols-2">
          <FloatingPortalCard
            href="/flow"
            title="Flow Realm"
            tag="Warm-up & constraints"
            description="Spin up random constraints, warmups, and prompts designed to get your hands moving before your brain can overthink."
          />
          <FloatingPortalCard
            href="/wellbeing"
            title="Inner Studio"
            tag="Mind, body, spirit"
            description="Short check-ins, grounding practices, and reminders that your nervous system is part of your creative toolkit."
          />
          <FloatingPortalCard
            href="/museum"
            title="Archive & Art History"
            tag="Lineage & influence"
            description="Reflect on art you love, understand why it hits you, and place your own work inside a much bigger human story."
          />
          <FloatingPortalCard
            href="/community"
            title="Community Realm"
            tag="Future social space"
            description="A future home for other humans building their creative life. For now, a reminder: you are not doing this alone."
          />
        </div>
      </motion.section>

      {/* Row 3: Journal invite */}
      <motion.section
        className="card float-slower"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-400/60">
            <PenTool size={16} className="text-emerald-200" />
          </div>
          <h2 className="cosmic-section-title font-space">
            A quiet orbit for your thoughts
          </h2>
        </div>
        <p className="cosmic-subtle mb-4">
          This universe isn&apos;t about output for social media. It&apos;s about
          you having a private, honest place to talk to yourself as an artist.
        </p>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-sm text-slate-50 md:max-w-md">
            Open the <span className="font-semibold">Journal Realm</span> and
            write for three minutes about what you&apos;re really trying to say
            with your work right now. No polishing, no audience, no algorithm.
          </p>
          <Link href="/journal" className="md:shrink-0">
            <button className="inline-flex items-center gap-2 rounded-full bg-emerald-500/90 hover:bg-emerald-400 text-slate-950 font-semibold text-sm px-4 py-2.5 shadow-[0_16px_40px_rgba(16,185,129,0.5)] transition-transform hover:-translate-y-[1px]">
              <Clock size={16} />
              Enter Journal Realm
            </button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}

function FloatingPortalCard(props: {
  href: string;
  title: string;
  tag: string;
  description: string;
}) {
  const { href, title, tag, description } = props;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      className="rounded-2xl bg-slate-900/80 border border-slate-700/75 p-3 flex flex-col justify-between"
    >
      <div>
        <p className="text-[0.65rem] uppercase tracking-[0.18em] text-slate-400 mb-1">
          {tag}
        </p>
        <h3 className="text-sm font-space text-slate-50 mb-1">{title}</h3>
        <p className="text-[0.8rem] text-slate-300">{description}</p>
      </div>
      <div className="mt-3">
        <Link href={href}>
          <span className="inline-flex items-center gap-1 text-[0.75rem] font-medium text-cyan-300 hover:text-cyan-200">
            Enter portal
          </span>
        </Link>
      </div>
    </motion.div>
  );
}
