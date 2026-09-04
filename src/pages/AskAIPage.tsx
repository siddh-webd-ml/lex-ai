import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, FileText, Loader2, User } from 'lucide-react';
import type { Page, ChatMessage } from '@/types';
import { askQuestion } from '@/services/aiEngine';
import { DEMO_SUGGESTED_QUESTIONS } from '@/data/demoDocument';
import { ResponsibleAIBanner } from '@/components/ResponsibleAIBanner';

interface AskAIPageProps {
  messages: ChatMessage[];
  onAddMessage: (msg: ChatMessage) => void;
  onNavigate: (page: Page) => void;
}

export function AskAIPage({ messages, onAddMessage, onNavigate }: AskAIPageProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (question?: string) => {
    const q = (question || input).trim();
    if (!q || isLoading) return;

    setInput('');
    setIsLoading(true);

    const response = await askQuestion(q);

    onAddMessage({
      id: `msg-${Date.now()}`,
      role: 'user',
      question: q,
      answer: '',
      source: '',
    });

    onAddMessage({
      id: `msg-${Date.now()}-ai`,
      role: 'assistant',
      question: q,
      answer: response.answer,
      source: response.source,
    });

    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const usedQuestions = new Set(messages.filter((m) => m.role === 'user').map((m) => m.question));
  const suggestedQuestions = DEMO_SUGGESTED_QUESTIONS.filter((q) => !usedQuestions.has(q));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6 animate-fade-in">
        <h1 className="font-serif text-3xl font-bold text-navy-900 mb-1">Ask AI</h1>
        <p className="text-navy-500">Ask questions about the document. Answers are sourced from the document text.</p>
      </div>

      {/* Chat container */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col animate-slide-up" style={{ height: 'calc(100vh - 320px)', minHeight: '400px' }}>
        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin p-4 sm:p-6">
          {messages.length === 0 && !isLoading ? (
            <div className="text-center py-12">
              <div className="w-14 h-14 rounded-2xl bg-navy-900 flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={24} className="text-accent-400" />
              </div>
              <h3 className="font-semibold text-navy-900 mb-2">Ask a question about the document</h3>
              <p className="text-sm text-navy-400 mb-6">Try one of these example questions:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto">
                {DEMO_SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="flex items-center gap-2 text-left text-sm text-navy-700 bg-slate-50 hover:bg-navy-50 rounded-lg px-4 py-3 transition-colors border border-slate-100 hover:border-navy-200 animate-slide-up"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <Sparkles size={14} className="text-accent-500 shrink-0" />
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''} animate-slide-up`}>
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center shrink-0">
                      <Sparkles size={16} className="text-accent-400" />
                    </div>
                  )}
                  <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-1' : ''}`}>
                    {msg.role === 'user' ? (
                      <div className="bg-navy-900 text-white rounded-2xl rounded-tr-md px-4 py-3">
                        <p className="text-sm">{msg.question}</p>
                      </div>
                    ) : (
                      <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-md px-4 py-3">
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className="text-xs font-bold text-navy-600 uppercase tracking-wide">Answer</span>
                        </div>
                        <p className="text-sm text-navy-800 leading-relaxed whitespace-pre-line">{msg.answer}</p>
                        {msg.source && msg.source !== 'N/A' && (
                          <div className="mt-3 pt-3 border-t border-slate-200">
                            <div className="flex items-center gap-1.5 text-xs text-navy-500">
                              <FileText size={12} />
                              <span className="font-medium">Source:</span>
                              <span className="text-navy-700">{msg.source}</span>
                            </div>
                          </div>
                        )}
                        {msg.source === 'N/A' && (
                          <div className="mt-3 pt-3 border-t border-slate-200">
                            <div className="flex items-center gap-1.5 text-xs text-amber-600">
                              <FileText size={12} />
                              <span className="font-medium">No supporting information was found in this document.</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center shrink-0 order-2">
                      <User size={16} className="text-navy-600" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 animate-slide-up">
                  <div className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center shrink-0">
                    <Sparkles size={16} className="text-accent-400" />
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-md px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 size={16} className="text-navy-400 animate-spin" />
                      <span className="text-sm text-navy-400">Searching the document...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Suggested follow-ups */}
        {messages.length > 0 && suggestedQuestions.length > 0 && !isLoading && (
          <div className="px-4 sm:px-6 py-3 border-t border-slate-100">
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.slice(0, 3).map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="flex items-center gap-1.5 text-xs text-navy-600 bg-slate-50 hover:bg-navy-50 rounded-full px-3 py-1.5 transition-colors border border-slate-100"
                >
                  <Sparkles size={12} className="text-accent-500" />
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-slate-100 p-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question about the document..."
              className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-transparent"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-navy-900 hover:bg-navy-800 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <ResponsibleAIBanner compact />
      </div>
    </div>
  );
}
