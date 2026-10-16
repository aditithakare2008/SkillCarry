import { COMPETENCY_IDS } from './competenciesData.js';

export const DATABASE_SCHEMA = {
  departments: {
    name: 'departments',
    description: 'Organizational departments with operating budget and floor locations',
    columns: [
      { name: 'dept_id', type: 'INT', isPrimary: true, description: 'Unique department ID' },
      { name: 'dept_name', type: 'VARCHAR(50)', description: 'Department name (e.g., Engineering, Analytics)' },
      { name: 'floor', type: 'INT', description: 'Office building floor number' },
      { name: 'budget', type: 'INT', description: 'Annual operational budget in USD' },
      { name: 'manager_name', type: 'VARCHAR(60)', description: 'Department manager full name' }
    ],
    sampleRows: [
      { dept_id: 101, dept_name: 'Data & Analytics', floor: 4, budget: 350000, manager_name: 'Sarah Chen' },
      { dept_id: 102, dept_name: 'Software Engineering', floor: 5, budget: 520000, manager_name: 'Marcus Vance' },
      { dept_id: 103, dept_name: 'Product Design', floor: 3, budget: 180000, manager_name: 'Aisha Patel' },
      { dept_id: 104, dept_name: 'Operations & IT', floor: 2, budget: 240000, manager_name: 'David Rossi' },
      { dept_id: 105, dept_name: 'Special Research Lab', floor: 6, budget: 120000, manager_name: 'Elena Rostova' }
    ]
  },
  employees: {
    name: 'employees',
    description: 'Current full-time employees, salary compensation, and department affiliations',
    columns: [
      { name: 'emp_id', type: 'INT', isPrimary: true, description: 'Unique employee ID' },
      { name: 'first_name', type: 'VARCHAR(40)', description: 'First name' },
      { name: 'last_name', type: 'VARCHAR(40)', description: 'Last name' },
      { name: 'dept_id', type: 'INT', isForeign: true, foreignTable: 'departments', description: 'Foreign key referencing departments.dept_id' },
      { name: 'role', type: 'VARCHAR(60)', description: 'Job title / technical role' },
      { name: 'salary', type: 'INT', description: 'Annual salary in USD' },
      { name: 'hire_year', type: 'INT', description: 'Year joined the company' }
    ],
    sampleRows: [
      { emp_id: 1, first_name: 'Maya', last_name: 'Lin', dept_id: 101, role: 'Data Analyst', salary: 68000, hire_year: 2022 },
      { emp_id: 2, first_name: 'Carlos', last_name: 'Reyes', dept_id: 101, role: 'Senior Analyst', salary: 84000, hire_year: 2020 },
      { emp_id: 3, first_name: 'Priya', last_name: 'Sharma', dept_id: 102, role: 'Junior Software Dev', salary: 72000, hire_year: 2023 },
      { emp_id: 4, first_name: 'Alex', last_name: 'Kovacs', dept_id: 102, role: 'Full Stack Dev', salary: 88000, hire_year: 2021 },
      { emp_id: 5, first_name: 'Devon', last_name: 'Miles', dept_id: 102, role: 'Database Engineer', salary: 92000, hire_year: 2019 },
      { emp_id: 6, first_name: 'Amina', last_name: 'Toure', dept_id: 103, role: 'UI/UX Designer', salary: 65000, hire_year: 2022 },
      { emp_id: 7, first_name: 'Lucas', last_name: 'Meyer', dept_id: 104, role: 'IT Support Analyst', salary: 56000, hire_year: 2023 },
      { emp_id: 8, first_name: 'Hana', last_name: 'Kim', dept_id: 101, role: 'Junior Analyst', salary: 62000, hire_year: 2023 }
    ]
  },
  orders: {
    name: 'orders',
    description: 'Commercial sales orders, category classification, and fulfillment status',
    columns: [
      { name: 'order_id', type: 'INT', isPrimary: true, description: 'Unique order identifier' },
      { name: 'customer_name', type: 'VARCHAR(80)', description: 'Client company or account' },
      { name: 'product_category', type: 'VARCHAR(40)', description: 'Product classification' },
      { name: 'order_amount', type: 'INT', description: 'Total order value in USD' },
      { name: 'order_status', type: 'VARCHAR(20)', description: 'Fulfillment state: Completed, Pending, Cancelled' },
      { name: 'order_year', type: 'INT', description: 'Year order was booked' }
    ],
    sampleRows: [
      { order_id: 501, customer_name: 'Apex Logistics', product_category: 'Analytics Cloud', order_amount: 14500, order_status: 'Completed', order_year: 2024 },
      { order_id: 502, customer_name: 'Zenith Retail', product_category: 'Database Hosting', order_amount: 8200, order_status: 'Completed', order_year: 2024 },
      { order_id: 503, customer_name: 'NorthStar Bio', product_category: 'Analytics Cloud', order_amount: 19000, order_status: 'Completed', order_year: 2024 },
      { order_id: 504, customer_name: 'Beacon Health', product_category: 'Custom Software', order_amount: 32000, order_status: 'Completed', order_year: 2023 },
      { order_id: 505, customer_name: 'Pinnacle Media', product_category: 'Database Hosting', order_amount: 7500, order_status: 'Pending', order_year: 2024 },
      { order_id: 506, customer_name: 'Quantum FinTech', product_category: 'Custom Software', order_amount: 28000, order_status: 'Completed', order_year: 2024 },
      { order_id: 507, customer_name: 'EcoEnergy LLC', product_category: 'Analytics Cloud', order_amount: 4100, order_status: 'Cancelled', order_year: 2024 }
    ]
  }
};

