'use client';

import React, { useEffect, useState } from 'react';
import { Shuffle, Lightbulb, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const warmups = [
  'Draw 10 circles and turn each into something new',
  'Write 3 random words; interpret them visually',
  'Create something intentionally ugly',
  'Draw without lifting your pen for 5 minutes',
  'Make a mini artwork inspired by a sound',
  'Sketch with your non-dominant hand',
  'Use only one color to express an emotion'
];

const fusionConcepts = [
  'Surrealism',
  'Architecture',
  'Nature',
  'Music',
  'Emotion',
  'Minimalism',
  'Sci-Fi',
  'Fantasy',
  'Movement',
  'Stillness'
];

export default function FlowPage() {
  const [currentWarmup, setCurrentWarmup] = useState(warmups[0]);
  const [fusion, setFusion] = useState<[string, string]>([
    fusionConcepts[0],
    fusionConcepts[1]
  ]);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let id: any;
    if (running) {
      id = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(id);
  }, [running]);

  const randomWarmup = () => {
    setCurrentWarmup(
      warmups[Math.floor(Math.random() * warmups.length)]
    );
    setSeconds(0);
    setRunning(true);
  };

  const randomFusion = () => {
    let a = fusionConcepts[Math.floor(Math.random() * fusionConcepts.length)];
    let b = fusionConcepts[Math.floor(Math.random() * fusionConcepts.length)];
    while (a === b) {
      b = fusionConcepts[Math.floor(Math.random() * fusionConcepts.length)];
    }
    setFusion([a, b]);
  };

  const time = `${String(Math.floor(seconds / 60)).padStart(
    2,
    '0'
  )}:${String(seconds % 60).padStart(2, '0')}`;

  return (
    <div className="space-y-8">
      <section className="card p-6 bg-gradient-to-br from-purple-900/40 to-pink-900/40">
        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
          <Shuffle size={18} /> Creative Warmup
        </h2>
        <p className="text-purple-100 mb-4">{currentWarmup}</p>
        <div className="flex items-center gap-4 text-sm">
          <button
            onClick={randomWarmup}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600"
          >
            New warmup
          </button>
          <div className="flex items-center gap-2 text-purple-200">
            <Clock size={16} />
            <span className="font-mono">{time}</span>
          </div>
          {running ? (
            <button
              onClick={() => setRunning(false)}
              className="px-3 py-1 rounded bg-slate-700/50"
            >
              Pause
            </button>
          ) : (
            seconds > 0 && (
              <button
                onClick={() => setRunning(true)}
                className="px-3 py-1 rounded bg-slate-700/50"
              >
                Resume
              </button>
            )
          )}
        </div>
      </section>

      <section className="card p-6 bg-gradient-to-br from-blue-900/40 to-purple-900/40">
        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
          <Lightbulb size={18} /> Fusion Lab
        </h2>
        <p className="text-purple-100 mb-3 text-sm">
          Combine two ideas as a starting point.
        </p>
        <motion.div
          className="bg-slate-800/60 rounded-xl p-4 text-center text-purple-100 font-semibold"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 0.6 }}
        >
          {fusion[0]} × {fusion[1]}
        </motion.div>
        <button
          onClick={randomFusion}
          className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-sm"
        >
          New fusion
        </button>
      </section>
    </div>
  );
}
