export type RiskLevel = 'high' | 'medium' | 'low';

export interface Party {
  name: string;
  role: string;
}

export interface ImportantDate {
  label: string;
  date: string;
  description: string;
}

export interface KeyObligation {
  party: string;
  obligation: string;
}

export interface ClauseItem {
  title: string;
  clauseNumber: string;
  page: number;
  summary: string;
}

export interface Risk {
  id: string;
  level: RiskLevel;
  clauseTitle: string;
  clauseNumber: string;
  page: number;
  originalText: string;
  whyRisky: string;
  reviewArea: string;
  reviewStatus: 'pending' | 'accept' | 'reject' | 'review';
  reviewComment: string;
}

export interface DocumentSummary {
  title: string;
  documentType: string;
  summary: string;
  parties: Party[];
  importantDates: ImportantDate[];
  keyObligations: KeyObligation[];
  importantClauses: ClauseItem[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  question: string;
  answer: string;
  source: string;
}

export interface LegalBrief {
  overview: string;
  keyFacts: string[];
  importantClauses: string[];
  potentialRisks: string[];
  importantDates: string[];
  questionsForReview: string[];
}

export interface LegalDocument {
  id: string;
  title: string;
  documentType: string;
  uploadedAt: string;
  pages: number;
  content: string;
  analysed: boolean;
}

export type Page = 'landing' | 'dashboard' | 'analysis' | 'risks' | 'askai' | 'brief';
