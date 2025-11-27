"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export type SoundContextType = {
  enabled: boolean;
  toggle: () => void;
  play: (kind?: "tap" | "enter") => void;
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true);

  const toggle = () => setEnabled((v) => !v);

  const play = (kind: "tap" | "enter" = "tap") => {
    // no sound if disabled or not in browser
    if (!enabled) return;
    if (typeof window === "undefined") return;

    const AudioCtx =
      (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.value = kind === "tap" ? 440 : 660;
    gain.gain.value = 0.25;

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  };

  const value: SoundContextType = { enabled, toggle, play };

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

export function useSound(): SoundContextType {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return ctx;
}
