import React, { useState } from 'react';
import { X, Check, ArrowRightLeft, Briefcase, Award, ShieldAlert, BookOpen } from 'lucide-react';
import { CAREER_PATHWAYS, getCareerById } from '../data/careersData';

export default function CareerCompareModal({ isOpen, onClose, defaultCareerId, onSelectCareer }) {
  if (!isOpen) return null;

  const [careerAId, setCareerAId] = useState(defaultCareerId || 'data-analyst');
  const [careerBId, setCareerBId] = useState(
    defaultCareerId === 'database-developer' ? 'data-analyst' : 'database-developer'
  );

  const careerA = getCareerById(careerAId);
  const careerB = getCareerById(careerBId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-2">
              <ArrowRightLeft className="w-3.5 h-3.5" /> Side-by-Side Pathway Comparison
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Compare Technical Career Pathways
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Analyze how entry-level technical roles differ in responsibilities, required competencies, and prototype assessment coverage.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Career Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6 border-b border-slate-800">
          {/* Pathway A Selection */}
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-indigo-500/30">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Pathway A
            </label>
            <select
              value={careerAId}
              onChange={(e) => setCareerAId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-semibold focus:outline-none focus:border-indigo-500"
            >
              {CAREER_PATHWAYS.map(c => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
            <button
              onClick={() => { onSelectCareer(careerAId); onClose(); }}
              className="mt-3 w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer"
            >
              Set {careerA.title} as Target
            </button>
          </div>

          {/* Pathway B Selection */}
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-teal-500/30">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Pathway B
            </label>
            <select
              value={careerBId}
              onChange={(e) => setCareerBId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-semibold focus:outline-none focus:border-teal-500"
            >
              {CAREER_PATHWAYS.map(c => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
            <button
              onClick={() => { onSelectCareer(careerBId); onClose(); }}
              className="mt-3 w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white transition-colors cursor-pointer"
            >
              Set {careerB.title} as Target
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="space-y-6 pt-6">
          {/* Daily Focus & Deliverables */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-400" /> Daily Focus & Key Deliverable
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs font-semibold text-indigo-300">{careerA.title}</span>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  <strong className="text-slate-200">Focus:</strong> {careerA.comparisonMetrics.dailyFocus}
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  <strong className="text-slate-300">Deliverable:</strong> {careerA.comparisonMetrics.typicalDeliverable}
                </p>
              </div>
              <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs font-semibold text-teal-300">{careerB.title}</span>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  <strong className="text-slate-200">Focus:</strong> {careerB.comparisonMetrics.dailyFocus}
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  <strong className="text-slate-300">Deliverable:</strong> {careerB.comparisonMetrics.typicalDeliverable}
                </p>
              </div>
            </div>
          </div>

          {/* Core Tools & Architecture Involvement */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-teal-400" /> Primary Tech Stack & System Architecture
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
                <p><strong className="text-indigo-300">Tools:</strong> {careerA.comparisonMetrics.primaryTools}</p>
                <p><strong className="text-indigo-300">Architecture Scope:</strong> {careerA.comparisonMetrics.systemArchitectureInvolvement}</p>
                <p><strong className="text-indigo-300">Learning Curve:</strong> {careerA.comparisonMetrics.entryBarrier}</p>
              </div>
              <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
                <p><strong className="text-teal-300">Tools:</strong> {careerB.comparisonMetrics.primaryTools}</p>
                <p><strong className="text-teal-300">Architecture Scope:</strong> {careerB.comparisonMetrics.systemArchitectureInvolvement}</p>
                <p><strong className="text-teal-300">Learning Curve:</strong> {careerB.comparisonMetrics.entryBarrier}</p>
              </div>
            </div>
          </div>

          {/* Assessed in SkillCarry vs Further Assessment Required */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" /> Assessment Scope (Prototype vs Further Testing)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Career A Scope */}
              <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-indigo-300">{careerA.title}</div>
                <div>
                  <span className="text-[11px] font-semibold text-teal-400 block mb-1">
                    ✓ Assessed in SkillCarry Prototype:
                  </span>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {careerA.assessedInSkillCarry.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] font-semibold text-amber-400 block mb-1">
                    ! Requires Further Assessment:
                  </span>
                  <ul className="text-xs text-slate-400 space-y-1">
                    {careerA.requiresFurtherAssessment.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Career B Scope */}
              <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-teal-300">{careerB.title}</div>
                <div>
                  <span className="text-[11px] font-semibold text-teal-400 block mb-1">
                    ✓ Assessed in SkillCarry Prototype:
                  </span>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {careerB.assessedInSkillCarry.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] font-semibold text-amber-400 block mb-1">
                    ! Requires Further Assessment:
                  </span>
                  <ul className="text-xs text-slate-400 space-y-1">
                    {careerB.requiresFurtherAssessment.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Roadmap Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-400" /> 5-Step Learning Roadmap Comparison
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-indigo-300">{careerA.title} Steps:</span>
                <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside">
                  {careerA.learningRoadmap.map(r => (
                    <li key={r.step} className="leading-relaxed">
                      <strong className="text-white">{r.title}</strong>
                      <span className="text-slate-400 text-[11px] block pl-5">{r.estimatedEffort}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-teal-300">{careerB.title} Steps:</span>
                <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside">
                  {careerB.learningRoadmap.map(r => (
                    <li key={r.step} className="leading-relaxed">
                      <strong className="text-white">{r.title}</strong>
                      <span className="text-slate-400 text-[11px] block pl-5">{r.estimatedEffort}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
