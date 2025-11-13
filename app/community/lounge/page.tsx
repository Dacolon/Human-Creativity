'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LoungeRoom() {
  const STORAGE_KEY = 'community-lounge-posts';
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

    const newPost = {
      id: Date.now(),
      text: draft.trim(),
      date: new Date().toLocaleString()
    };

    setPosts([newPost, ...posts]);
    setDraft('');
  };

  return (
    <div className="space-y-10">

      <Link href="/community">
        <span className="text-slate-400 text-sm hover:text-slate-200">← Back to Community</span>
      </Link>

      <motion.h1
        className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        The Lounge
      </motion.h1>

      <p className="text-slate-300 text-sm max-w-xl">
        A warm and cosmic space to talk, chill, introduce yourself, and share anything
        floating through your creative universe.
      </p>

      {/* Composer */}
      <div className="space-y-4">
        <textarea
          value={draft}
          onChange={e => setDraft(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full h-28 p-4 rounded-xl bg-slate-800/50 border border-slate-600/40
          text-slate-200 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <button
          onClick={submitPost}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600
          text-white text-sm font-semibold hover:scale-105 transition shadow-lg"
        >
          Share in the Lounge
        </button>
      </div>

      {/* Feed */}
      <div className="space-y-6">
        {posts.map(post => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="card bg-gradient-to-br from-blue-400/10 to-slate-700/10"
          >
            <p className="text-slate-200 text-sm whitespace-pre-line">{post.text}</p>
            <div className="text-slate-400 text-xs mt-3">{post.date}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
