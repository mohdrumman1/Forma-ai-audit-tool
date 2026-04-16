import type { HiddenCostLeak } from "@/types/report";
import { Badge } from "@/components/ui/badge";
import { ProseText } from "./ProseText";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";

interface CostLeakCardProps {
  leak: HiddenCostLeak;
}

const severityConfig = {
  critical: {
    icon: AlertCircle,
    badge: "critical" as const,
    borderColor: "border-red-500/30",
    bg: "bg-red-500/5",
    iconColor: "text-red-400",
    iconBg: "bg-red-500/20",
  },
  high: {
    icon: AlertTriangle,
    badge: "high" as const,
    borderColor: "border-orange-500/30",
    bg: "bg-orange-500/5",
    iconColor: "text-orange-400",
    iconBg: "bg-orange-500/20",
  },
  medium: {
    icon: AlertTriangle,
    badge: "medium" as const,
    borderColor: "border-yellow-500/30",
    bg: "bg-yellow-500/5",
    iconColor: "text-yellow-400",
    iconBg: "bg-yellow-500/20",
  },
  low: {
    icon: Info,
    badge: "low" as const,
    borderColor: "border-slate-500/30",
    bg: "bg-slate-500/5",
    iconColor: "text-slate-400",
    iconBg: "bg-slate-500/20",
  },
};

export function CostLeakCard({ leak }: CostLeakCardProps) {
  const config = severityConfig[leak.severity] ?? severityConfig.medium;
  const Icon = config.icon;

  return (
    <div className={`rounded-xl border ${config.borderColor} ${config.bg} p-5`}>
      <div className="flex items-start gap-4">
        <div className={`shrink-0 h-9 w-9 rounded-lg ${config.iconBg} flex items-center justify-center`}>
          <Icon className={`h-5 w-5 ${config.iconColor}`} />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="text-white font-semibold text-sm">{leak.title}</h3>
            <Badge variant={config.badge}>
              {leak.severity.charAt(0).toUpperCase() + leak.severity.slice(1)}
            </Badge>
          </div>
          <ProseText text={leak.explanation} className="text-slate-400 text-sm mb-3" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-slate-600 uppercase tracking-wide mb-1">Likely Source</p>
              <ProseText text={leak.likelySource} className="text-slate-300" />
            </div>
            <div>
              <p className="text-slate-600 uppercase tracking-wide mb-1">Financial Impact</p>
              <ProseText text={leak.financialImpactType} className="text-slate-300" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/5">
            <p className="text-slate-600 text-xs uppercase tracking-wide mb-1">Suggested Fix</p>
            <ProseText text={leak.suggestedFix} className="text-slate-300 text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
