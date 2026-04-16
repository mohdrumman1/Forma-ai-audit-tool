"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AssessmentStep3Schema } from "@/lib/schemas";
import { StepWrapper } from "../StepWrapper";
import { FormField } from "../FormField";
import { MultiSelect } from "../MultiSelect";
import { Textarea } from "@/components/ui/textarea";
import { useAssessmentStore } from "@/stores/assessmentStore";

type Step3Data = z.infer<typeof AssessmentStep3Schema>;

const LEAD_SOURCE_OPTIONS = [
  { value: "referrals", label: "Word of mouth / referrals" },
  { value: "website", label: "Website / SEO" },
  { value: "google_ads", label: "Google Ads / PPC" },
  { value: "social_media", label: "Social media" },
  { value: "networking", label: "Networking / events" },
  { value: "cold_outreach", label: "Cold outreach / cold calling" },
  { value: "directories", label: "Online directories / marketplaces" },
  { value: "existing_clients", label: "Existing client upsells" },
  { value: "partnerships", label: "Partnerships / affiliates" },
  { value: "inbound_phone", label: "Inbound phone calls" },
  { value: "other", label: "Other" },
];

interface Props {
  onBack: () => void;
  onNext: () => void;
}

export function Step3LeadSales({ onBack, onNext }: Props) {
  const { data, updateData } = useAssessmentStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Step3Data>({
    resolver: zodResolver(AssessmentStep3Schema),
    defaultValues: {
      leadSources: data.leadSources ?? [],
      followUpProcess: data.followUpProcess ?? "",
      salesProcess: data.salesProcess ?? "",
      quotingProcess: data.quotingProcess ?? "",
    },
  });

  const leadSources = watch("leadSources");

  const submit = handleSubmit((values) => {
    updateData(values);
    onNext();
  });

  return (
    <StepWrapper
      title="Lead generation & sales"
      subtitle="How do you attract and convert clients? This helps us identify revenue leakage and automation opportunities."
      onBack={onBack}
      onNext={submit}
    >
      <FormField
        label="How do leads come into your business?"
        required
        error={errors.leadSources?.message as string}
        hint="Select all that apply"
      >
        <MultiSelect
          options={LEAD_SOURCE_OPTIONS}
          value={leadSources}
          onChange={(v) => setValue("leadSources", v)}
        />
      </FormField>

      <FormField
        label="How do you follow up with new leads?"
        htmlFor="followUpProcess"
        required
        error={errors.followUpProcess?.message}
        hint="Describe what happens after a lead comes in. Who does what, and how quickly?"
      >
        <Textarea
          id="followUpProcess"
          placeholder="e.g. We receive an enquiry via our website contact form. Someone manually checks emails each morning and responds within 24–48 hours. We don't have a formal follow-up sequence..."
          rows={4}
          {...register("followUpProcess")}
        />
      </FormField>

      <FormField
        label="Describe your sales process"
        htmlFor="salesProcess"
        required
        error={errors.salesProcess?.message}
        hint="From first contact to signed/converted client: what are the steps?"
      >
        <Textarea
          id="salesProcess"
          placeholder="e.g. Initial call → discovery meeting → proposal sent manually → follow up by phone → close. Takes 1–3 weeks on average..."
          rows={4}
          {...register("salesProcess")}
        />
      </FormField>

      <FormField
        label="How do you handle quotes and proposals?"
        htmlFor="quotingProcess"
        hint="How long does it take? How are they created?"
      >
        <Textarea
          id="quotingProcess"
          placeholder="e.g. We build proposals manually in Word/Google Docs. Each one takes 1–2 hours. Sometimes they get forgotten and never sent..."
          rows={3}
          {...register("quotingProcess")}
        />
      </FormField>
    </StepWrapper>
  );
}
