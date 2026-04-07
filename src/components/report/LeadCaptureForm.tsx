"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LeadCaptureSchema } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle, Mail, Loader2 } from "lucide-react";

type LeadData = z.infer<typeof LeadCaptureSchema>;

interface LeadCaptureFormProps {
  submissionId: string;
}

export function LeadCaptureForm({ submissionId }: LeadCaptureFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadData>({
    resolver: zodResolver(LeadCaptureSchema),
    defaultValues: { submissionId },
  });

  const onSubmit = handleSubmit(async (data) => {
    setError(null);
    try {
      const res = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  });

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center">
        <div className="h-14 w-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-7 w-7 text-emerald-400" />
        </div>
        <h3 className="text-white font-bold text-xl mb-2">You&apos;re all set!</h3>
        <p className="text-slate-400 text-sm max-w-sm mx-auto">
          Thanks for sharing your details. The Forma AI team will be in touch with ideas
          tailored specifically to your business.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-xl bg-brand-600/20 flex items-center justify-center">
          <Mail className="h-5 w-5 text-brand-400" />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg">Get a copy of your report</h3>
          <p className="text-slate-500 text-xs">Optional — no obligation</p>
        </div>
      </div>

      <p className="text-slate-400 text-sm mb-6 leading-relaxed">
        Want a no-obligation PDF copy of your report sent to you? Share your details below
        and Forma AI can also reach out with ideas tailored to your business.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <input type="hidden" {...register("submissionId")} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contactName">Full name</Label>
            <Input
              id="contactName"
              placeholder="Your name"
              {...register("contactName")}
            />
            {errors.contactName && (
              <p className="text-xs text-red-400">{errors.contactName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Email address</Label>
            <Input
              id="contactEmail"
              type="email"
              placeholder="you@company.com"
              {...register("contactEmail")}
            />
            {errors.contactEmail && (
              <p className="text-xs text-red-400">{errors.contactEmail.message}</p>
            )}
          </div>
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}

        <Button
          type="submit"
          variant="default"
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Sending...
            </>
          ) : (
            "Send Me My Report"
          )}
        </Button>

        <p className="text-xs text-slate-600">
          We respect your privacy. No spam, ever. Unsubscribe at any time.
        </p>
      </form>
    </div>
  );
}