export const ASSESSMENT_TASKS = [
  {
    id: 'task-1',
    title: 'Task 1: Active Department Cohort Filtering',
    difficulty: 'Foundational',
    targetedCompetencies: [COMPETENCY_IDS.SQL_FILTER],
    scenario: 'The leadership team is reviewing technical hiring salaries. Extract employees who belong to either Data & Analytics (dept_id 101) or Software Engineering (dept_id 102), have an annual salary greater than 65,000, and were hired on or after 2021.',
    requirements: [
      'Target table: employees',
      'Columns to project: first_name, last_name, role, salary, hire_year',
      'Filter condition 1: dept_id must be 101 or 102',
      'Filter condition 2: salary must be > 65000',
      'Filter condition 3: hire_year must be >= 2021',
      'Sort result: by salary in descending order (highest first)'
    ],
    starterQuery: `-- Write your SQL query below to filter the employee records
SELECT first_name, last_name, role, salary, hire_year
FROM employees
WHERE dept_id IN (101, 102)
  -- Add remaining conditions here
ORDER BY salary DESC;`,
    expectedQuery: `SELECT first_name, last_name, role, salary, hire_year FROM employees WHERE dept_id IN (101, 102) AND salary > 65000 AND hire_year >= 2021 ORDER BY salary DESC;`,
    hints: [
      'Use AND to combine conditions so all three must be true at the same time.',
      'Check your operators: > 65000 (strictly greater) and >= 2021 (greater than or equal).',
      'Parentheses around (dept_id = 101 OR dept_id = 102) or using IN (101, 102) prevents boolean precedence mistakes.'
    ],
    conceptExplanation: 'Precision filtering with WHERE is the bread and butter of any technical data role. Logical precedence matters: without parentheses, AND evaluates before OR, which can accidentally leak unexpected rows into reports.'
  },
  {
    id: 'task-2',
    title: 'Task 2: Department Payroll & Headcount Summaries',
    difficulty: 'Intermediate',
    targetedCompetencies: [COMPETENCY_IDS.SQL_AGG],
    scenario: 'The finance director needs a department-by-department payroll breakdown. For each department in the company, calculate the total employee count and the total payroll sum. Only show departments that have at least 2 employees assigned.',
    requirements: [
      'Target table: employees',
      'Columns to project: dept_id, COUNT(*) AS employee_count, SUM(salary) AS total_payroll',
      'Group by: dept_id',
      'Group filter: keep only groups where COUNT(*) >= 2 (use HAVING, not WHERE)',
      'Sort result: by total_payroll descending'
    ],
    starterQuery: `-- Aggregate employees by department
SELECT dept_id, COUNT(*) AS employee_count, SUM(salary) AS total_payroll
FROM employees
-- Add GROUP BY and HAVING clauses here
;`,
    expectedQuery: `SELECT dept_id, COUNT(*) AS employee_count, SUM(salary) AS total_payroll FROM employees GROUP BY dept_id HAVING COUNT(*) >= 2 ORDER BY total_payroll DESC;`,
    hints: [
      'Remember the difference between WHERE and HAVING: WHERE filters individual rows before grouping; HAVING filters aggregated groups after grouping.',
      'Use GROUP BY dept_id before specifying HAVING COUNT(*) >= 2.',
      'Make sure you alias the aggregate columns cleanly so reports are readable.'
    ],
    conceptExplanation: 'Data Analysts and Database Developers constantly compute rollups. A frequent beginner trap is placing aggregate checks in the WHERE clause instead of HAVING.'
  },
  {
    id: 'task-3',
    title: 'Task 3: Cross-Table Staff Directory with Joins',
    difficulty: 'Intermediate',
    targetedCompetencies: [COMPETENCY_IDS.SQL_JOIN, COMPETENCY_IDS.SQL_SCHEMA],
    scenario: 'Company intranet needs a combined staff directory. Join the employees table with the departments table to show employee names, roles, their department name, and the office floor number they sit on.',
    requirements: [
      'Tables: employees (aliased as e) and departments (aliased as d)',
      'Join type: INNER JOIN on e.dept_id = d.dept_id',
      'Columns: e.first_name, e.last_name, e.role, d.dept_name, d.floor',
      'Sort result: by d.dept_name ascending, then e.last_name ascending'
    ],
    starterQuery: `-- Stitch employee records with department metadata
SELECT e.first_name, e.last_name, e.role, d.dept_name, d.floor
FROM employees e
INNER JOIN departments d ON e.dept_id = d.dept_id
ORDER BY d.dept_name ASC, e.last_name ASC;`,
    expectedQuery: `SELECT e.first_name, e.last_name, e.role, d.dept_name, d.floor FROM employees e INNER JOIN departments d ON e.dept_id = d.dept_id ORDER BY d.dept_name ASC, e.last_name ASC;`,
    hints: [
      'Check the join condition: e.dept_id matches d.dept_id.',
      'Always qualify column names with their table alias (e.g. d.dept_name) to avoid ambiguity.',
      'An INNER JOIN will only return employees who have a matching department record in departments.'
    ],
    conceptExplanation: 'Relational databases store normalized entities in separate tables to avoid duplication. Combining them via foreign keys with an INNER JOIN is an essential technical skill across analytics and software engineering.'
  },
  {
    id: 'task-4',
    title: 'Task 4: High-Value Completed Order Revenue Analysis',
    difficulty: 'Intermediate to Advanced',
    targetedCompetencies: [COMPETENCY_IDS.SQL_AGG, COMPETENCY_IDS.SQL_FILTER, COMPETENCY_IDS.DATA_INTERP],
    scenario: 'The sales VP wants to evaluate top-performing product categories. Analyze the orders table to calculate total revenue and average order amount per product category. However, exclude cancelled or pending orders (only include order_status = "Completed"), and only display categories where total revenue exceeds 15,000.',
    requirements: [
      'Target table: orders',
      'Row filter: order_status = \'Completed\' (WHERE clause)',
      'Projection: product_category, SUM(order_amount) AS total_revenue, AVG(order_amount) AS avg_order_value',
      'Group by: product_category',
      'Group filter: SUM(order_amount) > 15000 (HAVING clause)',
      'Sort result: by total_revenue descending'
    ],
    starterQuery: `-- Combine WHERE row filtering with GROUP BY and HAVING group filtering
SELECT product_category, 
       SUM(order_amount) AS total_revenue, 
       AVG(order_amount) AS avg_order_value
FROM orders
WHERE order_status = 'Completed'
GROUP BY product_category
HAVING SUM(order_amount) > 15000
ORDER BY total_revenue DESC;`,
    expectedQuery: `SELECT product_category, SUM(order_amount) AS total_revenue, AVG(order_amount) AS avg_order_value FROM orders WHERE order_status = 'Completed' GROUP BY product_category HAVING SUM(order_amount) > 15000 ORDER BY total_revenue DESC;`,
    hints: [
      'Notice the sequence: FROM -> WHERE (filter out non-completed orders) -> GROUP BY -> HAVING (filter aggregated revenue).',
      'Both "Analytics Cloud" and "Custom Software" should qualify, while "Database Hosting" totals under 15,000 for completed orders.',
      'Aliases in HAVING are not universally supported across all SQL dialects, so repeating the aggregate function HAVING SUM(order_amount) > 15000 is the safest practice.'
    ],
    conceptExplanation: 'Combining row-level filters (WHERE) and group-level filters (HAVING) in a single query demonstrates strong query architecture comprehension, critical for Data Analysts and Backend Engineers.'
  },
  {
    id: 'task-5',
    title: 'Task 5: Identifying Unassigned Departments via Outer Join',
    difficulty: 'Advanced Conceptual',
    targetedCompetencies: [COMPETENCY_IDS.SQL_JOIN, COMPETENCY_IDS.SQL_SCHEMA, COMPETENCY_IDS.DATA_INTERP],
    scenario: 'During an organizational audit, HR needs to discover if any departments currently have zero employees assigned. Write a query using a LEFT JOIN from departments to employees and filter for departments with no matching employee record.',
    requirements: [
      'Left table: departments d',
      'Right table: employees e',
      'Join type: LEFT JOIN on d.dept_id = e.dept_id',
      'Filter: e.emp_id IS NULL (identifies parent rows with no children)',
      'Columns: d.dept_id, d.dept_name, d.manager_name',
      'Sort result: by d.dept_id ascending'
    ],
    starterQuery: `-- Find parent departments without child employee records
SELECT d.dept_id, d.dept_name, d.manager_name
FROM departments d
LEFT JOIN employees e ON d.dept_id = e.dept_id
WHERE e.emp_id IS NULL
ORDER BY d.dept_id ASC;`,
    expectedQuery: `SELECT d.dept_id, d.dept_name, d.manager_name FROM departments d LEFT JOIN employees e ON d.dept_id = e.dept_id WHERE e.emp_id IS NULL ORDER BY d.dept_id ASC;`,
    hints: [
      'A LEFT JOIN keeps every row from the left table (departments). If there is no corresponding row in employees, all e.* columns will be NULL.',
      'Filtering with WHERE e.emp_id IS NULL isolates exactly those unassigned departments (such as dept 105: Special Research Lab).',
      'Never write e.emp_id = NULL in SQL; always use the IS NULL operator!'
    ],
    conceptExplanation: 'Using an outer join with an IS NULL condition is a cornerstone diagnostic pattern in relational databases. It helps engineers detect orphaned records, unlinked parents, and data anomalies.'
  }
];
