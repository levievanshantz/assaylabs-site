import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AssayLabs — Decision context for AI-accelerated teams",
  description:
    "Assay keeps track of what your team decided, why, what changed, and what still holds, so work that ships at AI speed stays coherent. Local-first, inside Claude Code. Early prototype.",
  openGraph: {
    title: "AssayLabs",
    description:
      "Decision context for AI-accelerated teams. Search retrieves artifacts; Assay resolves decision state.",
    url: "https://assaylabs.com",
    siteName: "AssayLabs",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
