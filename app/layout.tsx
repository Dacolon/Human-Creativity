import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { MainShell } from "./MainShell";

export const metadata: Metadata = {
  title: "Human Creativity Universe",
  description:
    "A cosmic operating system for your creative life — mind, body, spirit, and practice in one living world.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="hc-body">
        <MainShell>{children}</MainShell>
      </body>
    </html>
  );
}
