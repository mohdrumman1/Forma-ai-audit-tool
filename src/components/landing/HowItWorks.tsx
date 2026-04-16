import { ClipboardList, Cpu, FileText } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Complete the assessment",
    description:
      "Answer 6 quick sections about your business operations, workflows, team, and goals. Takes around 5 minutes. No technical knowledge required.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI analyses your business",
    description:
      "Our AI engine, trained to think like a strategy and operations consultant, maps your workflows, identifies inefficiencies, and quantifies your financial upside.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Get your tailored report",
    description:
      "Instantly receive a premium, consultant-grade AI opportunity report. Download it as a PDF, print it, or share it with your team.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 relative bg-white/[0.02] border-y border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-3">
            How It Works
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            Your AI report in 3 steps
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            No forms to fill out for a salesperson. No waiting days for a proposal.
            Instant, actionable insight tailored to your specific business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative text-center">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+3rem)] right-0 h-[1px] bg-gradient-to-r from-brand-500/30 to-transparent" />
                )}

                <div className="relative inline-flex">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center shadow-lg shadow-brand-900/50 mb-6">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 text-xs font-bold text-brand-400 bg-surface-card border border-brand-500/30 rounded-full h-6 w-6 flex items-center justify-center">
                    {step.number.slice(1)}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
