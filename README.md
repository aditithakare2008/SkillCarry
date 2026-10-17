## SkillCarry
Career Guidance, Skill-Gap Identification, and Learning-to-Career Pathways
Developed for the Seva Innovation Challenge 2026

## Live Demo
- Live application: https://skill-carry.vercel.app/
- GitHub repository: https://github.com/aditithakare2008/SkillCarry
  
## 1. Project Overview
   
Problem Statement
Students in technical education may learn programming and database concepts without understanding how these skills connect to entry-level technical careers. They may also need help identifying areas for improvement and choosing what to practise next.
SkillCarry is a browser-based prototype that brings together career exploration, practical SQL exercises, rule-based skill-gap analysis, targeted learning activities, and progress reporting.
Learning Journey
The application is organised around the following journey:
Explore Careers → Create Career Profile → Assess Skills → Identify Skill Gaps → Follow Learning Pathway → Complete TransferCheck and Reassessment → Review Career Progress
Challenge Alignment
- Sector: Education and Employability
- Related problem area: AI-Based Career Guidance, Skill-Gap Identification, and Learning-to-Career Pathways
Implementation note: The current prototype uses predefined career data and rule-based assessment/recommendation logic. It does not currently demonstrate an active generative-AI integration. AI-assisted explanations and conversational guidance are possible future enhancements.
Intended Users
- Diploma and undergraduate students exploring entry-level technical career pathways.
- Beginners who want to practise foundational SQL skills.
- Educators or mentors who want to review a learner's progress within the prototype.
The current career catalogue focuses on three technical pathways: Data Analyst, Database Developer / Junior Database Professional, and Junior Software Developer.

## 2. Features
   
The following describes the functionality represented in the project source code. Test the deployed application before relying on every feature in a formal demonstration.
Career Exploration and Profile
- Career Goal Dashboard: Shows the selected career, progress information, skill-gap summaries, and suggested next actions.
- Student Career Profile: Collects profile details such as education level, interests, skills, learning preferences, and target career.
- Demo Profile: Allows a sample profile and sample progress data to be loaded for demonstration.
- Career Pathway Explorer: Presents three entry-level technical career pathways, including responsibilities, competencies, and learning roadmaps.
- Career Comparison: Provides a side-by-side comparison of selected career pathways.
SQL Assessment and Skill-Gap Analysis
- In-Browser SQL Console: Uses AlaSQL to execute supported SQL SELECT queries against sample departments, employees, and orders tables.
- Predefined SQL Tasks: Provides exercises targeting foundational querying, aggregation, joins, and related relational concepts.
- Result-Based Evaluation: Compares query output with the expected output for each task and provides predefined diagnostic hints in some cases.
- Rule-Based Skill-Gap Analysis: Compares assessment evidence with predefined competency mappings and thresholds.
- Competency Statuses: Categorises skills as Demonstrated, Needs Improvement, or Not Yet Assessed.
Assessment limitation: The query evaluator compares row counts and row values. Its row normalisation sorts values within each row, so it may not detect every column-to-value association error or every logically incorrect query. Scores should be treated as formative feedback from this prototype, not as a comprehensive or professionally validated measure of competence.
Learning and Progress
- Targeted Learning Modules: Provides explanations, examples, common mistakes, and practice activities related to selected SQL concepts.
- TransferCheck: Includes additional multiple-choice conceptual activities, including query review, duplicate-row reasoning, and cross-domain SQL reasoning.
- Reassessment: Allows assessment results to be reviewed alongside later attempts where supported by the workflow.
- Career Progress Report: Includes report printing and JSON export functionality in the report component.
- Browser Persistence: Stores supported profile, assessment, TransferCheck, module-completion, reassessment, and selected-career data in browser localStorage.
- Demo and Reset Controls: Supports loading predefined demo data and clearing stored application data.
TransferCheck uses predefined options and scoring. It is an additional learning check, not independent proof of transferable job competence.
Planned Enhancements
The following are future possibilities, not claims of current functionality:
- Integration with a live generative-AI service for conversational career guidance or dynamic explanations.
- More career pathways and broader skill assessments.
- Verified course, scholarship, training, and employment information.
- External assessment integrations, such as repository or dashboard review.
- Account-based access and cloud synchronisation across devices.
  
## 3. Technology Stack
   
The project's package.json lists the following technologies and dependencies:
- Frontend: React and React DOM
- Build Tool and Development Server: Vite
- Styling: Tailwind CSS with the Vite plugin
- In-Browser SQL Engine: AlaSQL
- Icons: Lucide React
- State Management: React Hooks, including useState and useEffect
- Persistence: Browser localStorage
- Version Control: Git and GitHub
- Deployment: Vercel
- Verification script: test_journey.js, invoked by the npm test script
The current application is structured to run its documented SQL practice workflow in the browser and does not require a separate application backend for that workflow.

