import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Play, 
  Sparkles, 
  Check, 
  AlertTriangle, 
  HelpCircle, 
  ChevronRight, 
  RotateCcw, 
  ExternalLink,
  Code
} from 'lucide-react';
import { LEARNING_MODULES } from '../data/learningModulesData';
import { getCareerById } from '../data/careersData';
import { sqlEngine } from '../services/sqlEngine';
import { SkillGapEngine } from '../services/skillGapEngine';

export default function LearningPathwayPage({ 
  selectedCareerId, 
  completedModules, 
  onToggleModuleCompletion, 
  assessmentAttempts, 
  transferAttempts, 
  reassessments, 
  setActiveTab 
}) {
  const career = getCareerById(selectedCareerId);
  const analysis = SkillGapEngine.analyzeProfile(
    selectedCareerId,
    assessmentAttempts,
    transferAttempts,
    reassessments,
    completedModules
  );

  const [activeModuleId, setActiveModuleId] = useState(
    analysis.priorityGaps[0]?.recommendedModule?.id || LEARNING_MODULES[0].id
  );

  const activeModule = LEARNING_MODULES.find(m => m.id === activeModuleId) || LEARNING_MODULES[0];
  const isCompleted = completedModules.includes(activeModule.id);

  // Interactive practice editor state
  const [practiceQuery, setPracticeQuery] = useState(activeModule.practiceChallenge.starterQuery);
  const [practiceResult, setPracticeResult] = useState(null);
  const [showPracticeHint, setShowPracticeHint] = useState(false);
  const [showWorkedSolution, setShowWorkedSolution] = useState(false);

  const handleModuleSelect = (modId) => {
    setActiveModuleId(modId);
    const mod = LEARNING_MODULES.find(m => m.id === modId);
    if (mod) {
      setPracticeQuery(mod.practiceChallenge.starterQuery);
      setPracticeResult(null);
      setShowPracticeHint(false);
      setShowWorkedSolution(false);
    }
  };

  const handleRunPractice = () => {
    const res = sqlEngine.runQuery(practiceQuery);
    setPracticeResult(res);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-2">
              <BookOpen className="w-3.5 h-3.5 text-teal-400" />
              <span>Targeted Learning-to-Career Pathway</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Targeted Practice Modules for {career.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Curated conceptual explanations, worked examples, and interactive practice challenges directly connected to your identified skill gaps.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-lg shrink-0">
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block">Modules Completed</span>
              <span className="text-base font-bold text-teal-300">
                {completedModules.length} of {LEARNING_MODULES.length} Done
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Module Selector & Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Module Sidebar List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-1">
            Recommended Modules
          </span>

          {LEARNING_MODULES.map(module => {
            const isSelected = module.id === activeModuleId;
            const isDone = completedModules.includes(module.id);
            const isPriority = analysis.priorityGaps.some(g => g.recommendedModule?.id === module.id);

            return (
              <div
                key={module.id}
                onClick={() => handleModuleSelect(module.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-950 to-slate-900 border-indigo-500 text-white shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/40'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase text-indigo-400">
                    {module.estimatedTime}
                  </span>
                  {isDone && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-teal-300 bg-teal-950/60 border border-teal-800/40 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3" /> Completed
                    </span>
                  )}
                  {!isDone && isPriority && (
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded-full">
                      Priority Gap
                    </span>
                  )}
                </div>

                <h3 className="text-xs sm:text-sm font-bold leading-snug">{module.title}</h3>
                <span className="text-[11px] text-slate-400 block mt-1">
                  Addresses: {module.competencyName}
                </span>
              </div>
            );
          })}
        </div>

        {/* Active Module Detail & Interactive Practice (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-md shadow-xl">
            {/* Module Header & Completion Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-teal-400 uppercase tracking-wider block mb-1">
                  Addresses Gap: {activeModule.competencyName}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {activeModule.title}
                </h2>
              </div>

              <button
                onClick={() => onToggleModuleCompletion(activeModule.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                  isCompleted
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 hover:bg-teal-500/30'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                <span>{isCompleted ? 'Completed (Click to Reopen)' : 'Mark Module as Completed'}</span>
              </button>
            </div>

            {/* Role-Specific Relevance Explanation */}
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/40 text-xs sm:text-sm text-indigo-200 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">
                  Relevance for {career.title}:
                </strong>
                <p className="leading-relaxed">
                  {activeModule.careerRelevance[selectedCareerId] || activeModule.summary}
                </p>
              </div>
            </div>

            {/* Conceptual Guide */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" /> Core Concepts & Rules
              </h3>
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans whitespace-pre-line">
                {activeModule.overviewExplanation}
              </div>
            </div>

            {/* Worked Example */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Code className="w-4 h-4 text-purple-400" /> Worked Example & Step-by-Step Breakdown
              </h3>
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="text-xs text-slate-300">
                  <strong className="text-white">Business Ingestion:</strong> {activeModule.workedExample.businessQuestion}
                </div>
                <div className="text-xs text-rose-300 bg-rose-950/20 p-2.5 rounded-xl border border-rose-900/40">
                  <strong>Common Trap:</strong> {activeModule.workedExample.commonPitfall}
                </div>
                <div className="space-y-1">
                  <strong className="text-xs text-slate-400">Step-by-Step Thinking:</strong>
                  <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc">
                    {activeModule.workedExample.stepByStep.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setShowWorkedSolution(!showWorkedSolution)}
                    className="text-xs text-teal-400 hover:underline cursor-pointer"
                  >
                    {showWorkedSolution ? 'Hide Solution Query' : 'Reveal Solution Query'}
                  </button>
                  {showWorkedSolution && (
                    <pre className="mt-2 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-teal-300 overflow-x-auto">
                      {activeModule.workedExample.solutionQuery}
                    </pre>
                  )}
                </div>
              </div>
            </div>

            {/* Interactive Practice Challenge */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Play className="w-4 h-4 text-teal-400" /> Interactive Practice Challenge
              </h3>
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-white">{activeModule.practiceChallenge.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeModule.practiceChallenge.prompt}
                </p>

                {/* Editor */}
                <textarea
                  value={practiceQuery}
                  onChange={(e) => setPracticeQuery(e.target.value)}
                  rows={4}
                  spellCheck="false"
                  className="w-full bg-slate-900 font-mono text-xs text-teal-300 p-3 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
                />

                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={handleRunPractice}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" /> Test Query in Engine
                  </button>

                  <button
                    onClick={() => setShowPracticeHint(!showPracticeHint)}
                    className="text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    {showPracticeHint ? 'Hide Hint' : 'Show Hint'}
                  </button>
                </div>

                {showPracticeHint && (
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-amber-300">
                    💡 {activeModule.practiceChallenge.hint}
                  </div>
                )}

                {/* Query Output */}
                {practiceResult && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[11px] font-mono text-slate-400 block mb-1">
                      {practiceResult.success ? `Output: ${practiceResult.rowCount} rows` : 'Execution Error'}
                    </span>
                    {practiceResult.success ? (
                      <div className="max-h-36 overflow-x-auto text-[11px] font-mono">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="border-b border-slate-800 text-teal-300">
                              {practiceResult.columns.map(c => <th key={c} className="p-1">{c}</th>)}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/40 text-slate-300">
                            {practiceResult.data.map((r, i) => (
                              <tr key={i}>
                                {practiceResult.columns.map(c => <td key={c} className="p-1">{String(r[c])}</td>)}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-xs text-rose-300 font-mono">{practiceResult.error}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Direct Reassessment CTA */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-slate-400">Ready to prove your improvement?</span>
                <p className="text-xs sm:text-sm font-bold text-white">Re-test this competency or verify in TransferCheck</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('assessment')}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                >
                  Go to Assessment
                </button>
                <button
                  onClick={() => setActiveTab('transfer-check')}
                  className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  Verify in TransferCheck <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
