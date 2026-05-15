import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const display = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "DNA Secure — Imaging encryption",
  description:
    "Encrypt and decrypt medical imaging with chaos-based DNA encoding. Connected to the DNASecure API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${sans.variable} ${mono.variable} min-h-screen bg-[#05080a] text-[#e8f4f0] antialiased`}
      >
        <SiteNav />
        <main className="relative z-0 mx-auto min-h-[calc(100vh-3.5rem)] max-w-6xl px-4 py-8 text-[#e8f4f0] sm:px-6">
          {children}
        </main>
        <SiteFooter />
        <Toaster richColors position="top-center" theme="dark" />
      </body>
    </html>
  );
}
