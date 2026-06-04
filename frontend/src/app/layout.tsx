import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { profile } from "@/data/resume";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://infinityagi.vercel.app"),
  title: `${profile.name} — ${profile.title}`,
  description: profile.summary,
  keywords: [
    "DevOps Engineer",
    "Kubernetes",
    "AI Infrastructure",
    "GPU Compute",
    "CI/CD",
    "Helm",
    "vLLM",
    "Anant Kumar",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.tagline,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description: profile.tagline,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
