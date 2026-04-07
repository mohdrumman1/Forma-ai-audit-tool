"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AssessmentStep1Schema } from "@/lib/schemas";
import { StepWrapper } from "../StepWrapper";
import { FormField } from "../FormField";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAssessmentStore } from "@/stores/assessmentStore";

type Step1Data = z.infer<typeof AssessmentStep1Schema>;

const INDUSTRY_OPTIONS = [
  "Legal Services",
  "Accounting & Finance",
  "Real Estate",
  "Healthcare & Medical",
  "Construction & Trades",
  "Hospitality & Restaurants",
  "Retail & E-commerce",
  "Professional Consulting",
  "Technology & Software",
  "Marketing & Advertising",
  "Property Management",
  "Insurance",
  "Education & Training",
  "Logistics & Transport",
  "Manufacturing",
  "Other",
];

const BUSINESS_TYPES = [
  { value: "service_based", label: "Service-Based Business" },
  { value: "product_based", label: "Product-Based Business" },
  { value: "saas", label: "SaaS / Software" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "professional_services", label: "Professional Services" },
  { value: "healthcare", label: "Healthcare" },
  { value: "legal", label: "Legal" },
  { value: "finance", label: "Finance / Accounting" },
  { value: "real_estate", label: "Real Estate" },
  { value: "construction", label: "Construction / Trades" },
  { value: "education", label: "Education" },
  { value: "hospitality", label: "Hospitality" },
  { value: "other", label: "Other" },
];

const TEAM_SIZES = [
  { value: "solo", label: "Solo (just me)" },
  { value: "2-5", label: "2–5 people" },
  { value: "6-15", label: "6–15 people" },
  { value: "16-50", label: "16–50 people" },
  { value: "51-200", label: "51–200 people" },
  { value: "200+", label: "200+ people" },
];

const REVENUE_RANGES = [
  { value: "under_10k", label: "Under $10,000 / month" },
  { value: "10k_50k", label: "$10,000 – $50,000 / month" },
  { value: "50k_150k", label: "$50,000 – $150,000 / month" },
  { value: "150k_500k", label: "$150,000 – $500,000 / month" },
  { value: "500k_1m", label: "$500,000 – $1M / month" },
  { value: "over_1m", label: "Over $1M / month" },
];

interface Props {
  onNext: () => void;
}

export function Step1Basics({ onNext }: Props) {
  const { data, updateData } = useAssessmentStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(AssessmentStep1Schema),
    defaultValues: {
      businessName: data.businessName ?? "",
      industry: data.industry ?? "",
      businessType: data.businessType,
      teamSize: data.teamSize,
      monthlyRevenue: data.monthlyRevenue,
      staffCount: data.staffCount ?? 1,
    },
  });

  const submit = handleSubmit((values) => {
    updateData(values);
    onNext();
  });

  return (
    <StepWrapper
      title="Tell us about your business"
      subtitle="Start with the basics. This helps us understand your context and scale."
      onNext={submit}
    >
      <FormField label="Business name" htmlFor="businessName" required error={errors.businessName?.message}>
        <Input id="businessName" placeholder="e.g. Apex Legal Group" {...register("businessName")} />
      </FormField>

      <FormField label="Industry" htmlFor="industry" required error={errors.industry?.message}>
        <Select
          defaultValue={data.industry}
          onValueChange={(v) => setValue("industry", v)}
        >
          <SelectTrigger id="industry">
            <SelectValue placeholder="Select your industry" />
          </SelectTrigger>
          <SelectContent>
            {INDUSTRY_OPTIONS.map((opt) => (
              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.industry && (
          <p className="text-xs text-red-400">{errors.industry.message}</p>
        )}
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Business type" required error={errors.businessType?.message}>
          <Select
            defaultValue={data.businessType}
            onValueChange={(v) => setValue("businessType", v as Step1Data["businessType"])}
          >
            <SelectTrigger>
              <SelectValue placeholder="Business type" />
            </SelectTrigger>
            <SelectContent>
              {BUSINESS_TYPES.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Team size" required error={errors.teamSize?.message}>
          <Select
            defaultValue={data.teamSize}
            onValueChange={(v) => setValue("teamSize", v as Step1Data["teamSize"])}
          >
            <SelectTrigger>
              <SelectValue placeholder="Team size" />
            </SelectTrigger>
            <SelectContent>
              {TEAM_SIZES.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Monthly revenue (approximate)" required error={errors.monthlyRevenue?.message}>
          <Select
            defaultValue={data.monthlyRevenue}
            onValueChange={(v) => setValue("monthlyRevenue", v as Step1Data["monthlyRevenue"])}
          >
            <SelectTrigger>
              <SelectValue placeholder="Revenue range" />
            </SelectTrigger>
            <SelectContent>
              {REVENUE_RANGES.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField
          label="Number of staff (approx.)"
          htmlFor="staffCount"
          error={errors.staffCount?.message}
          hint="Including part-time and contractors"
        >
          <Input
            id="staffCount"
            type="number"
            min={1}
            max={10000}
            placeholder="e.g. 12"
            {...register("staffCount", { valueAsNumber: true })}
          />
        </FormField>
      </div>
    </StepWrapper>
  );
}
