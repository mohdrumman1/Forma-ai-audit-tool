import { NextRequest, NextResponse } from "next/server";
import { GenerateReportRequestSchema } from "@/lib/schemas";
import { generateOpportunityReport } from "@/lib/ai";
import {
  createSubmission,
  updateSubmissionWithReport,
  markSubmissionFailed,
} from "@/lib/db";

export const maxDuration = 120; // Allow up to 2 minutes for AI generation

export async function POST(req: NextRequest) {
  let submissionId: string | null = null;

  try {
    // Parse and validate request body
    const body = await req.json();
    const validation = GenerateReportRequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid assessment data",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { assessment } = validation.data;

    // Extract request metadata for analytics
    const ipAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0] ??
      req.headers.get("x-real-ip") ??
      "unknown";
    const userAgent = req.headers.get("user-agent") ?? "unknown";

    // Create submission record in DB (persists even if AI fails)
    submissionId = await createSubmission(assessment, ipAddress, userAgent);

    // Generate report via OpenRouter
    const { report, modelUsed, promptVersion } =
      await generateOpportunityReport(assessment);

    // Store the generated report
    await updateSubmissionWithReport(submissionId, report, modelUsed, promptVersion);

    return NextResponse.json(
      { submissionId, report },
      { status: 200 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error("[POST /api/assess] Error:", message);

    // Mark submission as failed if it was created
    if (submissionId) {
      await markSubmissionFailed(submissionId).catch(() => {});
    }

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
