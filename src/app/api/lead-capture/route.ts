import { NextRequest, NextResponse } from "next/server";
import { LeadCaptureSchema } from "@/lib/schemas";
import { updateLeadCapture, getSubmission } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = LeadCaptureSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { submissionId, contactName, contactEmail } = validation.data;

    // Verify submission exists
    const submission = await getSubmission(submissionId);
    if (!submission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    await updateLeadCapture(submissionId, contactName, contactEmail);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[POST /api/lead-capture]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
