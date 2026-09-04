import { useState } from 'react';
import { FileText, Sparkles, Loader2, Copy, Check, ArrowRight, Download } from 'lucide-react';
import type { Page, DocumentSummary, Risk, LegalBrief } from '@/types';
import { generateBrief, formatBriefAsText } from '@/services/aiEngine';
import { ResponsibleAIBanner } from '@/components/ResponsibleAIBanner';

interface BriefPageProps {
  summary: DocumentSummary | null;
  risks: Risk[];
  brief: LegalBrief | null;
  onBriefGenerated: (brief: LegalBrief) => void;
  onNavigate: (page: Page) => void;
}

export function BriefPage({ summary, risks, brief, onBriefGenerated, onNavigate }: BriefPageProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!summary) return;
    setIsGenerating(true);
    const result = await generateBrief(summary, risks);
    onBriefGenerated(result);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    if (!brief) return;
    const text = formatBriefAsText(brief);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!brief && !isGenerating) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-navy-900 flex items-center justify-center mx-auto mb-5">
            <FileText size={28} className="text-accent-400" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-navy-900 mb-2">Generate Legal Brief</h1>
          <p className="text-navy-500 max-w-xl mx-auto mb-8">
            Compile a concise legal brief from the analysis, risk detection, and review findings. The brief includes an overview, key facts, important clauses, potential risks, dates, and questions for lawyer review.
          </p>

          {risks.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 max-w-lg mx-auto mb-8 text-left">
              <div className="text-sm font-medium text-navy-700 mb-3">Brief will include:</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-navy-600">
                  <Check size={16} className="text-green-500" /> Document overview & key facts
                </div>
                <div className="flex items-center gap-2 text-sm text-navy-600">
                  <Check size={16} className="text-green-500" /> {summary?.importantClauses.length || 0} important clauses
                </div>
                <div className="flex items-center gap-2 text-sm text-navy-600">
                  <Check size={16} className="text-green-500" /> {risks.length} potential risks
                </div>
                <div className="flex items-center gap-2 text-sm text-navy-600">
                  <Check size={16} className="text-green-500" /> {risks.filter(r => r.reviewStatus !== 'pending').length} human-reviewed items
                </div>
                <div className="flex items-center gap-2 text-sm text-navy-600">
                  <Check size={16} className="text-green-500" /> {summary?.importantDates.length || 0} important dates
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={!summary}
            className="inline-flex items-center gap-2 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-semibold px-6 py-3.5 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            <Sparkles size={18} className="text-accent-400" />
            Generate Legal Brief
          </button>
        </div>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-navy-700 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <FileText size={28} className="text-accent-500" />
            </div>
          </div>
          <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">Generating legal brief...</h2>
          <p className="text-navy-500">Compiling analysis, risks, and review findings</p>
        </div>
        <div className="space-y-3">
          {[
            'Summarising document overview',
            'Extracting key facts',
            'Cataloguing important clauses',
            'Compiling potential risks',
            'Gathering questions for lawyer review',
          ].map((step, i) => (
            <div
              key={step}
              className="flex items-center gap-3 bg-white rounded-lg border border-slate-200 px-4 py-3 animate-slide-up"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <Loader2 size={16} className="text-navy-600 animate-spin" />
              <span className="text-sm text-navy-700">{step}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!brief) return null;

  const sections = [
    { title: 'Document Overview', content: brief.overview, type: 'text' as const },
    { title: 'Key Facts', content: brief.keyFacts, type: 'list' as const },
    { title: 'Important Clauses', content: brief.importantClauses, type: 'list' as const },
    { title: 'Potential Risks', content: brief.potentialRisks, type: 'list' as const },
    { title: 'Important Dates', content: brief.importantDates, type: 'list' as const },
    { title: 'Questions for Lawyer Review', content: brief.questionsForReview, type: 'list' as const },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6 animate-fade-in">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
          <h1 className="font-serif text-3xl font-bold text-navy-900">Legal Brief</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 rounded-lg bg-white hover:bg-slate-50 text-navy-700 font-medium px-4 py-2.5 text-sm transition-colors border border-slate-300"
            >
              {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy Brief'}
            </button>
          </div>
        </div>
        <p className="text-navy-500">AI-generated brief compiled from document analysis and risk detection.</p>
      </div>

      {/* Brief content */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden animate-slide-up">
        {/* Brief header */}
        <div className="bg-navy-900 px-6 py-5">
          <div className="flex items-center gap-3">
            <FileText size={22} className="text-accent-400" />
            <div>
              <h2 className="font-serif text-lg font-bold text-white">{summary?.title}</h2>
              <p className="text-sm text-navy-300">AI-Generated Legal Brief · {new Date().toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {sections.map((section, i) => (
            <div key={section.title} className="animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <h3 className="font-semibold text-navy-900 mb-3 pb-2 border-b border-slate-100 text-[15px] uppercase tracking-wide text-sm">
                {section.title}
              </h3>
              {section.type === 'text' ? (
                <p className="text-sm text-navy-700 leading-relaxed">{section.content as string}</p>
              ) : (
                <ul className="space-y-2">
                  {(section.content as string[]).map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-navy-700 leading-relaxed">
                      <span className="text-navy-300 mt-1 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Brief footer */}
        <div className="px-6 py-4 bg-amber-50 border-t border-amber-100">
          <p className="text-xs text-amber-800 leading-relaxed">
            AI-generated insights are for research and decision-support only. Final legal decisions should be reviewed by a qualified legal professional.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 space-y-4">
        <ResponsibleAIBanner compact />
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-semibold px-5 py-3.5 transition-all shadow-md"
          >
            Back to Dashboard
            <ArrowRight size={16} />
          </button>
          <button
            onClick={handleGenerate}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-white hover:bg-slate-50 text-navy-700 font-semibold px-5 py-3.5 transition-all border border-slate-300"
          >
            <Download size={16} />
            Regenerate Brief
          </button>
        </div>
      </div>
    </div>
  );
}
