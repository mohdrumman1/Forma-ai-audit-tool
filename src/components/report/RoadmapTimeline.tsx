import type { RoadmapPhase } from "@/types/report";
import { ArrowRight } from "lucide-react";

interface RoadmapTimelineProps {
  phases: RoadmapPhase[];
}

const phaseColors = [
  {
    border: "border-brand-500/40",
    bg: "bg-brand-600/10",
    number: "bg-brand-600 text-white",
    dot: "bg-brand-500",
  },
  {
    border: "border-accent-500/40",
    bg: "bg-accent-500/5",
    number: "bg-accent-600 text-white",
    dot: "bg-accent-500",
  },
  {
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/5",
    number: "bg-emerald-600 text-white",
    dot: "bg-emerald-500",
  },
  {
    border: "border-purple-500/40",
    bg: "bg-purple-500/5",
    number: "bg-purple-600 text-white",
    dot: "bg-purple-500",
  },
];

export function RoadmapTimeline({ phases }: RoadmapTimelineProps) {
  return (
    <div className="relative">
      {/* Connecting line */}
      <div className="hidden md:block absolute top-8 left-8 right-8 h-[2px] bg-gradient-to-r from-brand-500/30 via-accent-500/30 to-emerald-500/30 z-0" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {phases.map((phase, i) => {
          const colors = phaseColors[i % phaseColors.length];
          return (
            <div
              key={i}
              className={`rounded-xl border ${colors.border} ${colors.bg} p-5 flex flex-col`}
            >
              {/* Phase number + timeframe */}
              <div className="flex items-center justify-between mb-4">
                <div className={`h-9 w-9 rounded-lg ${colors.number} flex items-center justify-center text-sm font-bold shadow-lg`}>
                  {phase.phase}
                </div>
                <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded-full">
                  {phase.timeframe}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-white font-semibold text-sm mb-2">{phase.title}</h3>
              <p className="text-slate-500 text-xs mb-2">{phase.objective}</p>
              <p className="text-slate-400 text-xs leading-relaxed flex-1 mb-3">
                {phase.description}
              </p>

              {/* Business value */}
              <div className="pt-3 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <ArrowRight className="h-3 w-3 shrink-0" />
                  <span>{phase.expectedBusinessValue}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