## 4. Project Structure
   
SkillCarry/
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── CareerCompareModal.jsx
│   │   ├── CareerExplorerPage.jsx
│   │   ├── CareerProfilePage.jsx
│   │   ├── CareerReportPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── LearningPathwayPage.jsx
│   │   ├── Navbar.jsx
│   │   ├── SkillAssessmentPage.jsx
│   │   ├── SkillGapPage.jsx
│   │   ├── TransferCheckPage.jsx
│   │   └── WorkflowStepper.jsx
│   ├── data/
│   │   ├── assessmentTasks.js
│   │   ├── careersData.js
│   │   ├── competenciesData.js
│   │   ├── demoProfile.js
│   │   ├── learningModulesData.js
│   │   └── transferCheckData.js
│   ├── services/
│   │   ├── skillGapEngine.js
│   │   ├── sqlEngine.js
│   │   └── storageService.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── test_journey.js
├── vercel.json
├── vite.config.js
└── README.md

Important Files
- App.jsx: Main application component and state coordination.
- careersData.js: Career pathway information and learning roadmaps.
- assessmentTasks.js: SQL assessment tasks and sample database schema.
- sqlEngine.js: Initialises sample tables, executes supported queries, and evaluates task results.
- skillGapEngine.js: Applies predefined competency mappings and score thresholds.
- learningModulesData.js: Learning module content.
- transferCheckData.js: TransferCheck tasks and answer options.
- storageService.js: Reads and writes application progress in localStorage, and handles demo/reset operations.
- CareerReportPage.jsx: Report display, printing, and JSON export.
- test_journey.js: Node.js verification script for selected data and service logic.
- vercel.json: Vercel build/output and single-page-app routing configuration.
   
## 5. Prerequisites

Before running SkillCarry locally, ensure the following tools are installed:

- **Node.js** (version 20 or later recommended)
- **npm** (included with Node.js)
- **Git** (for cloning the repository)
- **A modern web browser** (Google Chrome, Microsoft Edge, or Firefox)

### Verify Your Installation

Open your terminal or Command Prompt and run the following commands:

**Check Node.js version:**

```bash
node -v
```

**Check npm version:**

```bash
npm -v
```

**Check Git version:**

```bash
git --version
```

If all commands display version numbers, your development environment is ready for the next step.

## 6. Installation and Local Setup
   
Step 1: Clone the Repository
git clone https://github.com/aditithakare2008/SkillCarry.git
Step 2: Open the Project Folder
Open the cloned SkillCarry folder in Visual Studio Code.
Step 3: Install Dependencies
Run this command from the project directory:
npm install
Step 4: Optional Local Environment File
The project includes an .env.example template. To create a local copy in Windows Command Prompt, run:
copy .env.example .env.local
The current prototype does not require an external AI API key to run its rule-based workflow. Do not commit .env.local or private credentials to GitHub. Variables prefixed with VITE_ that are used in a client build must not be treated as secrets.
Step 5: Start the Development Server
npm run dev
Step 6: Open the Local Application
Open the URL shown in the terminal. Vite commonly uses:
http://localhost:5173
Use the actual URL printed by the development server if it differs.

## 7. Available Commands
   
These scripts are defined in the project's package.json:
Command	Purpose
npm run dev	Starts the Vite development server.
npm run build	Builds the application for production.
npm run preview	Serves the production build locally for preview.
npm test	Runs node test_journey.js.


To list the scripts, run:
npm run
To create a production build, run:
npm run build
About the Verification Script
test_journey.js checks selected career data, runs the predefined expected SQL queries, exercises a sample flawed query, and prints skill-gap and TransferCheck information. It is a lightweight verification script, not a browser-based end-to-end test suite. Its current implementation prints an overall success message without consistently setting a failing process exit code when an earlier check fails. Review its output carefully; a printed success message alone should not be treated as proof that every check passed.

## 8. Architecture, Storage, and Privacy
   
Client-Side SQL
AlaSQL is used to create and populate sample relational tables in browser memory and execute supported SQL queries against them. The assessment runner restricts submitted queries to those beginning with SELECT.
Local Persistence
The application stores supported profile and progress information in browser localStorage. This allows data to remain available across page refreshes in the same browser profile, but it does not provide cloud synchronisation between devices.
Privacy and Security Limitations
- localStorage is not encrypted by default.
- Other people with access to the same browser profile may be able to access locally stored information.
- Clearing browser data may remove saved progress.
- The current architecture does not provide account-based cloud storage or multi-device synchronisation.
- The presence of client-side storage alone does not prove that no data is transmitted by third-party resources or other integrations.
Avoid entering sensitive personal information into the prototype. Any claim about external data transmission should be confirmed by inspecting the browser's network activity and the application's integrations.

