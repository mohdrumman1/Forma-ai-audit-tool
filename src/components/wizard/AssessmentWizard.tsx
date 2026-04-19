"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { WizardProgress } from "./WizardProgress";
import { Step1Basics } from "./steps/Step1Basics";
import { Step2Tools } from "./steps/Step2Tools";
import { Step3LeadSales } from "./steps/Step3LeadSales";
import { Step4Operations } from "./steps/Step4Operations";
import { Step5PainPoints } from "./steps/Step5PainPoints";
import { Step6Goals } from "./steps/Step6Goals";
import { Step7Contact, type ContactInput } from "./steps/Step7Contact";
import { useAssessmentStore } from "@/stores/assessmentStore";
import { AlertCircle } from "lucide-react";
import { GeneratingReport } from "./GeneratingReport";

const STEPS = [
  { number: 1, label: "Basics" },
  { number: 2, label: "Tools" },
  { number: 3, label: "Sales" },
  { number: 4, label: "Operations" },
  { number: 5, label: "Pain Points" },
  { number: 6, label: "Goals" },
  { number: 7, label: "Get Report" },
];

export function AssessmentWizard() {
  const router = useRouter();
  const { currentStep, setStep, reset, contactName, contactEmail, setContact } = useAssessmentStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const goBack = () => setStep(Math.max(1, currentStep - 1));
  const goNext = () => {
    setStep(Math.min(STEPS.length, currentStep + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFinalSubmit = async (contact: ContactInput) => {
    setIsSubmitting(true);
    setError(null);
    setContact(contact.contactName, contact.contactEmail);

    try {
      // Read latest store state directly, avoiding stale closure from React render snapshot
      const latestData = useAssessmentStore.getState().data;

      const response = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessment: latestData,
          contactName: contact.contactName,
          contactEmail: contact.contactEmail,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Failed to generate report. Please try again.");
      }

      // Clear stored form data and redirect to report
      reset();
      router.push(`/report/${result.submissionId}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) return <GeneratingReport />;

  return (
    <div className="min-h-screen bg-[#0f0f1a] pt-24 pb-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-2">
            AI Opportunity Assessment
          </p>
          <h1 className="text-3xl font-bold text-white mb-2">
            Tell us about your business
          </h1>
          <p className="text-slate-400 text-sm">
            Takes around 5 minutes. Your answers are used to generate a tailored report.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-10">
          <WizardProgress steps={STEPS} currentStep={currentStep} onStepClick={setStep} />
        </div>

        {/* Error state */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-sm">Something went wrong</p>
              <p className="text-xs mt-1 text-red-400">{error}</p>
            </div>
          </div>
        )}

        {/* Step card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-sm">
          {currentStep === 1 && <Step1Basics onNext={goNext} />}
          {currentStep === 2 && <Step2Tools onBack={goBack} onNext={goNext} />}
          {currentStep === 3 && <Step3LeadSales onBack={goBack} onNext={goNext} />}
          {currentStep === 4 && <Step4Operations onBack={goBack} onNext={goNext} />}
          {currentStep === 5 && <Step5PainPoints onBack={goBack} onNext={goNext} />}
          {currentStep === 6 && (
            <Step6Goals onBack={goBack} onNext={goNext} isLoading={false} />
          )}
          {currentStep === 7 && (
            <Step7Contact
              onBack={goBack}
              onSubmit={handleFinalSubmit}
              isLoading={isSubmitting}
              defaultValues={{ contactName, contactEmail }}
            />
          )}
        </div>

        {/* Privacy note */}
        {currentStep < 7 && (
          <p className="text-center text-xs text-slate-600 mt-6">
            Your information is used only to generate your report. No spam, no obligation.
          </p>
        )}
      </div>
    </div>
  );
}
