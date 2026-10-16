import { COMPETENCY_IDS } from './competenciesData.js';

export const CAREER_PATHWAYS = [
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    tagline: 'Transform raw relational data into actionable metrics, visual reports, and business decisions.',
    overview: 'An entry-level Data Analyst uses SQL, spreadsheets, and reporting tools to extract, clean, and analyze relational data. They answer commercial, operational, and user behavior questions by transforming complex queries into clear visual summaries.',
    experienceLevel: 'Entry-Level / Early Career',
    typicalResponsibilities: [
      'Write analytical SQL queries to extract metrics across multiple operational tables.',
      'Filter and aggregate transactional data to compute Key Performance Indicators (KPIs).',
      'Validate data cleanliness, identify duplicates, and resolve discrepancies before reporting.',
      'Produce recurring management dashboards and ad-hoc reports for cross-functional teams.',
      'Present findings and practical takeaways to both technical and non-technical stakeholders.'
    ],
    technicalSkills: [
      'SQL (Aggregations, GROUP BY, HAVING, Multi-table Joins, CASE statements)',
      'Data Cleaning & Verification',
      'Spreadsheets (Pivot tables, VLOOKUP/XLOOKUP)',
      'Basic Statistics (Mean, Median, Standard Deviation, Percentiles)',
      'Business Intelligence tools (Tableau, Power BI, or Looker Studio - foundational concepts)'
    ],
    problemSolvingSkills: [
      'Translating ambiguous business inquiries into structured query logic.',
      'Spotting trends, seasonal variances, and reporting anomalies.',
      'Structuring multi-step data verification checks before distributing reports.'
    ],
    // Competency mappings for SkillCarry assessment & gap calculation
    mappedCompetencies: [
      {
        competencyId: COMPETENCY_IDS.SQL_FILTER,
        importance: 'Critical',
        benchmarkScore: 80,
        roleContext: 'Crucial for narrowing down operational datasets to specific date ranges, regions, and customer cohorts without introducing data pollution.'
      },
      {
        competencyId: COMPETENCY_IDS.SQL_AGG,
        importance: 'Critical',
        benchmarkScore: 80,
        roleContext: 'The core daily task of a data analyst: computing sales totals, average order values, customer retention counts, and grouped category metrics.'
      },
      {
        competencyId: COMPETENCY_IDS.SQL_JOIN,
        importance: 'Critical',
        benchmarkScore: 75,
        roleContext: 'Vital for linking transaction logs with customer profiles, department metadata, and product catalogs to provide comprehensive context.'
      },
      {
        competencyId: COMPETENCY_IDS.DATA_INTERP,
        importance: 'High',
        benchmarkScore: 75,
        roleContext: 'Analysts must understand what numbers represent, detect strange outliers, and explain findings plainly to stakeholders.'
      },
      {
        competencyId: COMPETENCY_IDS.SQL_SCHEMA,
        importance: 'Medium',
        benchmarkScore: 70,
        roleContext: 'Required to navigate unfamiliar database schemas and ensure correct join keys (e.g. primary vs foreign keys) are referenced.'
      },
      {
        competencyId: COMPETENCY_IDS.BI_DASHBOARD,
        importance: 'High',
        benchmarkScore: 70,
        roleContext: 'Essential for publishing automated dashboards so business users can track metrics without manual SQL requests.'
      }
    ],
    assessedInSkillCarry: [
      'SQL Filtering & Conditional Logic (WHERE, AND/OR, LIKE, BETWEEN)',
      'SQL Aggregations & Grouping (COUNT, SUM, AVG, GROUP BY, HAVING)',
      'Relational Table Joins (INNER JOIN, LEFT JOIN)',
      'Analytical Data Interpretation & Anomaly Spotting'
    ],
    requiresFurtherAssessment: [
      'Interactive Dashboard Construction in Power BI or Tableau',
      'Spreadsheet Modeling & Advanced Formulas',
      'Exploratory Data Analysis in Python (Pandas / Jupyter Notebooks)',
      'Business Presentation & Executive Communication'
    ],
    learningRoadmap: [
      {
        step: 1,
        title: 'Master Core SQL Querying & Relational Logic',
        description: 'Learn SQL syntax, column projection, multi-condition filtering, and arithmetic expressions.',
        estimatedEffort: '2 - 3 Weeks'
      },
      {
        step: 2,
        title: 'Dimensional Grouping & Summary Metrics',
        description: 'Practice GROUP BY, aggregate functions, HAVING filters, and multi-level summaries on real transactional schemas.',
        estimatedEffort: '2 - 3 Weeks'
      },
      {
        step: 3,
        title: 'Relational Joins & Data Cleaning',
        description: 'Stitch parent-child tables with INNER and LEFT joins; handle NULL values and deduplicate messy records.',
        estimatedEffort: '3 Weeks'
      },
      {
        step: 4,
        title: 'Dashboarding & Visual Storytelling',
        description: 'Import SQL query outputs into Power BI or Tableau to build interactive KPI charts and drill-down filters.',
        estimatedEffort: '3 - 4 Weeks'
      },
      {
        step: 5,
        title: 'End-to-End Analytics Portfolio Project',
        description: 'Complete an end-to-end analytical case study analyzing public e-commerce or healthcare data with documented findings.',
        estimatedEffort: '3 Weeks'
      }
    ],
    comparisonMetrics: {
      dailyFocus: 'Analyzing existing business data to answer specific questions & produce reports.',
      primaryTools: 'SQL, Excel/Spreadsheets, Power BI / Tableau, Basic Python',
      systemArchitectureInvolvement: 'Low — queries existing databases; does not manage server architecture.',
      typicalDeliverable: 'Visual dashboard, KPI summary slide deck, or CSV export with analytical narrative.',
      entryBarrier: 'Moderate — accessible with solid SQL foundations, data literacy, and structured logic.'
    }
  },
  {
    id: 'database-developer',
    title: 'Database Developer / Junior Database Professional',
    tagline: 'Design, optimize, and maintain reliable relational database schemas, stored procedures, and queries.',
    overview: 'A Junior Database Developer or database specialist designs efficient tables, ensures data integrity across foreign keys, writes complex queries, and diagnoses slow queries. They focus on how data is organized, stored, and retrieved with speed and safety.',
    experienceLevel: 'Entry-Level / Early Career',
    typicalResponsibilities: [
      'Create and modify relational tables with primary keys, foreign keys, and indexes.',
      'Write optimized SQL queries, views, and automated data validation scripts.',
      'Ensure referential integrity across related parent and child entities.',
      'Investigate slow-running queries and suggest index or predicate improvements.',
      'Participate in database backup routines, migrations, and schema version control.'
    ],
    technicalSkills: [
      'Advanced SQL (Complex Joins, Subqueries, Constraints, Views, Transactions)',
      'Relational Data Modeling & Normalization (1NF through 3NF)',
      'Index Strategies & Query Execution Plans',
      'Database Management Systems (PostgreSQL, MySQL, SQL Server)',
      'Basic Scripting (Python, Bash, or PowerShell for database automation)'
    ],
    problemSolvingSkills: [
      'Preserving data integrity when parent records are updated or deleted (ON DELETE CASCADE/RESTRICT).',
      'Eliminating cartesian products and unnecessary table scans in large datasets.',
      'Normalizing duplicate columns while keeping queries understandable.'
    ],
    mappedCompetencies: [
      {
        competencyId: COMPETENCY_IDS.SQL_SCHEMA,
        importance: 'Critical',
        benchmarkScore: 85,
        roleContext: 'Foundational: understanding entity relationships, primary keys, foreign key constraints, and cascading integrity is central to the role.'
      },
      {
        competencyId: COMPETENCY_IDS.SQL_JOIN,
        importance: 'Critical',
        benchmarkScore: 85,
        roleContext: 'Database developers frequently construct multi-table views, composite keys, and complex join structures without creating redundant rows.'
      },
      {
        competencyId: COMPETENCY_IDS.QUERY_OPT,
        importance: 'High',
        benchmarkScore: 75,
        roleContext: 'Crucial for recognizing un-indexed lookups, full table scans, and non-sargable WHERE clauses.'
      },
      {
        competencyId: COMPETENCY_IDS.SQL_FILTER,
        importance: 'High',
        benchmarkScore: 80,
        roleContext: 'Ensures data extraction and maintenance scripts operate strictly on intended partition subsets.'
      },
      {
        competencyId: COMPETENCY_IDS.SQL_AGG,
        importance: 'Medium',
        benchmarkScore: 70,
        roleContext: 'Used in rollup tables, reporting views, and data integrity health check queries.'
      },
      {
        competencyId: COMPETENCY_IDS.DATA_MODELING,
        importance: 'High',
        benchmarkScore: 75,
        roleContext: 'Designing schema architectures, normalization rules, and data dictionary documentation.'
      }
    ],
    assessedInSkillCarry: [
      'Relational Schema & Key Integrity (Primary & Foreign Keys)',
      'Relational Table Joins & Foreign Key Predicates',
      'Query Performance Concepts & Inefficient Query Diagnosis',
      'Precision SQL Filtering & Conditional Constraints'
    ],
    requiresFurtherAssessment: [
      'DDL Schema Migrations (CREATE TABLE, ALTER, DROP, FOREIGN KEY)',
      'Transaction Isolation Levels & ACID Compliance (BEGIN, COMMIT, ROLLBACK)',
      'Stored Procedures, Triggers & User-Defined Functions',
      'Live Execution Plan Profiling (EXPLAIN ANALYZE) on production RDBMS'
    ],
    learningRoadmap: [
      {
        step: 1,
        title: 'Relational Theory & Schema Normalization',
        description: 'Understand 1NF, 2NF, 3NF, functional dependencies, composite keys, and relational diagramming.',
        estimatedEffort: '2 - 3 Weeks'
      },
      {
        step: 2,
        title: 'Deep SQL & Join Integrity',
        description: 'Master INNER, LEFT, RIGHT, FULL OUTER joins, subqueries, correlated queries, and CASE statements.',
        estimatedEffort: '3 Weeks'
      },
      {
        step: 3,
        title: 'Query Optimization & Indexing Concepts',
        description: 'Learn B-Tree indexes, composite indexes, query plans, and avoiding non-sargable predicates.',
        estimatedEffort: '3 Weeks'
      },
      {
        step: 4,
        title: 'Transactions & Procedural Database Programming',
        description: 'Study ACID properties, concurrency control, stored procedures, and trigger functions in PostgreSQL or MySQL.',
        estimatedEffort: '3 - 4 Weeks'
      },
      {
        step: 5,
        title: 'Database Design & Migration Project',
        description: 'Design a full multi-table relational schema for a multi-tenant business with migration scripts and performance benchmarks.',
        estimatedEffort: '3 Weeks'
      }
    ],
    comparisonMetrics: {
      dailyFocus: 'Designing database schemas, maintaining data integrity, and optimizing query performance.',
      primaryTools: 'PostgreSQL, MySQL, DBeaver/pgAdmin, SQL, Shell Scripting',
      systemArchitectureInvolvement: 'High — manages relational structure, integrity constraints, and query throughput.',
      typicalDeliverable: 'Normalized schema DDL scripts, indexed views, migration files, and performance diagnostic reports.',
      entryBarrier: 'Moderate to High — requires rigorous relational understanding and attention to data integrity.'
    }
  },
  {
    id: 'software-developer',
    title: 'Junior Software Developer',
    tagline: 'Build full-featured software applications that integrate databases, user interfaces, and business logic.',
    overview: 'A Junior Software Developer writes application code (e.g. JavaScript/TypeScript, Python, Java), interacts with databases via queries and ORMs, and builds frontend interfaces and backend API routes. They need solid SQL knowledge to store and fetch user data reliably.',
    experienceLevel: 'Entry-Level / Early Career',
    typicalResponsibilities: [
      'Implement features across frontend components and backend API endpoints.',
      'Write database queries and ORM models to create, read, update, and delete (CRUD) records.',
      'Handle user authentication, input validation, and business rule enforcement.',
      'Write unit tests, fix software bugs, and participate in code reviews.',
      'Collaborate using Git for feature branching, continuous integration, and deployments.'
    ],
    technicalSkills: [
      'Programming Languages (JavaScript/TypeScript, Python, or Java)',
      'Database Basics (SQL CRUD operations, foreign key relations, parameterized queries)',
      'Web Fundamentals (HTML5, modern CSS, HTTP methods, REST APIs)',
      'Version Control (Git, GitHub, pull request workflows)',
      'Testing & Debugging (Browser DevTools, unit testing frameworks)'
    ],
    problemSolvingSkills: [
      'Breaking complex user requirements into modular functions and API routes.',
      'Safeguarding against SQL injection and insecure direct object references.',
      'Diagnosing state management bugs and asynchronous timing issues.'
    ],
    mappedCompetencies: [
      {
        competencyId: COMPETENCY_IDS.SQL_FILTER,
        importance: 'Critical',
        benchmarkScore: 75,
        roleContext: 'Crucial for backend querying: filtering records by user ID, tenant ID, or pagination parameters safely.'
      },
      {
        competencyId: COMPETENCY_IDS.SQL_JOIN,
        importance: 'High',
        benchmarkScore: 70,
        roleContext: 'Necessary for retrieving related entities (e.g. user profile with associated order records) in a single request.'
      },
      {
        competencyId: COMPETENCY_IDS.SQL_SCHEMA,
        importance: 'High',
        benchmarkScore: 70,
        roleContext: 'Allows developers to write correct object-relational mapping (ORM) models and migrations matching business entities.'
      },
      {
        competencyId: COMPETENCY_IDS.GIT_VERSION,
        importance: 'Critical',
        benchmarkScore: 75,
        roleContext: 'Mandatory daily practice: branching, committing clean code, resolving conflicts, and opening pull requests.'
      },
      {
        competencyId: COMPETENCY_IDS.API_INTEGRATION,
        importance: 'Critical',
        benchmarkScore: 75,
        roleContext: 'Building endpoints that take client input, validate payloads, and execute database operations.'
      },
      {
        competencyId: COMPETENCY_IDS.SQL_AGG,
        importance: 'Medium',
        benchmarkScore: 65,
        roleContext: 'Used for pagination counts, user profile statistics, and dashboard summaries in web applications.'
      }
    ],
    assessedInSkillCarry: [
      'SQL Filtering & Conditional Data Retrieval (WHERE, parameterized patterns)',
      'Relational Joins for Multi-Entity Data Stitching',
      'Schema Understanding (Parent/Child relations, Primary/Foreign keys)',
      'Query Code Review & Bug Identification (TransferCheck)'
    ],
    requiresFurtherAssessment: [
      'General Purpose Programming (JavaScript/TypeScript, Python, or Java)',
      'RESTful API Architecture & HTTP Status Codes',
      'Git Version Control & Pull Request Collaboration',
      'Unit & Integration Testing (Jest, Vitest, PyTest)'
    ],
    learningRoadmap: [
      {
        step: 1,
        title: 'Core Programming & Data Structures',
        description: 'Build proficiency in JavaScript or Python, control flow, functions, objects, and basic data structures.',
        estimatedEffort: '3 - 4 Weeks'
      },
      {
        step: 2,
        title: 'Relational Database Foundations & SQL CRUD',
        description: 'Understand relational schemas, foreign keys, SELECT with filtering, INSERT, UPDATE, DELETE, and parameterized queries.',
        estimatedEffort: '2 - 3 Weeks'
      },
      {
        step: 3,
        title: 'Backend Web APIs & Database Integration',
        description: 'Construct Node.js/Express or FastAPI backends connecting to PostgreSQL with relational query handling and validation.',
        estimatedEffort: '3 - 4 Weeks'
      },
      {
        step: 4,
        title: 'Frontend UI & Full-Stack Integration',
        description: 'Build interactive user interfaces with React, state management, and seamless API communication.',
        estimatedEffort: '3 - 4 Weeks'
      },
      {
        step: 5,
        title: 'Full-Stack Portfolio Application',
        description: 'Deploy a complete web application with authentication, database persistence, automated tests, and GitHub CI/CD.',
        estimatedEffort: '4 Weeks'
      }
    ],
    comparisonMetrics: {
      dailyFocus: 'Writing application code, connecting APIs to databases, and fixing software bugs.',
      primaryTools: 'VS Code, JavaScript/React, Node.js or Python, Git, PostgreSQL',
      systemArchitectureInvolvement: 'Moderate to High — connects frontend UI, backend servers, and persistence layers.',
      typicalDeliverable: 'Tested features in a Git pull request, deployed API endpoints, and interactive UI components.',
      entryBarrier: 'Moderate — requires both application programming and foundational database literacy.'
    }
  }
];

export const getCareerById = (id) => CAREER_PATHWAYS.find(c => c.id === id) || CAREER_PATHWAYS[0];
