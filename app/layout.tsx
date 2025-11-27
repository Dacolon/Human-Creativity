import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { SoundProvider } from "./components/SoundEngine";

export const metadata: Metadata = {
  title: "Human Creativity Universe",
  description:
    "A cosmic operating system for your creative life — mind, body, spirit, and practice held together in one living world.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        <SoundProvider>
          <div className="min-h-screen flex justify-center items-stretch">
            <div className="relative w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
              {/* Soft cosmic gradients */}
              <div className="pointer-events-none absolute inset-[-30%] -z-20 bg-[radial-gradient(circle_at_top_left,_rgba(45,212,191,0.55),transparent_60%),radial-gradient(circle_at_bottom_right,_rgba(251,146,60,0.45),transparent_60%)]" />
              {/* Dark space vignette */}
              <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(15,23,42,0.5),rgba(2,6,23,1))]" />
              {/* Star dust */}
              <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(148,163,184,0.16),transparent_60%)] mix-blend-screen opacity-80" />
              {children}
            </div>
          </div>
        </SoundProvider>
      </body>
    </html>
  );
            }
