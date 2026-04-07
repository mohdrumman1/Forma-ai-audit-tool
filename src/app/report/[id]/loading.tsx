import { Loader2 } from "lucide-react";

export default function ReportLoading() {
  return (
    <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-10 w-10 text-brand-400 animate-spin mx-auto mb-4" />
        <p className="text-white font-semibold text-lg">Loading your report…</p>
        <p className="text-slate-500 text-sm mt-2">Please wait a moment</p>
      </div>
    </div>
  );
}
