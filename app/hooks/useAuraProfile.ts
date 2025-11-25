'use client';

import { useEffect, useState } from 'react';

export type AuraElement = 'fire' | 'water' | 'air' | 'earth' | 'ether';

export type AuraProfile = {
  name: string;
  element: AuraElement;
  color: string;
  symbol: string;
  tagline: string;
};

const STORAGE_KEY = 'aura-profile';

function getDefaults(): AuraProfile {
  const elements: AuraElement[] = ['fire', 'water', 'air', 'earth', 'ether'];
  const element = elements[Math.floor(Math.random() * elements.length)];

  return {
    name: 'Anonymous Star',
    element,
    ...getElementVisuals(element)
  };
}

function getElementVisuals(element: AuraElement) {
  switch (element) {
    case 'fire':
      return {
        color: '#f97316',
        symbol: '🔥',
        tagline: 'Bold, intense, transformative creative energy.'
      };
    case 'water':
      return {
        color: '#22d3ee',
        symbol: '🌊',
        tagline: 'Fluid, intuitive, emotionally rich creativity.'
      };
    case 'air':
      return {
        color: '#a855f7',
        symbol: '🌬️',
        tagline: 'Light, conceptual, idea-driven imagination.'
      };
    case 'earth':
      return {
        color: '#22c55e',
        symbol: '🌿',
        tagline: 'Grounded, patient, craft-focused expression.'
      };
    case 'ether':
    default:
      return {
        color: '#eab308',
        symbol: '✨',
        tagline: 'Mystical, experimental, beyond-category creativity.'
      };
  }
}

export function useAuraProfile() {
  const [profile, setProfile] = useState<AuraProfile | null>(null);

  // Load once
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as AuraProfile;
        setProfile({
          ...parsed,
          ...getElementVisuals(parsed.element)
        });
        return;
      } catch {
        // fall through to defaults
      }
    }

    const defaults = getDefaults();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
    setProfile(defaults);
  }, []);

  const updateProfile = (partial: Partial<AuraProfile>) => {
    if (typeof window === 'undefined') return;
    setProfile((prev) => {
      const base = prev ?? getDefaults();
      const merged = { ...base, ...partial } as AuraProfile;
      const withVisuals = {
        ...merged,
        ...getElementVisuals(merged.element)
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(withVisuals));
      return withVisuals;
    });
  };

  return { profile, updateProfile };
                                   }
