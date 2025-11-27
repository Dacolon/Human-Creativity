"use client";

import React, { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "./components/SoundEngine";

type MainShellProps = {
  children?: React.ReactNode;
};

const TABS = [
  "Constellation",
  "Flow",
  "Practice",
  "Archive",
  "Inner Studio",
  "Journal",
  "Market",
  "Sharing",
  "Community",
  "Creative Codex",
  "Your Aura",
] as const;

type TabId = (typeof TABS)[number];

function SoundToggle() {
  // Be defensive so TypeScript doesn't complain no matter how SoundEngine is typed
  const sound = useSound() as any;
  const isOn = Boolean(sound?.isOn ?? sound?.enabled ?? sound?.playing);
  const toggle: () => void = sound?.toggle ?? (() => {});

  return (
    <button
      type="button"
      onClick={toggle}
      className="hc-sound-toggle"
      aria-label={isOn ? "Turn sound off" : "Turn sound on"}
    >
      {isOn ? (
        <Volume2 className="h-4 w-4" />
      ) : (
        <VolumeX className="h-4 w-4" />
      )}
    </button>
  );
}

export default function MainShell({ children }: MainShellProps) {
  const [activeTab, setActiveTab] = useState<TabId>("Constellation");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="hc-shell">
      {/* subtle gradient + stars are in globals.css via ::before / ::after */}
      <div className="hc-shell-inner">
        {/* HEADER */}
        <header className="hc-header">
          <div className="hc-header-top">
            <div>
              <p className="hc-eyebrow">Cosmic studio</p>
              <h1 className="hc-title">Human Creativity Universe</h1>
              <p className="hc-subtitle">
                A cosmic operating system for your creative life — mind, body,
                spirit, and practice held together in one living world.
              </p>
            </div>

            <div className="hc-header-right">
              {mounted && <SoundToggle />}
              <div className="hc-aura-pill">
                <span className="hc-aura-emoji">🔥</span>
                <span className="hc-aura-text">
                  <span className="hc-aura-name">David Ariel Colon</span>
                  <span className="hc-aura-meta">FIRE aura</span>
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* NAV TABS (no routing, so no more 404s) */}
        <nav className="hc-nav">
          {TABS.map((tab) => {
            const isActive = tab === activeTab;
            const classes = [
              "hc-pill",
              isActive ? "hc-pill-active" : "hc-pill-idle",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                key={tab}
                type="button"
                className={classes}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            );
          })}
        </nav>

        {/* MAIN CONTENT – same cards for now, just nice visuals */}
        <main className="hc-main">
          {/* Today in your universe */}
          <section className="hc-card hc-card-teal">
            <div className="hc-card-header">
              <div className="hc-card-icon">✶</div>
              <h2 className="hc-card-title">Today in your universe</h2>
            </div>
            <p className="hc-card-body">
              Pick one tiny action to keep your creative orbit moving. No
              pressure, no perfection — just momentum.
            </p>

            <div className="hc-mini-row">
              <div className="hc-mini-label">10-minute ritual</div>
              <p className="hc-mini-text">
                Put your phone on airplane mode and fill a page with marks:
                circles, lines, dots — no images, just movement.
              </p>
            </div>
          </section>

          {/* Creative warmup */}
          <section className="hc-card hc-card-purple">
            <div className="hc-card-header">
              <div className="hc-card-icon">⇄</div>
              <h2 className="hc-card-title">Creative warmup</h2>
            </div>
            <p className="hc-card-body">
              Draw 10 circles and turn each into something new.
            </p>

            <div className="hc-button-row">
              <button type="button" className="hc-primary-button">
                New warmup
              </button>
              <div className="hc-timer-pill">
                <span className="hc-timer-dot" />
                <span className="hc-timer-text">00:00</span>
              </div>
            </div>
          </section>

          {/* Keep any extra children that page.tsx might pass down */}
          {children}
        </main>
      </div>
    </div>
  );
}
