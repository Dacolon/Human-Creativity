'use client';

import { motion } from 'framer-motion';
import { useAuraProfile, AuraElement } from '../hooks/useAuraProfile';

const elements: { id: AuraElement; label: string; desc: string }[] = [
  {
    id: 'fire',
    label: 'Fire',
    desc: 'Bold, intense, risk-taking creative energy.'
  },
  {
    id: 'water',
    label: 'Water',
    desc: 'Emotional, intuitive, flowing imagination.'
  },
  {
    id: 'air',
    label: 'Air',
    desc: 'Conceptual, idea-driven, quick and curious.'
  },
  {
    id: 'earth',
    label: 'Earth',
    desc: 'Patient, grounded, craft-focused.'
  },
  {
    id: 'ether',
    label: 'Ether',
    desc: 'Mystical, experimental, beyond categories.'
  }
];

export default function ProfilePage() {
  const { profile, updateProfile } = useAuraProfile();

  if (!profile) {
    return (
      <div className="text-slate-300 text-sm">
        Calibrating your aura profile...
      </div>
    );
  }

  const handleNameChange = (name: string) => {
    updateProfile({ name: name || 'Anonymous Star' });
  };

  const selectElement = (element: AuraElement) => {
    updateProfile({ element });
  };

  return (
    <div className="space-y-8">
      <motion.h1
        className="text-3xl font-bold header-accent"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Your Creative Aura
      </motion.h1>

      <p className="text-slate-300 text-sm max-w-xl">
        This is not a test or a label. It&apos;s a playful way to honor the
        energy you&aposre bringing into your creative universe right now. You
        can change it anytime.
      </p>

      {/* Name */}
      <div className="card">
        <label className="block text-xs font-semibold text-slate-300 mb-2">
          What name do you want to appear in this universe?
        </label>
        <input
          type="text"
          defaultValue={profile.name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="e.g., David, Night Studio, Anonymous Star"
          className="w-full px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-600 text-sm text-slate-100 focus:ring-2 focus:ring-cyan-400 outline-none"
        />
      </div>

      {/* Elements */}
      <div className="space-y-3">
        <p className="text-xs text-slate-400 uppercase tracking-wide">
          Choose your current creative element
        </p>
        <div className="grid md:grid-cols-3 gap-3">
          {elements.map((el) => {
            const isActive = profile.element === el.id;
            const gradient =
              el.id === 'fire'
                ? 'from-orange-500/40 to-rose-500/30'
                : el.id === 'water'
                ? 'from-cyan-500/40 to-sky-500/30'
                : el.id === 'air'
                ? 'from-violet-500/40 to-indigo-500/30'
                : el.id === 'earth'
                ? 'from-emerald-500/40 to-lime-500/30'
                : 'from-amber-400/40 to-fuchsia-500/30';

            return (
              <button
                key={el.id}
                onClick={() => selectElement(el.id)}
                className={`card bg-gradient-to-br ${gradient} text-left cursor-pointer ${
                  isActive
                    ? 'ring-2 ring-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.45)]'
                    : 'opacity-90'
                }`}
              >
                <div className="text-sm font-semibold text-slate-50">
                  {el.label}
                </div>
                <div className="text-[0.75rem] text-slate-200/90 mt-1">
                  {el.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Preview */}
      <div className="card bg-gradient-to-br from-slate-900/90 to-slate-900/40 border-slate-500/60">
        <p className="text-xs text-slate-400 mb-2">Aura preview</p>
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-full shadow-xl"
            style={{
              background: `radial-gradient(circle at 30% 30%, #fefce8, ${profile.color}, transparent)`,
              boxShadow: `0 0 40px ${profile.color}66`
            }}
          />
          <div className="flex flex-col">
            <div className="text-sm font-semibold text-slate-50 flex items-center gap-2">
              <span>{profile.symbol}</span>
              <span>{profile.name}</span>
            </div>
            <div className="text-[0.75rem] text-slate-300 mt-1">
              {profile.tagline}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
