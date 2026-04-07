import { z } from "zod";

// ============================================================
// Assessment Zod Schemas
// ============================================================

export const AssessmentStep1Schema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  industry: z.string().min(2, "Please enter your industry"),
  businessType: z.enum([
    "service_based",
    "product_based",
    "saas",
    "ecommerce",
    "professional_services",
    "healthcare",
    "legal",
    "finance",
    "real_estate",
    "construction",
    "education",
    "hospitality",
    "other",
  ]),
  teamSize: z.enum(["solo", "2-5", "6-15", "16-50", "51-200", "200+"]),
  monthlyRevenue: z.enum([
    "under_10k",
    "10k_50k",
    "50k_150k",
    "150k_500k",
    "500k_1m",
    "over_1m",
  ]),
  staffCount: z.number().min(1).max(10000),
});

export const AssessmentStep2Schema = z.object({
  currentTools: z.array(z.string()).min(0),
  customToolsNote: z.string().optional().default(""),
});

export const AssessmentStep3Schema = z.object({
  leadSources: z.array(z.string()).min(1, "Please select at least one lead source"),
  followUpProcess: z.string().min(10, "Please describe your follow-up process"),
  salesProcess: z.string().min(10, "Please describe your sales process"),
  quotingProcess: z.string().optional().default(""),
});

export const AssessmentStep4Schema = z.object({
  customerSupportProcess: z.string().optional().default(""),
  onboardingProcess: z.string().optional().default(""),
  appointmentBookingProcess: z.string().optional().default(""),
  invoicingProcess: z.string().optional().default(""),
  internalReportingProcess: z.string().optional().default(""),
});

export const AssessmentStep5Schema = z.object({
  adminTasks: z.string().min(10, "Please describe your main admin tasks"),
  biggestBottlenecks: z.string().min(10, "Please describe your biggest bottlenecks"),
  timeConsumingTasks: z.string().min(10, "Please describe time-consuming tasks"),
  errorProneTasks: z.string().optional().default(""),
  moneyLeakageAreas: z.string().optional().default(""),
});

export const AssessmentStep6Schema = z.object({
  growthGoals: z.string().min(10, "Please describe your growth goals"),
  currentAIUsage: z.enum(["none", "minimal", "moderate", "advanced"]),
  aiToolsUsed: z.string().optional().default(""),
  additionalContext: z.string().optional().default(""),
});

export const FullAssessmentSchema = AssessmentStep1Schema.merge(AssessmentStep2Schema)
  .merge(AssessmentStep3Schema)
  .merge(AssessmentStep4Schema)
  .merge(AssessmentStep5Schema)
  .merge(AssessmentStep6Schema);

export type FullAssessmentInput = z.infer<typeof FullAssessmentSchema>;

// ============================================================
// Report Zod Schema (validates AI output)
// ============================================================

const HiddenCostLeakSchema = z.object({
  title: z.string(),
  explanation: z.string(),
  likelySource: z.string(),
  financialImpactType: z.string(),
  severity: z.enum(["critical", "high", "medium", "low"]),
  suggestedFix: z.string(),
});

const AIRecommendationSchema = z.object({
  title: z.string(),
  category: z.string(),
  department: z.string(),
  currentProblem: z.string(),
  whyCosting: z.string(),
  recommendedUseCase: z.string(),
  exampleImplementation: z.string(),
  estimatedUpside: z.string(),
  impactScore: z.number().min(1).max(10),
  easeScore: z.number().min(1).max(10),
  priorityScore: z.number().min(1).max(10),
  implementationComplexity: z.enum(["low", "medium", "high"]),
  whyItMatters: z.string(),
});

const QuickWinSchema = z.object({
  title: z.string(),
  action: z.string(),
  expectedBenefit: z.string(),
  easeOfImplementation: z.enum(["very_easy", "easy", "moderate"]),
});

const RoadmapPhaseSchema = z.object({
  phase: z.number(),
  title: z.string(),
  objective: z.string(),
  description: z.string(),
  expectedBusinessValue: z.string(),
  timeframe: z.string(),
});

export const GeneratedReportSchema = z.object({
  executiveSummary: z.string(),
  businessSnapshot: z.string(),
  hiddenCostLeaks: z.array(HiddenCostLeakSchema).min(2),
  aiRecommendations: z.array(AIRecommendationSchema).min(3),
  quickWins: z.array(QuickWinSchema).min(2),
  highLevelRoadmap: z.array(RoadmapPhaseSchema).min(2),
  totalEstimatedSavings: z.number().positive(),
  estimatedMonthlySavings: z.number().positive(),
  estimatedAnnualValue: z.number().positive(),
  currentMoneyLeaked: z.number().positive(),
  recoverableUpside: z.number().positive(),
  assumptions: z.array(z.string()).min(2),
  confidenceNotes: z.array(z.string()).min(1),
  nextSteps: z.string(),
});

export type GeneratedReportInput = z.infer<typeof GeneratedReportSchema>;

// ============================================================
// API Schemas
// ============================================================

export const GenerateReportRequestSchema = z.object({
  assessment: FullAssessmentSchema,
});

export const LeadCaptureSchema = z.object({
  submissionId: z.string().min(1),
  contactName: z.string().min(2, "Please enter your full name"),
  contactEmail: z.string().email("Please enter a valid email address"),
});

export type LeadCaptureInput = z.infer<typeof LeadCaptureSchema>;
