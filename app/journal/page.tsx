'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

type Mood = 'calm' | 'inspired' | 'anxious' | 'grateful' | 'tired' | 'electric';

type JournalEntry = {
  id: number;
  date: string;
  mood: Mood | null;
  text: string;
  prompt: string | null;
};

const STORAGE_KEY = 'inner-journal-entries';
const PIN_KEY = 'inner-journal-pin';

const prompts = [
  'What does your creative self need to hear tonight?',
  'Describe one small moment today that felt alive.',
  'What are you afraid to create — and why?',
  'If you could make something with zero judgment, what would it be?',
  'How has your past shaped the way you show up creatively now?',
  'What is one tiny creative action you can take in the next 24 hours?',
  'What emotion wants to move through you right now?',
  'If your art could speak, what would it tell you today?'
];

const moodLabels: Record<Mood, string> = {
  calm: 'Calm',
  inspired: 'Inspired',
  anxious: 'Anxious',
  grateful: 'Grateful',
  tired: 'Tired',
  electric: 'Electric'
};

const moodColors: Record<Mood, string> = {
  calm: 'from-sky-400/40 to-blue-500/30',
  inspired: 'from-amber-400/40 to-orange-500/30',
  anxious: 'from-rose-400/40 to-red-500/30',
  grateful: 'from-emerald-400/40 to-green-500/30',
  tired: 'from-slate-400/40 to-slate-600/40',
  electric: 'from-fuchsia-400/40 to-violet-500/30'
};

