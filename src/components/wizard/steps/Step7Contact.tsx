"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/wizard/FormField";
import { Sparkles, Lock, ArrowLeft } from "lucide-react";

const ContactSchema = z.object({
  contactName: z.string().min(2, "Please enter your name"),
  contactEmail: z.string().email("Please enter a valid email address"),
});

export type ContactInput = z.infer<typeof ContactSchema>;

interface Step7ContactProps {
  onBack: () => void;
  onSubmit: (data: ContactInput) => void;
  isLoading: boolean;
  defaultValues?: Partial<ContactInput>;
}

export function Step7Contact({ onBack, onSubmit, isLoading, defaultValues }: Step7ContactProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(ContactSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center pb-2">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-brand-600/20 border border-brand-500/30 mb-4">
          <Sparkles className="h-7 w-7 text-brand-400" />
        </div>
        <h2 className="text-xl font-bold text-white">Your report is ready to generate</h2>
        <p className="text-slate-400 text-sm mt-2">
          Enter your details and we&apos;ll send you a copy. No spam, no obligation.
        </p>
      </div>

      <div className="space-y-4">
        <FormField label="Your name" error={errors.contactName?.message} required>
          <input
            {...register("contactName")}
            type="text"
            placeholder="Jane Smith"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
          />
        </FormField>

        <FormField label="Work email" error={errors.contactEmail?.message} required>
          <input
            {...register("contactEmail")}
            type="email"
            placeholder="jane@yourbusiness.com"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
          />
        </FormField>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500 bg-white/3 rounded-lg px-3 py-2.5 border border-white/5">
        <Lock className="h-3.5 w-3.5 shrink-0" />
        Your information is used only to deliver your report. We do not sell or share your data.
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          type="submit"
          variant="accent"
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Generating your report...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Generate My Free Report
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}
