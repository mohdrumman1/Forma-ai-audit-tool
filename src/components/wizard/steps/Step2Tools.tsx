"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AssessmentStep2Schema } from "@/lib/schemas";
import { StepWrapper } from "../StepWrapper";
import { FormField } from "../FormField";
import { MultiSelect } from "../MultiSelect";
import { Textarea } from "@/components/ui/textarea";
import { useAssessmentStore } from "@/stores/assessmentStore";

type Step2Data = z.infer<typeof AssessmentStep2Schema>;

const TOOL_OPTIONS = [
  { value: "crm", label: "CRM (e.g. HubSpot, Salesforce, Pipedrive)" },
  { value: "email_marketing", label: "Email marketing (e.g. Mailchimp, ActiveCampaign)" },
  { value: "project_management", label: "Project management (e.g. Asana, Monday, ClickUp)" },
  { value: "accounting", label: "Accounting software (e.g. Xero, QuickBooks, MYOB)" },
  { value: "calendar_scheduling", label: "Calendar/scheduling (e.g. Calendly, Acuity)" },
  { value: "document_management", label: "Document management (e.g. Google Drive, Dropbox, SharePoint)" },
  { value: "communication", label: "Communication tools (e.g. Slack, Teams, Zoom)" },
  { value: "social_media", label: "Social media management" },
  { value: "ecommerce_platform", label: "E-commerce platform (e.g. Shopify, WooCommerce)" },
  { value: "helpdesk", label: "Help desk / support (e.g. Zendesk, Freshdesk, Intercom)" },
  { value: "analytics", label: "Analytics (e.g. Google Analytics, Looker, Mixpanel)" },
  { value: "legal_practice", label: "Legal practice management (e.g. Clio, LEAP, Practice Evolve)" },
  { value: "spreadsheets", label: "Spreadsheets / Excel / Google Sheets" },
  { value: "erp", label: "ERP (e.g. SAP, NetSuite, Odoo)" },
  { value: "none", label: "No specific software tools" },
];

interface Props {
  onBack: () => void;
  onNext: () => void;
}

export function Step2Tools({ onBack, onNext }: Props) {
  const { data, updateData } = useAssessmentStore();

  const { register, handleSubmit, setValue, watch } = useForm<Step2Data>({
    resolver: zodResolver(AssessmentStep2Schema),
    defaultValues: {
      currentTools: data.currentTools ?? [],
      customToolsNote: data.customToolsNote ?? "",
    },
  });

  const currentTools = watch("currentTools");

  const submit = handleSubmit((values) => {
    updateData(values);
    onNext();
  });

  return (
    <StepWrapper
      title="Your current tools & technology"
      subtitle="What software and tools does your business currently use? Select all that apply."
      onBack={onBack}
      onNext={submit}
    >
      <FormField
        label="Current tools & software"
        hint="Select all that apply to your business"
      >
        <MultiSelect
          options={TOOL_OPTIONS}
          value={currentTools}
          onChange={(v) => setValue("currentTools", v)}
          className="sm:grid-cols-2"
        />
      </FormField>

      <FormField
        label="Anything else?"
        htmlFor="customToolsNote"
        hint="Any other tools, platforms, or systems we should know about"
      >
        <Textarea
          id="customToolsNote"
          placeholder="e.g. We use a custom internal system for case management, plus WhatsApp Business for client communication..."
          rows={3}
          {...register("customToolsNote")}
        />
      </FormField>
    </StepWrapper>
  );
}
