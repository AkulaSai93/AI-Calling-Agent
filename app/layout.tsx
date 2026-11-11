import type { Metadata } from "next";
import { Inter, Instrument_Serif, Noto_Sans_Devanagari, Noto_Sans_Tamil, Noto_Sans_Telugu } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Indic scripts for the multilingual call demo (not preloaded — only fetched when those glyphs render)
const devanagari = Noto_Sans_Devanagari({ subsets: ["devanagari"], weight: ["400", "500"], variable: "--font-devanagari", preload: false });
const tamil = Noto_Sans_Tamil({ subsets: ["tamil"], weight: ["400", "500"], variable: "--font-tamil", preload: false });
const telugu = Noto_Sans_Telugu({ subsets: ["telugu"], weight: ["400", "500"], variable: "--font-telugu", preload: false });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: "Voxa AI — AI Calling Agents",
  description:
    "Human-like AI calling agents that qualify leads, book meetings and resolve support calls 24/7 in 15+ languages.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${instrumentSerif.variable} ${devanagari.variable} ${tamil.variable} ${telugu.variable}`}>
      <head>
        {/* Hide animated elements before first paint; failsafe reveals them if JS never runs */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document.documentElement;d.classList.add('motion-pending');setTimeout(function(){d.classList.remove('motion-pending')},2500)}",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
