import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { SoundProvider } from "./components/SoundEngine";
import MainShell from "./MainShell";

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
      <body>
        <SoundProvider>
          <MainShell>{children}</MainShell>
        </SoundProvider>
      </body>
    </html>
  );
}
