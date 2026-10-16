import { DEMO_PROFILE } from '../data/demoProfile.js';

const STORAGE_KEYS = {
  PROFILE: 'skillcarry_user_profile_v2',
  ASSESSMENTS: 'skillcarry_assessments_v2',
  TRANSFER_CHECKS: 'skillcarry_transfer_checks_v2',
  COMPLETED_MODULES: 'skillcarry_completed_modules_v2',
  REASSESSMENTS: 'skillcarry_reassessments_v2',
  CURRENT_CAREER: 'skillcarry_selected_career_v2'
};

export const storageService = {
  // Profile
  getProfile() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error reading profile from localStorage:', e);
      return null;
    }
  },

  saveProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
      if (profile?.targetCareerId) {
        this.setSelectedCareer(profile.targetCareerId);
      }
    } catch (e) {
      console.error('Error saving profile to localStorage:', e);
    }
  },

  // Selected Career ID
  getSelectedCareer() {
    try {
      return localStorage.getItem(STORAGE_KEYS.CURRENT_CAREER) || 'data-analyst';
    } catch (e) {
      return 'data-analyst';
    }
  },

  setSelectedCareer(careerId) {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_CAREER, careerId);
      const profile = this.getProfile();
      if (profile && profile.targetCareerId !== careerId) {
        profile.targetCareerId = careerId;
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
      }
    } catch (e) {
      console.error('Error setting selected career:', e);
    }
  },

  // Assessment Attempts: { [taskId]: { passed: bool, score: number, query: string, feedback: string, timestamp: string } }
  getAssessmentAttempts() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ASSESSMENTS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  },

  saveAssessmentAttempt(taskId, attemptData) {
    try {
      const attempts = this.getAssessmentAttempts();
      attempts[taskId] = {
        ...attemptData,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(attempts));
      return attempts;
    } catch (e) {
      console.error('Error saving assessment attempt:', e);
      return {};
    }
  },

  // TransferCheck Attempts: { [taskId]: { completed: bool, score: number, selectedOptionId: string, timestamp: string } }
  getTransferCheckAttempts() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TRANSFER_CHECKS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  },

  saveTransferCheckAttempt(taskId, attemptData) {
    try {
      const attempts = this.getTransferCheckAttempts();
      attempts[taskId] = {
        ...attemptData,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEYS.TRANSFER_CHECKS, JSON.stringify(attempts));
      return attempts;
    } catch (e) {
      console.error('Error saving transfer check attempt:', e);
      return {};
    }
  },

  // Completed Learning Modules: array of module IDs ['mod-sql-agg', ...]
  getCompletedModules() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_MODULES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  toggleModuleCompletion(moduleId) {
    try {
      const completed = this.getCompletedModules();
      const next = completed.includes(moduleId)
        ? completed.filter(id => id !== moduleId)
        : [...completed, moduleId];
      localStorage.setItem(STORAGE_KEYS.COMPLETED_MODULES, JSON.stringify(next));
      return next;
    } catch (e) {
      console.error('Error toggling module completion:', e);
      return [];
    }
  },

  // Reassessment Attempts: { [taskId]: { passed: bool, score: number, query: string, previousScore: number, timestamp: string } }
  getReassessments() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REASSESSMENTS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  },

  saveReassessment(taskId, attemptData) {
    try {
      const reassessments = this.getReassessments();
      reassessments[taskId] = {
        ...attemptData,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEYS.REASSESSMENTS, JSON.stringify(reassessments));
      return reassessments;
    } catch (e) {
      console.error('Error saving reassessment:', e);
      return {};
    }
  },

  // Load Demo Data for rapid evaluation & testing
  loadDemoData() {
    this.saveProfile(DEMO_PROFILE);
    this.setSelectedCareer('data-analyst');

    // Seed realistic baseline student attempts (demonstrating Filter & Join, but with an aggregation gap)
    const demoAssessments = {
      'task-1': {
        passed: true,
        score: 100,
        query: 'SELECT first_name, last_name, role, salary, hire_year FROM employees WHERE dept_id IN (101, 102) AND salary > 65000 AND hire_year >= 2021 ORDER BY salary DESC;',
        feedback: 'Excellent! Your query returned the exact expected dataset with correct relational logic.',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
      },
      'task-2': {
        passed: false,
        score: 45,
        query: 'SELECT dept_id, COUNT(*) AS employee_count, SUM(salary) AS total_payroll FROM employees WHERE salary > 50000 GROUP BY dept_id ORDER BY total_payroll DESC;',
        feedback: 'Row count discrepancy: Missing HAVING COUNT(*) >= 2 group filter; incorrectly placed individual salary filter in WHERE clause.',
        timestamp: new Date(Date.now() - 3600000).toISOString()
      },
      'task-3': {
        passed: true,
        score: 100,
        query: 'SELECT e.first_name, e.last_name, e.role, d.dept_name, d.floor FROM employees e INNER JOIN departments d ON e.dept_id = d.dept_id ORDER BY d.dept_name ASC, e.last_name ASC;',
        feedback: 'Correct! Multi-table relational join matches schema structure.',
        timestamp: new Date(Date.now() - 1800000).toISOString()
      }
    };
    localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(demoAssessments));

    // Seed 1 TransferCheck attempt demonstrating concept verification
    const demoTransfer = {
      'tc-1': {
        completed: true,
        score: 100,
        selectedOptionId: 'opt-a',
        feedback: 'Correct! WHERE processes row-by-row before buckets are formed. Once GROUP BY runs, HAVING is the designated post-grouping filter.',
        timestamp: new Date(Date.now() - 900000).toISOString()
      }
    };
    localStorage.setItem(STORAGE_KEYS.TRANSFER_CHECKS, JSON.stringify(demoTransfer));

    // Mark 1 module partially completed
    localStorage.setItem(STORAGE_KEYS.COMPLETED_MODULES, JSON.stringify(['mod-sql-filter']));

    return {
      profile: DEMO_PROFILE,
      assessments: demoAssessments,
      transferChecks: demoTransfer,
      completedModules: ['mod-sql-filter']
    };
  },

  // Clear all local data to start totally clean
  clearAll() {
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
  }
};
