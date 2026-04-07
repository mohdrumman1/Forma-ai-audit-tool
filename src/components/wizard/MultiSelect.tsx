"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  maxSelections?: number;
  className?: string;
}

export function MultiSelect({
  options,
  value,
  onChange,
  maxSelections,
  className,
}: MultiSelectProps) {
  const toggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      if (maxSelections && value.length >= maxSelections) return;
      onChange([...value, optionValue]);
    }
  };

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-2", className)}>
      {options.map((option) => {
        const isSelected = value.includes(option.value);
        const isDisabled =
          !isSelected && maxSelections !== undefined && value.length >= maxSelections;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => !isDisabled && toggle(option.value)}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg border text-left transition-all duration-200",
              isSelected
                ? "border-brand-500 bg-brand-600/15 text-white"
                : isDisabled
                ? "border-white/5 bg-white/2 text-slate-600 cursor-not-allowed opacity-50"
                : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10"
            )}
          >
            <div
              className={cn(
                "mt-0.5 h-4 w-4 shrink-0 rounded flex items-center justify-center border transition-all",
                isSelected
                  ? "bg-brand-600 border-brand-600"
                  : "border-white/20 bg-transparent"
              )}
            >
              {isSelected && <Check className="h-3 w-3 text-white" />}
            </div>
            <div>
              <p className="text-sm font-medium">{option.label}</p>
              {option.description && (
                <p className="text-xs text-slate-500 mt-0.5">{option.description}</p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
