import { useState, useCallback } from 'react';
import { AppShell } from '@/components/AppShell';
import { LandingPage } from '@/pages/LandingPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { AnalysisPage } from '@/pages/AnalysisPage';
import { RisksPage } from '@/pages/RisksPage';
import { AskAIPage } from '@/pages/AskAIPage';
import { BriefPage } from '@/pages/BriefPage';
import { analyseDocument } from '@/services/aiEngine';
import { DEMO_DOCUMENT, DEMO_SUMMARY, DEMO_RISKS } from '@/data/demoDocument';
import type { Page, DocumentSummary, Risk, ChatMessage, LegalBrief } from '@/types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [document, setDocument] = useState(DEMO_DOCUMENT);
  const [summary, setSummary] = useState<DocumentSummary | null>(null);
  const [risks, setRisks] = useState<Risk[]>([]);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [brief, setBrief] = useState<LegalBrief | null>(null);

  const hasDocument = document !== null;
  const hasAnalysis = summary !== null && risks.length > 0;

  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const handleTryDemo = useCallback(() => {
    setDocument(DEMO_DOCUMENT);
    setSummary(null);
    setRisks([]);
    setChatMessages([]);
    setBrief(null);
    setCurrentPage('dashboard');
  }, []);

  const handleUpload = useCallback(() => {
    setDocument(DEMO_DOCUMENT);
    setSummary(null);
    setRisks([]);
    setChatMessages([]);
    setBrief(null);
    setCurrentPage('analysis');
  }, []);

  const handleAnalyse = useCallback(async () => {
    setIsAnalysing(true);
    setCurrentPage('analysis');
    const result = await analyseDocument();
    setSummary(result.summary);
    setRisks(result.risks);
    setIsAnalysing(false);
  }, []);

  const handleRiskUpdate = useCallback((riskId: string, status: Risk['reviewStatus'], comment: string) => {
    setRisks((prev) =>
      prev.map((r) =>
        r.id === riskId ? { ...r, reviewStatus: status, reviewComment: comment } : r,
      ),
    );
  }, []);

  const handleAddMessage = useCallback((msg: ChatMessage) => {
    setChatMessages((prev) => [...prev, msg]);
  }, []);

  const handleBriefGenerated = useCallback((newBrief: LegalBrief) => {
    setBrief(newBrief);
  }, []);

  if (currentPage === 'landing') {
    return <LandingPage onNavigate={handleNavigate} onTryDemo={handleTryDemo} />;
  }

  return (
    <AppShell
      currentPage={currentPage}
      onNavigate={handleNavigate}
      hasDocument={hasDocument}
      hasAnalysis={hasAnalysis}
    >
      {currentPage === 'dashboard' && (
        <DashboardPage
          onNavigate={handleNavigate}
          onTryDemo={handleTryDemo}
          onUpload={handleUpload}
          summary={summary}
          risks={risks}
          hasDocument={hasDocument}
        />
      )}

      {currentPage === 'analysis' && (
        <AnalysisPage
          summary={summary}
          isAnalysing={isAnalysing}
          onAnalyse={handleAnalyse}
          onNavigate={handleNavigate}
          documentTitle={document?.title || 'No document loaded'}
          documentType={document?.documentType || ''}
          documentPages={document?.pages || 0}
        />
      )}

      {currentPage === 'risks' && hasAnalysis && (
        <RisksPage
          risks={risks}
          onRiskUpdate={handleRiskUpdate}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === 'askai' && hasAnalysis && (
        <AskAIPage
          messages={chatMessages}
          onAddMessage={handleAddMessage}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === 'brief' && hasAnalysis && (
        <BriefPage
          summary={summary}
          risks={risks}
          brief={brief}
          onBriefGenerated={handleBriefGenerated}
          onNavigate={handleNavigate}
        />
      )}
    </AppShell>
  );
}
