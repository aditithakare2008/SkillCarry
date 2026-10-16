import React, { useState } from 'react';
import { 
  Compass, 
  User, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  ShieldCheck, 
  FileText, 
  LayoutDashboard, 
  Sparkles, 
  RotateCcw, 
  ChevronRight,
  Menu,
  X,
  Briefcase
} from 'lucide-react';
import { getCareerById } from '../data/careersData';

export default function Navbar({ activeTab, setActiveTab, selectedCareerId, profile, onLoadDemo, onResetAll }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentCareer = getCareerById(selectedCareerId);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'careers', label: 'Career Explorer', icon: Compass },
    { id: 'profile', label: 'Career Profile', icon: User },
    { id: 'assessment', label: 'Skill Assessment', icon: CheckCircle2 },
    { id: 'skill-gaps', label: 'Skill Gaps', icon: AlertTriangle },
    { id: 'learning', label: 'Learning Pathway', icon: BookOpen },
    { id: 'transfer-check', label: 'TransferCheck', icon: ShieldCheck },
    { id: 'report', label: 'Progress Report', icon: FileText }
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-lg">
      {/* Top micro-bar: Sub-sector alignment banner */}
      <div className="bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-teal-900/60 border-b border-indigo-800/30 px-4 py-1 text-xs text-slate-300 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Seva Innovation Challenge 2026
          </span>
          <span className="text-slate-400">Sub-Sector:</span>
          <span className="text-teal-300 font-medium">AI-Based Career Guidance, Skill-Gap Identification & Learning-to-Career Pathways</span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-[11px] text-slate-400">
          {profile?.isDemo && (
            <span className="inline-flex items-center gap-1 text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40 font-mono">
              Demo Profile Active
            </span>
          )}
          <button
            onClick={onLoadDemo}
            className="text-slate-300 hover:text-teal-300 hover:underline transition-colors cursor-pointer"
            title="Load sample student profile & assessment data"
          >
            Load Demo Data
          </button>
          <span>•</span>
          <button
            onClick={onResetAll}
            className="text-slate-400 hover:text-rose-400 hover:underline transition-colors flex items-center gap-1 cursor-pointer"
            title="Clear all stored progress and reset"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Product Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNavClick('dashboard')}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-teal-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1">
                  SkillCarry <span className="text-teal-400 text-xs font-mono font-medium px-1.5 py-0.5 rounded bg-teal-950/60 border border-teal-800/50">Pathways</span>
                </span>
                <span className="text-[10px] text-slate-400 block -mt-0.5">Career Guidance & Skill-Gap Engine</span>
              </div>
            </button>

            {/* Current Active Career Pill */}
            <div className="hidden lg:flex items-center pl-4 border-l border-slate-800">
              <button 
                onClick={() => handleNavClick('careers')}
                className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-xs text-slate-300 transition-all cursor-pointer group"
                title="Click to view and switch career pathway"
              >
                <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-slate-400">Target Role:</span>
                <span className="font-semibold text-white group-hover:text-teal-300">{currentCareer.title}</span>
                <ChevronRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600/30 to-violet-600/30 text-teal-300 border border-indigo-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/70 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('careers')}
              className="text-xs px-2 py-1 rounded bg-slate-900 text-teal-300 border border-slate-800"
            >
              {currentCareer.title}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900/95 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
          <div className="py-2 px-3 mb-2 rounded bg-slate-950 border border-slate-800 text-xs text-slate-300 flex justify-between items-center">
            <span>Selected Pathway:</span>
            <span className="font-bold text-teal-300">{currentCareer.title}</span>
          </div>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600/30 text-teal-300 border border-indigo-500/30'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-3 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => { onLoadDemo(); setMobileMenuOpen(false); }}
              className="flex-1 py-1.5 px-3 rounded text-xs font-medium bg-indigo-600 text-white text-center"
            >
              Load Demo Data
            </button>
            <button
              onClick={() => { onResetAll(); setMobileMenuOpen(false); }}
              className="py-1.5 px-3 rounded text-xs font-medium bg-slate-800 text-rose-300 text-center"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
