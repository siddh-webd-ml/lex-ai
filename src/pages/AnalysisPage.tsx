import { useState } from 'react';
import { FileSearch, Users, Calendar, ListChecks, BookOpen, Sparkles, Loader2, Check, AlertTriangle, ArrowRight } from 'lucide-react';
import type { Page, DocumentSummary } from '@/types';
import { ResponsibleAIBanner } from '@/components/ResponsibleAIBanner';

interface AnalysisPageProps {
  summary: DocumentSummary | null;
  isAnalysing: boolean;
  onAnalyse: () => void;
  onNavigate: (page: Page) => void;
  documentTitle: string;
  documentType: string;
  documentPages: number;
}

export function AnalysisPage({
  summary,
  isAnalysing,
  onAnalyse,
  onNavigate,
  documentTitle,
  documentType,
  documentPages,
}: AnalysisPageProps) {
  const [activeTab, setActiveTab] = useState<'summary' | 'parties' | 'dates' | 'obligations' | 'clauses'>('summary');

  if (!summary && !isAnalysing) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-navy-900 flex items-center justify-center mx-auto mb-5">
            <FileSearch size={28} className="text-accent-400" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-navy-900 mb-2">Document Analysis</h1>
          <p className="text-navy-500 mb-8">
            <span className="font-medium text-navy-700">{documentTitle}</span> · {documentType} · {documentPages} pages
          </p>
          <p className="text-navy-500 max-w-xl mx-auto mb-8">
            Run the AI analysis to extract a summary, parties, important dates, key obligations, and important clauses from this document.
          </p>
          <button
            onClick={onAnalyse}
            className="inline-flex items-center gap-2 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-semibold px-6 py-3.5 transition-all shadow-lg hover:shadow-xl"
          >
            <Sparkles size={18} className="text-accent-400" />
            Analyse Document
          </button>
        </div>
      </div>
    );
  }

  if (isAnalysing) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-navy-700 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles size={28} className="text-accent-500" />
            </div>
          </div>
          <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">Analysing document...</h2>
          <p className="text-navy-500">Extracting key information from {documentTitle}</p>
        </div>

        <div className="space-y-3">
          {[
            { label: 'Reading document structure', delay: '0s' },
            { label: 'Extracting parties and roles', delay: '0.3s' },
            { label: 'Identifying important dates', delay: '0.6s' },
            { label: 'Mapping key obligations', delay: '0.9s' },
            { label: 'Cataloguing important clauses', delay: '1.2s' },
          ].map((step, i) => (
            <div
              key={step.label}
              className="flex items-center gap-3 bg-white rounded-lg border border-slate-200 px-4 py-3 animate-slide-up"
              style={{ animationDelay: step.delay }}
            >
              <div className="w-8 h-8 rounded-full bg-navy-50 flex items-center justify-center shrink-0">
                <Loader2 size={16} className="text-navy-600 animate-spin" style={{ animationDelay: `${i * 0.2}s` }} />
              </div>
              <span className="text-sm text-navy-700">{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!summary) return null;

  const tabs = [
    { id: 'summary' as const, label: 'AI Summary', icon: FileSearch },
    { id: 'parties' as const, label: 'Parties', icon: Users },
    { id: 'dates' as const, label: 'Important Dates', icon: Calendar },
    { id: 'obligations' as const, label: 'Key Obligations', icon: ListChecks },
    { id: 'clauses' as const, label: 'Important Clauses', icon: BookOpen },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Document header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 animate-fade-in">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-navy-900 flex items-center justify-center shrink-0">
              <FileSearch size={24} className="text-accent-400" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-navy-900">{summary.title}</h1>
              <p className="text-sm text-navy-400">{summary.documentType} · {documentPages} pages</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-600 font-medium bg-green-50 px-3 py-1.5 rounded-full">
            <Check size={16} />
            Analysis Complete
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto scrollbar-thin bg-white rounded-xl border border-slate-200 p-1.5 animate-slide-up">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap
                ${activeTab === tab.id
                  ? 'bg-navy-900 text-white'
                  : 'text-navy-500 hover:text-navy-800 hover:bg-slate-50'}`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 animate-fade-in">
        {activeTab === 'summary' && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={18} className="text-accent-500" />
              <h2 className="font-semibold text-navy-900">AI-Generated Summary</h2>
            </div>
            <p className="text-navy-700 leading-relaxed text-[15px]">{summary.summary}</p>
          </div>
        )}

        {activeTab === 'parties' && (
          <div className="space-y-4">
            <h2 className="font-semibold text-navy-900 mb-4">Parties to the Agreement</h2>
            {summary.parties.map((party, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center shrink-0">
                  <Users size={18} className="text-accent-400" />
                </div>
                <div>
                  <div className="font-semibold text-navy-900">{party.name}</div>
                  <div className="text-sm text-navy-500">{party.role}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'dates' && (
          <div className="space-y-4">
            <h2 className="font-semibold text-navy-900 mb-4">Important Dates</h2>
            <div className="relative pl-6 border-l-2 border-navy-100 space-y-5">
              {summary.importantDates.map((date, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[27px] w-4 h-4 rounded-full bg-navy-900 border-2 border-white shadow" />
                  <div className="font-semibold text-navy-900">{date.label}</div>
                  <div className="text-sm text-accent-600 font-medium mt-0.5">{date.date}</div>
                  <div className="text-sm text-navy-500 mt-0.5">{date.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'obligations' && (
          <div className="space-y-3">
            <h2 className="font-semibold text-navy-900 mb-4">Key Obligations</h2>
            {summary.keyObligations.map((obligation, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <ListChecks size={16} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-navy-700">{obligation.party}</div>
                  <div className="text-sm text-navy-600 mt-0.5">{obligation.obligation}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'clauses' && (
          <div className="space-y-3">
            <h2 className="font-semibold text-navy-900 mb-4">Important Clauses</h2>
            {summary.importantClauses.map((clause, i) => (
              <div key={i} className="p-4 rounded-lg border border-slate-100 hover:border-navy-200 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white bg-navy-700 px-2 py-0.5 rounded">{clause.clauseNumber}</span>
                    <span className="font-semibold text-navy-900">{clause.title}</span>
                  </div>
                  <span className="text-xs text-navy-400">Page {clause.page}</span>
                </div>
                <p className="text-sm text-navy-600 leading-relaxed">{clause.summary}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Responsible AI + Next steps */}
      <div className="mt-6 space-y-4">
        <ResponsibleAIBanner compact />
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onNavigate('risks')}
            className="group flex-1 flex items-center justify-center gap-2 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-semibold px-5 py-3.5 transition-all shadow-md"
          >
            <AlertTriangle size={18} className="text-accent-400" />
            View Risk Detection
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => onNavigate('askai')}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-white hover:bg-slate-50 text-navy-700 font-semibold px-5 py-3.5 transition-all border border-slate-300"
          >
            Ask AI Questions
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
