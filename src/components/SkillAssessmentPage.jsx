import React, { useState } from 'react';
import { 
  Terminal, 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Database, 
  Table, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Info,
  Check
} from 'lucide-react';
import { ASSESSMENT_TASKS, DATABASE_SCHEMA } from '../data/assessmentTasks';
import { sqlEngine } from '../services/sqlEngine';
import { getCareerById } from '../data/careersData';
import { getCompetencyById } from '../data/competenciesData';

export default function SkillAssessmentPage({ selectedCareerId, assessmentAttempts, onSaveAttempt, setActiveTab }) {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const currentTask = ASSESSMENT_TASKS[currentTaskIndex];
  const career = getCareerById(selectedCareerId);

  // Active query code state
  const [userQuery, setUserQuery] = useState(
    assessmentAttempts[currentTask.id]?.query || currentTask.starterQuery
  );

  // Execution result
  const [runResult, setRunResult] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [showHints, setShowHints] = useState(false);
  const [activeSchemaTab, setActiveSchemaTab] = useState('employees');

  const handleTaskChange = (index) => {
    setCurrentTaskIndex(index);
    const nextTask = ASSESSMENT_TASKS[index];
    setUserQuery(assessmentAttempts[nextTask.id]?.query || nextTask.starterQuery);
    setRunResult(null);
    setEvaluation(null);
    setShowHints(false);
  };

  const handleRunOnly = () => {
    setEvaluation(null);
    const res = sqlEngine.runQuery(userQuery);
    setRunResult(res);
  };

  const handleEvaluate = () => {
    const evalRes = sqlEngine.evaluateTask(currentTask, userQuery);
    setEvaluation(evalRes);
    setRunResult(evalRes.userExec);

    // Save attempt to persistent storage
    onSaveAttempt(currentTask.id, {
      passed: evalRes.passed,
      score: evalRes.score,
      query: userQuery,
      feedback: evalRes.feedback
    });
  };

  const handleResetQuery = () => {
    setUserQuery(currentTask.starterQuery);
    setRunResult(null);
    setEvaluation(null);
  };

  const completedCount = Object.keys(assessmentAttempts).filter(k => assessmentAttempts[k]?.passed).length;
  const isLastTask = currentTaskIndex === ASSESSMENT_TASKS.length - 1;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Career-Connected Assessment Header */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-2">
              <Terminal className="w-3.5 h-3.5 text-teal-400" />
              <span>Career-Mapped Skill Assessment</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Technical Skill Assessment for {career.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Solve hands-on query challenges on a real in-browser relational schema. Your results directly inform your personalized skill-gap analysis and targeted learning roadmap.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-right">
              <span className="text-[11px] text-slate-400 block">Assessment Progress</span>
              <span className="text-sm font-bold text-teal-300">
                {completedCount} of {ASSESSMENT_TASKS.length} Passed
              </span>
            </div>
          </div>
        </div>

        {/* Engine Transparency Notice */}
        <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2">
          <Info className="w-4 h-4 text-teal-400 shrink-0" />
          <span>
            <strong className="text-slate-300">Execution Notice:</strong> SQL queries run genuinely in your browser via an in-memory relational engine (AlaSQL). No fake query simulations or remote server claims.
          </span>
        </div>
      </div>

      {/* Task Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {ASSESSMENT_TASKS.map((task, idx) => {
          const attempt = assessmentAttempts[task.id];
          const isCurrent = idx === currentTaskIndex;
          return (
            <button
              key={task.id}
              onClick={() => handleTaskChange(idx)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                isCurrent
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                  : attempt?.passed
                  ? 'bg-teal-950/40 text-teal-300 border-teal-800/50 hover:bg-teal-950/60'
                  : attempt
                  ? 'bg-amber-950/40 text-amber-300 border-amber-800/50 hover:bg-amber-950/60'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {attempt?.passed ? (
                <Check className="w-3.5 h-3.5 text-teal-300" />
              ) : (
                <span className="w-4 h-4 rounded-full bg-slate-800 text-[10px] flex items-center justify-center font-mono">
                  {idx + 1}
                </span>
              )}
              <span>{task.title.split(':')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Main Workspace: 2-Column Split (Left: Problem & Schema, Right: SQL Editor & Output) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Task Context, Targeted Competencies & Schema Viewer */}
        <div className="lg:col-span-5 space-y-4">
          {/* Task Scenario Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-indigo-400 px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-800/40">
                  {currentTask.difficulty}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-white mt-2">
                  {currentTask.title}
                </h2>
              </div>
            </div>

            {/* Targeted Competency Badges */}
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Targeted Competencies:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentTask.targetedCompetencies.map(cId => {
                  const comp = getCompetencyById(cId);
                  return (
                    <span key={cId} className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {comp?.name || cId}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Business Scenario */}
            <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <strong className="text-white block mb-1">Business Scenario:</strong>
              {currentTask.scenario}
            </div>

            {/* Structured Requirements */}
            <div>
              <strong className="text-xs text-slate-300 block mb-1.5">Task Requirements:</strong>
              <ul className="text-xs text-slate-400 space-y-1">
                {currentTask.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-teal-400 font-bold">›</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hints Toggle */}
            <div>
              <button
                type="button"
                onClick={() => setShowHints(!showHints)}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer font-medium"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showHints ? 'Hide Hints' : 'Need a Hint?'}</span>
              </button>
              {showHints && (
                <div className="mt-2 p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-200 space-y-1.5 animate-fadeIn">
                  {currentTask.hints.map((h, i) => (
                    <p key={i}>• {h}</p>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Interactive Schema Inspector */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-teal-400" /> Relational Schema Browser
              </span>
              <span className="text-[10px] text-slate-400 font-mono">In-Memory Database</span>
            </div>

            {/* Schema Table Tabs */}
            <div className="flex gap-1 border-b border-slate-800 pb-2">
              {Object.keys(DATABASE_SCHEMA).map(tName => (
                <button
                  key={tName}
                  onClick={() => setActiveSchemaTab(tName)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                    activeSchemaTab === tName
                      ? 'bg-slate-800 text-teal-300 border border-slate-700'
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  {tName}
                </button>
              ))}
            </div>

            {/* Active Table Details */}
            {DATABASE_SCHEMA[activeSchemaTab] && (
              <div className="text-xs space-y-2">
                <p className="text-slate-400 text-[11px]">
                  {DATABASE_SCHEMA[activeSchemaTab].description}
                </p>
                <div className="max-h-40 overflow-y-auto rounded-lg border border-slate-800">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 sticky top-0">
                      <tr>
                        <th className="p-1.5">Column</th>
                        <th className="p-1.5">Type</th>
                        <th className="p-1.5">Key</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono">
                      {DATABASE_SCHEMA[activeSchemaTab].columns.map(col => (
                        <tr key={col.name} className="hover:bg-slate-800/30">
                          <td className="p-1.5 text-slate-200 font-semibold">{col.name}</td>
                          <td className="p-1.5 text-slate-400">{col.type}</td>
                          <td className="p-1.5">
                            {col.isPrimary && <span className="text-amber-400 text-[10px]">PK</span>}
                            {col.isForeign && <span className="text-purple-400 text-[10px]">FK</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: SQL Editor, Action Controls, and Output Table */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
            {/* Editor Toolbar */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                SQL Query Console
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetQuery}
                  className="px-2.5 py-1 rounded-lg text-xs text-slate-400 hover:text-rose-300 hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Reset to starter query"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>
            </div>

            {/* Code Input Area */}
            <textarea
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              rows={8}
              spellCheck="false"
              className="w-full bg-slate-950 font-mono text-xs sm:text-sm text-teal-300 p-4 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 leading-relaxed shadow-inner"
              placeholder="-- Enter your SQL SELECT query here..."
            />

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
              <button
                type="button"
                onClick={handleRunOnly}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 text-teal-400" /> Run Query
              </button>

              <button
                type="button"
                onClick={handleEvaluate}
                className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-teal-300" /> Submit & Evaluate Task
              </button>
            </div>
          </div>

          {/* Feedback & Evaluation Result Box */}
          {evaluation && (
            <div className={`p-4 rounded-2xl border transition-all animate-fadeIn ${
              evaluation.passed
                ? 'bg-teal-950/30 border-teal-500/50 text-teal-200'
                : 'bg-amber-950/30 border-amber-500/50 text-amber-200'
            }`}>
              <div className="flex items-start gap-3">
                {evaluation.passed ? (
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {evaluation.passed ? 'Task Passed' : 'Skill Gap Identified'}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700">
                      Score: {evaluation.score}%
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed">{evaluation.feedback}</p>
                </div>
              </div>

              {/* Quick Navigation after Pass */}
              {evaluation.passed && (
                <div className="mt-3 pt-3 border-t border-teal-800/40 flex items-center justify-between text-xs">
                  <span className="text-slate-300">Great progress! Advance to next task or view updated gaps.</span>
                  {!isLastTask ? (
                    <button
                      onClick={() => handleTaskChange(currentTaskIndex + 1)}
                      className="px-3 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      Next Task <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveTab('skill-gaps')}
                      className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      View Skill Gaps <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Live Tabular Query Output */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Table className="w-3.5 h-3.5 text-teal-400" /> Query Execution Output
              </span>
              {runResult && (
                <span className="text-[10px] text-slate-400 font-mono">
                  {runResult.success ? `${runResult.rowCount} rows (${runResult.executionTimeMs} ms)` : 'Execution Failed'}
                </span>
              )}
            </div>

            {/* Results Table or Error View */}
            {!runResult ? (
              <div className="py-12 text-center text-xs text-slate-500">
                Click "Run Query" or "Submit & Evaluate Task" to inspect execution results.
              </div>
            ) : !runResult.success ? (
              <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-800/50 text-rose-300 text-xs font-mono space-y-1">
                <strong>Syntax / Evaluation Error:</strong>
                <p>{runResult.error}</p>
              </div>
            ) : runResult.data.length === 0 ? (
              <div className="py-8 text-center text-xs text-amber-400 font-mono">
                Query executed successfully, but returned 0 rows.
              </div>
            ) : (
              <div className="overflow-x-auto max-h-64 rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-950 text-slate-300 border-b border-slate-800 sticky top-0">
                    <tr>
                      {runResult.columns.map(col => (
                        <th key={col} className="p-2.5 font-semibold text-teal-300 whitespace-nowrap">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
                    {runResult.data.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-800/40 transition-colors">
                        {runResult.columns.map(col => (
                          <td key={col} className="p-2.5 text-slate-200 whitespace-nowrap">
                            {row[col] === null ? (
                              <span className="text-slate-500 italic">NULL</span>
                            ) : (
                              String(row[col])
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <button
          onClick={() => handleTaskChange(Math.max(0, currentTaskIndex - 1))}
          disabled={currentTaskIndex === 0}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Previous Task
        </button>

        <button
          onClick={() => setActiveTab('skill-gaps')}
          className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          View Skill-Gap Report <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
