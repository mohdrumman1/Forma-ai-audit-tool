// ============================================================
// Forma AI Opportunity Finder | Assessment Types
// ============================================================

export type TeamSize =
  | "solo"
  | "2-5"
  | "6-15"
  | "16-50"
  | "51-200"
  | "200+";

export type MonthlyRevenue =
  | "under_10k"
  | "10k_50k"
  | "50k_150k"
  | "150k_500k"
  | "500k_1m"
  | "over_1m";

export type BusinessType =
  | "service_based"
  | "product_based"
  | "saas"
  | "ecommerce"
  | "professional_services"
  | "healthcare"
  | "legal"
  | "finance"
  | "real_estate"
  | "construction"
  | "education"
  | "hospitality"
  | "other";

export type AIUsageLevel = "none" | "minimal" | "moderate" | "advanced";

export interface AssessmentData {
  // Step 1: Business basics
  businessName: string;
  industry: string;
  businessType: BusinessType;
  teamSize: TeamSize;
  monthlyRevenue: MonthlyRevenue;
  staffCount: number;

  // Step 2: Tools & operations
  currentTools: string[];
  customToolsNote: string;

  // Step 3: Lead & sales workflow
  leadSources: string[];
  followUpProcess: string;
  salesProcess: string;
  quotingProcess: string;

  // Step 4: Operations & admin
  customerSupportProcess: string;
  onboardingProcess: string;
  appointmentBookingProcess: string;
  invoicingProcess: string;
  internalReportingProcess: string;

  // Step 5: Pain points
  adminTasks: string;
  biggestBottlenecks: string;
  timeConsumingTasks: string;
  errorProneTasks: string;
  moneyLeakageAreas: string;

  // Step 6: Goals & AI
  growthGoals: string;
  currentAIUsage: AIUsageLevel;
  aiToolsUsed: string;
  additionalContext: string;
}
