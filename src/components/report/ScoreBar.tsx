"use client";

import { cn } from "@/lib/utils";

interface ScoreBarProps {
  label: string;
  score: number; // 1-10
  maxScore?: number;
  color?: "brand" | "accent" | "emerald";
  size?: "sm" | "default";
}

export function ScoreBar({
  label,
  score,
  maxScore = 10,
  color = "brand",
  size = "default",
}: ScoreBarProps) {
  const pct = (score / maxScore) * 100;
  const colorMap = {
    brand: "bg-brand-500",
    accent: "bg-accent-500",
    emerald: "bg-emerald-500",
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className={cn("text-slate-400", size === "sm" ? "text-xs" : "text-sm")}>
          {label}
        </span>
        <span className={cn("font-semibold text-white", size === "sm" ? "text-xs" : "text-sm")}>
          {score}/{maxScore}
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-700", colorMap[color])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
