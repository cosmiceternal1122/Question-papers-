
import React, { useState } from 'react';
import { Difficulty, GenerationParams, QuestionPaper } from './types';
import { generatePaper } from './services/geminiService';
import InputSection from './components/InputSection';
import PaperPreview from './components/PaperPreview';

const App: React.FC = () => {
  const [params, setParams] = useState<GenerationParams>({
    subject: '',
    grade: '',
    topics: '',
    difficulty: Difficulty.MEDIUM,
    questionCount: 10,
    includeAnswerKey: true
  });

  const [isLoading, setIsLoading] = useState(false);
  const [paper, setPaper] = useState<QuestionPaper | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateParams = (updates: Partial<GenerationParams>) => {
    setParams(prev => ({ ...prev, ...updates }));
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generatePaper(params);
      setPaper(result);
    } catch (err) {
      console.error(err);
      setError("Failed to generate the paper. Please try again with more specific details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 no-print">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-indigo-600">
              ExamCraft AI
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-600 transition-colors">How it works</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Templates</a>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
              Saved Papers
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Controls */}
        <div className="lg:col-span-4 no-print">
          <div className="sticky top-24 space-y-6">
            <InputSection 
              params={params} 
              onChange={handleUpdateParams} 
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
            
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm animate-in fade-in slide-in-from-top-2">
                {error}
              </div>
            )}

            {!paper && !isLoading && (
              <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                <h3 className="font-bold text-indigo-900 mb-2">Pro Tip</h3>
                <p className="text-sm text-indigo-800 leading-relaxed">
                  Be specific about your topics to get more relevant questions. For example, instead of "History", try "French Revolution 1789-1799".
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-pulse no-print">
              <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Analyzing Subject Matter...</h2>
              <p className="text-slate-500">Curating the best questions for {params.subject || 'your exam'}</p>
            </div>
          ) : paper ? (
            <PaperPreview paper={paper} showAnswerKey={params.includeAnswerKey} />
          ) : (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center py-32 px-6 text-center no-print">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Ready to create?</h2>
              <p className="text-slate-500 max-w-sm">
                Fill out the details on the left and our AI will craft a professional question paper for you instantly.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Persistent Mobile Action */}
      {!paper && !isLoading && (
        <div className="fixed bottom-6 left-0 right-0 px-4 md:hidden z-40 no-print">
          <button 
            onClick={handleGenerate}
            disabled={!params.subject}
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-2xl flex items-center justify-center gap-2"
          >
            Create Paper Now
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
