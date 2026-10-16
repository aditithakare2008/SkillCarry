import React from 'react';
import { 
  Printer, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  ShieldCheck, 
  Briefcase, 
  User, 
  Calendar,
  Sparkles,
  Info,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { SkillGapEngine, COMPETENCY_STATUS } from '../services/skillGapEngine';
import { LEARNING_MODULES } from '../data/learningModulesData';

export default function CareerReportPage({ 
  profile, 
  selectedCareerId, 
  assessmentAttempts, 
  transferAttempts, 
  reassessments, 
  completedModules, 
  setActiveTab 
}) {
  const analysis = SkillGapEngine.analyzeProfile(
    selectedCareerId,
    assessmentAttempts,
    transferAttempts,
    reassessments,
    completedModules
  );

  const { career, allCompetencies, demonstrated, needsImprovement, notYetAssessed, prototypeAlignmentPercent } = analysis;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      studentProfile: profile,
      selectedCareer: career.title,
      alignmentIndex: `${prototypeAlignmentPercent}%`,
      competencyBreakdown: allCompetencies,
      completedModules,
      assessmentAttempts,
      transferAttempts,
      disclaimer: analysis.disclaimer
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SkillCarry_Career_Report_${career.id}_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Top Action Bar (hidden during print) */}
      <div className="no-print bg-slate-900/90 border border-slate-800 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div>
          <span className="text-xs font-mono uppercase text-teal-400 block mb-1">
            Seva Innovation Challenge 2026
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Updated Career Progress & Pathway Report
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Comprehensive audit of demonstrated competencies, identified gaps, completed learning activities, and next steps.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDownloadJson}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4 text-teal-400" /> Export JSON
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Main Printable Document Sheet */}
      <div className="print-page bg-slate-900/95 print:bg-white print:text-black border border-slate-800 print:border-none rounded-3xl p-8 sm:p-12 space-y-8 shadow-2xl">
        {/* Document Header */}
        <div className="border-b border-slate-800 print:border-gray-300 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 print:text-teal-700 font-mono">
                  SkillCarry Pathway Progress Report
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-400 print:text-gray-500">
                  {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white print:text-black mt-2">
                {profile?.fullName || 'Student Learner'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 print:text-gray-600 mt-1">
                {profile?.educationLevel || 'Undergraduate'} • {profile?.institution || 'Academic Institution'}
              </p>
            </div>

            {/* Career Goal Badge */}
            <div className="p-4 rounded-2xl bg-slate-950 print:bg-gray-100 border border-slate-800 print:border-gray-300 text-right shrink-0">
              <span className="text-[11px] text-slate-400 print:text-gray-600 block">Selected Target Role</span>
              <span className="text-base font-bold text-teal-300 print:text-indigo-800">
                {career.title}
              </span>
              <span className="text-[10px] text-slate-500 print:text-gray-500 block font-mono mt-0.5">
                Alignment Index: {prototypeAlignmentPercent}%
              </span>
            </div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 print:text-indigo-700 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> 1. Executive Summary & Assessment Alignment
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 print:text-gray-700 leading-relaxed">
            The student is pursuing the <strong>{career.title}</strong> technical career pathway. Through interactive in-browser SQL problem sets, independent TransferCheck reasoning verification, and targeted learning modules, the student has demonstrated <strong>{demonstrated.length}</strong> core competencies while identifying <strong>{needsImprovement.length}</strong> priority skill gaps for continued refinement.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-950 print:bg-gray-50 border border-slate-800 print:border-gray-200">
              <span className="text-[11px] text-slate-400 print:text-gray-600 block">Demonstrated</span>
              <span className="text-lg font-bold text-teal-400 print:text-teal-700">{demonstrated.length} Skills</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 print:bg-gray-50 border border-slate-800 print:border-gray-200">
              <span className="text-[11px] text-slate-400 print:text-gray-600 block">Active Gaps</span>
              <span className="text-lg font-bold text-amber-400 print:text-amber-700">{needsImprovement.length} Skills</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 print:bg-gray-50 border border-slate-800 print:border-gray-200">
              <span className="text-[11px] text-slate-400 print:text-gray-600 block">Unassessed Scope</span>
              <span className="text-lg font-bold text-indigo-400 print:text-indigo-700">{notYetAssessed.length} External</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 print:bg-gray-50 border border-slate-800 print:border-gray-200">
              <span className="text-[11px] text-slate-400 print:text-gray-600 block">Completed Modules</span>
              <span className="text-lg font-bold text-purple-400 print:text-purple-700">{completedModules.length} Modules</span>
            </div>
          </div>
        </div>

        {/* Section 2: Detailed Competency Mastery Matrix */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 print:text-indigo-700 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> 2. Pathway Competency Breakdown & Evidence
          </h3>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 print:border-gray-300">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 print:bg-gray-100 text-slate-400 print:text-gray-700 border-b border-slate-800 print:border-gray-300">
                <tr>
                  <th className="p-3 font-semibold">Competency</th>
                  <th className="p-3 font-semibold">Role Importance</th>
                  <th className="p-3 font-semibold">Status</th>
                  <th className="p-3 font-semibold">Score / Benchmark</th>
                  <th className="p-3 font-semibold">Evidence / Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 print:divide-gray-200 text-slate-300 print:text-gray-800">
                {allCompetencies.map(comp => (
                  <tr key={comp.competencyId} className="hover:bg-slate-800/30">
                    <td className="p-3 font-medium text-white print:text-black">
                      {comp.name}
                    </td>
                    <td className="p-3 font-mono text-[11px]">
                      {comp.importance}
                    </td>
                    <td className="p-3">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                        comp.status === COMPETENCY_STATUS.DEMONSTRATED
                          ? 'bg-teal-500/20 text-teal-300 print:text-teal-800'
                          : comp.status === COMPETENCY_STATUS.NEEDS_IMPROVEMENT
                          ? 'bg-amber-500/20 text-amber-300 print:text-amber-800'
                          : 'bg-slate-800 text-slate-400 print:text-gray-600'
                      }`}>
                        {comp.status}
                      </span>
                    </td>
                    <td className="p-3 font-mono">
                      {comp.isAssessedInPrototype ? `${comp.score}% / ${comp.benchmarkScore}%` : 'External'}
                    </td>
                    <td className="p-3 text-[11px] text-slate-400 print:text-gray-600">
                      {comp.evidenceNotes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Completed Learning Activities */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 print:text-indigo-700 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> 3. Completed Learning Pathway Modules
          </h3>

          {completedModules.length === 0 ? (
            <p className="text-xs text-slate-400 print:text-gray-600 italic">
              No learning pathway modules marked completed yet. Follow recommended activities below.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {completedModules.map(mId => {
                const mod = LEARNING_MODULES.find(m => m.id === mId);
                return (
                  <div key={mId} className="p-3.5 rounded-xl bg-slate-950 print:bg-gray-50 border border-slate-800 print:border-gray-200 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-teal-400 print:text-teal-700">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{mod?.title || mId}</span>
                    </div>
                    <p className="text-slate-400 print:text-gray-600 text-[11px]">
                      Targeted Gap: {mod?.competencyName}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Section 4: Recommended Next Steps Roadmap */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 print:text-indigo-700 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> 4. Recommended Next Learning Steps
          </h3>

          <ol className="space-y-2.5 text-xs text-slate-300 print:text-gray-700 list-decimal list-inside">
            {needsImprovement.map((gap, i) => (
              <li key={i} className="leading-relaxed">
                <strong>Address Priority Gap: {gap.name}</strong> — {gap.roleContext}
              </li>
            ))}
            {notYetAssessed.map((unassessed, i) => (
              <li key={`un-${i}`} className="leading-relaxed">
                <strong>Plan External Practice: {unassessed.name}</strong> — Build a portfolio project demonstrating {unassessed.name.toLowerCase()} in a real environment.
              </li>
            ))}
          </ol>
        </div>

        {/* Section 5: Transparent Disclaimer */}
        <div className="pt-6 border-t border-slate-800 print:border-gray-300 text-[11px] text-slate-500 print:text-gray-600 space-y-1">
          <p>
            <strong>Formative Assessment Notice:</strong> {analysis.disclaimer}
          </p>
          <p>
            SkillCarry verifies demonstrated conceptual understanding using in-browser relational execution and TransferCheck independent verification. It does not certify legal employer qualifications or guarantee hiring outcomes.
          </p>
        </div>
      </div>
    </div>
  );
}
