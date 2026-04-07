"use client";

import { ExternalLink, Calendar, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

const FORMA_WEBSITE = process.env.NEXT_PUBLIC_FORMA_AI_WEBSITE_URL ?? "https://formaai.info";

interface ReportCTAProps {
  onDownloadPDF: () => void;
  onPrint: () => void;
}

export function ReportCTA({ onDownloadPDF, onPrint }: ReportCTAProps) {
  return (
    <div className="rounded-2xl border border-brand-500/30 bg-gradient-to-br from-brand-900/40 to-brand-800/10 p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left text */}
          <div>
            <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Ready to Take Action?
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
              Turn this report into real results with Forma AI
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              This report identifies your opportunities. Forma AI helps you implement them.
              Book a free strategy call to discuss your specific situation and create a
              practical roadmap for AI adoption in your business.
            </p>
            <p className="text-sm text-slate-500">
              No obligation. No hard sell. Just a genuine conversation about your AI opportunity.
            </p>
          </div>

          {/* Right CTAs */}
          <div className="space-y-3">
            <Button
              asChild
              size="xl"
              variant="accent"
              className="w-full"
            >
              <a
                href={FORMA_WEBSITE}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <Calendar className="h-5 w-5" />
                Book a Free Strategy Call
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                size="lg"
                variant="outline"
                onClick={onDownloadPDF}
                className="w-full flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onPrint}
                className="w-full flex items-center gap-2"
              >
                <Printer className="h-4 w-4" />
                Print Report
              </Button>
            </div>

            <p className="text-xs text-center text-slate-600">
              Visit{" "}
              <a
                href={FORMA_WEBSITE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-400 hover:text-brand-300"
              >
                formaai.info
              </a>{" "}
              to learn more about Forma AI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
