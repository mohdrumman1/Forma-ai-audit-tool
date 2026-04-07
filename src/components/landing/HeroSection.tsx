"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const FORMA_WEBSITE = process.env.NEXT_PUBLIC_FORMA_AI_WEBSITE_URL ?? "https://formaai.info";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[#0f0f1a]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-brand-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-accent-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-600/10 px-4 py-1.5 text-sm text-brand-300 mb-8">
          <Zap className="h-3.5 w-3.5 text-brand-400" />
          Free AI Opportunity Report — No login required
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
          Find the money your{" "}
          <span
            style={{
              background: "linear-gradient(to right, #a5bdfb, #8098f7, #ff9d32)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            business is leaking
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          In 5 minutes, Forma AI will identify your hidden inefficiencies, quantify
          your financial upside, and reveal exactly where AI can save — and make — you money.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap items-center justify-center gap-8 mb-12 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Instant tailored report
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            No login required
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Download as PDF
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            No obligation
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="xl" variant="accent" className="min-w-[240px]">
            <Link href="/assessment" className="flex items-center gap-2">
              Get My AI Opportunity Report
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="xl" variant="outline" className="min-w-[200px]">
            <a
              href={FORMA_WEBSITE}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Strategy Call
            </a>
          </Button>
        </div>

        {/* Social proof hint */}
        <p className="mt-8 text-sm text-slate-600">
          Forma AI — AI strategy and automation for ambitious businesses
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 animate-bounce">
        <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-slate-600" />
      </div>
    </section>
  );
}
