import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardPage from './components/DashboardPage';
import CareerExplorerPage from './components/CareerExplorerPage';
import CareerProfilePage from './components/CareerProfilePage';
import SkillAssessmentPage from './components/SkillAssessmentPage';
import SkillGapPage from './components/SkillGapPage';
import LearningPathwayPage from './components/LearningPathwayPage';
import TransferCheckPage from './components/TransferCheckPage';
import CareerReportPage from './components/CareerReportPage';
import { storageService } from './services/storageService';
import { getCareerById } from './data/careersData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCareerId, setSelectedCareerId] = useState('data-analyst');
  const [profile, setProfile] = useState(null);
  const [assessmentAttempts, setAssessmentAttempts] = useState({});
  const [transferAttempts, setTransferAttempts] = useState({});
  const [reassessments, setReassessments] = useState({});
  const [completedModules, setCompletedModules] = useState([]);

  // Load state from local storage on mount
  useEffect(() => {
    const savedCareer = storageService.getSelectedCareer();
    const savedProfile = storageService.getProfile();
    const savedAssessments = storageService.getAssessmentAttempts();
    const savedTransfers = storageService.getTransferCheckAttempts();
    const savedReassess = storageService.getReassessments();
    const savedModules = storageService.getCompletedModules();

    setSelectedCareerId(savedCareer);
    setProfile(savedProfile);
    setAssessmentAttempts(savedAssessments);
    setTransferAttempts(savedTransfers);
    setReassessments(savedReassess);
    setCompletedModules(savedModules);

    // If first time visit with no profile, auto-seed with clean default or prompt
    if (!savedProfile) {
      // You can start on profile or dashboard
    }
  }, []);

  const handleSelectCareer = (careerId) => {
    setSelectedCareerId(careerId);
    storageService.setSelectedCareer(careerId);
  };

  const handleSaveProfile = (newProfile) => {
    setProfile(newProfile);
    storageService.saveProfile(newProfile);
    if (newProfile?.targetCareerId) {
      setSelectedCareerId(newProfile.targetCareerId);
    }
  };

  const handleSaveAssessmentAttempt = (taskId, attemptData) => {
    const updated = storageService.saveAssessmentAttempt(taskId, attemptData);
    setAssessmentAttempts({ ...updated });
  };

  const handleSaveTransferAttempt = (tcId, attemptData) => {
    const updated = storageService.saveTransferCheckAttempt(tcId, attemptData);
    setTransferAttempts({ ...updated });
  };

  const handleToggleModuleCompletion = (moduleId) => {
    const updated = storageService.toggleModuleCompletion(moduleId);
    setCompletedModules([...updated]);
  };

  const handleLoadDemo = () => {
    const demoData = storageService.loadDemoData();
    setProfile(demoData.profile);
    setSelectedCareerId(demoData.profile.targetCareerId);
    setAssessmentAttempts(demoData.assessments);
    setTransferAttempts(demoData.transferChecks);
    setCompletedModules(demoData.completedModules);
    setActiveTab('dashboard');
  };

  const handleResetAll = () => {
    if (window.confirm('Are you sure you want to reset all stored progress and start fresh?')) {
      storageService.clearAll();
      setProfile(null);
      setSelectedCareerId('data-analyst');
      setAssessmentAttempts({});
      setTransferAttempts({});
      setReassessments({});
      setCompletedModules([]);
      setActiveTab('dashboard');
    }
  };

  const currentCareer = getCareerById(selectedCareerId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCareerId={selectedCareerId}
        profile={profile}
        onLoadDemo={handleLoadDemo}
        onResetAll={handleResetAll}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <DashboardPage
            profile={profile}
            selectedCareerId={selectedCareerId}
            onSelectCareer={handleSelectCareer}
            assessmentAttempts={assessmentAttempts}
            transferAttempts={transferAttempts}
            reassessments={reassessments}
            completedModules={completedModules}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'careers' && (
          <CareerExplorerPage
            selectedCareerId={selectedCareerId}
            onSelectCareer={handleSelectCareer}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'profile' && (
          <CareerProfilePage
            profile={profile}
            onSaveProfile={handleSaveProfile}
            selectedCareerId={selectedCareerId}
            onSelectCareer={handleSelectCareer}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'assessment' && (
          <SkillAssessmentPage
            selectedCareerId={selectedCareerId}
            assessmentAttempts={assessmentAttempts}
            onSaveAttempt={handleSaveAssessmentAttempt}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'skill-gaps' && (
          <SkillGapPage
            selectedCareerId={selectedCareerId}
            assessmentAttempts={assessmentAttempts}
            transferAttempts={transferAttempts}
            reassessments={reassessments}
            completedModules={completedModules}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'learning' && (
          <LearningPathwayPage
            selectedCareerId={selectedCareerId}
            completedModules={completedModules}
            onToggleModuleCompletion={handleToggleModuleCompletion}
            assessmentAttempts={assessmentAttempts}
            transferAttempts={transferAttempts}
            reassessments={reassessments}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'transfer-check' && (
          <TransferCheckPage
            selectedCareerId={selectedCareerId}
            transferAttempts={transferAttempts}
            onSaveTransferAttempt={handleSaveTransferAttempt}
            assessmentAttempts={assessmentAttempts}
            reassessments={reassessments}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'report' && (
          <CareerReportPage
            profile={profile}
            selectedCareerId={selectedCareerId}
            assessmentAttempts={assessmentAttempts}
            transferAttempts={transferAttempts}
            reassessments={reassessments}
            completedModules={completedModules}
            setActiveTab={setActiveTab}
          />
        )}
      </main>

      {/* Footer (hidden in print) */}
      <footer className="no-print bg-slate-950 border-t border-slate-900 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-slate-400">SkillCarry Pathways</span> • Built for Seva Innovation Challenge 2026
            <span className="block text-[11px] text-slate-600 mt-0.5">
              Sub-sector: AI-Based Career Guidance, Skill-Gap Identification and Learning-to-Career Pathways
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Current Target: <strong className="text-teal-400">{currentCareer.title}</strong></span>
            <span>•</span>
            <span>Client-side in-memory relational evaluator</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
