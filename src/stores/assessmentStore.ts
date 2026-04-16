import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FullAssessmentInput } from "@/lib/schemas";

interface AssessmentStore {
  currentStep: number;
  data: Partial<FullAssessmentInput>;
  contactName: string;
  contactEmail: string;
  setStep: (step: number) => void;
  updateData: (update: Partial<FullAssessmentInput>) => void;
  setContact: (name: string, email: string) => void;
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
      contactName: "",
      contactEmail: "",
      setStep: (step) => set({ currentStep: step }),
      updateData: (update) =>
        set((state) => ({ data: { ...state.data, ...update } })),
      setContact: (contactName, contactEmail) => set({ contactName, contactEmail }),
      reset: () => set({ currentStep: 1, data: defaultData, contactName: "", contactEmail: "" }),
    }),
    {
      name: "forma-assessment",
    }
  )
);
