import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  BookOpen, 
  ShieldAlert, 
  Briefcase, 
  Sparkles,
  Info,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { SkillGapEngine, COMPETENCY_STATUS } from '../services/skillGapEngine';

export default function SkillGapPage({ 
  selectedCareerId, 
  assessmentAttempts, 
  transferAttempts, 
  reassessments, 
  completedModules, 
  setActiveTab 
}) {
  const [filterTab, setFilterTab] = useState('ALL'); // ALL, NEEDS_IMPROVEMENT, DEMONSTRATED, NOT_ASSESSED

  const analysis = SkillGapEngine.analyzeProfile(
    selectedCareerId,
    assessmentAttempts,
    transferAttempts,
    reassessments,
    completedModules
  );

  const { career, allCompetencies, demonstrated, needsImprovement, notYetAssessed, priorityGaps, prototypeAlignmentPercent, nextAction } = analysis;

  const filteredCompetencies = allCompetencies.filter(comp => {
    if (filterTab === 'NEEDS_IMPROVEMENT') return comp.status === COMPETENCY_STATUS.NEEDS_IMPROVEMENT;
    if (filterTab === 'DEMONSTRATED') return comp.status === COMPETENCY_STATUS.DEMONSTRATED;
    if (filterTab === 'NOT_ASSESSED') return comp.status === COMPETENCY_STATUS.NOT_YET_ASSESSED;
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Personalized Skill-Gap Identification</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Skill-Gap Analysis for {career.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Comparison between your demonstrated competencies and the benchmark requirements mapped for the <strong>{career.title}</strong> technical pathway.
            </p>
          </div>

          {/* Prototype Pathway Progress Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex items-center gap-5 shrink-0 shadow-lg">
            <div className="relative w-18 h-18 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-teal-400 transition-all duration-1000 ease-out"
                  strokeDasharray={`${prototypeAlignmentPercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-base font-bold text-white font-mono">{prototypeAlignmentPercent}%</span>
              </div>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Demonstrated In-Prototype</span>
              <span className="text-sm font-bold text-teal-300">
                {demonstrated.length} of {analysis.assessedTotal} Assessed Skills
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                {needsImprovement.length} gaps need practice
              </span>
            </div>
          </div>
        </div>

        {/* Responsible Non-Job-Ready Disclaimer */}
        <div className="mt-6 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
          <span>
            <strong className="text-slate-300">Formative Assessment Guidance:</strong> This report highlights foundational strengths and practice opportunities based on your in-browser assessment. SkillCarry deliberately avoids premature "job-ready" claims until students complete end-to-end projects and broader technical assessments.
          </span>
        </div>
      </div>

      {/* Priority Gap Action Callout */}
      {priorityGaps.length > 0 && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-500/40 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Sparkles className="w-4 h-4" /> Immediate Priority Skill Gap
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">
                {priorityGaps[0].name} ({priorityGaps[0].importance} Importance)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                <strong className="text-amber-300">Why it matters:</strong> {priorityGaps[0].roleContext}
              </p>
            </div>
            {priorityGaps[0].recommendedModule && (
              <button
                onClick={() => setActiveTab('learning')}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer shrink-0 font-medium"
              >
                <BookOpen className="w-4 h-4" /> Start Targeted Module <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setFilterTab('ALL')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            filterTab === 'ALL'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          All Competencies ({allCompetencies.length})
        </button>
        <button
          onClick={() => setFilterTab('NEEDS_IMPROVEMENT')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            filterTab === 'NEEDS_IMPROVEMENT'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-amber-300'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" /> Gaps Needing Practice ({needsImprovement.length})
        </button>
        <button
          onClick={() => setFilterTab('DEMONSTRATED')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            filterTab === 'DEMONSTRATED'
              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
              : 'text-slate-400 hover:text-teal-300'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" /> Demonstrated ({demonstrated.length})
        </button>
        <button
          onClick={() => setFilterTab('NOT_ASSESSED')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            filterTab === 'NOT_ASSESSED'
              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
              : 'text-slate-400 hover:text-indigo-300'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" /> Requiring Further Assessment ({notYetAssessed.length})
        </button>
      </div>

      {/* Competencies Cards Grid */}
      <div className="space-y-4">
        {filteredCompetencies.map(comp => {
          const isGap = comp.status === COMPETENCY_STATUS.NEEDS_IMPROVEMENT;
          const isDemonstrated = comp.status === COMPETENCY_STATUS.DEMONSTRATED;
          const isUnassessed = comp.status === COMPETENCY_STATUS.NOT_YET_ASSESSED;

          return (
            <div
              key={comp.competencyId}
              className={`p-6 rounded-3xl border transition-all ${
                isGap
                  ? 'bg-slate-900/90 border-amber-500/40 shadow-lg shadow-amber-500/5'
                  : isDemonstrated
                  ? 'bg-slate-900/70 border-teal-500/40'
                  : 'bg-slate-900/40 border-slate-800'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 max-w-3xl">
                  {/* Status & Importance Header */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      isGap
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : isDemonstrated
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {isGap && <AlertTriangle className="w-3 h-3" />}
                      {isDemonstrated && <CheckCircle2 className="w-3 h-3" />}
                      {isUnassessed && <HelpCircle className="w-3 h-3" />}
                      <span>{comp.status}</span>
                    </span>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-indigo-300 border border-indigo-900/60">
                      {comp.importance} Importance
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Benchmark: {comp.benchmarkScore}%
                    </span>
                  </div>

                  {/* Title & Category */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">{comp.name}</h3>
                    <span className="text-xs text-indigo-400 font-mono">{comp.category}</span>
                  </div>

                  {/* Role Context: Why this gap matters for this career */}
                  <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="font-semibold text-slate-200 block">
                      Why this matters for {career.title}:
                    </span>
                    <p className="leading-relaxed text-slate-300">{comp.roleContext}</p>
                  </div>

                  {/* Student Assessment Evidence */}
                  <div className="text-xs text-slate-400 flex items-start gap-1.5">
                    <strong className="text-slate-300 shrink-0">Student Evidence:</strong>
                    <span>{comp.evidenceNotes}</span>
                  </div>
                </div>

                {/* Score & Next Action Button */}
                <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0 pt-2 md:pt-0">
                  {comp.isAssessedInPrototype ? (
                    <div className="text-right">
                      <span className="text-2xl font-black font-mono text-white">{comp.score}%</span>
                      <span className="text-[10px] text-slate-500 block">Evaluated Score</span>
                    </div>
                  ) : (
                    <div className="text-right">
                      <span className="text-xs font-mono text-slate-500">External</span>
                      <span className="text-[10px] text-slate-500 block">Future Assessment</span>
                    </div>
                  )}

                  {isGap && comp.recommendedModule && (
                    <button
                      onClick={() => setActiveTab('learning')}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" /> Practice Module
                    </button>
                  )}

                  {isDemonstrated && (
                    <button
                      onClick={() => setActiveTab('transfer-check')}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-teal-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Verify in TransferCheck
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <button
          onClick={() => setActiveTab('assessment')}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
        >
          ‹ Return to Assessment
        </button>
        <button
          onClick={() => setActiveTab('learning')}
          className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          Follow Targeted Learning Pathway <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
