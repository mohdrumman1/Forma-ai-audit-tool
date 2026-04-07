import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forma AI Opportunity Finder — Discover Where AI Can Transform Your Business",
  description:
    "Get a free, instant AI opportunity report for your business. Discover hidden cost leaks, automation opportunities, and potential savings in minutes.",
  keywords: "AI automation, business efficiency, cost savings, AI strategy, Forma AI",
  openGraph: {
    title: "Forma AI Opportunity Finder",
    description:
      "Discover where AI can save your business money — get a free tailored report in minutes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased" style={{ backgroundColor: "#0f0f1a" }}>
        {children}
      </body>
    </html>
  );
}
