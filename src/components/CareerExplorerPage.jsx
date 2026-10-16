import React, { useState } from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  ArrowRightLeft, 
  Check, 
  AlertCircle, 
  BookOpen, 
  Layers, 
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { CAREER_PATHWAYS } from '../data/careersData';
import CareerCompareModal from './CareerCompareModal';

export default function CareerExplorerPage({ selectedCareerId, onSelectCareer, setActiveTab }) {
  const [activeTabCareerId, setActiveTabCareerId] = useState(selectedCareerId || 'data-analyst');
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const activeCareer = CAREER_PATHWAYS.find(c => c.id === activeTabCareerId) || CAREER_PATHWAYS[0];
  const isCurrentTarget = selectedCareerId === activeCareer.id;

  const handleSetTarget = (careerId) => {
    onSelectCareer(careerId);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-900/40 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Learning-to-Career Pathway Exploration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Explore Entry-Level Technical Pathways
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Discover real-world technical responsibilities, mapped competencies, and transparent assessment boundaries. Select your target pathway to configure your personalized skill assessment and gap analysis.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsCompareOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <ArrowRightLeft className="w-4 h-4" /> Compare Pathways Side-by-Side
            </button>
            <span className="text-xs text-slate-400">
              Selected Target: <strong className="text-teal-300">{CAREER_PATHWAYS.find(c => c.id === selectedCareerId)?.title}</strong>
            </span>
          </div>
        </div>

        {/* Honest Guidance Disclaimer */}
        <div className="mt-6 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
          <span>
            <strong className="text-slate-300">Sample Educational Guidance:</strong> Role descriptions, skills, and suggested learning steps represent structured educational curriculum pathways. SkillCarry does not display unverified employer requirements, speculative salaries, or employment guarantees.
          </span>
        </div>
      </div>

      {/* Career Pathway Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CAREER_PATHWAYS.map(career => {
          const isSelected = activeTabCareerId === career.id;
          const isUserTarget = selectedCareerId === career.id;

          return (
            <div
              key={career.id}
              onClick={() => setActiveTabCareerId(career.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-gradient-to-b from-slate-900 to-indigo-950/70 border-indigo-500/70 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/30'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400 font-mono">
                  {career.experienceLevel}
                </span>
                {isUserTarget && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40 px-2 py-0.5 rounded-full">
                    <Check className="w-3 h-3" /> Active Goal
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-white mt-1.5">{career.title}</h3>
              <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                {career.tagline}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  {career.mappedCompetencies.length} Mapped Skills
                </span>
                <span className="text-teal-400 font-medium flex items-center gap-1">
                  View Pathway <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Career Deep-Dive Details */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 backdrop-blur-md shadow-xl">
        {/* Pathway Header & Selection Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-indigo-400 font-semibold mb-1">
              <Briefcase className="w-4 h-4" /> Comprehensive Pathway Overview
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{activeCareer.title}</h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {activeCareer.overview}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {isCurrentTarget ? (
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/40 text-sm font-semibold">
                <Check className="w-4 h-4" /> Selected Career Goal
              </div>
            ) : (
              <button
                onClick={() => handleSetTarget(activeCareer.id)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                Set as My Career Pathway
              </button>
            )}
            <button
              onClick={() => setIsCompareOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors cursor-pointer"
            >
              Compare with Another
            </button>
          </div>
        </div>

        {/* 2-Column: Responsibilities vs Technical & Problem-Solving Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Responsibilities */}
          <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-2">
              <Layers className="w-4 h-4" /> Typical Day-to-Day Responsibilities
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              {activeCareer.typicalResponsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-2"></span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical & Problem-Solving Skills */}
          <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80 space-y-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-teal-300 flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4" /> Relevant Technical Competencies
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeCareer.technicalSkills.map((skill, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg text-xs bg-slate-900 border border-slate-700 text-slate-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4" /> Key Problem-Solving Abilities
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {activeCareer.problemSolvingSkills.map((skill, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">›</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Assessment Scope Transparency: In-App vs Further Assessment Required */}
        <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Info className="w-4 h-4 text-teal-400" /> Transparent Assessment Coverage Breakdown
            </h3>
            <span className="text-xs text-slate-400 font-mono">Prototype Assessment Boundaries</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Assessed within SkillCarry */}
            <div className="p-4 rounded-xl bg-teal-950/20 border border-teal-800/40 space-y-2">
              <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" /> Skills Directly Assessed in SkillCarry:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Evaluated through real, client-side relational SQL execution against realistic sample databases:
              </p>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {activeCareer.assessedInSkillCarry.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requires Further Assessment */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 space-y-2">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-400" /> Competencies Requiring Further Assessment:
              </span>
              <p className="text-xs text-slate-400 leading-relaxed mb-2">
                Not fully measured by in-browser SQL querying; require dedicated tooling, Git repositories, or portfolio evaluations:
              </p>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {activeCareer.requiresFurtherAssessment.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Suggested 5-Step Learning Roadmap */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" /> Suggested Learning Roadmap
            </h3>
            <span className="text-xs text-slate-400">Milestones to Employment Competency</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {activeCareer.learningRoadmap.map(r => (
              <div key={r.step} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-xs font-bold text-indigo-300 font-mono">
                      {r.step}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{r.estimatedEffort}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-snug">{r.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                    {r.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Step Call to Action */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-slate-400">Next Recommended Step:</span>
            <p className="text-sm font-bold text-white">Create your Career Profile or proceed directly to Skill Assessment</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setActiveTab('profile')}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
            >
              Update Career Profile
            </button>
            <button
              onClick={() => {
                handleSetTarget(activeCareer.id);
                setActiveTab('assessment');
              }}
              className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 text-white shadow-lg shadow-indigo-600/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              Start Assessment for {activeCareer.title} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Modal */}
      <CareerCompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        defaultCareerId={activeTabCareerId}
        onSelectCareer={handleSetTarget}
      />
    </div>
  );
}
