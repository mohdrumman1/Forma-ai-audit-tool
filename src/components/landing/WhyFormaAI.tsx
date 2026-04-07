import { Shield, Target, Clock, BarChart3 } from "lucide-react";

const reasons = [
  {
    icon: Target,
    title: "Commercially sharp analysis",
    description:
      "We don't give you vague AI buzzwords. Every insight is tied to a real financial outcome — revenue, cost, or time.",
  },
  {
    icon: Shield,
    title: "Strategy-first, not tool-first",
    description:
      "We identify the opportunities first. Then we identify the right AI to address them — not the other way around.",
  },
  {
    icon: Clock,
    title: "Instant value, no sales pressure",
    description:
      "You get a real, tailored report immediately. No waiting for a proposal, no obligation to engage.",
  },
  {
    icon: BarChart3,
    title: "ROI-driven implementation",
    description:
      "When you work with Forma AI, every recommendation is scoped around measurable return on investment.",
  },
];

export function WhyFormaAI() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-900/10 to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Why Forma AI
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              We think like consultants.{" "}
              <span className="text-brand-400">We build like engineers.</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              Most AI consultants either over-promise on outcomes or under-deliver on
              execution. Forma AI bridges that gap — combining strategic analysis with
              practical, working AI implementations.
            </p>
            <p className="text-slate-400 leading-relaxed">
              This free assessment is the same diagnostic process we use with paying
              clients — just compressed into a 5-minute self-serve tool. Use it to
              understand your opportunity, then talk to us about making it real.
            </p>
          </div>

          {/* Right: reasons grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((reason, i) => {
              const Icon = reason.icon;
              return (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/5 p-5 hover:border-brand-500/30 hover:bg-brand-600/5 transition-all duration-300"
                >
                  <div className="h-9 w-9 rounded-lg bg-brand-600/20 flex items-center justify-center mb-3">
                    <Icon className="h-5 w-5 text-brand-400" />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
