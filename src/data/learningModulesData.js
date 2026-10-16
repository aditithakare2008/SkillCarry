import { COMPETENCY_IDS } from './competenciesData.js';

export const LEARNING_MODULES = [
  {
    id: 'mod-sql-agg',
    title: 'Mastering SQL Aggregation & Grouping for Data Analysts',
    competencyId: COMPETENCY_IDS.SQL_AGG,
    competencyName: 'SQL Aggregations & Group Summaries',
    difficulty: 'Intermediate',
    estimatedTime: '25 mins',
    careerRelevance: {
      'data-analyst': 'Essential for transforming row-by-row customer transactions into revenue metrics, monthly churn rates, and category summaries.',
      'database-developer': 'Critical for building indexed summary views, data health checks, and maintaining rollup performance.',
      'software-developer': 'Used for computing dashboard counters, user activity metrics, and paginated summary headers.'
    },
    summary: 'Learn how to aggregate datasets using SUM, COUNT, and AVG, group dimensions with GROUP BY, and master the crucial difference between row filters (WHERE) and group filters (HAVING).',
    overviewExplanation: `
Aggregation in relational databases transforms granular row-level data into high-level summaries.

Key Aggregate Functions:
- \`COUNT(*)\`: Counts total rows matching the criteria.
- \`COUNT(column)\`: Counts non-null entries in that column.
- \`SUM(column)\`: Computes numeric sum.
- \`AVG(column)\`: Calculates the arithmetic mean.
- \`MIN(column)\` / \`MAX(column)\`: Retrieves lowest/highest value.

The Cardinal Rule of GROUP BY:
Every non-aggregated column in your \`SELECT\` clause MUST appear in the \`GROUP BY\` clause.

The Crucial Distinction: WHERE vs. HAVING:
- **WHERE**: Evaluates each individual row BEFORE grouping occurs.
- **HAVING**: Evaluates the summarized result of an aggregate function AFTER groups have been formed.
    `,
    workedExample: {
      businessQuestion: 'Find product categories where total completed order revenue exceeds $15,000.',
      commonPitfall: 'Writing WHERE SUM(order_amount) > 15000 — SQL will throw a syntax error because WHERE cannot evaluate aggregate functions.',
      stepByStep: [
        'Step 1: Filter individual rows first using WHERE order_status = \'Completed\'.',
        'Step 2: Group records by product_category using GROUP BY product_category.',
        'Step 3: Apply the summary threshold using HAVING SUM(order_amount) > 15000.',
        'Step 4: Sort in descending order to highlight highest grossing categories.'
      ],
      solutionQuery: `SELECT product_category, 
       SUM(order_amount) AS total_revenue,
       COUNT(*) AS total_orders
FROM orders
WHERE order_status = 'Completed'
GROUP BY product_category
HAVING SUM(order_amount) > 15000
ORDER BY total_revenue DESC;`
    },
    practiceChallenge: {
      title: 'Practice Challenge: Department Headcounts & Average Pay',
      prompt: 'Write a query that groups the employees table by dept_id, shows the employee count and average salary (aliased as avg_salary), but only includes departments with an average salary higher than $65,000.',
      starterQuery: `SELECT dept_id, COUNT(*) AS emp_count, AVG(salary) AS avg_salary
FROM employees
GROUP BY dept_id
HAVING AVG(salary) > 65000;`,
      expectedQuery: `SELECT dept_id, COUNT(*) AS emp_count, AVG(salary) AS avg_salary FROM employees GROUP BY dept_id HAVING AVG(salary) > 65000;`,
      hint: 'Use GROUP BY dept_id followed by HAVING AVG(salary) > 65000. Do not use WHERE for the average check!',
      keyTakeaway: 'HAVING acts as a secondary filter that executes exclusively on grouped buckets.'
    },
    reassessmentAction: {
      recommendedTask: 'task-2',
      label: 'Reassess Aggregations in Task 2'
    }
  },
  {
    id: 'mod-sql-join',
    title: 'Relational Joins & Multi-Table Data Stitching',
    competencyId: COMPETENCY_IDS.SQL_JOIN,
    competencyName: 'Relational Joins & Multi-Table Queries',
    difficulty: 'Intermediate',
    estimatedTime: '30 mins',
    careerRelevance: {
      'data-analyst': 'Essential for linking sales receipts with customer profiles, product catalogs, and marketing campaign attribution.',
      'database-developer': 'Fundamental for database views, referential queries, and enforcing proper foreign-key relationships.',
      'software-developer': 'Used to hydrate domain models from relational stores and avoid the dreaded N+1 query problem.'
    },
    summary: 'Master the mechanics of INNER JOIN vs. LEFT JOIN, table aliasing, foreign key predicates, and identifying unmatched records with outer joins.',
    overviewExplanation: `
Relational databases normalize data across separate tables to prevent redundancy. Joins reconnect these entities using foreign keys.

Core Join Types:
1. **INNER JOIN**: Returns only rows where there is a matching foreign key in BOTH tables. If an employee has no department or a department has no employees, those records are excluded.
2. **LEFT JOIN (LEFT OUTER JOIN)**: Preserves EVERY row from the left table. If no match exists in the right table, right-side columns are filled with NULLs.
3. **Diagnostic Anti-Join**: A \`LEFT JOIN ... WHERE right.primary_key IS NULL\` efficiently pinpoints unlinked or orphaned records.
    `,
    workedExample: {
      businessQuestion: 'Identify all departments in the organization that currently have NO staff members assigned.',
      commonPitfall: 'Using an INNER JOIN and expecting to see empty departments. An INNER JOIN automatically discards unassigned departments!',
      stepByStep: [
        'Step 1: Put the parent table (departments) on the LEFT: FROM departments d.',
        'Step 2: LEFT JOIN the child table: LEFT JOIN employees e ON d.dept_id = e.dept_id.',
        'Step 3: Filter for the missing matches: WHERE e.emp_id IS NULL.',
        'Step 4: Select the relevant department identifiers.'
      ],
      solutionQuery: `SELECT d.dept_id, d.dept_name, d.manager_name
FROM departments d
LEFT JOIN employees e ON d.dept_id = e.dept_id
WHERE e.emp_id IS NULL;`
    },
    practiceChallenge: {
      title: 'Practice Challenge: Department Staffing Directory',
      prompt: 'Write an INNER JOIN linking employees e and departments d on dept_id. Display e.first_name, e.last_name, e.role, and d.dept_name, ordered by dept_name ascending.',
      starterQuery: `SELECT e.first_name, e.last_name, e.role, d.dept_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.dept_id
ORDER BY d.dept_name ASC;`,
      expectedQuery: `SELECT e.first_name, e.last_name, e.role, d.dept_name FROM employees e INNER JOIN departments d ON e.dept_id = d.dept_id ORDER BY d.dept_name ASC;`,
      hint: 'Always qualify columns with table prefixes (e.g. e.first_name, d.dept_name) to avoid ambiguous column errors.',
      keyTakeaway: 'INNER JOIN guarantees that only fully mapped relational pairs are output.'
    },
    reassessmentAction: {
      recommendedTask: 'task-3',
      label: 'Reassess Joins in Task 3'
    }
  },
  {
    id: 'mod-sql-filter',
    title: 'Precision Data Filtering & Logical Conditions',
    competencyId: COMPETENCY_IDS.SQL_FILTER,
    competencyName: 'SQL Filtering & Conditional Logic',
    difficulty: 'Foundational',
    estimatedTime: '20 mins',
    careerRelevance: {
      'data-analyst': 'Guarantees that metrics represent the exact intended date cohorts, customer tiers, and operational regions.',
      'database-developer': 'Ensures maintenance queries and partitions target exact rows without accidental full-table impacts.',
      'software-developer': 'Critical for building safe backend search filters and parameterized API query endpoints.'
    },
    summary: 'Build robust WHERE clauses combining comparison operators, boolean precedence (AND vs. OR), list membership with IN, and range filtering with BETWEEN.',
    overviewExplanation: `
The WHERE clause filters individual rows before any grouping or aggregation takes place.

Operator Precedence Rule:
In SQL, \`AND\` takes precedence over \`OR\`.
For instance:
\`WHERE dept = 101 OR dept = 102 AND salary > 80000\`
is evaluated as:
\`WHERE dept = 101 OR (dept = 102 AND salary > 80000)\`
This means ALL employees in department 101 will be selected regardless of salary!

To enforce proper logic:
Use explicit parentheses:
\`WHERE (dept = 101 OR dept = 102) AND salary > 80000\`
Or use the concise \`IN\` operator:
\`WHERE dept IN (101, 102) AND salary > 80000\`
    `,
    workedExample: {
      businessQuestion: 'Extract all active Data Analysts or Software Engineers hired between 2021 and 2023 with salaries over $65,000.',
      commonPitfall: 'Forgetting parentheses when mixing role filters with salary filters.',
      stepByStep: [
        'Step 1: Group the role condition using IN (\'Data Analyst\', \'Junior Software Dev\', \'Full Stack Dev\').',
        'Step 2: Add salary threshold with AND salary > 65000.',
        'Step 3: Add date boundary with AND hire_year BETWEEN 2021 AND 2023.',
        'Step 4: Order by salary descending.'
      ],
      solutionQuery: `SELECT first_name, last_name, role, salary, hire_year
FROM employees
WHERE dept_id IN (101, 102)
  AND salary > 65000
  AND hire_year >= 2021
ORDER BY salary DESC;`
    },
    practiceChallenge: {
      title: 'Practice Challenge: Senior Compensation Filter',
      prompt: 'Select first_name, role, and salary from employees where salary is at least 70,000 and hire_year is strictly before 2023.',
      starterQuery: `SELECT first_name, role, salary
FROM employees
WHERE salary >= 70000 AND hire_year < 2023
ORDER BY salary DESC;`,
      expectedQuery: `SELECT first_name, role, salary FROM employees WHERE salary >= 70000 AND hire_year < 2023 ORDER BY salary DESC;`,
      hint: 'Use >= for at least 70,000 and < 2023 for strictly before 2023.',
      keyTakeaway: 'Precise boundary operators prevent off-by-one errors in analytical reporting.'
    },
    reassessmentAction: {
      recommendedTask: 'task-1',
      label: 'Reassess Filtering in Task 1'
    }
  },
  {
    id: 'mod-sql-schema',
    title: 'Relational Schemas, Constraints & Key Integrity',
    competencyId: COMPETENCY_IDS.SQL_SCHEMA,
    competencyName: 'Relational Schema & Key Integrity',
    difficulty: 'Intermediate',
    estimatedTime: '25 mins',
    careerRelevance: {
      'data-analyst': 'Helps analysts explore unknown company data warehouses and understand table cardinality before writing queries.',
      'database-developer': 'The cornerstone of the profession: designing schemas that avoid data anomalies and maintain relational integrity.',
      'software-developer': 'Essential for modeling application entities in ORM tools like Prisma, TypeORM, or SQLAlchemy.'
    },
    summary: 'Understand primary keys, foreign keys, cardinality (1:1, 1:N, N:M), entity integrity, and how schema constraints protect data quality.',
    overviewExplanation: `
A relational database is built on structured schemas governed by constraints:

1. **Primary Key (PK)**: A column or set of columns uniquely identifying each row in a table. It cannot contain NULLs and cannot duplicate.
2. **Foreign Key (FK)**: A column in a child table pointing to the Primary Key of a parent table. It enforces referential integrity: you cannot insert a child row with a non-existent parent ID.
3. **Cardinality**:
   - One-to-Many (1:N): e.g. One Department has Many Employees. (Dept ID is PK in departments, FK in employees).
   - Many-to-Many (N:M): Handled via a junction/associative table with composite foreign keys.
    `,
    workedExample: {
      businessQuestion: 'Verify if any employee references a dept_id that does not exist in the departments table (referential integrity audit).',
      commonPitfall: 'Assuming database constraints are always active. In legacy or staging databases, orphaned rows can slip in if foreign keys were disabled.',
      stepByStep: [
        'Step 1: Put child table on the left: FROM employees e.',
        'Step 2: LEFT JOIN parent table: LEFT JOIN departments d ON e.dept_id = d.dept_id.',
        'Step 3: Filter where parent primary key is missing: WHERE d.dept_id IS NULL.',
        'Step 4: If any rows return, an integrity violation exists.'
      ],
      solutionQuery: `SELECT e.emp_id, e.first_name, e.last_name, e.dept_id
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id
WHERE d.dept_id IS NULL;`
    },
    practiceChallenge: {
      title: 'Practice Challenge: Schema Key Exploration',
      prompt: 'Check the departments table to retrieve all columns for departments with an operating budget of at least 200,000.',
      starterQuery: `SELECT dept_id, dept_name, budget, manager_name
FROM departments
WHERE budget >= 200000;`,
      expectedQuery: `SELECT dept_id, dept_name, budget, manager_name FROM departments WHERE budget >= 200000;`,
      hint: 'The primary key of departments is dept_id. Make sure to project it along with dept_name and budget.',
      keyTakeaway: 'Always know the primary entity key before building business queries.'
    },
    reassessmentAction: {
      recommendedTask: 'task-5',
      label: 'Reassess Schema Diagnostic in Task 5'
    }
  }
];

export const getLearningModuleById = (id) => LEARNING_MODULES.find(m => m.id === id);
export const getLearningModulesForCompetency = (compId) => LEARNING_MODULES.filter(m => m.competencyId === compId);
