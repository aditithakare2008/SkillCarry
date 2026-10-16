# SkillCarry — AI-Based Career Guidance, Skill-Gap Identification & Learning-to-Career Pathways

Built for the **Seva Innovation Challenge 2026** sub-sector:
> **“AI-Based Career Guidance, Skill-Gap Identification and Learning-to-Career Pathways.”**

SkillCarry transforms technical learning from generic multiple-choice quizzes into a coherent career-guidance journey. It connects career exploration, objective in-browser skill assessment, transparent skill-gap identification, targeted pedagogical remediation, and conceptual transfer verification.

---

## The 7-Step Student Journey

```
Explore Careers ➔ Create Career Profile ➔ Assess Skills ➔ Identify Skill Gaps ➔ Follow Learning Pathway ➔ Reassess & TransferCheck ➔ View Updated Career Progress
```

1. **Explore Careers**: Explore entry-level technical pathways (Data Analyst, Database Developer, Junior Software Developer), responsibilities, technical requirements, and compare pathways side-by-side.
2. **Career Profile**: Onboard with education level, interests, existing technical foundation, and preferred learning approach. Includes a 1-click **Sample Demo Profile** and local persistence.
3. **Assess Skills**: Execute genuine SQL queries against an in-browser relational schema (`departments`, `employees`, `orders`) powered by AlaSQL.
4. **Identify Skill Gaps**: Compare demonstrated competencies against target pathway benchmarks. Each identified gap explains *why* it matters for that specific career.
5. **Follow Learning Pathway**: Practice targeted modules addressing the student's specific gaps with worked examples, common pitfalls, and interactive challenges.
6. **Reassess & TransferCheck**: Validate that learning is genuine and transferable through code review/debugging, conceptual failure analysis, and cross-domain schema application (e.g. Healthcare clinic data).
7. **Updated Career Progress Report**: Review and export a printable/downloadable summary showing target pathway progress, verified competency evidence, and next milestones.

---

## Core Pillars & Architectural Features

### 1. Transparent Career-to-Skill Mapping
- Predefined competency taxonomy:
  - `COMP_SQL_FILTER`: SQL Filtering & Conditional Logic
  - `COMP_SQL_AGG`: SQL Aggregations & Group Summaries
  - `COMP_SQL_JOIN`: Relational Joins & Multi-Table Queries
  - `COMP_SQL_SCHEMA`: Relational Schema & Key Integrity
  - `COMP_DATA_INTERP`: Analytical Data Interpretation
  - External Competencies: Clearly marked as *Requires Further Assessment* (e.g., Power BI dashboards, Git collaboration, REST APIs).

### 2. Client-Side Relational Engine (AlaSQL)
- Executes real queries locally in browser memory.
- Validates student query logic, column projection, and dataset result comparison.
- **Honest Feedback**: Explicitly communicates that queries run client-side in browser memory with zero simulated or fake remote database claims.

### 3. Personalised Skill-Gap Engine
- Compares student performance with role benchmarks (e.g., 80% threshold for Data Analyst aggregations).
- Categorizes competencies into **Demonstrated**, **Needs Improvement**, and **Requiring Further Assessment**.
- Explains the exact role context of why each gap matters.
- Dynamically recommends the next pedagogical module.

### 4. Retained & Enhanced SkillCarry TransferCheck™
- Displays three separate performance indicators:
  1. Initial Task Performance
  2. Independent Verification (TransferCheck)
  3. Reassessment / Updated Standing
- Clearly states: *"These are indicators of demonstrated conceptual transfer, not proof of AI-free work or scientific certification."*

### 5. Local Storage Persistence & Reset
- Complete state persists across page refreshes.
- Includes **"Load Demo Data"** for rapid evaluation and **"Reset"** to test from scratch.

---

## Quick Start & Running the Project

```bash
# Navigate to the project directory
cd "C:\Users\Aditi Thakare\.gemini\antigravity\scratch\skillcarry"

# Run development server
npm run dev

# Or build and preview production build
npm run build
npm run preview
```

Open `http://localhost:5173` in any modern web browser.
