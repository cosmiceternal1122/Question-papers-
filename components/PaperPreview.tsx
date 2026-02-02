
import React, { useState } from 'react';
import { QuestionPaper, QuestionType } from '../types';

interface PaperPreviewProps {
  paper: QuestionPaper;
  showAnswerKey: boolean;
}

const PaperPreview: React.FC<PaperPreviewProps> = ({ paper, showAnswerKey }) => {
  const [editing, setEditing] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center no-print">
        <h3 className="text-xl font-bold text-slate-800">Preview Paper</h3>
        <div className="flex gap-2">
           <button 
            onClick={() => setEditing(!editing)}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2"
          >
            {editing ? 'Finish Editing' : 'Edit Mode'}
          </button>
          <button 
            onClick={handlePrint}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print / PDF
          </button>
        </div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl border border-slate-200 paper-font paper-shadow min-h-[11in] mx-auto max-w-4xl relative">
        {/* Paper Header */}
        <div className="text-center border-b-2 border-slate-900 pb-6 mb-8">
          <h1 className="text-3xl font-bold text-slate-900 uppercase tracking-tight mb-2" contentEditable={editing} suppressContentEditableWarning>
            {paper.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-slate-700 font-medium">
            <span contentEditable={editing} suppressContentEditableWarning>Subject: {paper.subject}</span>
            <span contentEditable={editing} suppressContentEditableWarning>Grade: {paper.grade}</span>
            <span contentEditable={editing} suppressContentEditableWarning>Duration: {paper.duration}</span>
            <span contentEditable={editing} suppressContentEditableWarning>Total Marks: {paper.totalMarks}</span>
          </div>
        </div>

        {/* Name/Roll Section */}
        <div className="flex justify-between mb-8 text-sm text-slate-600 font-mono">
          <div className="flex-1 border-b border-slate-300 mr-8 pb-1">NAME: _____________________________</div>
          <div className="w-48 border-b border-slate-300 pb-1">ROLL NO: ___________</div>
        </div>

        {/* Instructions */}
        <div className="mb-8 p-4 bg-slate-50 border border-slate-200 rounded-md">
          <h4 className="font-bold text-slate-800 mb-2 uppercase text-sm">General Instructions:</h4>
          <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
            {paper.instructions.map((inst, i) => (
              <li key={i} contentEditable={editing} suppressContentEditableWarning>{inst}</li>
            ))}
          </ul>
        </div>

        {/* Questions Section */}
        <div className="space-y-10">
          {paper.questions.map((q, index) => (
            <div key={q.id} className="relative group">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-lg mr-2">Q{index + 1}.</span>
                <div className="flex-1 text-lg font-medium text-slate-900" contentEditable={editing} suppressContentEditableWarning>
                  {q.text}
                </div>
                <span className="ml-4 font-bold text-slate-600 whitespace-nowrap">({q.marks} Marks)</span>
              </div>

              {/* MCQ Options */}
              {q.type === QuestionType.MCQ && q.options && (
                <div className="ml-8 grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  {q.options.map((opt, optIdx) => (
                    <div key={optIdx} className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-500">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="text-slate-800" contentEditable={editing} suppressContentEditableWarning>{opt}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Fill in blanks or True/False visual aids */}
              {q.type === QuestionType.TRUE_FALSE && (
                <div className="ml-8 mt-3 italic text-slate-500">
                  (True / False)
                </div>
              )}

              {/* Short/Long Answer Space */}
              {(q.type === QuestionType.SHORT_ANSWER || q.type === QuestionType.LONG_ANSWER) && (
                <div className="ml-8 mt-4 h-12 border-b border-dashed border-slate-300"></div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-slate-100 text-center text-slate-400 text-xs italic">
          --- End of Question Paper ---
        </div>
      </div>

      {/* Answer Key */}
      {showAnswerKey && (
        <div className="bg-slate-900 text-slate-100 p-8 md:p-12 rounded-lg shadow-xl print-only mt-12">
          <h2 className="text-2xl font-bold mb-6 border-b border-slate-700 pb-4">Answer Key (CONFIDENTIAL)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {paper.questions.map((q, index) => (
              <div key={index} className="flex items-start gap-4 text-sm">
                <span className="font-bold text-indigo-400">Q{index + 1}:</span>
                <span className="text-slate-300">
                  <span className="font-semibold text-white mr-2">Answer:</span> {q.answer}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaperPreview;
