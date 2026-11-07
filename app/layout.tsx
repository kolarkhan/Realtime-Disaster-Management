import type React from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";

import "@/app/globals.css";
import { Providers } from "@/components/providers";
import { APP_NAME } from "@/lib/constants";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: APP_NAME,
  description: "Production-quality disaster response coordination platform built with Next.js, MongoDB, JWT auth, and Socket.io."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${display.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

