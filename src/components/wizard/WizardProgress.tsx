"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  number: number;
  label: string;
}

interface WizardProgressProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function WizardProgress({ steps, currentStep, onStepClick }: WizardProgressProps) {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full">
      {/* Step labels */}
      <div className="relative flex items-center justify-between mb-3">
        {steps.map((step) => {
          const isCompleted = step.number < currentStep;
          const isActive = step.number === currentStep;
          const isClickable = isCompleted && !!onStepClick;

          return (
            <div
              key={step.number}
              className={cn("flex flex-col items-center", isClickable && "cursor-pointer group")}
              style={{ flex: "1 1 0%", maxWidth: `${100 / steps.length}%` }}
              onClick={isClickable ? () => onStepClick(step.number) : undefined}
            >
              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300 z-10",
                  isCompleted
                    ? "bg-brand-600 border-brand-600 text-white group-hover:bg-brand-500 group-hover:border-brand-400"
                    : isActive
                    ? "bg-brand-600/20 border-brand-500 text-brand-300"
                    : "bg-surface-muted border-white/10 text-slate-500"
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={cn(
                  "text-xs mt-1.5 font-medium text-center hidden sm:block",
                  isCompleted
                    ? "text-brand-400 group-hover:text-brand-300"
                    : isActive
                    ? "text-white"
                    : "text-slate-600"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}

        {/* Connecting line */}
        <div className="absolute top-4 left-0 right-0 h-[2px] bg-white/10 -z-0">
          <div
            className="h-full bg-brand-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Mobile step label */}
      <p className="text-xs text-slate-400 text-center sm:hidden mt-2">
        Step {currentStep} of {steps.length}:{" "}
        <span className="text-white">{steps[currentStep - 1]?.label}</span>
      </p>
    </div>
  );
}
