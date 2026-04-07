"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AssessmentStep4Schema } from "@/lib/schemas";
import { StepWrapper } from "../StepWrapper";
import { FormField } from "../FormField";
import { Textarea } from "@/components/ui/textarea";
import { useAssessmentStore } from "@/stores/assessmentStore";

type Step4Data = z.infer<typeof AssessmentStep4Schema>;

interface Props {
  onBack: () => void;
  onNext: () => void;
}

export function Step4Operations({ onBack, onNext }: Props) {
  const { data, updateData } = useAssessmentStore();

  const { register, handleSubmit } = useForm<Step4Data>({
    resolver: zodResolver(AssessmentStep4Schema),
    defaultValues: {
      customerSupportProcess: data.customerSupportProcess ?? "",
      onboardingProcess: data.onboardingProcess ?? "",
      appointmentBookingProcess: data.appointmentBookingProcess ?? "",
      invoicingProcess: data.invoicingProcess ?? "",
      internalReportingProcess: data.internalReportingProcess ?? "",
    },
  });

  const submit = handleSubmit((values) => {
    updateData(values);
    onNext();
  });

  return (
    <StepWrapper
      title="Operations & workflows"
      subtitle="Help us understand how your day-to-day operations work. You don't need to be detailed — rough descriptions are fine."
      onBack={onBack}
      onNext={submit}
    >
      <FormField
        label="Customer / client support"
        htmlFor="customerSupportProcess"
        hint="How do clients contact you? Who handles queries? How long does it take?"
      >
        <Textarea
          id="customerSupportProcess"
          placeholder="e.g. Clients email or call us directly. Our receptionist/admin handles initial queries and forwards to the relevant team member. Response times vary from same-day to a few days..."
          rows={3}
          {...register("customerSupportProcess")}
        />
      </FormField>

      <FormField
        label="Client onboarding"
        htmlFor="onboardingProcess"
        hint="What happens after a new client signs or buys?"
      >
        <Textarea
          id="onboardingProcess"
          placeholder="e.g. We send a welcome email manually, set up a client file, schedule an intro call, and send a document checklist. Usually takes 2–3 hours per new client..."
          rows={3}
          {...register("onboardingProcess")}
        />
      </FormField>

      <FormField
        label="Appointment / meeting booking"
        htmlFor="appointmentBookingProcess"
        hint="How are appointments or consultations scheduled?"
      >
        <Textarea
          id="appointmentBookingProcess"
          placeholder="e.g. Clients call to book, we check our calendar manually and call back to confirm. Or we email back and forth until we find a time..."
          rows={3}
          {...register("appointmentBookingProcess")}
        />
      </FormField>

      <FormField
        label="Invoicing & payments"
        htmlFor="invoicingProcess"
        hint="How are invoices created, sent, and chased?"
      >
        <Textarea
          id="invoicingProcess"
          placeholder="e.g. We manually create invoices in Xero at the end of each month. Chasing overdue invoices is done by the owner personally via email..."
          rows={3}
          {...register("invoicingProcess")}
        />
      </FormField>

      <FormField
        label="Internal reporting"
        htmlFor="internalReportingProcess"
        hint="How do you track performance, revenue, and team activity?"
      >
        <Textarea
          id="internalReportingProcess"
          placeholder="e.g. We do a weekly team meeting with a manually updated spreadsheet. No real reporting dashboard — the owner checks everything ad hoc..."
          rows={3}
          {...register("internalReportingProcess")}
        />
      </FormField>
    </StepWrapper>
  );
}
