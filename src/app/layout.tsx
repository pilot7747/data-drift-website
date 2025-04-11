import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';
import type { Metadata } from 'next';
import React from 'react';
import { Analytics } from "@vercel/analytics/react";
import { AudioProvider } from '@/lib/AudioContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'Data Drift | Mixing & Mastering Services',
  description: 'Professional audio engineering services for mixing, mastering, and music production.',
  keywords: 'mixing, mastering, music production, audio engineering, sound design',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-dark-500">
        <AudioProvider>
          {children}
          <Analytics />
        </AudioProvider>
      </body>
    </html>
  );
} 