
import React from 'react';
import { GenerationParams, Difficulty } from '../types';

interface InputSectionProps {
  params: GenerationParams;
  onChange: (updates: Partial<GenerationParams>) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ params, onChange, onGenerate, isLoading }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        Customize Paper
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Subject</label>
          <input
            type="text"
            placeholder="e.g. Physics, World History"
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            value={params.subject}
            onChange={(e) => onChange({ subject: e.target.value })}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Grade / Level</label>
          <input
            type="text"
            placeholder="e.g. 10th Grade, Undergraduate"
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            value={params.grade}
            onChange={(e) => onChange({ grade: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">Specific Topics / Chapters</label>
        <textarea
          rows={3}
          placeholder="e.g. Newton's Laws of Motion, Friction, Gravitation..."
          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
          value={params.topics}
          onChange={(e) => onChange({ topics: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Difficulty</label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-white"
            value={params.difficulty}
            onChange={(e) => onChange({ difficulty: e.target.value as Difficulty })}
          >
            <option value={Difficulty.EASY}>Easy</option>
            <option value={Difficulty.MEDIUM}>Medium</option>
            <option value={Difficulty.HARD}>Hard</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Number of Questions</label>
          <input
            type="number"
            min={1}
            max={50}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            value={params.questionCount}
            onChange={(e) => onChange({ questionCount: parseInt(e.target.value) || 0 })}
          />
        </div>

        <div className="flex items-center gap-2 pt-6">
          <input
            type="checkbox"
            id="ansKey"
            className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
            checked={params.includeAnswerKey}
            onChange={(e) => onChange({ includeAnswerKey: e.target.checked })}
          />
          <label htmlFor="ansKey" className="text-sm font-medium text-slate-700 cursor-pointer">
            Include Answer Key
          </label>
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading || !params.subject}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold py-3 rounded-lg shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating Paper...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            Generate Question Paper
          </>
        )}
      </button>
    </div>
  );
};

export default InputSection;
