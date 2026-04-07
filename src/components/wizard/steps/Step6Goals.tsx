"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AssessmentStep6Schema } from "@/lib/schemas";
import { StepWrapper } from "../StepWrapper";
import { FormField } from "../FormField";
import { Textarea } from "@/components/ui/textarea";
import { useAssessmentStore } from "@/stores/assessmentStore";
import { cn } from "@/lib/utils";

type Step6Data = z.infer<typeof AssessmentStep6Schema>;

const AI_USAGE_OPTIONS = [
  {
    value: "none",
    label: "None at all",
    description: "We don't use any AI tools in our business",
  },
  {
    value: "minimal",
    label: "Minimal",
    description: "We occasionally use ChatGPT or similar for ad hoc tasks",
  },
  {
    value: "moderate",
    label: "Moderate",
    description: "We use a few AI tools regularly in some workflows",
  },
  {
    value: "advanced",
    label: "Advanced",
    description: "AI is embedded in multiple workflows and we're actively expanding its use",
  },
];

interface Props {
  onBack: () => void;
  onNext: () => void;
  isLoading?: boolean;
}

export function Step6Goals({ onBack, onNext, isLoading }: Props) {
  const { data, updateData } = useAssessmentStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Step6Data>({
    resolver: zodResolver(AssessmentStep6Schema),
    defaultValues: {
      growthGoals: data.growthGoals ?? "",
      currentAIUsage: data.currentAIUsage ?? "none",
      aiToolsUsed: data.aiToolsUsed ?? "",
      additionalContext: data.additionalContext ?? "",
    },
  });

  const currentAIUsage = watch("currentAIUsage");

  const submit = handleSubmit((values) => {
    updateData(values);
    onNext();
  });

  return (
    <StepWrapper
      title="Growth goals & AI readiness"
      subtitle="Almost there. Tell us where you want to go and how ready you are for AI."
      onBack={onBack}
      onNext={submit}
      isLastStep
      isLoading={isLoading}
    >
      <FormField
        label="What are your main growth goals for the next 12 months?"
        htmlFor="growthGoals"
        required
        error={errors.growthGoals?.message}
        hint="Revenue targets, team growth, new services, market expansion — anything goes"
      >
        <Textarea
          id="growthGoals"
          placeholder="e.g. Grow revenue by 30%, hire 2 more staff, reduce time spent on admin by half, expand into a new service area, improve client retention..."
          rows={4}
          {...register("growthGoals")}
        />
      </FormField>

      <FormField label="How would you describe your current use of AI?" required>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {AI_USAGE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setValue("currentAIUsage", option.value as Step6Data["currentAIUsage"])}
              className={cn(
                "flex items-start gap-3 p-4 rounded-lg border text-left transition-all duration-200",
                currentAIUsage === option.value
                  ? "border-brand-500 bg-brand-600/15 text-white"
                  : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10"
              )}
            >
              <div
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 transition-all flex-shrink-0",
                  currentAIUsage === option.value
                    ? "border-brand-500 bg-brand-600"
                    : "border-white/20"
                )}
              />
              <div>
                <p className="text-sm font-semibold">{option.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{option.description}</p>
              </div>
            </button>
          ))}
        </div>
      </FormField>

      <FormField
        label="Which AI tools do you currently use?"
        htmlFor="aiToolsUsed"
        hint="Even casual use counts — ChatGPT, Copilot, Midjourney, etc."
      >
        <Textarea
          id="aiToolsUsed"
          placeholder="e.g. ChatGPT for drafting emails occasionally, Grammarly for writing..."
          rows={2}
          {...register("aiToolsUsed")}
        />
      </FormField>

      <FormField
        label="Anything else you'd like us to know?"
        htmlFor="additionalContext"
        hint="Any context that might help us understand your business better"
      >
        <Textarea
          id="additionalContext"
          placeholder="e.g. We're currently going through a software migration, we have a specific challenge with X, we've tried automating Y before and it didn't work..."
          rows={3}
          {...register("additionalContext")}
        />
      </FormField>
    </StepWrapper>
  );
}
