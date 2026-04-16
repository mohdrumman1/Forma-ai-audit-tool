import { TrendingUp, Zap, AlertCircle } from "lucide-react";

const insights = [
  {
    type: "opportunity",
    icon: TrendingUp,
    color: "brand",
    label: "AI Recommendation",
    title: "Automate client intake and proposal generation",
    description:
      "Manual intake forms and custom proposals are consuming 8+ hours per week. AI can automate intake data collection, draft proposals based on your pricing logic, and reduce turnaround from 2 days to 20 minutes.",
    upside: "$45,000–$70,000/yr",
  },
  {
    type: "leak",
    icon: AlertCircle,
    color: "red",
    label: "Hidden Cost Leak",
    title: "Slow lead follow-up is costing you conversions",
    description:
      "Response times over 1 hour reduce conversion rates by up to 60%. An AI-powered lead response system can respond within seconds, qualify the lead, and book a call 24/7 with no human required.",
    upside: "$25,000–$50,000/yr",
  },
  {
    type: "quick_win",
    icon: Zap,
    color: "accent",
    label: "Quick Win",
    title: "Deploy an AI assistant for repetitive client queries",
    description:
      "A simple AI assistant handling your top 20 frequently asked questions can eliminate 3–5 hours of staff time per week and improve client experience overnight.",
    upside: "$10,000–$20,000/yr",
  },
];

export function ExampleInsights() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Sample Report Insights
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            The kind of insights you&apos;ll receive
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Every report is specific to your business. Here&apos;s a taste of what
            our AI consultants surface.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {insights.map((insight, i) => {
            const Icon = insight.icon;
            const colorMap = {
              brand: {
                bg: "bg-brand-600/10 border-brand-500/20",
                iconBg: "bg-brand-500/20",
                iconColor: "text-brand-400",
                badge: "bg-brand-600/20 text-brand-300 border-brand-500/30",
                upside: "text-brand-300",
              },
              red: {
                bg: "bg-red-500/5 border-red-500/20",
                iconBg: "bg-red-500/20",
                iconColor: "text-red-400",
                badge: "bg-red-600/20 text-red-300 border-red-500/30",
                upside: "text-red-300",
              },
              accent: {
                bg: "bg-accent-500/5 border-accent-500/20",
                iconBg: "bg-accent-500/20",
                iconColor: "text-accent-400",
                badge: "bg-accent-500/20 text-accent-300 border-accent-500/30",
                upside: "text-accent-300",
              },
            };
            const colors = colorMap[insight.color as keyof typeof colorMap];

            return (
              <div
                key={i}
                className={`rounded-xl border ${colors.bg} p-6 flex flex-col`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-9 w-9 rounded-lg ${colors.iconBg} flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 ${colors.iconColor}`} />
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${colors.badge}`}>
                    {insight.label}
                  </span>
                </div>
                <h3 className="text-white font-semibold mb-2">{insight.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">
                  {insight.description}
                </p>
                <div className="pt-3 border-t border-white/10">
                  <p className="text-xs text-slate-500 mb-1">Estimated upside</p>
                  <p className={`text-lg font-bold ${colors.upside}`}>{insight.upside}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
