import { ShieldAlert } from 'lucide-react';

export function ResponsibleAIBanner({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex items-start gap-2 rounded-md bg-amber-50 border border-amber-200 px-3 py-2">
        <ShieldAlert size={16} className="text-amber-600 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-800 leading-relaxed">
          AI-generated insights are for research and decision-support only. Final legal decisions should be reviewed by a qualified legal professional.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
      <ShieldAlert size={20} className="text-amber-600 mt-0.5 shrink-0" />
      <div>
        <p className="text-sm font-medium text-amber-900">Responsible AI Notice</p>
        <p className="text-sm text-amber-800 mt-0.5 leading-relaxed">
          AI-generated insights are for research and decision-support only. Risk levels indicate <strong>potential risks requiring professional review</strong>, not definitive legal conclusions. Final legal decisions should be reviewed by a qualified legal professional.
        </p>
      </div>
    </div>
  );
}
