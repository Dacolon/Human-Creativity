"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Volume2, VolumeX } from "lucide-react";
import { SoundProvider, useSound } from "./components/SoundEngine";
import { AuraBadge } from "./components/AuraBadge";

const NAV_ITEMS = [
  { label: "Constellation", href: "/" },
  { label: "Flow", href: "/flow" },
  { label: "Practice", href: "/practice" },
  { label: "Archive", href: "/archive" },
  { label: "Inner Studio", href: "/inner-studio" },
  { label: "Journal", href: "/journal" },
  { label: "Market", href: "/market" },
  { label: "Sharing", href: "/sharing" },
  { label: "Community", href: "/community" },
  { label: "Creative Codex", href: "/creative-codex" },
  { label: "Your Aura", href: "/your-aura" },
];

function SoundToggle() {
  const { enabled, toggle } = useSound();

  return (
    <button
      type="button"
      onClick={toggle}
      className="hc-sound-toggle"
      aria-label={enabled ? "Turn sound off" : "Turn sound on"}
    >
      {enabled ? (
        <Volume2 className="hc-sound-icon" />
      ) : (
        <VolumeX className="hc-sound-icon" />
      )}
    </button>
  );
}

export function MainShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <SoundProvider>
      <div className="hc-shell">
        {/* parallax star layers */}
        <div className="hc-stars hc-stars--near" />
        <div className="hc-stars hc-stars--far" />

        <div className="hc-content container mx-auto max-w-4xl px-4 pb-10 pt-8 sm:pt-10">
          {/* HEADER */}
          <header className="hc-header">
            <div className="hc-header-main">
              <div>
                <p className="hc-pill-label">COSMIC STUDIO</p>
                <h1 className="hc-title">
                  HUMAN
                  <br />
                  CREATIVITY
                  <br />
                  UNIVERSE
                </h1>
                <p className="hc-subtitle">
                  A cosmic operating system for your creative life — mind, body,
                  spirit, and practice held together in one living world.
                </p>
              </div>

              <div className="hc-header-right">
                <SoundToggle />
                <AuraBadge />
              </div>
            </div>
          </header>

          {/* NAV */}
          <nav className="hc-nav" aria-label="Realms">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`hc-nav-pill ${
                    isActive ? "hc-nav-pill--active" : ""
                  }`}
                >
                  <span className="hc-nav-pill-label">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* MAIN CONTENT CARD AREA */}
          <main className="hc-main">{children}</main>
        </div>
      </div>
    </SoundProvider>
  );
}