function randomPrompt() {
  return prompts[Math.floor(Math.random() * prompts.length)];
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [draft, setDraft] = useState('');
  const [mood, setMood] = useState<Mood | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<string>(() => randomPrompt());

  const [pinSet, setPinSet] = useState(false);
  const [locked, setLocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [newPin, setNewPin] = useState('');
  const [newPinConfirm, setNewPinConfirm] = useState('');
  const [pinError, setPinError] = useState('');

  // Load on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedEntries = window.localStorage.getItem(STORAGE_KEY);
    if (savedEntries) {
      try {
        setEntries(JSON.parse(savedEntries));
      } catch {
        // ignore parse error
      }
    }

    const savedPin = window.localStorage.getItem(PIN_KEY);
    if (savedPin) {
      setPinSet(true);
      setLocked(true);
    }
  }, []);

  // Save entries
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const shufflePrompt = () => {
    setCurrentPrompt(randomPrompt());
  };

  const saveEntry = () => {
    if (!draft.trim()) return;

    const entry: JournalEntry = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      mood,
      text: draft.trim(),
      prompt: currentPrompt || null
    };

    setEntries([entry, ...entries]);
    setDraft('');
    setMood(null);
    setCurrentPrompt(randomPrompt());
  };

  const sortedEntries = useMemo(
    () => [...entries].sort((a, b) => b.id - a.id),
    [entries]
  );

  // PIN logic (soft privacy, device only)
  const setPin = () => {
    setPinError('');
    if (newPin.length < 4) {
      setPinError('PIN should be at least 4 digits/characters.');
      return;
    }
    if (newPin !== newPinConfirm) {
      setPinError('PIN and confirmation do not match.');
      return;
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(PIN_KEY, newPin);
    }
    setPinSet(true);
    setLocked(false);
    setNewPin('');
    setNewPinConfirm('');
  };

  const unlock = () => {
    setPinError('');
    if (typeof window === 'undefined') return;
    const savedPin = window.localStorage.getItem(PIN_KEY);
    if (!savedPin) {
      setLocked(false);
      setPinSet(false);
      return;
    }
    if (pinInput === savedPin) {
      setLocked(false);
      setPinInput('');
    } else {
      setPinError('Incorrect PIN. Try again.');
    }
  };

  return (
    <div className="space-y-8">
      <motion.h1
        className="text-3xl font-bold header-accent"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Inner Journal Studio
      </motion.h1>

      <p className="text-slate-300 text-sm max-w-xl">
        This is your private sanctuary inside the universe. Entries stay on this
        device only. You can add an optional PIN lock for privacy. This is not
        strong encryption — just a protective boundary for your space.
      </p>

      {/* Lock / Unlock card */}
      <div className="card bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-slate-600/60">
        {!pinSet ? (
          <div className="space-y-3 text-sm">
            <p className="text-slate-200 font-semibold">Optional PIN Lock</p>
            <p className="text-slate-400 text-xs">
              Set a PIN to add an extra layer of privacy on this device. It won&apos;t be
              synced or stored on any server.
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <input
                type="password"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                placeholder="Choose a PIN"
                className="px-3 py-2 rounded-lg bg-slate-900/70 border border-slate-600 text-slate-100 text-xs focus:ring-2 focus:ring-cyan-400 outline-none"
              />
              <input
                type="password"
                value={newPinConfirm}
                onChange={(e) => setNewPinConfirm(e.target.value)}
                placeholder="Confirm PIN"
                className="px-3 py-2 rounded-lg bg-slate-900/70 border border-slate-600 text-slate-100 text-xs focus:ring-2 focus:ring-cyan-400 outline-none"
              />
            </div>
            {pinError && (
              <p className="text-xs text-rose-300">{pinError}</p>
            )}
            <button
              onClick={setPin}
              className="mt-1 inline-flex px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-xs font-semibold hover:scale-105 transition"
            >
              Set PIN (optional)
            </button>
          </div>
        ) : locked ? (
          <div className="space-y-3 text-sm">
            <p className="text-slate-200 font-semibold">Journal Locked</p>
            <p className="text-slate-400 text-xs">
              Enter your PIN to unlock your Inner Journal on this device.
            </p>
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="Enter PIN"
              className="px-3 py-2 rounded-lg bg-slate-900/70 border border-slate-600 text-slate-100 text-xs focus:ring-2 focus:ring-cyan-400 outline-none"
            />
            {pinError && (
              <p className="text-xs text-rose-300">{pinError}</p>
            )}
            <button
              onClick={unlock}
              className="mt-1 inline-flex px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-semibold hover:scale-105 transition"
            >
              Unlock Journal
            </button>
          </div>
        ) : (
          <div className="space-y-2 text-xs text-slate-400">
            <p className="text-slate-200 font-semibold text-sm">
              Journal Unlocked
            </p>
            <p>
              Your Inner Journal is unlocked on this device. You can clear your browser
              storage to wipe entries if needed.
            </p>
          </div>
        )}
      </div>

      {/* If locked, do not show entries or compose */}
      {locked ? (
        <p className="text-slate-400 text-xs italic">
          Unlock your journal above to view or write entries.
        </p>
      ) : (
        <>
          {/* Composer */}
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-6">
            <div className="card">
              <p className="text-xs text-slate-400 mb-1">Today&apos;s prompt</p>
              <p className="text-sm text-amber-100 mb-3">{currentPrompt}</p>
              <button
                onClick={shufflePrompt}
                className="text-[0.7rem] px-3 py-1 rounded-full border border-slate-600 text-slate-200 hover:border-cyan-400 hover:text-cyan-200 transition"
              >
                New prompt
              </button>

              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Write freely. This is only for you."
                className="mt-4 w-full h-40 rounded-xl bg-slate-900/80 border border-slate-600 text-slate-100 text-sm p-3 focus:ring-2 focus:ring-cyan-400 outline-none"
              />
              <button
                onClick={saveEntry}
                className="mt-4 inline-flex px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold hover:scale-105 transition"
              >
                Save Entry
              </button>
            </div>

            {/* Mood selector */}
            <div className="card">
              <p className="text-xs text-slate-400 mb-2">
                Optional: Tag today&apos;s emotional weather
              </p>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(moodLabels) as Mood[]).map((m) => {
                  const active = mood === m;
                  return (
                    <button
                      key={m}
                      onClick={() => setMood(m === mood ? null : m)}
                      className={`text-xs px-3 py-2 rounded-xl bg-gradient-to-r ${
                        moodColors[m]
                      } border border-slate-600/70 text-slate-50 text-left ${
                        active ? 'ring-2 ring-cyan-300' : 'opacity-90'
                      }`}
                    >
                      {moodLabels[m]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Entries */}
          <div className="space-y-3 mt-6">
            <p className="text-xs text-slate-400 uppercase tracking-wide">
              Your past entries
            </p>
            {sortedEntries.length === 0 ? (
              <p className="text-slate-400 text-sm italic">
                No entries yet. Your first page is waiting for ink.
              </p>
            ) : (
              sortedEntries.map((entry) => (
                <motion.div
                  key={entry.id}
                  className="card bg-gradient-to-br from-slate-900/90 to-slate-900/60"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-between text-[0.7rem] text-slate-400 mb-1">
                    <span>{entry.date}</span>
                    {entry.mood && (
                      <span className="text-slate-200/90">
                        {moodLabels[entry.mood]}
                      </span>
                    )}
                  </div>
                  {entry.prompt && (
                    <p className="text-[0.7rem] text-amber-200/90 mb-2">
                      Prompt: {entry.prompt}
                    </p>
                  )}
                  <p className="text-sm text-slate-100 whitespace-pre-line">
                    {entry.text}
                  </p>
                </motion.div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
