"use client";

import { useEffect, useState } from "react";
import { Sparkles, Brain, TrendingUp, Map, FileText, CheckCircle } from "lucide-react";

const STEPS = [
  { icon: Brain,      label: "Reading your business profile",       pct: 18 },
  { icon: Sparkles,   label: "Identifying AI opportunities",         pct: 36 },
  { icon: TrendingUp, label: "Calculating potential ROI",            pct: 54 },
  { icon: Map,        label: "Mapping your automation roadmap",      pct: 72 },
  { icon: FileText,   label: "Generating personalised insights",     pct: 88 },
  { icon: CheckCircle,label: "Finalising your report",              pct: 99 },
];

const INSIGHTS = [
  "Most small businesses have 3–5 repeatable workflows that could be partially automated with off-the-shelf tools.",
  "Teams that automate their follow-up process typically respond to leads faster — a key driver of conversion rates.",
  "Businesses often underestimate how much time is spent on manual data entry, scheduling, and chasing approvals.",
  "Connecting your existing tools with simple automations can eliminate a surprising amount of double-handling.",
  "The highest-value AI wins are usually in the workflows your team does every single day.",
];

const STEP_DURATION = 1800; // ms per step

export function GeneratingReport() {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [insightIndex, setInsightIndex] = useState(0);
  const [insightVisible, setInsightVisible] = useState(true);

  // Advance through steps
  useEffect(() => {
    if (stepIndex >= STEPS.length - 1) return;
    const t = setTimeout(() => setStepIndex((i) => i + 1), STEP_DURATION);
    return () => clearTimeout(t);
  }, [stepIndex]);

  // Smooth progress bar
  useEffect(() => {
    const target = STEPS[stepIndex].pct;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= target) { clearInterval(interval); return target; }
        return Math.min(prev + 0.8, target);
      });
    }, 16);
    return () => clearInterval(interval);
  }, [stepIndex]);

  // Rotate insights with fade
  useEffect(() => {
    const t = setInterval(() => {
      setInsightVisible(false);
      setTimeout(() => {
        setInsightIndex((i) => (i + 1) % INSIGHTS.length);
        setInsightVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const Step = STEPS[stepIndex];
  const StepIcon = Step.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a14] overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-600/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent-500/8 blur-3xl animate-pulse [animation-delay:1.5s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-brand-500/5 blur-2xl animate-pulse [animation-delay:0.75s]" />
      </div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-brand-400/40"
          style={{
            left: `${15 + i * 10}%`,
            top: `${20 + (i % 3) * 25}%`,
            animation: `float-particle ${3 + i * 0.5}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center text-center gap-8">
        {/* Animated icon cluster */}
        <div className="relative flex items-center justify-center w-28 h-28">
          {/* Outer ring pulse */}
          <div className="absolute inset-0 rounded-full border border-brand-500/20 animate-ping [animation-duration:2s]" />
          <div className="absolute inset-2 rounded-full border border-brand-400/15 animate-ping [animation-duration:2s] [animation-delay:0.5s]" />
          {/* Inner glow circle */}
          <div className="absolute inset-4 rounded-full bg-brand-600/20 backdrop-blur-sm border border-brand-500/30" />
          {/* Icon */}
          <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-900/50">
            <StepIcon className="w-7 h-7 text-white transition-all duration-500" />
          </div>
        </div>

        {/* Headline */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
            Building your{" "}
            <span className="gradient-text">AI opportunity report</span>
          </h2>
          <p className="text-slate-400 text-sm">
            Our AI is analysing your responses to find your biggest wins.
          </p>
        </div>

        {/* Progress section */}
        <div className="w-full space-y-3">
          {/* Progress bar */}
          <div className="relative h-2 w-full rounded-full bg-white/5 overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
            {/* Shimmer */}
            <div
              className="absolute top-0 h-full w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
              style={{
                left: `${progress - 8}%`,
                transition: "left 0.3s ease-out",
              }}
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <span
              className="text-brand-300 font-medium transition-all duration-500"
              key={stepIndex}
            >
              {Step.label}…
            </span>
            <span className="text-slate-500 tabular-nums">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Step checklist */}
        <div className="w-full space-y-2">
          {STEPS.map((s, i) => {
            const done = i < stepIndex;
            const active = i === stepIndex;
            const Icon = s.icon;
            return (
              <div
                key={i}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-500 ${
                  active
                    ? "bg-brand-500/10 border border-brand-500/20"
                    : done
                    ? "opacity-50"
                    : "opacity-20"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 transition-all duration-500 ${
                    done
                      ? "bg-green-500/20 text-green-400"
                      : active
                      ? "bg-brand-500/20 text-brand-400"
                      : "bg-white/5 text-slate-600"
                  }`}
                >
                  {done ? (
                    <CheckCircle className="w-3.5 h-3.5" />
                  ) : (
                    <Icon className={`w-3 h-3 ${active ? "animate-pulse" : ""}`} />
                  )}
                </div>
                <span
                  className={`text-xs font-medium ${
                    done ? "text-green-400" : active ? "text-brand-200" : "text-slate-600"
                  }`}
                >
                  {s.label}
                </span>
                {active && (
                  <div className="ml-auto flex gap-0.5">
                    {[0, 1, 2].map((d) => (
                      <div
                        key={d}
                        className="w-1 h-1 rounded-full bg-brand-400 animate-bounce"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Rotating insight */}
        <div
          className="w-full rounded-xl border border-white/5 bg-white/3 px-4 py-3 transition-opacity duration-400"
          style={{ opacity: insightVisible ? 1 : 0 }}
        >
          <p className="text-xs text-slate-400 italic leading-relaxed">
            <span className="text-brand-400 not-italic font-semibold">Did you know? </span>
            {INSIGHTS[insightIndex]}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float-particle {
          from { transform: translateY(0px) scale(1); opacity: 0.4; }
          to   { transform: translateY(-18px) scale(1.4); opacity: 0.1; }
        }
      `}</style>
    </div>
  );
}
