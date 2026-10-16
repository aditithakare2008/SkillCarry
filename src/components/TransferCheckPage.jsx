import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Play, 
  RotateCcw, 
  ChevronRight, 
  Layers, 
  Sparkles,
  Info,
  Check
} from 'lucide-react';
import { TRANSFER_CHECK_TASKS } from '../data/transferCheckData';
import { sqlEngine } from '../services/sqlEngine';
import { getCareerById } from '../data/careersData';

export default function TransferCheckPage({ 
  selectedCareerId, 
  transferAttempts, 
  onSaveTransferAttempt, 
  assessmentAttempts, 
  reassessments, 
  setActiveTab 
}) {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const currentTask = TRANSFER_CHECK_TASKS[currentTaskIndex];
  const career = getCareerById(selectedCareerId);

  const [selectedOptionId, setSelectedOptionId] = useState(
    transferAttempts[currentTask.id]?.selectedOptionId || null
  );
  const [submittedFeedback, setSubmittedFeedback] = useState(
    transferAttempts[currentTask.id]?.feedback || null
  );

  // Optional query verification
  const [tcQuery, setTcQuery] = useState(currentTask.starterQuery || '');
  const [tcQueryResult, setTcQueryResult] = useState(null);

  const handleTaskSwitch = (idx) => {
    setCurrentTaskIndex(idx);
    const nextTask = TRANSFER_CHECK_TASKS[idx];
    setSelectedOptionId(transferAttempts[nextTask.id]?.selectedOptionId || null);
    setSubmittedFeedback(transferAttempts[nextTask.id]?.feedback || null);
    setTcQuery(nextTask.starterQuery || '');
    setTcQueryResult(null);
  };

  const handleSubmitOption = () => {
    if (!selectedOptionId) return;
    const option = currentTask.options.find(o => o.id === selectedOptionId);
    if (!option) return;

    const score = option.isCorrect ? 100 : 30;
    const feedbackText = option.feedback;
    setSubmittedFeedback(feedbackText);

    onSaveTransferAttempt(currentTask.id, {
      completed: true,
      score,
      selectedOptionId,
      feedback: feedbackText
    });
  };

  const handleRunQuery = () => {
    const res = sqlEngine.runQuery(tcQuery);
    setTcQueryResult(res);
  };

  // Performance breakdown calculations for Section 7 requirement:
  // "Display initial task performance, independent verification, and reassessment results separately."
  const initialTaskScores = Object.values(assessmentAttempts).map(a => a.score);
  const avgInitial = initialTaskScores.length > 0 
    ? Math.round(initialTaskScores.reduce((a, b) => a + b, 0) / initialTaskScores.length) 
    : 0;

  const transferScores = Object.values(transferAttempts).map(t => t.score);
  const avgTransfer = transferScores.length > 0 
    ? Math.round(transferScores.reduce((a, b) => a + b, 0) / transferScores.length) 
    : 0;

  const reassessScores = Object.values(reassessments).map(r => r.score);
  const avgReassess = reassessScores.length > 0 
    ? Math.round(reassessScores.reduce((a, b) => a + b, 0) / reassessScores.length) 
    : (transferScores.length > 0 ? avgTransfer : avgInitial);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SkillCarry TransferCheck™ Verification</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Independent Conceptual Transfer Verification
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Verify whether you can independently diagnose flawed queries, explain architectural reasons for SQL errors, and apply principles to novel domains for <strong>{career.title}</strong>.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shrink-0 shadow-lg">
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block">Transfer Verifications</span>
              <span className="text-base font-bold text-teal-300">
                {Object.keys(transferAttempts).length} of {TRANSFER_CHECK_TASKS.length} Completed
              </span>
            </div>
          </div>
        </div>

        {/* Separate Performance Indicators Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 block">1. Initial Task Performance</span>
            <span className="text-lg font-bold text-indigo-300 font-mono">
              {initialTaskScores.length > 0 ? `${avgInitial}% Avg` : 'Pending'}
            </span>
            <span className="text-[10px] text-slate-500 block">Baseline problem-solving</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-teal-800/40">
            <span className="text-[11px] text-slate-400 block">2. Independent Verification (TransferCheck)</span>
            <span className="text-lg font-bold text-teal-300 font-mono">
              {transferScores.length > 0 ? `${avgTransfer}% Score` : 'In Progress'}
            </span>
            <span className="text-[10px] text-slate-500 block">Code review & explanation</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-purple-800/40">
            <span className="text-[11px] text-slate-400 block">3. Reassessment / Updated Standing</span>
            <span className="text-lg font-bold text-purple-300 font-mono">
              {reassessScores.length > 0 ? `${avgReassess}% Score` : (transferScores.length > 0 ? `${avgTransfer}%` : 'Pending')}
            </span>
            <span className="text-[10px] text-slate-500 block">Post-practice verification</span>
          </div>
        </div>

        {/* Honest Scientific & Integrity Disclaimer */}
        <div className="mt-6 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
          <span>
            <strong className="text-slate-300">Methodology Note:</strong> These three separate scores serve as formative indicators of demonstrated conceptual transfer. They provide helpful learning evidence, but are not mathematical proof that a student never used assistance or that the assessment is scientifically certified.
          </span>
        </div>
      </div>

      {/* Task Selector Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {TRANSFER_CHECK_TASKS.map((task, idx) => {
          const attempt = transferAttempts[task.id];
          const isCurrent = idx === currentTaskIndex;
          return (
            <button
              key={task.id}
              onClick={() => handleTaskSwitch(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                isCurrent
                  ? 'bg-teal-600 text-white border-teal-500 shadow-md shadow-teal-600/30'
                  : attempt
                  ? 'bg-slate-900 text-teal-300 border-slate-700'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {task.type} {attempt && '✓'}
            </button>
          );
        })}
      </div>

      {/* Main Transfer Workspace */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-md shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-mono uppercase text-teal-400 px-2 py-0.5 rounded bg-teal-950/60 border border-teal-800/40">
              {currentTask.type}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-2">
              {currentTask.title}
            </h2>
            <span className="text-xs text-indigo-300 block mt-1">
              Validating Competency: {currentTask.competencyName}
            </span>
          </div>
        </div>

        {/* Scenario & Code Review Window */}
        <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
          <strong className="text-xs text-slate-300 block">Scenario Context:</strong>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
            {currentTask.scenario}
          </p>

          {currentTask.flawedCode && (
            <div className="pt-2">
              <span className="text-[11px] font-mono text-rose-300 block mb-1">
                Flawed Query Under Review:
              </span>
              <pre className="p-3.5 rounded-xl bg-slate-900 border border-rose-900/40 text-xs font-mono text-rose-200 overflow-x-auto">
                {currentTask.flawedCode}
              </pre>
            </div>
          )}
        </div>

        {/* Concept Question & Radio Options */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-400" /> {currentTask.question}
          </h3>

          <div className="space-y-2.5">
            {currentTask.options.map(option => {
              const isSelected = selectedOptionId === option.id;
              return (
                <div
                  key={option.id}
                  onClick={() => setSelectedOptionId(option.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? 'bg-gradient-to-r from-teal-950/50 to-slate-900 border-teal-500 text-white ring-1 ring-teal-500/40'
                      : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
                    isSelected ? 'border-teal-400 bg-teal-500 text-slate-950' : 'border-slate-700'
                  }`}>
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </span>
                  <span className="text-xs sm:text-sm leading-relaxed">{option.text}</span>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleSubmitOption}
              disabled={!selectedOptionId}
              className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-600/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              Verify My Reasoning
            </button>
          </div>
        </div>

        {/* Feedback Window */}
        {submittedFeedback && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-teal-500/50 text-teal-200 text-xs sm:text-sm space-y-1.5 animate-fadeIn">
            <div className="flex items-center gap-2 font-bold text-teal-300">
              <CheckCircle2 className="w-4 h-4" /> Transfer Verification Feedback:
            </div>
            <p className="leading-relaxed text-slate-200">{submittedFeedback}</p>
          </div>
        )}

        {/* Optional Code Application Runner */}
        {currentTask.starterQuery && (
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Hands-On Query Verification (Execute Corrected Query)
            </h4>
            <textarea
              value={tcQuery}
              onChange={(e) => setTcQuery(e.target.value)}
              rows={4}
              className="w-full bg-slate-950 font-mono text-xs text-teal-300 p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-teal-500"
            />
            <button
              onClick={handleRunQuery}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-teal-400" /> Execute in In-Memory Engine
            </button>

            {tcQueryResult && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
                {tcQueryResult.success ? (
                  <span className="text-teal-300">Executed cleanly ({tcQueryResult.rowCount} rows returned).</span>
                ) : (
                  <span className="text-rose-400">Error: {tcQueryResult.error}</span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Navigation Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => setActiveTab('learning')}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
          >
            ‹ Return to Learning Modules
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            View Career Progress Report <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
