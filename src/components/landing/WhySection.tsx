import { AlertTriangle, Clock, Users, TrendingDown } from "lucide-react";

const leaks = [
  {
    icon: Clock,
    title: "Time buried in manual admin",
    description:
      "Your team is spending hours every week on tasks that AI can handle in seconds: data entry, scheduling, follow-ups, document processing.",
    stat: "15–25 hrs/week",
    statLabel: "lost to repetitive tasks",
  },
  {
    icon: TrendingDown,
    title: "Leads falling through the cracks",
    description:
      "Slow response times, inconsistent follow-up, and manual tracking mean qualified leads are going cold and converting with competitors.",
    stat: "20–40%",
    statLabel: "of leads never followed up",
  },
  {
    icon: Users,
    title: "Highly paid staff doing low-value work",
    description:
      "Your best people are buried in emails, reports, and copy-paste workflows instead of doing the work that actually grows your business.",
    stat: "$30–80K",
    statLabel: "per year in misallocated labour",
  },
  {
    icon: AlertTriangle,
    title: "Errors costing you clients and credibility",
    description:
      "Manual processes mean human error. Missed deadlines, incorrect data, inconsistent communication. Every mistake has a real financial cost.",
    stat: "3–8%",
    statLabel: "revenue impact from process errors",
  },
];

export function WhySection() {
  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-3">
            The Problem
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            Most businesses are leaking money{" "}
            <span className="text-slate-400">without knowing it</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            The inefficiencies are invisible until someone maps them out. That&apos;s
            exactly what the Forma AI Opportunity Finder does.
          </p>
        </div>

        {/* Leaks grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leaks.map((leak, i) => {
            const Icon = leak.icon;
            return (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/5 p-6 hover:border-brand-500/30 hover:bg-brand-600/5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <Icon className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-2">{leak.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      {leak.description}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-red-400">{leak.stat}</span>
                      <span className="text-xs text-slate-500">{leak.statLabel}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
