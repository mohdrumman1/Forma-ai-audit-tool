import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileSearch, ArrowLeft } from "lucide-react";

export default function ReportNotFound() {
  return (
    <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
          <FileSearch className="h-8 w-8 text-slate-500" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Report Not Found</h1>
        <p className="text-slate-400 mb-8">
          This report may have expired, or the link may be incorrect. Please
          complete a new assessment to generate a fresh report.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="default" size="lg">
            <Link href="/assessment">Start New Assessment</Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
