import { COMPETENCY_IDS } from './competenciesData.js';

export const TRANSFER_CHECK_TASKS = [
  {
    id: 'tc-1',
    type: 'Code Review & Bug Diagnosis',
    title: 'TransferCheck 1: Diagnosing the Aggregate WHERE Trap',
    competencyId: COMPETENCY_IDS.SQL_AGG,
    competencyName: 'SQL Aggregations & Group Summaries',
    difficulty: 'Intermediate',
    scenario: 'A junior colleague wrote the following query to list departments with more than 2 employees and total salaries exceeding $150,000. However, the database returns a syntax error: "Misuse of aggregate function in WHERE clause".',
    flawedCode: `SELECT dept_id, COUNT(*) AS emp_count, SUM(salary) AS total_payroll
FROM employees
WHERE COUNT(*) > 2 AND SUM(salary) > 150000
GROUP BY dept_id;`,
    question: 'Why did the colleague’s query fail, and what is the correct conceptual fix?',
    options: [
      {
        id: 'opt-a',
        text: 'The WHERE clause evaluates individual rows before grouping occurs, so aggregate functions like COUNT(*) and SUM(salary) cannot be used in WHERE. The conditions must be moved to a HAVING clause placed after GROUP BY.',
        isCorrect: true,
        feedback: 'Correct! WHERE processes row-by-row before buckets are formed. Once GROUP BY runs, HAVING is the designated post-grouping filter.'
      },
      {
        id: 'opt-b',
        text: 'The query failed because COUNT(*) must always be written before SUM(salary) in both SELECT and WHERE.',
        isCorrect: false,
        feedback: 'Incorrect. The order of aggregate functions in the projection does not cause a syntax error.'
      },
      {
        id: 'opt-c',
        text: 'The query failed because GROUP BY dept_id must come before the FROM clause.',
        isCorrect: false,
        feedback: 'Incorrect. The standard SQL clause order is SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY.'
      },
      {
        id: 'opt-d',
        text: 'SQL does not allow multiple aggregate functions in the same query.',
        isCorrect: false,
        feedback: 'Incorrect. You can compute as many aggregate functions as needed in a single query.'
      }
    ],
    transferPrompt: 'Now, write the corrected query below and run it to verify that it executes properly.',
    starterQuery: `-- Correct the query by moving aggregate filters to HAVING
SELECT dept_id, COUNT(*) AS emp_count, SUM(salary) AS total_payroll
FROM employees
GROUP BY dept_id
HAVING COUNT(*) >= 2 AND SUM(salary) > 150000;`,
    expectedQuery: `SELECT dept_id, COUNT(*) AS emp_count, SUM(salary) AS total_payroll FROM employees GROUP BY dept_id HAVING COUNT(*) >= 2 AND SUM(salary) > 150000;`
  },
  {
    id: 'tc-2',
    type: 'Conceptual Explanation & Duplicate Row Analysis',
    title: 'TransferCheck 2: Preventing Accidental Cartesian Explosions',
    competencyId: COMPETENCY_IDS.SQL_JOIN,
    competencyName: 'Relational Joins & Multi-Table Queries',
    difficulty: 'Intermediate',
    scenario: 'An analyst ran a join between employees and departments but forgot to include the ON join predicate: \nSELECT * FROM employees, departments;\nInstead of 8 employee records, the result table returned 40 rows!',
    question: 'What happened to cause the row count to jump from 8 to 40, and why is this dangerous?',
    options: [
      {
        id: 'opt-a',
        text: 'Missing the join condition produced a Cartesian product (Cross Join), pairing every employee with every department (8 employees × 5 departments = 40 rows). In production, this can crash memory buffers and multiply financial calculations.',
        isCorrect: true,
        feedback: 'Spot on! Without a join condition (ON e.dept_id = d.dept_id), SQL pairs every row in table A with every row in table B.'
      },
      {
        id: 'opt-b',
        text: 'The database automatically generated duplicate placeholder rows because departments were missing primary key constraints.',
        isCorrect: false,
        feedback: 'Incorrect. Constraints do not automatically insert duplicate placeholder rows.'
      },
      {
        id: 'opt-c',
        text: 'The database executed an outer anti-join because of unassigned employees.',
        isCorrect: false,
        feedback: 'Incorrect. An anti-join filters rows out; it does not multiply tables into a cross product.'
      },
      {
        id: 'opt-d',
        text: 'SQL requires the LIMIT keyword; otherwise, it repeats all records five times by default.',
        isCorrect: false,
        feedback: 'Incorrect. SQL never arbitrarily multiplies rows unless a cross-join product is formulated.'
      }
    ],
    transferPrompt: 'Write the proper INNER JOIN query pairing employees e with departments d on dept_id, projecting e.emp_id, e.first_name, and d.dept_name.',
    starterQuery: `SELECT e.emp_id, e.first_name, d.dept_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.dept_id
ORDER BY e.emp_id ASC;`,
    expectedQuery: `SELECT e.emp_id, e.first_name, d.dept_name FROM employees e INNER JOIN departments d ON e.dept_id = d.dept_id ORDER BY e.emp_id ASC;`
  },
  {
    id: 'tc-3',
    type: 'Cross-Domain Conceptual Transfer',
    title: 'TransferCheck 3: Cross-Domain Schema Transfer (Healthcare Clinic)',
    competencyId: COMPETENCY_IDS.DATA_INTERP,
    competencyName: 'Data Interpretation & Analytical Reasoning',
    difficulty: 'Intermediate to Advanced',
    scenario: `
Imagine you are no longer querying a corporate employee database. You have just been given a healthcare clinic schema with two new tables:
1. \`patients\` (patient_id, full_name, age, city)
2. \`appointments\` (appointment_id, patient_id, clinic_department, fee_paid, status)

The clinic medical director asks:
"Show me each clinic department with at least 10 completed appointments where total fees collected exceed $5,000, sorted from highest fee collection down."
    `,
    question: 'How does your knowledge of GROUP BY, HAVING, and row filtering directly transfer to this healthcare scenario?',
    options: [
      {
        id: 'opt-a',
        text: 'Filter rows first by status = \'Completed\', group by clinic_department, calculate COUNT(*) and SUM(fee_paid), filter groups using HAVING COUNT(*) >= 10 AND SUM(fee_paid) > 5000, and ORDER BY SUM(fee_paid) DESC.',
        isCorrect: true,
        feedback: 'Outstanding transfer! The underlying relational logic is identical whether analyzing retail orders, corporate payroll, or clinic visits.'
      },
      {
        id: 'opt-b',
        text: 'Healthcare data cannot use GROUP BY because medical records require specialized NoSQL aggregation commands.',
        isCorrect: false,
        feedback: 'Incorrect. Relational healthcare databases rely on standard ANSI SQL aggregation.'
      },
      {
        id: 'opt-c',
        text: 'You must group by patient_id first and use WHERE to filter clinic_department fees.',
        isCorrect: false,
        feedback: 'Incorrect. The director asked for summaries by clinic_department, so grouping must be by clinic_department.'
      },
      {
        id: 'opt-d',
        text: 'You must use a FULL OUTER JOIN before calculating any sums.',
        isCorrect: false,
        feedback: 'Incorrect. All required metrics exist directly in the appointments table.'
      }
    ],
    transferPrompt: 'Explain how transferrable SQL competency helps you transition across industries (e.g. Finance, Healthcare, E-Commerce).',
    reflectiveQuestion: 'Why does mastering SQL core constructs (Filtering, Aggregations, Joins) allow you to pivot between data analysis in tech, operations, or healthcare without relearning everything?'
  }
];

export const getTransferCheckById = (id) => TRANSFER_CHECK_TASKS.find(t => t.id === id);
