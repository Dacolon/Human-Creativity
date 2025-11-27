"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const REALMS = [
  { href: "/", label: "Constellation" },
  { href: "/flow", label: "Flow" },
  { href: "/practice", label: "Practice" },
  { href: "/archive", label: "Archive" },
  { href: "/inner-studio", label: "Inner Studio" },
  { href: "/journal", label: "Journal" },
  { href: "/market", label: "Market" },
  { href: "/sharing", label: "Sharing" },
  { href: "/community", label: "Community" },
  { href: "/creative-codex", label: "Creative Codex" },
  { href: "/your-aura", label: "Your Aura" },
];

function RealmNavButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname() || "/";
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={[
        "rounded-full px-5 py-2.5 text-sm font-medium tracking-wide transition-all",
        "border border-white/5 shadow-sm",
        "bg-slate-900/60 hover:bg-slate-900/80",
        "backdrop-blur-md",
        active
          ? "ring-2 ring-cyan-300/80 text-cyan-50 shadow-[0_0_40px_rgba(34,211,238,0.5)]"
          : "text-slate-200/85 hover:text-white",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

function CosmicCard({
  title,
  eyebrow,
  children,
  accent = "teal",
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
  accent?: "teal" | "violet";
}) {
  const accentStyles =
    accent === "teal"
      ? "from-cyan-500/20 via-slate-900/95 to-emerald-500/10"
      : "from-fuchsia-500/20 via-slate-900/95 to-violet-500/15";

  return (
    <section
      className={[
        "relative overflow-hidden rounded-3xl border border-white/8",
        "bg-gradient-to-br",
        accentStyles,
        "shadow-[0_30px_80px_rgba(15,23,42,0.95)]",
        "backdrop-blur-2xl px-6 py-6 sm:px-8 sm:py-7",
        "mt-6",
      ].join(" ")}
    >
      <div className="absolute -right-16 -top-24 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -left-10 -bottom-24 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

      <p className="text-[11px] font-semibold tracking-[0.3em] text-sky-200/80 uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-[0.14em] text-slate-50">
        {title}
      </h2>

      <div className="mt-4 text-[15px] leading-relaxed text-slate-100/90">
        {children}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="relative">
      {/* Header */}
      <header className="pb-6">
        <p className="text-[11px] font-semibold tracking-[0.3em] text-sky-100/90 uppercase mb-3">
          COSMIC STUDIO
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-[2.8rem] leading-tight font-semibold tracking-tight text-slate-50">
          Human Creativity
          <br />
          Universe
        </h1>

        <p className="mt-3 max-w-xl text-sm sm:text-[15px] leading-relaxed text-slate-100/90">
          A cosmic operating system for your creative life — mind, body,
          spirit, and practice held together in one living world.
        </p>

        {/* Aura pill */}
        <div className="mt-5 inline-flex items-center rounded-full bg-gradient-to-r from-orange-500 to-rose-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(251,113,133,0.6)]">
          <span className="mr-2 text-lg">🔥</span>
          <span>David Ariel Colon</span>
          <span className="ml-2 text-xs font-normal text-orange-50/90">
            FIRE aura
          </span>
        </div>
      </header>

      {/* Realm nav */}
      <nav className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {REALMS.map((realm) => (
          <RealmNavButton
            key={realm.href}
            href={realm.href}
            label={realm.label}
          />
        ))}
      </nav>

      {/* Cards */}
      <CosmicCard eyebrow="TODAY IN YOUR UNIVERSE" title="Today in your universe">
        <p>
          Pick one tiny action to keep your creative orbit moving. No
          pressure, no perfection — just momentum.
        </p>
        <div className="mt-4 space-y-3 text-sm">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-slate-300/90 uppercase">
              10-minute ritual
            </p>
            <p className="mt-1 text-slate-50/95">
              Put your phone on airplane mode and fill a page with marks:
              circles, lines, dots — no images, just movement.
            </p>
          </div>
        </div>
      </CosmicCard>

      <CosmicCard
        eyebrow="FLOW LAB"
        title="Creative warmup"
        accent="violet"
      >
        <p>Draw 10 circles and turn each into something new.</p>
        <div className="mt-5 flex items-center gap-3 flex-wrap">
          <button
            className="rounded-full bg-gradient-to-r from-fuchsia-500 to-rose-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(217,70,239,0.7)]"
            type="button"
          >
            New warmup
          </button>
          <div className="inline-flex items-center rounded-full border border-white/10 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-100/90">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
            00:00
          </div>
        </div>
      </CosmicCard>
    </main>
  );
}
