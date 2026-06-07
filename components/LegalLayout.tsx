import { AlertTriangle } from "lucide-react";

interface Props {
  title: string;
  updated: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, updated, children }: Props) {
  return (
    <div>
      <div className="bg-wine-900 text-white py-12 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-display font-bold">{title}</h1>
        <p className="text-wine-100/70 text-sm mt-2">Last updated: {updated}</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Template notice */}
        <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
          <AlertTriangle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>Template notice:</strong> This page is a starting template and not legal advice.
            Please have it reviewed and adapted by a qualified solicitor before you rely on it —
            especially given the nature of the products and UK/EU consumer &amp; data-protection law.
          </p>
        </div>

        <div className="legal-content space-y-6 text-[15px] text-gray-700 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
