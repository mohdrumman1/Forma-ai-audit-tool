import type { QuickWin } from "@/types/report";
import { Zap, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QuickWinsListProps {
  quickWins: QuickWin[];
}

const easeMap = {
  very_easy: { label: "Very Easy", variant: "success" as const },
  easy: { label: "Easy", variant: "success" as const },
  moderate: { label: "Moderate", variant: "warning" as const },
};

export function QuickWinsList({ quickWins }: QuickWinsListProps) {
  return (
    <div className="space-y-3">
      {quickWins.map((win, i) => {
        const ease = easeMap[win.easeOfImplementation] ?? easeMap.easy;
        return (
          <div
            key={i}
            className="flex items-start gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4"
          >
            <div className="shrink-0 h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Zap className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-white font-semibold text-sm">{win.title}</h3>
                <Badge variant={ease.variant}>{ease.label}</Badge>
              </div>
              <p className="text-slate-400 text-sm mb-2">{win.action}</p>
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <CheckCircle className="h-3.5 w-3.5" />
                {win.expectedBenefit}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
