"use client";

import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StepWrapperProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onBack?: () => void;
  onNext: () => void;
  isLastStep?: boolean;
  isLoading?: boolean;
  canProceed?: boolean;
}

export function StepWrapper({
  title,
  subtitle,
  children,
  onBack,
  onNext,
  isLastStep = false,
  isLoading = false,
  canProceed = true,
}: StepWrapperProps) {
  return (
    <div className="animate-fade-in">
      {/* Step header */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h2>
        {subtitle && (
          <p className="text-slate-400 text-base leading-relaxed">{subtitle}</p>
        )}
      </div>

      {/* Step content */}
      <div className="space-y-6">{children}</div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10">
        {onBack ? (
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        ) : (
          <div />
        )}

        <Button
          type="button"
          variant={isLastStep ? "accent" : "default"}
          size="lg"
          onClick={onNext}
          disabled={!canProceed || isLoading}
          className="flex items-center gap-2 min-w-[160px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analysing...
            </>
          ) : isLastStep ? (
            <>
              Generate My Report
              <ArrowRight className="h-4 w-4" />
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
