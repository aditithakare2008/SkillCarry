import React from 'react';
import { 
  Compass, 
  UserCheck, 
  Terminal, 
  AlertTriangle, 
  BookOpen, 
  RefreshCw, 
  Award,
  Check
} from 'lucide-react';

export const STEPS = [
  { id: 'careers', stepNum: 1, label: 'Explore Careers', icon: Compass, tab: 'careers' },
  { id: 'profile', stepNum: 2, label: 'Career Profile', icon: UserCheck, tab: 'profile' },
  { id: 'assessment', stepNum: 3, label: 'Assess Skills', icon: Terminal, tab: 'assessment' },
  { id: 'skill-gaps', stepNum: 4, label: 'Identify Skill Gaps', icon: AlertTriangle, tab: 'skill-gaps' },
  { id: 'learning', stepNum: 5, label: 'Learning Pathway', icon: BookOpen, tab: 'learning' },
  { id: 'transfer-check', stepNum: 6, label: 'Reassess & TransferCheck', icon: RefreshCw, tab: 'transfer-check' },
  { id: 'report', stepNum: 7, label: 'Updated Career Progress', icon: Award, tab: 'report' }
];

export default function WorkflowStepper({ activeTab, setActiveTab, completionStatus = {} }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 mb-8 backdrop-blur-sm shadow-xl">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Learning-to-Career Workflow
          </h3>
        </div>
        <span className="text-[11px] text-slate-400 hidden sm:inline">
          Seva Innovation Challenge 2026 Core Pathway
        </span>
      </div>

      {/* Responsive step grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {STEPS.map((step) => {
          const Icon = step.icon;
          const isActive = activeTab === step.tab;
          const isDone = completionStatus[step.id];

          return (
            <button
              key={step.id}
              onClick={() => setActiveTab(step.tab)}
              className={`flex flex-col items-center text-center p-2.5 rounded-xl border transition-all cursor-pointer group relative ${
                isActive
                  ? 'bg-gradient-to-b from-indigo-950/90 to-slate-900 border-teal-500/60 text-white shadow-md shadow-teal-500/10'
                  : isDone
                  ? 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-300'
                  : 'bg-slate-950/40 border-slate-800/50 hover:border-slate-700 text-slate-400'
              }`}
            >
              {/* Step counter pill */}
              <div className="flex items-center justify-center w-7 h-7 rounded-full mb-1.5 transition-transform group-hover:scale-105">
                {isDone ? (
                  <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-500/50 flex items-center justify-center text-teal-300">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isActive
                      ? 'bg-indigo-600 text-white ring-2 ring-teal-400/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {step.stepNum}
                  </div>
                )}
              </div>

              {/* Step Label */}
              <span className={`text-[11px] font-semibold leading-tight line-clamp-1 ${
                isActive ? 'text-teal-300' : isDone ? 'text-slate-200' : 'text-slate-400'
              }`}>
                {step.label}
              </span>

              {/* Status pill under label */}
              <span className="text-[9px] mt-1 font-mono text-slate-400">
                {isActive ? 'Current' : isDone ? 'Verified' : 'Step ' + step.stepNum}
              </span>

              {/* Active bottom accent indicator */}
              {isActive && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-teal-400 rounded-full shadow-sm shadow-teal-400"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
