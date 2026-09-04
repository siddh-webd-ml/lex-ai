import { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp, Check, X, Eye, MessageSquare, ShieldCheck } from 'lucide-react';
import type { Page, Risk, RiskLevel } from '@/types';
import { ResponsibleAIBanner } from '@/components/ResponsibleAIBanner';

interface RisksPageProps {
  risks: Risk[];
  onRiskUpdate: (riskId: string, status: Risk['reviewStatus'], comment: string) => void;
  onNavigate: (page: Page) => void;
}

const LEVEL_CONFIG: Record<RiskLevel, { label: string; color: string; bgColor: string; borderColor: string; dotColor: string }> = {
  high: { label: 'High Risk', color: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-200', dotColor: 'bg-red-500' },
  medium: { label: 'Medium Risk', color: 'text-orange-700', bgColor: 'bg-orange-50', borderColor: 'border-orange-200', dotColor: 'bg-orange-500' },
  low: { label: 'Low Risk', color: 'text-green-700', bgColor: 'bg-green-50', borderColor: 'border-green-200', dotColor: 'bg-green-500' },
};

export function RisksPage({ risks, onRiskUpdate, onNavigate }: RisksPageProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [commentingId, setCommentingId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  const sortedRisks = [...risks].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.level] - order[b.level];
  });

  const counts = {
    high: risks.filter((r) => r.level === 'high').length,
    medium: risks.filter((r) => r.level === 'medium').length,
    low: risks.filter((r) => r.level === 'low').length,
  };

  const reviewedCount = risks.filter((r) => r.reviewStatus !== 'pending').length;

  const handleAction = (riskId: string, status: Risk['reviewStatus']) => {
    onRiskUpdate(riskId, status, risks.find((r) => r.id === riskId)?.reviewComment || '');
    setCommentingId(null);
  };

  const handleSubmitComment = (riskId: string) => {
    onRiskUpdate(riskId, risks.find((r) => r.id === riskId)?.reviewStatus || 'pending', commentText);
    setCommentingId(null);
    setCommentText('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6 animate-fade-in">
        <h1 className="font-serif text-3xl font-bold text-navy-900 mb-1">Risk Detection</h1>
        <p className="text-navy-500">
          Potential risks identified in the document. These require professional review and are not definitive legal conclusions.
        </p>
      </div>

      {/* Risk summary bar */}
      <div className="grid grid-cols-3 gap-3 mb-6 animate-slide-up">
        {(['high', 'medium', 'low'] as RiskLevel[]).map((level) => {
          const config = LEVEL_CONFIG[level];
          return (
            <div key={level} className={`rounded-xl border ${config.borderColor} ${config.bgColor} p-4 text-center`}>
              <div className={`text-2xl font-bold ${config.color}`}>{counts[level]}</div>
              <div className={`text-sm font-medium ${config.color} mt-0.5`}>{config.label}</div>
            </div>
          );
        })}
      </div>

      {/* Review progress */}
      {risks.length > 0 && (
        <div className="mb-6 flex items-center gap-3 bg-white rounded-lg border border-slate-200 px-4 py-3 animate-slide-up">
          <ShieldCheck size={18} className="text-green-600" />
          <span className="text-sm text-navy-600">
            <strong>{reviewedCount}</strong> of {risks.length} risks reviewed
          </span>
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden ml-2">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${(reviewedCount / risks.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Risk cards */}
      <div className="space-y-3">
        {sortedRisks.map((risk, i) => {
          const config = LEVEL_CONFIG[risk.level];
          const isExpanded = expandedId === risk.id;
          const isCommenting = commentingId === risk.id;

          return (
            <div
              key={risk.id}
              className={`bg-white rounded-xl border ${config.borderColor} overflow-hidden animate-slide-up`}
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              {/* Risk header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : risk.id)}
                className="w-full flex items-start gap-4 p-5 text-left hover:bg-slate-50/50 transition-colors"
              >
                <div className={`w-3 h-3 rounded-full ${config.dotColor} mt-1.5 shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold ${config.color} ${config.bgColor} px-2 py-0.5 rounded`}>
                      {config.label}
                    </span>
                    <span className="text-xs font-medium text-navy-400">{risk.clauseNumber} · Page {risk.page}</span>
                    {risk.reviewStatus !== 'pending' && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        <Check size={12} />
                        {risk.reviewStatus === 'accept' ? 'Accepted' : risk.reviewStatus === 'reject' ? 'Rejected' : 'Reviewed'}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-navy-900">{risk.clauseTitle}</h3>
                  <p className="text-sm text-navy-500 mt-1 line-clamp-2">{risk.whyRisky}</p>
                </div>
                {isExpanded ? <ChevronUp size={20} className="text-navy-300 shrink-0 mt-1" /> : <ChevronDown size={20} className="text-navy-300 shrink-0 mt-1" />}
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="px-5 pb-5 border-t border-slate-100 pt-4 animate-fade-in">
                  {/* Original clause */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-navy-400 uppercase tracking-wide mb-2">Original Clause · {risk.clauseNumber} · Page {risk.page}</div>
                    <blockquote className="text-sm text-navy-700 leading-relaxed bg-slate-50 border-l-4 border-navy-300 rounded-r-lg p-4 italic font-serif">
                      "{risk.originalText}"
                    </blockquote>
                  </div>

                  {/* Why risky */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-navy-400 uppercase tracking-wide mb-2">Why It May Be Risky</div>
                    <p className="text-sm text-navy-700 leading-relaxed">{risk.whyRisky}</p>
                  </div>

                  {/* Suggested review area */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-navy-400 uppercase tracking-wide mb-2">Suggested Area for Lawyer Review</div>
                    <p className="text-sm text-navy-700 leading-relaxed bg-blue-50 border border-blue-100 rounded-lg p-3">
                      {risk.reviewArea}
                    </p>
                  </div>

                  {/* Existing comment */}
                  {risk.reviewComment && (
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-navy-400 uppercase tracking-wide mb-2">Lawyer Comment</div>
                      <p className="text-sm text-navy-700 bg-amber-50 border border-amber-100 rounded-lg p-3">{risk.reviewComment}</p>
                    </div>
                  )}

                  {/* Human review actions */}
                  <div className="border-t border-slate-100 pt-4">
                    {risk.reviewStatus === 'pending' ? (
                      <>
                        <div className="text-xs font-semibold text-navy-400 uppercase tracking-wide mb-3">Human Review</div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleAction(risk.id, 'accept')}
                            className="flex items-center gap-1.5 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 font-medium px-3 py-2 text-sm transition-colors border border-green-200"
                          >
                            <Check size={16} />
                            Accept
                          </button>
                          <button
                            onClick={() => handleAction(risk.id, 'reject')}
                            className="flex items-center gap-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-medium px-3 py-2 text-sm transition-colors border border-red-200"
                          >
                            <X size={16} />
                            Reject
                          </button>
                          <button
                            onClick={() => handleAction(risk.id, 'review')}
                            className="flex items-center gap-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 font-medium px-3 py-2 text-sm transition-colors border border-amber-200"
                          >
                            <Eye size={16} />
                            Review
                          </button>
                          <button
                            onClick={() => { setCommentingId(isCommenting ? null : risk.id); setCommentText(risk.reviewComment); }}
                            className="flex items-center gap-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-navy-700 font-medium px-3 py-2 text-sm transition-colors border border-slate-200"
                          >
                            <MessageSquare size={16} />
                            {risk.reviewComment ? 'Edit Comment' : 'Add Comment'}
                          </button>
                        </div>

                        {isCommenting && (
                          <div className="mt-3 animate-slide-up">
                            <textarea
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              placeholder="Add a short comment for this risk..."
                              className="w-full text-sm rounded-lg border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-navy-300 resize-none"
                              rows={2}
                            />
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={() => handleSubmitComment(risk.id)}
                                className="rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-sm font-medium px-4 py-2 transition-colors"
                              >
                                Save Comment
                              </button>
                              <button
                                onClick={() => { setCommentingId(null); setCommentText(''); }}
                                className="rounded-lg bg-white hover:bg-slate-50 text-navy-500 text-sm font-medium px-4 py-2 transition-colors border border-slate-200"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                          <ShieldCheck size={18} />
                          Human Reviewed — {risk.reviewStatus === 'accept' ? 'Accepted' : risk.reviewStatus === 'reject' ? 'Rejected' : 'Flagged for Review'}
                        </div>
                        <button
                          onClick={() => { onRiskUpdate(risk.id, 'pending', risk.reviewComment); setCommentingId(null); }}
                          className="text-sm text-navy-400 hover:text-navy-700 transition-colors"
                        >
                          Undo
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Responsible AI + next steps */}
      <div className="mt-6 space-y-4">
        <ResponsibleAIBanner compact />
        <button
          onClick={() => onNavigate('brief')}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-semibold px-5 py-3.5 transition-all shadow-md"
        >
          Generate Legal Brief
          <ChevronDown size={16} className="-rotate-90" />
        </button>
      </div>
    </div>
  );
}
