'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const topics = [
  { label: 'Daily Creations', color: 'from-cyan-400 to-blue-500' },
  { label: 'Art Feedback', color: 'from-fuchsia-400 to-purple-500' },
  { label: 'Ideas & Brainstorms', color: 'from-amber-400 to-orange-500' },
  { label: 'Inspiration Drops', color: 'from-emerald-400 to-green-500' },
  { label: 'Emotional Support', color: 'from-rose-400 to-red-500' },
  { label: 'Work-in-Progress', color: 'from-indigo-400 to-indigo-600' },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState([]);
  const [draft, setDraft] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  // Load posts from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('community-posts');
    if (saved) setPosts(JSON.parse(saved));
  }, []);

  // Save posts to localStorage
  useEffect(() => {
    localStorage.setItem('community-posts', JSON.stringify(posts));
  }, [posts]);

  const submitPost = () => {
    if (!draft.trim() || !selectedTopic) return;

    const newPost = {
      id: Date.now(),
      text: draft.trim(),
      topic: selectedTopic,
      date: new Date().toLocaleString(),
    };

    setPosts([newPost, ...posts]);
    setDraft('');
  };

  return (
    <div className="space-y-10">

      {/* Header */}
      <motion.h1
        className="text-4xl font-bold header-accent"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Community Constellation
      </motion.h1>

      <motion.p
        className="text-slate-300 text-sm max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        A living galaxy of artists. Share your thoughts, creations, emotions,
        struggles, and inspirations. This is a safe cosmic space for humans
        making things that matter.
      </motion.p>

      {/* Topic Nodes */}
      <div className="flex flex-wrap gap-3">
        {topics.map((t, i) => (
          <motion.button
            key={t.label}
            onClick={() => setSelectedTopic(t.label)}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.1 + i * 0.05 },
            }}
            className={`px-4 py-2 text-sm rounded-full bg-gradient-to-r ${t.color} 
            text-white shadow-lg hover:scale-105 transition cursor-pointer
            ${selectedTopic === t.label ? 'ring-2 ring-white' : ''}`}
          >
            {t.label}
          </motion.button>
        ))}
      </div>

      {/* Post Composer */}
      <div className="space-y-4 mt-6">
        <textarea
          value={draft}
          onChange={e => setDraft(e.target.value)}
          placeholder="Share something with the constellation..."
          className="w-full h-28 p-4 rounded-xl bg-slate-800/50 border border-slate-600/40
          text-slate-200 text-sm focus:ring-2 focus:ring-cyan-400 outline-none"
        />

        <button
          onClick={submitPost}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 
          rounded-xl text-white text-sm font-semibold hover:scale-105 transition shadow-lg"
        >
          Send to the Constellation
        </button>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6 mt-10">
        {posts.length === 0 ? (
          <p className="text-slate-400 text-sm italic">
            No messages yet. Be the first star to speak.
          </p>
        ) : (
          posts.map(post => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="card bg-gradient-to-br from-blue-400/10 to-slate-700/10"
            >
              <div className="text-cyan-300 text-xs font-semibold">
                {post.topic}
              </div>
              <p className="text-slate-200 text-sm mt-2 whitespace-pre-line">
                {post.text}
              </p>
              <div className="text-slate-400 text-xs mt-3">{post.date}</div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
