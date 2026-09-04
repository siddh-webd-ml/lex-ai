import { Logo } from '@/components/Logo';
import { LayoutDashboard, FileSearch, AlertTriangle, MessageSquare, FileText, Home } from 'lucide-react';
import type { Page } from '@/types';

interface AppShellProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  hasDocument: boolean;
  hasAnalysis: boolean;
  children: React.ReactNode;
}

const NAV_ITEMS: { page: Page; label: string; icon: typeof Home; requiresDoc: boolean; requiresAnalysis: boolean }[] = [
  { page: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, requiresDoc: false, requiresAnalysis: false },
  { page: 'analysis', label: 'Analysis', icon: FileSearch, requiresDoc: true, requiresAnalysis: false },
  { page: 'risks', label: 'Risk Detection', icon: AlertTriangle, requiresDoc: true, requiresAnalysis: true },
  { page: 'askai', label: 'Ask AI', icon: MessageSquare, requiresDoc: true, requiresAnalysis: true },
  { page: 'brief', label: 'Legal Brief', icon: FileText, requiresDoc: true, requiresAnalysis: true },
];

export function AppShell({ currentPage, onNavigate, hasDocument, hasAnalysis, children }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="sticky top-0 z-40 bg-navy-900 text-white border-b border-navy-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => onNavigate('landing')} className="hover:opacity-90 transition-opacity">
              <Logo light />
            </button>
            <nav className="flex items-center gap-1 overflow-x-auto scrollbar-thin">
              {NAV_ITEMS.map((item) => {
    const disabled = (item.requiresDoc && !hasDocument) || (item.requiresAnalysis && !hasAnalysis);
    const Icon = item.icon;
    return (
                  <button
                    key={item.page}
                    onClick={() => !disabled && onNavigate(item.page)}
                    disabled={disabled}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap
                      ${currentPage === item.page
                        ? 'bg-navy-700 text-white'
                        : disabled
                          ? 'text-navy-500 cursor-not-allowed'
                          : 'text-navy-300 hover:bg-navy-800 hover:text-white'}`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-navy-900 text-navy-400 py-4 px-6 text-center text-xs border-t border-navy-800">
        <p>LexAI — SMU LIT Legal-Tech Hackathon 2026 · AI-generated insights are for research and decision-support only.</p>
      </footer>
    </div>
  );
}
