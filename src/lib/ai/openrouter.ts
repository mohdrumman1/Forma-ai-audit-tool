// ============================================================
// Forma AI — OpenRouter Service Layer
// Server-side only. Never import from client components.
// ============================================================

import OpenAI from "openai";
import { GeneratedReportSchema } from "@/lib/schemas";
import type { GeneratedReport } from "@/types/report";
import type { FullAssessmentInput } from "@/lib/schemas";
import { SYSTEM_PROMPT, buildAssessmentPrompt, PROMPT_VERSION } from "./prompts";

const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";
const REQUEST_TIMEOUT_MS = 90_000;
const MAX_RETRIES = 2;

function getClient(): OpenAI {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set");
  }
  return new OpenAI({
    apiKey,
    baseURL: OPENROUTER_BASE_URL,
    timeout: REQUEST_TIMEOUT_MS,
    maxRetries: MAX_RETRIES,
    defaultHeaders: {
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "https://formaai.info",
      "X-Title": "Forma AI Opportunity Finder",
    },
  });
}

function getModel(): string {
  return process.env.OPENROUTER_MODEL ?? "google/gemini-2.5-flash";
}

// Sanitise raw JSON string from AI response
function extractJSON(raw: string): string {
  // Strip markdown code fences if present
  const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) return fenceMatch[1].trim();

  // Strip leading/trailing non-JSON characters
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    return raw.slice(start, end + 1);
  }

  return raw.trim();
}

export interface GenerateReportResult {
  report: GeneratedReport;
  modelUsed: string;
  promptVersion: string;
}

export async function generateOpportunityReport(
  assessment: FullAssessmentInput
): Promise<GenerateReportResult> {
  const client = getClient();
  const model = getModel();

  const userPrompt = buildAssessmentPrompt(assessment);

  let rawContent: string;

  try {
    console.log(`[AI] Generating report with model: ${model}`);

    const completion = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 8000,
    });

    rawContent = completion.choices[0]?.message?.content ?? "";

    if (!rawContent) {
      throw new Error("Empty response from AI model");
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[AI] OpenRouter request failed: ${message}`);
    throw new Error(`AI generation failed: ${message}`);
  }

  // Parse and validate the JSON response
  let parsed: unknown;
  try {
    const cleanJSON = extractJSON(rawContent);
    parsed = JSON.parse(cleanJSON);
  } catch (err) {
    console.error("[AI] Failed to parse JSON response:", rawContent.slice(0, 500));
    throw new Error("AI returned invalid JSON. Please try again.");
  }

  // Validate against our schema
  const result = GeneratedReportSchema.safeParse(parsed);
  if (!result.success) {
    console.error("[AI] Schema validation failed:", result.error.flatten());
    // Attempt partial recovery — if numbers are missing, try to coerce
    const partial = parsed as Record<string, unknown>;
    if (!partial.totalEstimatedSavings && partial.estimatedAnnualValue) {
      partial.totalEstimatedSavings = partial.estimatedAnnualValue;
    }
    if (!partial.estimatedMonthlySavings && partial.totalEstimatedSavings) {
      partial.estimatedMonthlySavings =
        (partial.totalEstimatedSavings as number) / 12;
    }
    const retryResult = GeneratedReportSchema.safeParse(partial);
    if (!retryResult.success) {
      throw new Error(
        `AI report failed validation: ${JSON.stringify(result.error.flatten().fieldErrors)}`
      );
    }
    return {
      report: retryResult.data as GeneratedReport,
      modelUsed: model,
      promptVersion: PROMPT_VERSION,
    };
  }

  return {
    report: result.data as GeneratedReport,
    modelUsed: model,
    promptVersion: PROMPT_VERSION,
  };
}
