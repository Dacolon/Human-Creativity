// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Oxanium } from "next/font/google";
import React from "react";

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-oxanium",
});

export const metadata: Metadata = {
  title: "Human Creativity Universe",
  description:
    "A cosmic operating system for your creative life — mind, body, spirit, and practice held together in one living world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oxanium.className} bg-slate-950 text-slate-50 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
