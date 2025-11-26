'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

type Soundscape = {
  name: string;
  file: string;
};

const defaultSoundscapes: Record<string, Soundscape> = {
  flow: { name: 'Deep Focus Pulse', file: '/sounds/flow.mp3' },
  practice: { name: 'Soft Studio Rustle', file: '/sounds/practice.mp3' },
  museum: { name: 'Archive Silence', file: '/sounds/museum.mp3' },
  wellbeing: { name: 'Breathing Light', file: '/sounds/wellbeing.mp3' },
  journal: { name: 'Inner Sanctuary', file: '/sounds/journal.mp3' },
  market: { name: 'Soft City Air', file: '/sounds/market.mp3' },
  community: { name: 'Communal Glow', file: '/sounds/community.mp3' },
  codex: { name: 'Ancient Pages', file: '/sounds/codex.mp3' }
};

type SoundContextType = {
  playing: boolean;
  volume: number;
  current: string | null;
  play: (id: string) => void;
  stop: () => void;
  setVolume: (v: number) => void;
};

const SoundContext = createContext<SoundContextType | null>(null);

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.4);
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedVol = window.localStorage.getItem('sound-volume');
    if (savedVol) setVolumeState(parseFloat(savedVol));
  }, []);

  const setVolume = (v: number) => {
    setVolumeState(v);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('sound-volume', v.toString());
    }
    if (audioRef.current) audioRef.current.volume = v;
  };

  const play = (id: string) => {
    const sound = defaultSoundscapes[id];
    if (!sound) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(sound.file);

    audio.loop = true;
    audio.volume = volume;

    audio.play();

    audioRef.current = audio;
    setPlaying(true);
    setCurrent(id);
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlaying(false);
    setCurrent(null);
  };

  return (
    <SoundContext.Provider value={{ playing, volume, current, play, stop, setVolume }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error('useSound must be inside SoundProvider');
  return ctx;
};
