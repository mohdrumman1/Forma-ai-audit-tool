"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import type { AIRecommendation } from "@/types/report";
import { Badge } from "@/components/ui/badge";
import { ScoreBar } from "./ScoreBar";
import { cn } from "@/lib/utils";
import { ProseText } from "./ProseText";
import { getToolsForCategory } from "@/lib/toolRecommendations";

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
  const tools = getToolsForCategory(rec.category);

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
                <ProseText text={rec.currentProblem} className="text-sm text-slate-300" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Why It&apos;s Costing You</p>
                <ProseText text={rec.whyCosting} className="text-sm text-slate-300" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Recommended AI Use Case</p>
                <ProseText text={rec.recommendedUseCase} className="text-sm text-white" />
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Example Implementation</p>
                <ProseText text={rec.exampleImplementation} className="text-sm text-slate-300 italic" />
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
                <ProseText text={rec.whyItMatters} className="text-xs text-slate-400" />
              </div>
            </div>
          </div>

          {/* Tools to explore */}
          <div className="mt-5 pt-4 border-t border-white/5">
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-3">Tools to explore</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {tools.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 rounded-lg border border-white/8 bg-white/3 px-3 py-2.5 hover:border-brand-500/30 hover:bg-brand-500/5 transition-all duration-200 group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-semibold text-white group-hover:text-brand-300 transition-colors">{tool.name}</span>
                      {tool.badge && (
                        <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded px-1 py-px">{tool.badge}</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{tool.description}</p>
                  </div>
                  <ExternalLink className="h-3 w-3 text-slate-600 group-hover:text-brand-400 shrink-0 mt-0.5 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
