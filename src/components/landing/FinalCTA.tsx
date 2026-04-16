import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const FORMA_WEBSITE = process.env.NEXT_PUBLIC_FORMA_AI_WEBSITE_URL ?? "https://formaai.info";

export function FinalCTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-900/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-4">
          Ready to Find Your Upside?
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Get your free AI opportunity report now
        </h2>
        <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto">
          5 minutes. No login. No credit card. Just a tailored, consultant-grade
          analysis of where AI can transform your business, instantly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="xl" variant="accent" className="min-w-[260px]">
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
              className="flex items-center gap-2"
            >
              Book a Strategy Call
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <p className="mt-8 text-sm text-slate-600">
          Forma AI | AI strategy and automation for ambitious businesses
        </p>
      </div>
    </section>
  );
}
