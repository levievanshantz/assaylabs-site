import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Assaylabs — Give your product team a memory that doesn't forget",
  description:
    "Assay turns PRDs, strategy docs, research, and decisions into cited claims your AI tools can check against. Local-first, inspectable, built for PMs who ship.",
  openGraph: {
    title: "Assaylabs",
    description: "Give your product team a memory that doesn't forget.",
    url: "https://assaylabs.com",
    siteName: "Assaylabs",
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
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
