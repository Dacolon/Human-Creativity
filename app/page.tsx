'use client';

import React from 'react';
import html2canvas from 'html2canvas';
import { Save } from 'lucide-react';
import { constraints, challenges } from '../data/constants';
import { generateRandomColor } from '../utils/colors';

function pick(seed: number, arr: string[]) {
  return arr[Math.abs(Math.floor(Math.sin(seed) * 10000)) % arr.length];
}

export default function HomePage() {
  const [seed, setSeed] = React.useState<number>(() => Date.now());

  const constraint = pick(seed, constraints);
  const challenge = pick(seed + 1, challenges);
  const palette = [
    generateRandomColor(),
    generateRandomColor(),
    generateRandomColor()
  ];

  const exportPrompt = async () => {
    const el = document.getElementById('daily-prompt');
    if (!el) return;
    const canvas = await html2canvas(el, { scale: 2 });
    const data = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = data;
    a.download = 'daily-prompt.png';
    a.click();
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div id="daily-prompt" className="p-6 rounded-2xl card">
        <h2 className="text-2xl font-bold mb-3">Today&apos;s Creative Prompt</h2>
        <p className="mb-2">
          <strong>Constraint:</strong> {constraint}
        </p>
        <p className="mb-2">
          <strong>Challenge:</strong> {challenge}
        </p>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {palette.map((c, i) => (
            <div
              key={i}
              className="h-16 rounded"
              style={{ background: c }}
            />
          ))}
        </div>
        <div className="mt-4 flex gap-3 text-sm">
          <button
            onClick={exportPrompt}
            className="px-4 py-2 rounded bg-gradient-to-r from-purple-600 to-pink-600 flex items-center gap-2"
          >
            <Save size={16} /> Export as image
          </button>
          <button
            onClick={() => setSeed(Date.now())}
            className="px-4 py-2 rounded bg-slate-700/40"
          >
            New prompt
          </button>
        </div>
      </div>
      <div className="p-6 rounded-2xl card">
        <h3 className="text-xl font-semibold mb-3">How to use this</h3>
        <ul className="list-disc ml-4 text-sm text-purple-100 space-y-1">
          <li>Use the constraint + challenge as a mini ritual.</li>
          <li>Stick to the limits even if it feels uncomfortable.</li>
          <li>When done, explore Flow / Practice for deeper tools.</li>
        </ul>
      </div>
    </div>
  );
}
