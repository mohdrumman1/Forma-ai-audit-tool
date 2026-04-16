"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AssessmentStep5Schema } from "@/lib/schemas";
import { StepWrapper } from "../StepWrapper";
import { FormField } from "../FormField";
import { Textarea } from "@/components/ui/textarea";
import { useAssessmentStore } from "@/stores/assessmentStore";

type Step5Data = z.infer<typeof AssessmentStep5Schema>;

interface Props {
  onBack: () => void;
  onNext: () => void;
}

export function Step5PainPoints({ onBack, onNext }: Props) {
  const { data, updateData } = useAssessmentStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step5Data>({
    resolver: zodResolver(AssessmentStep5Schema),
    defaultValues: {
      adminTasks: data.adminTasks ?? "",
      biggestBottlenecks: data.biggestBottlenecks ?? "",
      timeConsumingTasks: data.timeConsumingTasks ?? "",
      errorProneTasks: data.errorProneTasks ?? "",
      moneyLeakageAreas: data.moneyLeakageAreas ?? "",
    },
  });

  const submit = handleSubmit((values) => {
    updateData(values);
    onNext();
  });

  return (
    <StepWrapper
      title="Pain points & hidden costs"
      subtitle="This is where most of the financial upside gets uncovered. Be honest. There are no wrong answers."
      onBack={onBack}
      onNext={submit}
    >
      <FormField
        label="What admin and repetitive tasks consume the most time?"
        htmlFor="adminTasks"
        required
        error={errors.adminTasks?.message}
        hint="Think about tasks done weekly or daily that feel tedious or mechanical"
      >
        <Textarea
          id="adminTasks"
          placeholder="e.g. Data entry between systems, copying info from emails into spreadsheets, chasing clients for documents, manually scheduling meetings, copy-pasting reports..."
          rows={4}
          {...register("adminTasks")}
        />
      </FormField>

      <FormField
        label="What are your biggest operational bottlenecks?"
        htmlFor="biggestBottlenecks"
        required
        error={errors.biggestBottlenecks?.message}
        hint="What slows you down the most? What do people constantly complain about?"
      >
        <Textarea
          id="biggestBottlenecks"
          placeholder="e.g. Getting client documents is slow, proposals take too long to prepare, too many back-and-forth emails, one person is a knowledge bottleneck..."
          rows={4}
          {...register("biggestBottlenecks")}
        />
      </FormField>

      <FormField
        label="Which tasks take the most hours per week?"
        htmlFor="timeConsumingTasks"
        required
        error={errors.timeConsumingTasks?.message}
        hint="Think about activities that eat up your team's best hours"
      >
        <Textarea
          id="timeConsumingTasks"
          placeholder="e.g. Writing client updates (3 hrs/week), preparing reports (5 hrs/week), answering the same FAQ emails over and over (2 hrs/week)..."
          rows={4}
          {...register("timeConsumingTasks")}
        />
      </FormField>

      <FormField
        label="Where do mistakes or errors most commonly happen?"
        htmlFor="errorProneTasks"
        hint="What processes are most vulnerable to human error?"
      >
        <Textarea
          id="errorProneTasks"
          placeholder="e.g. Incorrect data when moved between systems, missed follow-up appointments, billing errors, duplicate client records..."
          rows={3}
          {...register("errorProneTasks")}
        />
      </FormField>

      <FormField
        label="Where do you think your business is leaking money?"
        htmlFor="moneyLeakageAreas"
        hint="Your gut instinct here is valuable, even if you can't quantify it"
      >
        <Textarea
          id="moneyLeakageAreas"
          placeholder="e.g. Leads we don't follow up on fast enough, time spent on low-value clients, late invoices, staff time wasted on things that could be automated..."
          rows={3}
          {...register("moneyLeakageAreas")}
        />
      </FormField>
    </StepWrapper>
  );
}
