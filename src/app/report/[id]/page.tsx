import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSubmission } from "@/lib/db";
import { ReportDashboard } from "@/components/report/ReportDashboard";
import type { GeneratedReport } from "@/types/report";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const submission = await getSubmission(id).catch(() => null);
  if (!submission) return { title: "Report Not Found | Forma AI" };

  return {
    title: `AI Opportunity Report for ${submission.businessName} | Forma AI`,
    description: `Your tailored AI opportunity report from Forma AI. Discover hidden cost savings and automation opportunities for ${submission.businessName}.`,
  };
}

export default async function ReportPage({ params }: PageProps) {
  const { id } = await params;
  const submission = await getSubmission(id).catch(() => null);

  if (!submission || submission.reportStatus !== "COMPLETE" || !submission.reportData) {
    notFound();
  }

  const report = submission.reportData as unknown as GeneratedReport;

  return (
    <ReportDashboard
      report={report}
      submissionId={submission.id}
      businessName={submission.businessName}
      industry={submission.industry}
      createdAt={submission.createdAt.toISOString()}
    />
  );
}
