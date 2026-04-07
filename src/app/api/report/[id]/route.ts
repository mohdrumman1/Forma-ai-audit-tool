import { NextRequest, NextResponse } from "next/server";
import { getSubmission } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const submission = await getSubmission(params.id);

    if (!submission) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    if (submission.reportStatus !== "COMPLETE") {
      return NextResponse.json(
        { error: "Report is not ready yet", status: submission.reportStatus },
        { status: 202 }
      );
    }

    return NextResponse.json({
      submissionId: submission.id,
      report: submission.reportData,
      businessName: submission.businessName,
      industry: submission.industry,
      createdAt: submission.createdAt.toISOString(),
    });
  } catch (err) {
    console.error("[GET /api/report/:id]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