## 9. Environment Configuration
    
The .env.example file contains these example variables:
Variable	Example value	Notes
VITE_APP_NAME	SkillCarry	Application metadata placeholder; verify usage before expecting it to change the UI.
VITE_APP_ENV	development	Environment metadata placeholder; verify usage before expecting it to change behaviour.
VITE_GEMINI_API_KEY	Commented-out placeholder	Intended only as a possible future AI integration setting; it is not evidence of an active Gemini integration.


Vite exposes client-side variables with the VITE_ prefix to the browser bundle when they are used by the application. Never put private API keys in frontend code. A future integration requiring a secret credential should use a suitable server-side component.

## 10. Contributing to SkillCarry
    
Suggestions and contributions are welcome.
How to Contribute
1. Fork the SkillCarry repository.
2. Clone your fork, replacing YOUR-USERNAME with your GitHub username:git clone https://github.com/YOUR-USERNAME/SkillCarry.git
3. Enter the project directory:cd SkillCarry
4. Create a branch for your change:git checkout -b feature/your-change
5. Install dependencies and make your changes:npm install
6. Build the application to check for build errors:npm run build
7. Commit and push your branch to your fork:git add .
   git commit -m "Describe your changes"
   git push -u origin feature/your-change
8. Open a pull request from your fork to the original SkillCarry repository.
Updating a Local Checkout
If origin points to the original SkillCarry repository, retrieve its latest main branch with:
git pull origin main
If you are working from a fork and want to retrieve changes from the original repository, add the original repository as upstream once:
git remote add upstream https://github.com/aditithakare2008/SkillCarry.git
git fetch upstream
git pull upstream main
If upstream is already configured, skip the git remote add command.

## 11. Deployment to Vercel
    
SkillCarry's documented live application URL is:
Live application: https://skill-carry.vercel.app/
Vercel project dashboard: https://vercel.com/skill-carry/skill-carry
The repository includes a vercel.json configuration that specifies npm run build, the dist output directory, Vite as the framework, and a rewrite for single-page-app routing.
Updating the Existing Deployment
1. Make and test your changes locally.
2. Run a production build:npm run build
3. Commit and push your changes to the branch connected to Vercel:git add .
   git commit -m "Update SkillCarry"
   git push
4. If the repository is connected and automatic deployments are enabled for that branch, Vercel should start a deployment after the push.
5. Check the deployment status and build logs in the Vercel dashboard.
6. Open the live application and verify the deployed changes.
Deployment behaviour depends on the current Vercel project settings. A successful deployment confirms that a build was deployed; it does not prove that every feature behaves correctly.

## 12. Limitations and Future Scope
    
Current Limitations
1. Rule-Based Guidance: Current skill-gap analysis and suggested actions rely on predefined data, mappings, and thresholds rather than a live generative-AI model.
2. Limited Career Catalogue: The prototype focuses on three technical career pathways and does not cover every vocational or professional career.
3. Assessment Coverage: The SQL assessment covers selected querying and relational database concepts. It does not verify all skills needed for a technical role.
4. Approximate Query Evaluation: Result comparison may not detect every logically incorrect query or every column-to-value association issue.
5. Formative Scores: Assessment and TransferCheck scores are for learning feedback within the prototype. They are not professional certifications, validated hiring assessments, or guarantees of employment.
6. Browser Storage: Progress is stored locally and is not automatically synchronised across devices.
7. External Integrations: Live AI services and external assessment integrations are future enhancements unless separately implemented and verified.
Future Enhancements
- Add AI-assisted conversational career guidance and dynamic explanations.
- Expand career pathways and assessment coverage.
- Add verified course, scholarship, training, and employment information.
- Introduce account-based progress tracking and appropriate secure cloud storage.
- Improve accessibility and support for additional Indian languages.
- Strengthen SQL result comparison and add automated tests that fail reliably when assertions do not pass.
- Validate learning activities and assessment quality with educators and student feedback.
  
## 13. Conclusion
    
SkillCarry is a browser-based career-guidance and technical-learning prototype that connects career exploration with SQL practice, rule-based skill-gap identification, targeted learning activities, and progress reporting.
It provides a foundation for helping learners reflect on selected technical skills and identify areas for further practice. Broader career coverage, stronger assessment validation, cloud-based user accounts, and AI-assisted guidance remain potential future developments.

## 14. References
    
- React: https://react.dev/
- Vite: https://vite.dev/
- Tailwind CSS: https://tailwindcss.com/
- AlaSQL: https://alasql.org/
- Lucide: https://lucide.dev/
- GitHub: https://github.com/
- Vercel: https://vercel.com/
  
## Project Links
- GitHub repository: https://github.com/aditithakare2008/SkillCarry
- Live application: https://skill-carry.vercel.app/
