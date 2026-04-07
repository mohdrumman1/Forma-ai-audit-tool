"use client";

import { formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown, Target, DollarSign } from "lucide-react";

interface SavingsSummaryProps {
  totalEstimatedSavings: number;
  estimatedMonthlySavings: number;
  estimatedAnnualValue: number;
  currentMoneyLeaked: number;
  recoverableUpside: number;
}

export function SavingsSummary({
  totalEstimatedSavings,
  estimatedMonthlySavings,
  estimatedAnnualValue,
  currentMoneyLeaked,
  recoverableUpside,
}: SavingsSummaryProps) {
  return (
    <div className="space-y-6">
      {/* Hero savings number */}
      <div className="rounded-2xl border border-brand-500/30 bg-gradient-to-br from-brand-900/40 to-brand-800/20 p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/5 to-transparent pointer-events-none" />
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-400 mb-2">
          Total Estimated Annual Opportunity
        </p>
        <div className="text-6xl sm:text-7xl font-bold text-white mb-2 tracking-tight">
          {formatCurrency(totalEstimatedSavings, "USD", true)}
        </div>
        <p className="text-slate-400 text-sm">
          In identifiable savings, automation gains, and recoverable revenue
        </p>
      </div>

      {/* Supporting metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={TrendingUp}
          label="Monthly Savings"
          value={formatCurrency(estimatedMonthlySavings)}
          subLabel="per month"
          color="brand"
        />
        <MetricCard
          icon={DollarSign}
          label="Annual Value"
          value={formatCurrency(estimatedAnnualValue, "USD", true)}
          subLabel="per year"
          color="brand"
        />
        <MetricCard
          icon={TrendingDown}
          label="Currently Leaking"
          value={formatCurrency(currentMoneyLeaked, "USD", true)}
          subLabel="estimated per year"
          color="red"
        />
        <MetricCard
          icon={Target}
          label="Recoverable Upside"
          value={formatCurrency(recoverableUpside, "USD", true)}
          subLabel="addressable opportunity"
          color="accent"
        />
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  subLabel: string;
  color: "brand" | "red" | "accent";
}

function MetricCard({ icon: Icon, label, value, subLabel, color }: MetricCardProps) {
  const colorMap = {
    brand: {
      border: "border-brand-500/20",
      bg: "bg-brand-600/10",
      iconBg: "bg-brand-500/20",
      iconColor: "text-brand-400",
      value: "text-brand-300",
    },
    red: {
      border: "border-red-500/20",
      bg: "bg-red-500/5",
      iconBg: "bg-red-500/20",
      iconColor: "text-red-400",
      value: "text-red-300",
    },
    accent: {
      border: "border-accent-500/20",
      bg: "bg-accent-500/5",
      iconBg: "bg-accent-500/20",
      iconColor: "text-accent-400",
      value: "text-accent-300",
    },
  };

  const c = colorMap[color];

  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} p-4`}>
      <div className={`h-8 w-8 rounded-lg ${c.iconBg} flex items-center justify-center mb-3`}>
        <Icon className={`h-4 w-4 ${c.iconColor}`} />
      </div>
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className={`text-xl font-bold ${c.value}`}>{value}</p>
      <p className="text-xs text-slate-600 mt-0.5">{subLabel}</p>
    </div>
  );
}
