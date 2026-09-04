import { Logo } from '@/components/Logo';
import { ResponsibleAIBanner } from '@/components/ResponsibleAIBanner';
import { ArrowRight, Upload, FileSearch, AlertTriangle, MessageSquare, FileText, Check, Scale, Zap, ShieldCheck } from 'lucide-react';
import type { Page } from '@/types';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
  onTryDemo: () => void;
}

export function LandingPage({ onNavigate, onTryDemo }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <header className="absolute top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo />
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-sm font-medium text-navy-600 hover:text-navy-900 transition-colors"
          >
            Dashboard →
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 pt-32 pb-24 px-4 sm:px-6">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(250, 204, 21, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(56, 189, 248, 0.2) 0%, transparent 40%)'
        }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-navy-800/80 border border-navy-700 px-4 py-1.5 mb-6 animate-fade-in">
            <Zap size={14} className="text-accent-400" />
            <span className="text-sm text-navy-200 font-medium">SMU LIT Legal-Tech Hackathon 2026</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.15] mb-6 animate-slide-up">
            Understand Legal Documents.<br />
            <span className="text-accent-400">Faster.</span>
          </h1>
          <p className="text-lg sm:text-xl text-navy-300 max-w-2xl mx-auto leading-relaxed mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            LexAI is an AI-powered legal document assistant that helps lawyers quickly understand contracts, identify potential risks, ask questions, and generate a concise brief.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={onTryDemo}
              className="group flex items-center gap-2 rounded-lg bg-accent-400 hover:bg-accent-300 text-navy-950 font-semibold px-6 py-3.5 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <Zap size={18} />
              Try Demo
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="group flex items-center gap-2 rounded-lg bg-navy-800 hover:bg-navy-700 text-white font-semibold px-6 py-3.5 transition-all border border-navy-700 hover:border-navy-600"
            >
              <Upload size={18} />
              Upload Document
            </button>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center font-serif text-3xl font-bold text-navy-900 mb-3">From document to brief in minutes</h2>
          <p className="text-center text-navy-500 mb-14 max-w-2xl mx-auto">Five steps. One seamless workflow designed for legal professionals.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: FileSearch, title: 'Analyse', desc: 'AI reads the document and extracts parties, dates, obligations, and key clauses.', color: 'bg-blue-50 text-blue-600' },
              { icon: AlertTriangle, title: 'Detect Risks', desc: 'Identifies risky clauses with risk levels and suggested review areas.', color: 'bg-red-50 text-red-600' },
              { icon: MessageSquare, title: 'Ask AI', desc: 'Ask questions about the document with cited sources from the text.', color: 'bg-teal-50 text-teal-600' },
              { icon: FileText, title: 'Generate Brief', desc: 'Produce a concise legal brief ready for lawyer review.', color: 'bg-amber-50 text-amber-600' },
              { icon: ShieldCheck, title: 'Human Review', desc: 'Accept, reject, or review each risk with comments for accountability.', color: 'bg-green-50 text-green-600' },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all animate-slide-up" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className={`w-12 h-12 rounded-lg ${step.color} flex items-center justify-center mb-4`}>
                    <Icon size={22} />
                  </div>
                  <div className="text-xs font-bold text-navy-300 mb-1">STEP {i + 1}</div>
                  <h3 className="font-semibold text-navy-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-navy-500 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features highlight */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Scale, title: 'Built for Legal Professionals', desc: 'Structured analysis that mirrors how lawyers review contracts — parties, obligations, dates, and clauses.' },
              { icon: ShieldCheck, title: 'Human-in-the-loop', desc: 'Every risk can be accepted, rejected, or flagged for review with comments. Final decisions stay with the lawyer.' },
              { icon: Zap, title: 'Instant Demo Mode', desc: 'Try the full workflow with a realistic sample contract — no API key or setup required.' },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="w-10 h-10 rounded-lg bg-navy-900 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-accent-400" />
                  </div>
                  <h3 className="font-semibold text-navy-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-navy-500 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA + Responsible AI */}
      <section className="py-20 px-4 sm:px-6 bg-navy-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">Ready to see it in action?</h2>
          <p className="text-navy-300 mb-8">Load the demo document and walk through the entire workflow in under 5 minutes.</p>
          <button
            onClick={onTryDemo}
            className="group inline-flex items-center gap-2 rounded-lg bg-accent-400 hover:bg-accent-300 text-navy-950 font-semibold px-6 py-3.5 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <Zap size={18} />
            Try Demo Now
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="mt-10 text-left">
            <div className="bg-navy-900/60 rounded-xl p-5 border border-navy-800">
              <ResponsibleAIBanner />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
