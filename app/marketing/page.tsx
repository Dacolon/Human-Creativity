'use client';
import React from 'react';

export default function MarketingPage() {
  return (
    <div className="space-y-6">
      <section className="card p-6">
        <h2 className="text-2xl font-bold mb-3">Marketing & Selling Your Art</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-700/30 p-4 rounded-xl">
            <h4 className="font-semibold text-purple-300 mb-2">What to Post</h4>
            <ul className="list-disc ml-5">
              <li>Work-in-progress shots</li>
              <li>Time-lapse clips</li>
              <li>Studio behind-the-scenes</li>
              <li>Stories behind pieces</li>
            </ul>
          </div>

          <div className="bg-slate-700/30 p-4 rounded-xl">
            <h4 className="font-semibold text-purple-300 mb-2">Posting Rhythm</h4>
            <p>Consistency matters more than frequency — aim for 3–5 posts/week.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
