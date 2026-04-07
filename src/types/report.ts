// ============================================================
// Forma AI Opportunity Finder — Report Types
// ============================================================

export interface HiddenCostLeak {
  title: string;
  explanation: string;
  likelySource: string;
  financialImpactType: string;
  severity: "critical" | "high" | "medium" | "low";
  suggestedFix: string;
}

export interface AIRecommendation {
  title: string;
  category: string;
  department: string;
  currentProblem: string;
  whyCosting: string;
  recommendedUseCase: string;
  exampleImplementation: string;
  estimatedUpside: string;
  impactScore: number; // 1-10
  easeScore: number; // 1-10
  priorityScore: number; // 1-10
  implementationComplexity: "low" | "medium" | "high";
  whyItMatters: string;
}

export interface QuickWin {
  title: string;
  action: string;
  expectedBenefit: string;
  easeOfImplementation: "very_easy" | "easy" | "moderate";
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  objective: string;
  description: string;
  expectedBusinessValue: string;
  timeframe: string;
}

export interface GeneratedReport {
  executiveSummary: string;
  businessSnapshot: string;
  hiddenCostLeaks: HiddenCostLeak[];
  aiRecommendations: AIRecommendation[];
  quickWins: QuickWin[];
  highLevelRoadmap: RoadmapPhase[];
  totalEstimatedSavings: number;
  estimatedMonthlySavings: number;
  estimatedAnnualValue: number;
  currentMoneyLeaked: number;
  recoverableUpside: number;
  assumptions: string[];
  confidenceNotes: string[];
  nextSteps: string;
}

export interface SubmissionResult {
  submissionId: string;
  report: GeneratedReport;
  createdAt: string;
  businessName: string;
  industry: string;
}
