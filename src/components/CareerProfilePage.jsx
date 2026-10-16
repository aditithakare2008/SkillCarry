import React, { useState, useEffect } from 'react';
import { 
  User, 
  GraduationCap, 
  Sparkles, 
  BookOpen, 
  Check, 
  Briefcase, 
  Save, 
  RotateCcw, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { 
  EDUCATION_LEVELS, 
  CAREER_INTEREST_OPTIONS, 
  TECHNICAL_SKILL_OPTIONS, 
  LEARNING_APPROACH_OPTIONS, 
  DEMO_PROFILE 
} from '../data/demoProfile';
import { CAREER_PATHWAYS } from '../data/careersData';

export default function CareerProfilePage({ profile, onSaveProfile, setActiveTab, selectedCareerId, onSelectCareer }) {
  const [formData, setFormData] = useState({
    fullName: '',
    educationLevel: EDUCATION_LEVELS[1],
    institution: '',
    targetCareerId: selectedCareerId || 'data-analyst',
    careerInterests: [],
    existingTechnicalSkills: [],
    preferredLearningApproach: LEARNING_APPROACH_OPTIONS[0],
    isDemo: false
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || '',
        educationLevel: profile.educationLevel || EDUCATION_LEVELS[1],
        institution: profile.institution || '',
        targetCareerId: profile.targetCareerId || selectedCareerId || 'data-analyst',
        careerInterests: profile.careerInterests || [],
        existingTechnicalSkills: profile.existingTechnicalSkills || [],
        preferredLearningApproach: profile.preferredLearningApproach || LEARNING_APPROACH_OPTIONS[0],
        isDemo: profile.isDemo || false
      });
    }
  }, [profile, selectedCareerId]);

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      careerInterests: prev.careerInterests.includes(interest)
        ? prev.careerInterests.filter(i => i !== interest)
        : [...prev.careerInterests, interest]
    }));
  };

  const toggleSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      existingTechnicalSkills: prev.existingTechnicalSkills.includes(skill)
        ? prev.existingTechnicalSkills.filter(s => s !== skill)
        : [...prev.existingTechnicalSkills, skill]
    }));
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    onSaveProfile(formData);
    onSelectCareer(formData.targetCareerId);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleUseDemo = () => {
    setFormData(DEMO_PROFILE);
    onSaveProfile(DEMO_PROFILE);
    onSelectCareer(DEMO_PROFILE.targetCareerId);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-2">
              <User className="w-3.5 h-3.5" /> Career Profile & Student Onboarding
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Create Your Technical Career Profile
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Tell us about your background, goals, and existing technical foundation so SkillCarry can tailor your assessment baseline and personalized skill-gap identification.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <button
              type="button"
              onClick={handleUseDemo}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-300" /> Use Sample Demo Profile
            </button>
          </div>
        </div>

        {savedSuccess && (
          <div className="mt-4 p-3 rounded-xl bg-teal-500/20 border border-teal-500/40 text-teal-300 text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4" /> Profile saved locally! Your career pathway and assessment recommendations have been updated.
          </div>
        )}
      </div>

      {/* Form Card */}
      <form onSubmit={handleSave} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 backdrop-blur-md shadow-xl">
        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-400" /> 1. Education & Academic Background
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Full Name (or Demo Handle)
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Aditi Thakare"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                College / University / Organization (Optional)
              </label>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                placeholder="e.g. Technical Institute / University"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Current Education Level
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {EDUCATION_LEVELS.map(level => (
                <button
                  type="button"
                  key={level}
                  onClick={() => setFormData({ ...formData, educationLevel: level })}
                  className={`p-3 rounded-xl text-xs text-left border transition-all cursor-pointer ${
                    formData.educationLevel === level
                      ? 'bg-indigo-600/30 border-indigo-500 text-teal-300 font-semibold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Target Career Pathway */}
        <div className="space-y-4 pt-6 border-t border-slate-800">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-teal-400" /> 2. Preferred Career Pathway
          </h2>
          <p className="text-xs text-slate-400 -mt-2">
            This selection directly determines your mapped competencies, assessment benchmarks, and prioritized skill gaps.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {CAREER_PATHWAYS.map(career => {
              const isSelected = formData.targetCareerId === career.id;
              return (
                <div
                  key={career.id}
                  onClick={() => setFormData({ ...formData, targetCareerId: career.id })}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-b from-indigo-950/80 to-slate-900 border-teal-500/80 ring-1 ring-teal-500/40 text-white'
                      : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono uppercase text-indigo-400">{career.experienceLevel}</span>
                    {isSelected && <Check className="w-4 h-4 text-teal-400" />}
                  </div>
                  <h3 className="text-sm font-bold">{career.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {career.tagline}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technical Interests */}
        <div className="space-y-4 pt-6 border-t border-slate-800">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" /> 3. Technical Areas of Interest
          </h2>
          <div className="flex flex-wrap gap-2">
            {CAREER_INTEREST_OPTIONS.map(interest => {
              const checked = formData.careerInterests.includes(interest);
              return (
                <button
                  type="button"
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                    checked
                      ? 'bg-purple-600/30 border-purple-500 text-purple-200'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {checked && <Check className="w-3.5 h-3.5 text-purple-400" />}
                  <span>{interest}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Existing Technical Skills */}
        <div className="space-y-4 pt-6 border-t border-slate-800">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> 4. Existing Technical Skills
          </h2>
          <p className="text-xs text-slate-400 -mt-2">
            Select what you have practiced before. Your assessment will test these concepts to establish your objective baseline.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {TECHNICAL_SKILL_OPTIONS.map(skill => {
              const checked = formData.existingTechnicalSkills.includes(skill);
              return (
                <button
                  type="button"
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`p-2.5 rounded-xl text-xs text-left border transition-all cursor-pointer flex items-start gap-2 ${
                    checked
                      ? 'bg-emerald-950/30 border-emerald-500/60 text-emerald-200 font-semibold'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
                    checked ? 'border-emerald-400 bg-emerald-500/40 text-emerald-300' : 'border-slate-700'
                  }`}>
                    {checked && <Check className="w-2.5 h-2.5" />}
                  </span>
                  <span className="leading-snug">{skill}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Learning Approach */}
        <div className="space-y-4 pt-6 border-t border-slate-800">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" /> 5. Preferred Learning Approach
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {LEARNING_APPROACH_OPTIONS.map(approach => (
              <button
                type="button"
                key={approach}
                onClick={() => setFormData({ ...formData, preferredLearningApproach: approach })}
                className={`p-3 rounded-xl text-xs text-left border transition-all cursor-pointer ${
                  formData.preferredLearningApproach === approach
                    ? 'bg-amber-500/20 border-amber-500/60 text-amber-200 font-semibold'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {approach}
              </button>
            ))}
          </div>
        </div>

        {/* Actions & Skip Options */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setActiveTab('assessment')}
            className="text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            Skip optional questions & proceed to assessment ›
          </button>

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Career Profile
            </button>
            <button
              type="button"
              onClick={() => {
                handleSave();
                setActiveTab('assessment');
              }}
              className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white shadow-lg shadow-teal-600/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              Proceed to Assessment <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
