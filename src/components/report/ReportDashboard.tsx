"use client";

import { useRef, useCallback } from "react";
import type { GeneratedReport } from "@/types/report";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SavingsSummary } from "./SavingsSummary";
import { RecommendationCard } from "./RecommendationCard";
import { CostLeakCard } from "./CostLeakCard";
import { QuickWinsList } from "./QuickWinsList";
import { RoadmapTimeline } from "./RoadmapTimeline";
import { ReportCTA } from "./ReportCTA";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { Badge } from "@/components/ui/badge";
import { ProseText } from "./ProseText";
import { Info, FileText, Calendar, ExternalLink } from "lucide-react";
import { format } from "date-fns";

interface ReportDashboardProps {
  report: GeneratedReport;
  submissionId: string;
  businessName: string;
  industry: string;
  createdAt: string;
}

export function ReportDashboard({
  report,
  submissionId,
  businessName,
  industry,
  createdAt,
}: ReportDashboardProps) {
  const reportRef = useRef<HTMLDivElement>(null);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleDownloadPDF = useCallback(async () => {
    // Dynamically import to avoid SSR issues
    const { generatePDF } = await import("@/lib/pdf/generatePdf");
    await generatePDF(report, businessName, industry);
  }, [report, businessName, industry]);

  const formattedDate = format(new Date(createdAt), "d MMMM yyyy");

  return (
    <>
      <Navbar />

      {/* Print-only header */}
      <div className="hidden print:block print:p-8 print:bg-white print:text-black">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Forma AI | Opportunity Report</h1>
            <p className="text-gray-500 text-sm">{businessName} · {industry} · {formattedDate}</p>
          </div>
          <div className="text-sm text-gray-400">formaai.info</div>
        </div>
        <div className="h-px bg-gray-200 mb-8" />
      </div>

      <main ref={reportRef} className="pt-24 pb-16 no-print:pt-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Report header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FileText className="h-4 w-4 text-brand-400" />
                <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest">
                  AI Opportunity Report
                </p>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                {businessName}
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <Badge variant="default">{industry}</Badge>
                <span className="text-slate-500 text-sm">{formattedDate}</span>
              </div>
            </div>
          </div>

          {/* Top help banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-brand-500/25 bg-brand-900/20 px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-white">Want help implementing any of this?</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Forma AI can assist with any of the services outlined in this report — from quick automations to full AI strategy.
              </p>
            </div>
            <a
              href={process.env.NEXT_PUBLIC_FORMA_AI_WEBSITE_URL ?? "https://formaai.info"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 shrink-0 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold px-4 py-2 transition-colors"
            >
              <Calendar className="h-4 w-4" />
              Book a free call
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Executive Summary */}
          <Section title="Executive Summary">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <ProseText text={report.executiveSummary} className="text-slate-300 leading-relaxed text-base" />
            </div>
            <div className="mt-4 rounded-xl border border-white/5 bg-white/3 p-4">
              <ProseText text={report.businessSnapshot} className="text-slate-400 text-sm leading-relaxed" />
            </div>
          </Section>

          {/* Savings Summary */}
          <Section title="Financial Opportunity Summary">
            <SavingsSummary
              totalEstimatedSavings={report.totalEstimatedSavings}
              estimatedMonthlySavings={report.estimatedMonthlySavings}
              estimatedAnnualValue={report.estimatedAnnualValue}
              currentMoneyLeaked={report.currentMoneyLeaked}
              recoverableUpside={report.recoverableUpside}
            />
          </Section>

          {/* Hidden Cost Leaks */}
          <Section
            title="Hidden Cost Leaks"
            subtitle="Where your business is currently losing money or leaving value on the table"
          >
            <div className="space-y-4">
              {report.hiddenCostLeaks.map((leak, i) => (
                <CostLeakCard key={i} leak={leak} />
              ))}
            </div>
          </Section>

          {/* AI Recommendations */}
          <Section
            title="AI Recommendations"
            subtitle="Prioritised opportunities ranked by impact, ease, and commercial upside"
          >
            <div className="space-y-4">
              {report.aiRecommendations.map((rec, i) => (
                <RecommendationCard key={i} recommendation={rec} index={i} />
              ))}
            </div>
          </Section>

          {/* Quick Wins */}
          <Section
            title="Quick Wins"
            subtitle="Actions you can take within the next 30 days with immediate impact"
          >
            <QuickWinsList quickWins={report.quickWins} />
          </Section>

          {/* Roadmap */}
          <Section
            title="High-Level Implementation Roadmap"
            subtitle="A phased approach to building AI capability in your business"
          >
            <RoadmapTimeline phases={report.highLevelRoadmap} />
          </Section>

          {/* CTA */}
          <ReportCTA onDownloadPDF={handleDownloadPDF} onPrint={handlePrint} />

          {/* Lead capture */}
          <LeadCaptureForm submissionId={submissionId} />

          {/* Assumptions & Notes */}
          <Section
            title="Assumptions & Methodology"
            subtitle="Transparency about how these estimates were generated"
          >
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-brand-600/10 border border-brand-500/20">
                <Info className="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400">
                  This report is provided as a no-obligation diagnostic from Forma AI. Figures represent
                  directional estimates based on industry benchmarks and the information provided. Actual
                  results will vary based on implementation quality, business specifics, and market conditions.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Key Assumptions</h4>
                <ul className="space-y-1">
                  {report.assumptions.map((assumption, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                      <span className="text-brand-500 shrink-0 mt-0.5">•</span>
                      <ProseText text={assumption} />
                    </li>
                  ))}
                </ul>
              </div>
              {report.confidenceNotes.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Confidence Notes</h4>
                  <ul className="space-y-1">
                    {report.confidenceNotes.map((note, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                        <span className="text-slate-500 shrink-0">ℹ</span>
                        <ProseText text={note} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="pt-3 border-t border-white/5">
                <h4 className="text-sm font-semibold text-white mb-2">Recommended Next Steps</h4>
                <ProseText text={report.nextSteps} className="text-slate-400 text-sm" />
              </div>
            </div>
          </Section>

        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
