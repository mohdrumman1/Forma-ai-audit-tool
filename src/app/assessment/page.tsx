import { Metadata } from "next";
import { AssessmentWizard } from "@/components/wizard/AssessmentWizard";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "AI Opportunity Assessment | Forma AI",
  description: "Complete your free AI opportunity assessment and get an instant tailored report for your business.",
};

export default function AssessmentPage() {
  return (
    <>
      <Navbar />
      <AssessmentWizard />
    </>
  );
}
