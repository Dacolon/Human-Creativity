'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RitualRoom() {
  const STORAGE_KEY = 'community-ritual-posts';
  const [posts, setPosts] = useState([]);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setPosts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const submitPost = () => {
    if (!draft.trim()) return;
    setPosts([{ id: Date.now(), text: draft.trim(), date: new Date().toLocaleString() }, ...posts]);
    setDraft('');
  };

  return (
    <div className="space-y-10">
      <Link href="/community">
        <span className="text-slate-400 text-sm">← Back</span>
      </Link>

      <motion.h1
        className="text-4xl font-bold bg-gradient-to-r from-emerald-300 to-green-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Daily Ritual Room
      </motion.h1>

      <p className="text-slate-300 text-sm max-w-xl">
        Share your intentions, gratitude, micro-achievements, or creative energy
        anchors for the day.
      </p>

      <div className="space-y-4">
        <textarea
          value={draft}
          onChange={e => setDraft(e.target.value)}
          placeholder="Today's ritual, intention, or gratitude?"
          className="w-full h-28 p-4 rounded-xl bg-slate-800/50 border border-green-500/30
          text-slate-200 text-sm focus:ring-2 focus:ring-emerald-400 outline-none"
        />
        <button
          onClick={submitPost}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600
          text-white text-sm font-semibold hover:scale-105 transition"
        >
          Anchor It
        </button>
      </div>

      <div className="space-y-6">
        {posts.map(post => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="card bg-gradient-to-br from-green-400/10 to-slate-700/10"
          >
            <p className="text-slate-200 text-sm whitespace-pre-line">{post.text}</p>
            <div className="text-slate-400 text-xs mt-3">{post.date}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
