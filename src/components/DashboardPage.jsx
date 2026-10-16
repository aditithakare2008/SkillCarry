import React from 'react';
import { 
  Briefcase, 
  Compass, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Award, 
  RotateCcw, 
  ChevronRight,
  GraduationCap,
  Layers,
  Info
} from 'lucide-react';
import { getCareerById } from '../data/careersData';
import { SkillGapEngine } from '../services/skillGapEngine';
import WorkflowStepper from './WorkflowStepper';

export default function DashboardPage({ 
  profile, 
  selectedCareerId, 
  onSelectCareer, 
  assessmentAttempts, 
  transferAttempts, 
  reassessments, 
  completedModules, 
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

  const { demonstrated, needsImprovement, notYetAssessed, priorityGaps, prototypeAlignmentPercent, nextAction } = analysis;

  const assessmentAttemptsList = Object.values(assessmentAttempts);
  const passedAssessmentsCount = assessmentAttemptsList.filter(a => a.passed).length;
  const transferCount = Object.keys(transferAttempts).length;

  // Completion statuses for the 7 workflow steps
  const stepStatus = {
    careers: true,
    profile: !!profile?.fullName,
    assessment: passedAssessmentsCount > 0,
    'skill-gaps': assessmentAttemptsList.length > 0,
    learning: completedModules.length > 0,
    'transfer-check': transferCount > 0,
    report: passedAssessmentsCount > 0 && transferCount > 0
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 7-Step Workflow Stepper */}
      <WorkflowStepper 
        activeTab="dashboard" 
        setActiveTab={setActiveTab} 
        completionStatus={stepStatus} 
      />

      {/* Hero: Selected Career Goal & Core Progress */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-900/40 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <Briefcase className="w-3.5 h-3.5 text-teal-400" /> Target Career Goal
              </span>
              {profile?.isDemo && (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full">
                  Demo Data Active
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {career.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {career.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('careers')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-indigo-400" /> Switch / Compare Pathways
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className="text-xs text-slate-400 hover:text-teal-300 transition-colors cursor-pointer"
              >
                Edit Career Profile ›
              </button>
            </div>
          </div>

          {/* Prototype Readiness Index Gauge */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex items-center gap-6 shrink-0 shadow-lg">
            <div className="relative w-20 h-20 flex items-center justify-center">
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
                <span className="text-lg font-bold text-white font-mono">{prototypeAlignmentPercent}%</span>
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold">
                Pathway Alignment
              </span>
              <span className="text-sm font-bold text-teal-300 mt-0.5 block">
                {demonstrated.length} of {analysis.assessedTotal} Core Skills
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">
                Formative Prototype Benchmark
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Immediate Recommended Action Card */}
      {nextAction && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-950/40 via-slate-900 to-indigo-950/40 border border-teal-500/40 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5 font-mono">
              <Sparkles className="w-4 h-4 text-teal-400" /> Recommended Immediate Next Step
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Algorithmic Guidance</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">{nextAction.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {nextAction.description}
              </p>
            </div>

            <button
              onClick={() => setActiveTab(nextAction.targetPath)}
              className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white shadow-lg shadow-teal-600/30 transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span>Continue Learning Journey</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3-Column Real-Data Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Assessed Competencies */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400" /> Demonstrated Skills
            </h3>
            <span className="text-xs font-bold text-teal-300 font-mono">
              {demonstrated.length} Mastered
            </span>
          </div>

          {demonstrated.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-500">
              No skills demonstrated yet. Complete assessment tasks to establish baseline proof.
            </div>
          ) : (
            <div className="space-y-2">
              {demonstrated.map(comp => (
                <div key={comp.competencyId} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between font-semibold text-white">
                    <span>{comp.name}</span>
                    <span className="text-teal-400 font-mono">{comp.score}%</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{comp.category}</span>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => setActiveTab('assessment')}
            className="w-full py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
          >
            Review Assessment Tasks
          </button>
        </div>

        {/* Card 2: Priority Skill Gaps */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" /> Priority Skill Gaps
            </h3>
            <span className="text-xs font-bold text-amber-300 font-mono">
              {needsImprovement.length} Gaps
            </span>
          </div>

          {needsImprovement.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-500">
              No active skill gaps identified. Continue to TransferCheck or external portfolio projects.
            </div>
          ) : (
            <div className="space-y-2">
              {needsImprovement.slice(0, 3).map(comp => (
                <div key={comp.competencyId} className="p-3 rounded-xl bg-slate-950/60 border border-amber-900/30 text-xs space-y-1">
                  <div className="flex items-center justify-between font-semibold text-white">
                    <span>{comp.name}</span>
                    <span className="text-amber-400 font-mono">{comp.score}%</span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {comp.roleContext}
                  </p>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => setActiveTab('skill-gaps')}
            className="w-full py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 transition-colors cursor-pointer"
          >
            Open Full Skill-Gap Analysis
          </button>
        </div>

        {/* Card 3: TransferCheck & Independent Verification */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400" /> TransferCheck Evidence
              </h3>
              <span className="text-xs font-bold text-indigo-300 font-mono">
                {transferCount} Verified
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              TransferCheck verifies that your assessment score reflects real understanding by testing code review, conceptual bug explanation, and cross-domain reasoning.
            </p>

            <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Verification Tasks:</span>
                <span className="text-white font-mono">{transferCount} of 3 Completed</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Learning Modules:</span>
                <span className="text-white font-mono">{completedModules.length} Finished</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('transfer-check')}
            className="w-full py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer mt-4"
          >
            Go to TransferCheck
          </button>
        </div>
      </div>

      {/* Honest Methodology Notice */}
      <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
        <span>
          <strong className="text-slate-300">Data Transparency:</strong> All dashboard metrics are computed in real time from your saved local profile, real query evaluations, and verified TransferCheck submissions. SkillCarry never displays fake statistics or simulated credentials.
        </span>
      </div>
    </div>
  );
}
