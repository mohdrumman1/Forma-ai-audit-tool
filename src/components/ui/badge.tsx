import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-brand-600/20 text-brand-300 border-brand-500/30",
        secondary: "bg-white/10 text-slate-300 border-white/10",
        destructive: "bg-red-500/20 text-red-300 border-red-500/30",
        warning: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        success: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        critical: "bg-red-600/20 text-red-300 border-red-600/30",
        high: "bg-orange-500/20 text-orange-300 border-orange-500/30",
        medium: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
        low: "bg-slate-500/20 text-slate-300 border-slate-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
