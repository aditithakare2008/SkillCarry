// Predefined competency dataset with clear scoring criteria and prototype assessment boundaries.
// Clearly separates what is assessed in the in-browser prototype vs what requires future/external assessment.

export const COMPETENCY_IDS = {
  SQL_FILTER: 'COMP_SQL_FILTER',
  SQL_AGG: 'COMP_SQL_AGG',
  SQL_JOIN: 'COMP_SQL_JOIN',
  SQL_SCHEMA: 'COMP_SQL_SCHEMA',
  DATA_INTERP: 'COMP_DATA_INTERP',
  QUERY_OPT: 'COMP_QUERY_OPT',
  GIT_VERSION: 'COMP_GIT_VERSION',
  BI_DASHBOARD: 'COMP_BI_DASHBOARD',
  API_INTEGRATION: 'COMP_API_INTEGRATION',
  DATA_MODELING: 'COMP_DATA_MODELING'
};

export const COMPETENCIES = [
  {
    id: COMPETENCY_IDS.SQL_FILTER,
    name: 'SQL Filtering & Conditional Logic',
    category: 'Querying Fundamentals',
    description: 'Filtering tabular data using WHERE clauses, comparison operators (=, !=, <, >), logical operators (AND, OR, NOT), range filters (BETWEEN), list membership (IN), and pattern matching (LIKE).',
    assessedInPrototype: true,
    assessmentMethod: 'In-browser SQL execution on relational sample tables with query result validation.',
    maxPoints: 100
  },
  {
    id: COMPETENCY_IDS.SQL_AGG,
    name: 'SQL Aggregations & Group Summaries',
    category: 'Data Summarization',
    description: 'Summarizing data with aggregate functions (COUNT, SUM, AVG, MIN, MAX), dimensional grouping via GROUP BY, and group-level filtering using HAVING clauses.',
    assessedInPrototype: true,
    assessmentMethod: 'In-browser SQL execution on realistic business transactions with numeric result comparison.',
    maxPoints: 100
  },
  {
    id: COMPETENCY_IDS.SQL_JOIN,
    name: 'Relational Joins & Multi-Table Queries',
    category: 'Relational Querying',
    description: 'Combining records from multiple related tables using INNER JOIN and LEFT JOIN with appropriate foreign key join predicates and alias discipline.',
    assessedInPrototype: true,
    assessmentMethod: 'In-browser multi-table queries testing join conditions and edge-case preservation.',
    maxPoints: 100
  },
  {
    id: COMPETENCY_IDS.SQL_SCHEMA,
    name: 'Relational Schema & Key Integrity',
    category: 'Data Architecture',
    description: 'Understanding primary keys, foreign keys, table cardinality (1-to-many, many-to-many), nullability constraints, and relational consistency.',
    assessedInPrototype: true,
    assessmentMethod: 'Interactive schema inspection, foreign key verification tasks, and schema-aware queries.',
    maxPoints: 100
  },
  {
    id: COMPETENCY_IDS.DATA_INTERP,
    name: 'Data Interpretation & Analytical Reasoning',
    category: 'Analytical Thinking',
    description: 'Translating plain-language business questions into actionable query specifications, spotting data anomalies, and explaining query results in context.',
    assessedInPrototype: true,
    assessmentMethod: 'TransferCheck scenario questions and business scenario query translation.',
    maxPoints: 100
  },
  {
    id: COMPETENCY_IDS.QUERY_OPT,
    name: 'Query Performance & Basic Optimization',
    category: 'Performance',
    description: 'Recognizing query sargability, index compatibility, avoiding unnecessary SELECT * on large sets, and understanding basic query execution plans.',
    assessedInPrototype: true,
    assessmentMethod: 'TransferCheck query review task identifying inefficient predicates and subqueries.',
    maxPoints: 100
  },
  {
    id: COMPETENCY_IDS.BI_DASHBOARD,
    name: 'Business Intelligence & Visual Dashboarding',
    category: 'Visualization',
    description: 'Building interactive visual dashboards in tools such as Power BI, Tableau, or Metabase with automated refreshes and drill-down dimensions.',
    assessedInPrototype: false,
    assessmentMethod: 'External project portfolio or specialized dashboarding tool assessment required.',
    maxPoints: 0
  },
  {
    id: COMPETENCY_IDS.GIT_VERSION,
    name: 'Version Control & Git Collaboration',
    category: 'Software Engineering Practice',
    description: 'Branching strategies, pull requests, resolving merge conflicts, and collaborative code reviews via Git and GitHub/GitLab.',
    assessedInPrototype: false,
    assessmentMethod: 'External repository commit and pull request evaluation required.',
    maxPoints: 0
  },
  {
    id: COMPETENCY_IDS.API_INTEGRATION,
    name: 'REST API & Backend Data Integration',
    category: 'Software Development',
    description: 'Connecting application code to relational and NoSQL databases via ORMs, connection pools, and RESTful API endpoints.',
    assessedInPrototype: false,
    assessmentMethod: 'Full-stack or backend service coding challenge required.',
    maxPoints: 0
  },
  {
    id: COMPETENCY_IDS.DATA_MODELING,
    name: 'Advanced Enterprise Data Modeling',
    category: 'Data Architecture',
    description: 'Dimensional modeling (Star and Snowflake schemas), normalization (1NF to 3NF), surrogate keys, and slowly changing dimensions (SCD).',
    assessedInPrototype: false,
    assessmentMethod: 'Enterprise data architecture case study required.',
    maxPoints: 0
  }
];

export const getCompetencyById = (id) => COMPETENCIES.find(c => c.id === id);
