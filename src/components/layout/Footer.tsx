import Link from "next/link";
import { ExternalLink } from "lucide-react";

const FORMA_WEBSITE = process.env.NEXT_PUBLIC_FORMA_AI_WEBSITE_URL ?? "https://formaai.info";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-xs">
              F
            </div>
            <span className="text-white font-semibold">
              Forma <span className="text-brand-400">AI</span>
            </span>
          </div>
          <p className="text-sm text-slate-500 text-center">
            AI strategy and automation consultancy.{" "}
            <Link
              href={FORMA_WEBSITE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 hover:text-brand-300 inline-flex items-center gap-1"
            >
              formaai.info <ExternalLink className="h-3 w-3" />
            </Link>
          </p>
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Forma AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
