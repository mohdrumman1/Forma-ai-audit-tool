"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const FORMA_WEBSITE = process.env.NEXT_PUBLIC_FORMA_AI_WEBSITE_URL ?? "https://formaai.info";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-brand-900/50">
              F
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">
              Forma <span className="text-brand-400">AI</span>
            </span>
          </Link>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href={FORMA_WEBSITE}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors"
            >
              formaai.info
              <ExternalLink className="h-3 w-3" />
            </Link>
            <Button asChild size="sm" variant="accent">
              <Link href="/assessment">
                Get My Report
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
