'use client';

import React, { useState } from 'react';

type Entry = { technique: string; duration: string; date: string };

export default function PracticePage() {
  const [current, setCurrent] = useState({ technique: '', duration: '' });
  const [log, setLog] = useState<Entry[]>([]);

  const add = () => {
    if (!current.technique || !current.duration) return;
    setLog([
      ...log,
      { ...current, date: new Date().toLocaleDateString() }
    ]);
    setCurrent({ technique: '', duration: '' });
  };

  return (
    <div className="space-y-6">
      <section className="card p-6">
        <h2 className="text-2xl font-bold mb-3">Practice Tracker</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="w-full px-4 py-2 rounded-xl bg-slate-800/70 border border-purple-500/30 text-sm"
            placeholder="What are you practicing?"
            value={current.technique}
            onChange={(e) =>
              setCurrent({ ...current, technique: e.target.value })
            }
          />
          <input
            className="w-full px-4 py-2 rounded-xl bg-slate-800/70 border border-purple-500/30 text-sm"
            placeholder="How long? (minutes)"
            value={current.duration}
            onChange={(e) =>
              setCurrent({ ...current, duration: e.target.value })
            }
          />
        </div>
        <button
          onClick={add}
          className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-sm"
        >
          Log session
        </button>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-purple-200">
          Recent sessions
        </h3>
        {log.length === 0 ? (
          <p className="text-xs text-purple-300/80 italic">
            Start by logging one focused practice block.
          </p>
        ) : (
          log
            .slice()
            .reverse()
            .map((e, i) => (
              <div key={i} className="card p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-purple-100">
                      {e.technique}
                    </p>
                    <p className="text-xs text-purple-300">
                      {e.duration} minutes
                    </p>
                  </div>
                  <p className="text-xs text-purple-400">{e.date}</p>
                </div>
              </div>
            ))
        )}
      </section>
    </div>
  );
}
