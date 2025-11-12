'use client';
import React from 'react';

const questions = [
  'What draws your eye first?',
  'What feeling does this evoke?',
  'What technique are you curious about?',
  'How does this relate to your own work?',
  'What would you do differently?'
];

export default function MuseumPage() {
  return (
    <div className="space-y-6">
      <section className="card p-6">
        <h2 className="text-2xl font-bold mb-3">Museum Mode</h2>
        <p className="text-purple-200 mb-4">
          Reflect on art you love. Use these prompts to understand your taste and influences.
        </p>
        <ul className="space-y-3">
          {questions.map((q, i) => (
            <li key={i} className="bg-slate-700/30 p-4 rounded-xl">{q}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
