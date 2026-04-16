// ============================================================
// Forma AI | Submission Database Helpers
// ============================================================

import { prisma } from "./client";
import type { FullAssessmentInput } from "@/lib/schemas";
import type { GeneratedReport } from "@/types/report";

export async function createSubmission(
  assessment: FullAssessmentInput,
  contactName?: string,
  contactEmail?: string,
  ipAddress?: string,
  userAgent?: string
): Promise<string> {
  const submission = await prisma.submission.create({
    data: {
      businessName: assessment.businessName,
      industry: assessment.industry,
      businessType: assessment.businessType,
      assessmentData: assessment as object,
      reportStatus: "PENDING",
      contactName: contactName ?? null,
      contactEmail: contactEmail ?? null,
      ipAddress,
      userAgent,
    },
  });
  return submission.id;
}

export async function countRecentSubmissions(ipAddress: string): Promise<number> {
  return prisma.submission.count({
    where: {
      ipAddress,
      createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    },
  });
}

export async function updateSubmissionWithReport(
  submissionId: string,
  report: GeneratedReport,
  modelUsed: string,
  promptVersion: string
): Promise<void> {
  await prisma.submission.update({
    where: { id: submissionId },
    data: {
      reportData: report as object,
      reportStatus: "COMPLETE",
      modelUsed,
      promptVersion,
    },
  });
}

export async function markSubmissionFailed(submissionId: string): Promise<void> {
  await prisma.submission.update({
    where: { id: submissionId },
    data: { reportStatus: "FAILED" },
  });
}

export async function updateLeadCapture(
  submissionId: string,
  contactName: string,
  contactEmail: string
): Promise<void> {
  await prisma.submission.update({
    where: { id: submissionId },
    data: { contactName, contactEmail },
  });
}

export async function getSubmission(submissionId: string) {
  return prisma.submission.findUnique({
    where: { id: submissionId },
  });
}
