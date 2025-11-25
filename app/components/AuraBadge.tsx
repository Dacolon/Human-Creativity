'use client';

import { motion } from 'framer-motion';
import { useAuraProfile } from '../hooks/useAuraProfile';

export function AuraBadge() {
  const { profile } = useAuraProfile();

  if (!profile) {
    return (
      <div className="text-xs text-slate-400">
        Calibrating your creative aura...
      </div>
    );
  }

  const gradient =
    profile.element === 'fire'
      ? 'from-orange-500/90 to-rose-500/80'
      : profile.element === 'water'
      ? 'from-cyan-500/90 to-sky-500/80'
      : profile.element === 'air'
      ? 'from-violet-500/90 to-indigo-500/80'
      : profile.element === 'earth'
      ? 'from-emerald-500/90 to-lime-500/80'
      : 'from-amber-400/90 to-fuchsia-500/80';

  return (
    <motion.div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${gradient} shadow-lg text-xs text-white`}
      initial={{ opacity: 0, y: 4, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <span className="text-sm">{profile.symbol}</span>
      <div className="flex flex-col leading-tight">
        <span className="font-semibold">{profile.name}</span>
        <span className="text-[0.7rem] opacity-80">
          {profile.element.toUpperCase()} aura
        </span>
      </div>
    </motion.div>
  );
    }
