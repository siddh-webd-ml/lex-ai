import { FileText, AlertTriangle, ShieldAlert, Clock, Zap, Upload, ArrowRight, FileSearch } from 'lucide-react';
import type { Page, DocumentSummary, Risk } from '@/types';

interface DashboardPageProps {
  onNavigate: (page: Page) => void;
  onTryDemo: () => void;
  onUpload: () => void;
  summary: DocumentSummary | null;
  risks: Risk[];
  hasDocument: boolean;
}

export function DashboardPage({ onNavigate, onTryDemo, onUpload, summary, risks, hasDocument }: DashboardPageProps) {
  const documentsAnalysed = summary ? 1 : 0;
  const risksFound = risks.length;
  const highRiskCount = risks.filter((r) => r.level === 'high').length;
  const reviewedCount = risks.filter((r) => r.reviewStatus !== 'pending').length;

  const stats = [
    { label: 'Documents Analysed', value: documentsAnalysed, icon: FileText, color: 'bg-blue-500' },
    { label: 'Risks Found', value: risksFound, icon: AlertTriangle, color: 'bg-amber-500' },
    { label: 'High-Risk Clauses', value: highRiskCount, icon: ShieldAlert, color: 'bg-red-500' },
    { label: 'Reviewed', value: reviewedCount, icon: FileSearch, color: 'bg-green-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8 animate-fade-in">
        <h1 className="font-serif text-3xl font-bold text-navy-900 mb-1">Dashboard</h1>
        <p className="text-navy-500">Overview of your document analysis and risk detection activity.</p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8 animate-slide-up">
        <button
          onClick={onTryDemo}
          className="group flex items-center justify-center gap-2 rounded-lg bg-accent-400 hover:bg-accent-300 text-navy-950 font-semibold px-5 py-3 transition-all shadow-md hover:shadow-lg"
        >
          <Zap size={18} />
          Try Demo Document
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <button
          onClick={onUpload}
          className="flex items-center justify-center gap-2 rounded-lg bg-white hover:bg-slate-50 text-navy-700 font-semibold px-5 py-3 transition-all border border-slate-300 shadow-sm"
        >
          <Upload size={18} />
          Upload New Document
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow animate-slide-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Icon size={20} className="text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-navy-900">{stat.value}</div>
              <div className="text-sm text-navy-500 mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Recent documents */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-navy-900 flex items-center gap-2">
            <Clock size={18} className="text-navy-400" />
            Recent Documents
          </h2>
        </div>
        {hasDocument && summary ? (
          <div className="divide-y divide-slate-100">
            <button
              onClick={() => onNavigate('analysis')}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-navy-100 flex items-center justify-center shrink-0">
                  <FileText size={20} className="text-navy-600" />
                </div>
                <div>
                  <div className="font-medium text-navy-900">{summary.title}</div>
                  <div className="text-sm text-navy-400">
                    {summary.documentType} · {summary.parties.length} parties · {risks.length} risks found
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  Analysed
                </span>
                <ArrowRight size={18} className="text-navy-300 group-hover:text-navy-600 group-hover:translate-x-1 transition-all" />
              </div>
            </button>
          </div>
        ) : (
          <div className="px-6 py-16 text-center">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <FileText size={24} className="text-slate-400" />
            </div>
            <p className="text-navy-500 mb-1">No documents yet</p>
            <p className="text-sm text-navy-400 mb-5">Upload a document or try the demo to get started.</p>
            <button
              onClick={onTryDemo}
              className="inline-flex items-center gap-2 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-medium px-4 py-2.5 transition-colors text-sm"
            >
              <Zap size={16} />
              Try Demo Document
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
