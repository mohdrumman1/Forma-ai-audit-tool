"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { AIRecommendation } from "@/types/report";
import { Badge } from "@/components/ui/badge";
import { ScoreBar } from "./ScoreBar";
import { cn } from "@/lib/utils";

interface RecommendationCardProps {
  recommendation: AIRecommendation;
  index: number;
}

const complexityMap = {
  low: { label: "Low complexity", variant: "success" as const },
  medium: { label: "Medium complexity", variant: "warning" as const },
  high: { label: "High complexity", variant: "high" as const },
};

export function RecommendationCard({ recommendation: rec, index }: RecommendationCardProps) {
  const [expanded, setExpanded] = useState(index < 2);
  const complexity = complexityMap[rec.implementationComplexity];

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 hover:border-brand-500/20 transition-all duration-300">
      {/* Header - always visible */}
      <button
        type="button"
        className="w-full flex items-start gap-4 p-5 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="shrink-0 h-10 w-10 rounded-lg bg-brand-600/20 flex items-center justify-center text-brand-400 font-bold text-lg border border-brand-500/20">
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Badge variant="default">{rec.category}</Badge>
            <Badge variant={complexity.variant}>{complexity.label}</Badge>
          </div>
          <h3 className="text-white font-semibold text-base leading-snug">
            {rec.title}
          </h3>
          <p className="text-accent-400 text-sm font-semibold mt-1">
            {rec.estimatedUpside}
          </p>
        </div>
        <div className="shrink-0 text-slate-500 mt-1">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-white/5 pt-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Current Problem</p>
                <p className="text-sm text-slate-300">{rec.currentProblem}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Why It&apos;s Costing You</p>
                <p className="text-sm text-slate-300">{rec.whyCosting}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Recommended AI Use Case</p>
                <p className="text-sm text-white">{rec.recommendedUseCase}</p>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Example Implementation</p>
                <p className="text-sm text-slate-300 italic">{rec.exampleImplementation}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Scores</p>
                <div className="space-y-2">
                  <ScoreBar label="Impact" score={rec.impactScore} color="accent" size="sm" />
                  <ScoreBar label="Ease" score={rec.easeScore} color="brand" size="sm" />
                  <ScoreBar label="Priority" score={rec.priorityScore} color="emerald" size="sm" />
                </div>
              </div>
              <div className="rounded-lg bg-brand-600/10 border border-brand-500/20 p-3">
                <p className="text-xs text-brand-300 font-semibold mb-1">Why It Matters</p>
                <p className="text-xs text-slate-400">{rec.whyItMatters}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
