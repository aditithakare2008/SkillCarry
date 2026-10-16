import { COMPETENCIES, getCompetencyById, COMPETENCY_IDS } from '../data/competenciesData.js';
import { getCareerById } from '../data/careersData.js';
import { ASSESSMENT_TASKS } from '../data/assessmentTasks.js';
import { LEARNING_MODULES } from '../data/learningModulesData.js';
import { TRANSFER_CHECK_TASKS } from '../data/transferCheckData.js';

export const COMPETENCY_STATUS = {
  DEMONSTRATED: 'Demonstrated',
  NEEDS_IMPROVEMENT: 'Needs Improvement',
  NOT_YET_ASSESSED: 'Not Yet Assessed'
};

export class SkillGapEngine {
  /**
   * Evaluates student competencies against a selected career pathway.
   *
   * @param {string} careerId
   * @param {Object} assessmentAttempts - Map of taskId -> { passed, score, query, timestamp }
   * @param {Object} transferAttempts - Map of tcId -> { completed, score, timestamp }
   * @param {Object} reassessments - Map of taskId -> { passed, score, timestamp }
   * @param {Array<string>} completedModules - List of completed module IDs
   */
  static analyzeProfile(careerId, assessmentAttempts = {}, transferAttempts = {}, reassessments = {}, completedModules = []) {
    const career = getCareerById(careerId);
    const mapped = career.mappedCompetencies || [];

    // Calculate effective score for each competency
    const competencyAnalysis = mapped.map(mapping => {
      const comp = getCompetencyById(mapping.competencyId);
      if (!comp) return null;

      // Check if competency is tested in prototype
      if (!comp.assessedInPrototype) {
        return {
          competencyId: comp.id,
          name: comp.name,
          category: comp.category,
          importance: mapping.importance,
          benchmarkScore: mapping.benchmarkScore,
          roleContext: mapping.roleContext,
          status: COMPETENCY_STATUS.NOT_YET_ASSESSED,
          score: 0,
          isAssessedInPrototype: false,
          evidenceNotes: 'Requires external project or tooling assessment (e.g. Git, Power BI, REST API).',
          recommendedModule: null
        };
      }

      // Find all tasks that target this competency
      const targetingTasks = ASSESSMENT_TASKS.filter(t => t.targetedCompetencies.includes(comp.id));
      const targetingTaskIds = targetingTasks.map(t => t.id);

      // Find all transfer tasks that target this competency
      const targetingTCs = TRANSFER_CHECK_TASKS.filter(tc => tc.competencyId === comp.id);
      const targetingTCIds = targetingTCs.map(tc => tc.id);

      // Gather scores
      let taskScores = [];
      let evidenceDetails = [];

      targetingTaskIds.forEach(tId => {
        // Reassessment overrides or supplements initial attempt
        if (reassessments[tId]) {
          const r = reassessments[tId];
          taskScores.push(r.score);
          evidenceDetails.push(`Reassessment on ${tId}: ${r.score}% (${r.passed ? 'Passed' : 'Needs Work'})`);
        } else if (assessmentAttempts[tId]) {
          const a = assessmentAttempts[tId];
          taskScores.push(a.score);
          evidenceDetails.push(`Initial Assessment on ${tId}: ${a.score}% (${a.passed ? 'Passed' : 'Needs Work'})`);
        }
      });

      // Factor in TransferCheck verification
      let transferScore = null;
      targetingTCIds.forEach(tcId => {
        if (transferAttempts[tcId]) {
          const tc = transferAttempts[tcId];
          transferScore = tc.score;
          evidenceDetails.push(`TransferCheck verification on ${tcId}: ${tc.score}%`);
        }
      });

      // Compute aggregate competency score
      let finalScore = 0;
      let status = COMPETENCY_STATUS.NOT_YET_ASSESSED;

      if (taskScores.length === 0 && transferScore === null) {
        status = COMPETENCY_STATUS.NOT_YET_ASSESSED;
        finalScore = 0;
      } else {
        const avgTaskScore = taskScores.length > 0 
          ? taskScores.reduce((acc, s) => acc + s, 0) / taskScores.length 
          : 0;

        if (transferScore !== null && taskScores.length > 0) {
          // Weighted composite: 60% task execution + 40% independent transfer check
          finalScore = Math.round(avgTaskScore * 0.6 + transferScore * 0.4);
        } else if (taskScores.length > 0) {
          finalScore = Math.round(avgTaskScore);
        } else {
          finalScore = Math.round(transferScore);
        }

        if (finalScore >= mapping.benchmarkScore) {
          status = COMPETENCY_STATUS.DEMONSTRATED;
        } else {
          status = COMPETENCY_STATUS.NEEDS_IMPROVEMENT;
        }
      }

      // Check if student completed any learning modules for this competency
      const matchingModules = LEARNING_MODULES.filter(m => m.competencyId === comp.id);
      const completedForComp = matchingModules.filter(m => completedModules.includes(m.id));

      if (completedForComp.length > 0) {
        evidenceDetails.push(`Completed targeted module: ${completedForComp.map(m => m.title).join(', ')}`);
      }

      return {
        competencyId: comp.id,
        name: comp.name,
        category: comp.category,
        importance: mapping.importance,
        benchmarkScore: mapping.benchmarkScore,
        roleContext: mapping.roleContext,
        status,
        score: finalScore,
        isAssessedInPrototype: true,
        evidenceNotes: evidenceDetails.length > 0 ? evidenceDetails.join(' | ') : 'No assessment attempted yet.',
        recommendedModule: matchingModules[0] || null,
        needsReassessment: status === COMPETENCY_STATUS.NEEDS_IMPROVEMENT
      };
    }).filter(Boolean);

    // Group competencies by status
    const demonstrated = competencyAnalysis.filter(c => c.status === COMPETENCY_STATUS.DEMONSTRATED);
    const needsImprovement = competencyAnalysis.filter(c => c.status === COMPETENCY_STATUS.NEEDS_IMPROVEMENT);
    const notYetAssessed = competencyAnalysis.filter(c => c.status === COMPETENCY_STATUS.NOT_YET_ASSESSED);

    // Calculate Career Alignment / Pathway Progress Index
    const assessedInPrototype = competencyAnalysis.filter(c => c.isAssessedInPrototype);
    const demonstratedCount = demonstrated.filter(c => c.isAssessedInPrototype).length;
    const assessedTotal = assessedInPrototype.length;

    const prototypeAlignmentPercent = assessedTotal > 0
      ? Math.round((demonstratedCount / assessedTotal) * 100)
      : 0;

    // Prioritized Gaps (Critical and High importance competencies that need improvement)
    const priorityGaps = needsImprovement.sort((a, b) => {
      const weight = { Critical: 3, High: 2, Medium: 1 };
      return (weight[b.importance] || 0) - (weight[a.importance] || 0);
    });

    // Determine immediate recommended next action
    let nextAction = null;
    if (assessedTotal > 0 && demonstratedCount === 0 && needsImprovement.length === 0) {
      nextAction = {
        type: 'START_ASSESSMENT',
        title: 'Begin Career Skill Assessment',
        description: 'Take the 5-task foundational SQL assessment to evaluate your baseline against the ' + career.title + ' pathway.',
        targetPath: 'assessment'
      };
    } else if (priorityGaps.length > 0) {
      const topGap = priorityGaps[0];
      nextAction = {
        type: 'LEARNING_MODULE',
        title: topGap.recommendedModule ? `Practice: ${topGap.recommendedModule.title}` : `Improve: ${topGap.name}`,
        description: `High-priority skill gap for ${career.title}: ${topGap.roleContext}`,
        moduleId: topGap.recommendedModule?.id,
        targetPath: 'learning'
      };
    } else if (needsImprovement.length > 0) {
      const gap = needsImprovement[0];
      nextAction = {
        type: 'REASSESSMENT',
        title: `Reassess ${gap.name}`,
        description: 'You completed learning practice. Re-test this competency to prove updated understanding.',
        targetPath: 'assessment'
      };
    } else {
      nextAction = {
        type: 'TRANSFER_CHECK',
        title: 'Validate with TransferCheck',
        description: 'Verify your demonstrated knowledge through independent code review and cross-domain reasoning.',
        targetPath: 'transfer-check'
      };
    }

    return {
      career,
      allCompetencies: competencyAnalysis,
      demonstrated,
      needsImprovement,
      notYetAssessed,
      priorityGaps,
      prototypeAlignmentPercent,
      demonstratedCount,
      assessedTotal,
      nextAction,
      disclaimer: 'This career readiness indicator reflects formative prototype assessment performance. It provides learning pathway guidance, not certified employer readiness or job guarantees.'
    };
  }
}
