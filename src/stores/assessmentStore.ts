import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FullAssessmentInput } from "@/lib/schemas";

interface AssessmentStore {
  currentStep: number;
  data: Partial<FullAssessmentInput>;
  setStep: (step: number) => void;
  updateData: (update: Partial<FullAssessmentInput>) => void;
  reset: () => void;
}

const defaultData: Partial<FullAssessmentInput> = {
  currentTools: [],
  leadSources: [],
  currentAIUsage: "none",
  staffCount: 1,
};

export const useAssessmentStore = create<AssessmentStore>()(
  persist(
    (set) => ({
      currentStep: 1,
      data: defaultData,
      setStep: (step) => set({ currentStep: step }),
      updateData: (update) =>
        set((state) => ({ data: { ...state.data, ...update } })),
      reset: () => set({ currentStep: 1, data: defaultData }),
    }),
    {
      name: "forma-assessment",
    }
  )
);
