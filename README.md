# SkillCarry

> **AI-Based Career Guidance, Skill-Gap Identification, and Learning-to-Career Pathways**  
> *Developed for the Seva Innovation Challenge 2026*


## Live Demo

**[Click here to open SkillCarry](https://skill-carry.vercel.app/)**

---

## 1. Project Overview

### Problem Statement
In technical higher education, students frequently learn programming syntax and database queries in isolation without understanding how these competencies translate into real-world engineering roles. Traditional learning platforms often rely on arbitrary multiple-choice quizzes or disjointed coding puzzles that fail to provide:
1. Clear visibility into entry-level technical pathways and their prerequisite skills.
2. Objective, evidence-based skill-gap identification based on genuine query execution.
3. Structured remediation pathways that connect identified deficiencies to role-specific practice.
4. Independent verification of conceptual understanding to ensure students can transfer knowledge across diverse business domains.

### Purpose of the Application
**SkillCarry** bridges this divide by transforming technical learning from a standalone assessment into an end-to-end career guidance journey. It guides students through a 7-step pathway:
```
Explore Careers ➔ Create Career Profile ➔ Assess Skills ➔ Identify Skill Gaps ➔ Follow Learning Pathway ➔ Reassess & TransferCheck ➔ View Updated Career Progress
```

### Seva Innovation Challenge 2026 Alignment
- **Sector**: Education & Employment
- **Sub-Sector**: *“AI-Based Career Guidance, Skill-Gap Identification and Learning-to-Career Pathways.”*

### Intended Users
- **Undergraduate & Diploma Technical Students**: Preparing for their first technical roles (Data Analyst, Junior Software Developer, Database Developer).
- **Career Transitioners**: Transitioning into technical data and software careers with structured guidance.
- **Academic Mentors & Educators**: Tracking student skill development through evidence-based progress reports.

---

## 2. Features

### Currently Implemented & Fully Functional Features
- **Career Goal Dashboard**: Real-time progress dashboard displaying the active career goal, 7-step pathway stepper, pathway alignment index, priority skill gaps, and immediate recommended learning actions.
- **Student Career Profile**: Interactive onboarding collecting education level, career interests, existing skills, and preferred learning style. Includes a **1-click Sample Demo Profile** and local persistence.
- **Career Pathway Explorer**: In-depth profiles for three entry-level roles:
  1. *Data Analyst*
  2. *Database Developer / Junior Database Professional*
  3. *Junior Software Developer*  
  Each pathway provides day-to-day responsibilities, technical & problem-solving competencies, transparent in-prototype assessment scopes, and a 5-step learning roadmap.
- **Side-by-Side Pathway Comparison**: Interactive modal enabling students to compare two career tracks across daily focus, tech stack, architecture scope, and deliverables.
- **Career-Mapped Skill Assessment**: Hands-on SQL query console executing against an in-browser relational database (`departments`, `employees`, `orders`) with live tabular outputs and performance timing.
- **Real-Time Query Evaluation**: Genuine comparison of student queries against target relational logic, with constructive diagnostic feedback (e.g. recognizing missing `HAVING` clauses or unlinked outer joins).
- **Personalised Skill-Gap Engine**: Algorithmic comparison of student demonstrated competencies against pathway benchmark thresholds. Categorizes skills into *Demonstrated*, *Needs Improvement*, and *Requiring Further Assessment*, with role-specific rationales explaining *why* each gap matters.
- **Targeted Learning Pathway**: Interactive modules addressing identified gaps with core concepts, common traps, worked examples with step-by-step reasoning, and embedded interactive query practice with immediate execution.
- **SkillCarry TransferCheck™**: Independent conceptual transfer verification assessing:
  1. Query code review & bug diagnosis (finding logic flaws in peer queries)
  2. Duplicate row & Cartesian explosion reasoning
  3. Cross-domain application (transferring SQL aggregation to a healthcare clinic database)
  Displays *Initial Assessment*, *TransferCheck Verification*, and *Reassessment* scores separately.
- **Updated Career Progress Report**: Printable (`window.print()`) and JSON-downloadable comprehensive report detailing student profile, pathway alignment index, competency evidence, completed modules, and next learning roadmap.
- **State Persistence & Demo Reset**: Complete student progress is stored in `localStorage` across page refreshes, with **Load Demo Data** and **Reset** capabilities.

### Future Scope & Planned Enhancements
- Live integration with external Large Language Model APIs (e.g., Google Gemini API) for dynamic natural-language query explanations.
- External assessment connectors for automated Git repository pull request audits and live Power BI/Tableau dashboard verification.
- User account authentication and multi-device cloud synchronization.

---

## 3. Technology Stack

- **Frontend Framework**: [React 19](https://react.dev/) (Component-based UI architecture)
- **Build Tool & Bundler**: [Vite 8](https://vitejs.dev/) (High-performance ES module bundler)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **In-Browser Relational SQL Engine**: [AlaSQL](https://alasql.org/) (Client-side in-memory relational database executing standard SQL queries without external server dependencies)
- **Icons**: [Lucide React](https://lucide.dev/) (Modern vector icons)
- **State Management & Persistence**: React Hooks (`useState`, `useEffect`) and browser `localStorage`
- **Testing & Verification**: Node.js ES module automated test suite (`test_journey.js`)

---

## 4. Project Structure

```
SkillCarry/
├── public/                     # Static assets served at root
│   ├── favicon.svg             # Application brand vector icon
│   └── robots.txt              # Search engine crawler configuration
├── src/                        # Application source code
│   ├── components/             # Reusable UI pages and modular components
│   │   ├── CareerCompareModal.jsx    # Side-by-side pathway comparison modal
│   │   ├── CareerExplorerPage.jsx    # Career pathways catalog and detail view
│   │   ├── CareerProfilePage.jsx     # Student onboarding and profile editor
│   │   ├── CareerReportPage.jsx      # Printable/exportable progress report
│   │   ├── DashboardPage.jsx         # Main career progress overview dashboard
│   │   ├── LearningPathwayPage.jsx   # Targeted learning modules & practice
│   │   ├── Navbar.jsx                # Navigation bar with role badge & demo toggles
│   │   ├── SkillAssessmentPage.jsx   # In-browser SQL assessment console
│   │   ├── SkillGapPage.jsx          # Personalised skill-gap identification
│   │   ├── TransferCheckPage.jsx     # Independent reasoning & code review
│   │   └── WorkflowStepper.jsx       # 7-step student journey workflow indicator
│   ├── data/                   # Predefined datasets and educational models
│   │   ├── assessmentTasks.js        # 5 SQL tasks, test schema, and baseline queries
│   │   ├── careersData.js            # 3 technical pathways, responsibilities, roadmaps
│   │   ├── competenciesData.js       # Competency taxonomy and assessment boundaries
│   │   ├── demoProfile.js            # Sample student onboarding demo profile
│   │   ├── learningModulesData.js    # Remedial modules, worked examples, challenges
│   │   └── transferCheckData.js      # Conceptual transfer and code review tasks
│   ├── services/               # Core application logic and engines
│   │   ├── skillGapEngine.js         # Rule-based gap identification & alignment index
│   │   ├── sqlEngine.js              # AlaSQL client-side database service
│   │   └── storageService.js         # localStorage persistence, demo loader, and reset
│   ├── App.jsx                 # Top-level application router and state coordinator
│   ├── index.css               # Global typography, Tailwind imports, print styles
│   └── main.jsx                # Application DOM entry point
├── .env.example                # Safe environment variable template
├── .gitignore                  # Git exclude rules for node_modules, dist, secrets
├── index.html                  # HTML5 entry page with Google Fonts
├── package.json                # Project dependencies, metadata, and scripts
├── package-lock.json           # Deterministic dependency lockfile
├── test_journey.js             # Automated end-to-end verification test suite
├── vercel.json                 # Vercel deployment configuration with SPA routing
├── vite.config.js              # Vite configuration with React & Tailwind plugins
└── README.md                   # Comprehensive project documentation
```

---

## 5. Prerequisites

Before running the project on your Windows laptop, ensure you have:
1. **Node.js**: Version **v18.0.0 or higher** (recommended: Node.js v20 LTS or v22 LTS).  
   *Check in terminal: `node -v`*
2. **npm**: Version **9.0.0 or higher** (bundled with Node.js).  
   *Check in terminal: `npm -v`*
3. **Visual Studio Code**: Modern release with the *Tailwind CSS IntelliSense* extension (optional).
4. **Git**: Installed for version control and pushing to GitHub.  
   *Check in terminal: `git --version`*

---

## 6. Installation and Setup in Visual Studio Code

Follow these numbered steps to run SkillCarry locally:

1. **Open the Project Folder in VS Code**:
   - Open Visual Studio Code.
   - Click **File → Open Folder...** (or press `Ctrl + K, Ctrl + O`).
   - Navigate to and select the `SkillCarry` directory.

2. **Open the Integrated Terminal**:
   - In VS Code, click **Terminal → New Terminal** (or press `` Ctrl + ` ``).

3. **Install Dependencies**:
   Run the following command in the terminal to restore packages from `package.json`:
   ```powershell
   npm install
   ```

4. **Configure Environment Variables (Optional)**:
   SkillCarry runs out-of-the-box without any mandatory environment variables. If you wish to customize local settings:
   ```powershell
   copy .env.example .env.local
   ```

5. **Start the Local Development Server**:
   ```powershell
   npm run dev
   ```

6. **Open the Application**:
   - Click the local URL displayed in the terminal (typically `http://localhost:5173`).
   - The application will open in your default browser.

---

## 7. Available Scripts and Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles and bundles production-ready assets into the `dist/` directory. |
| `npm run preview` | Locally serves the production build from `dist/` to verify production behavior. |
| `npm test` | Runs the automated end-to-end test suite (`test_journey.js`) validating the SQL engine, pathways, and skill-gap engine. |

---

## 8. Backend and Persistence Architecture

- **Client-Side Relational Engine**: SkillCarry does not require a remote backend or separate database server to run. It initializes an in-memory relational database directly in the student's browser via **AlaSQL**.
- **Data Persistence**: All student profile data, assessment results, TransferCheck attempts, and module completions are saved securely in browser **localStorage** under namespaced keys (`skillcarry_*`).
- **Data Privacy**: No student queries or personal data are transmitted to external servers.

---

## 9. Environment Variables

The project includes `.env.example` as a template:

| Variable | Required | Default | Description |
| :--- | :--- | :--- | :--- |
| `VITE_APP_NAME` | No | `SkillCarry` | Application display name. |
| `VITE_APP_ENV` | No | `development` | Active runtime environment. |
| `VITE_GEMINI_API_KEY` | No | *(None)* | Optional API key for future external LLM explanation integrations. |

---

## 10. Publishing to GitHub

To publish this project to your personal GitHub account:

1. **Create a New GitHub Repository**:
   - Go to [github.com/new](https://github.com/new).
   - Name the repository `SkillCarry`.
   - Set visibility to **Public** (or Private).
   - **Do NOT** initialize with a README, `.gitignore`, or license (the project already contains them).
   - Click **Create repository**.

2. **Connect and Push from VS Code Terminal**:
   Run the following commands in the `SkillCarry` terminal (replace `YOUR-USERNAME` with your actual GitHub username):
   ```powershell
   # Verify git status
   git status

   # If not already on main branch:
   git branch -M main

   # Add your GitHub remote repository (replace with your URL)
   git remote add origin https://github.com/YOUR-USERNAME/SkillCarry.git

   # Push to GitHub
   git push -u origin main
   ```

---

## 11. Deployment to Vercel

SkillCarry is pre-configured for one-click deployment on [Vercel](https://vercel.com/):

1. **Push your code to GitHub** following the steps above.
2. Sign in to your [Vercel Dashboard](https://vercel.com/).
3. Click **Add New... → Project**.
4. Select your **SkillCarry** GitHub repository and click **Import**.
5. Configure Project Settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click **Deploy**.
7. Vercel will build and deploy the application with a public HTTPS URL (e.g., `https://skillcarry.vercel.app`).
8. The included [`vercel.json`](./vercel.json) file automatically handles client-side routing rewrites.

---

## 12. Limitations and Honest Disclaimers

1. **Formative Assessment Disclaimer**: SkillCarry provides formative learning evidence based on in-browser SQL problem sets and conceptual checks. It does not certify legal employer qualifications or guarantee employment.
2. **Rule-Based Recommendation Engine**: Assessment evaluation, gap identification, and learning recommendations use a transparent, deterministic rule-based engine. It does not claim to use black-box artificial intelligence where deterministic logic is used.
3. **Prototype Assessment Boundaries**: The prototype directly evaluates SQL Querying, Aggregations, Joins, and Relational Schema understanding. Broader skills (such as BI Dashboard creation, Git branch management, and full-stack REST APIs) are clearly labeled as *Requiring Further Assessment*.
