import alasql from 'alasql';
import { DATABASE_SCHEMA } from '../data/assessmentTasks.js';

// In-browser Relational SQL Engine using AlaSQL
// Guarantees genuine, real SQL execution against relational tables without false claims of remote servers.

class SqlEngine {
  constructor() {
    this.initialized = false;
    this.initDatabase();
  }

  initDatabase() {
    try {
      // Create and populate departments table
      alasql('DROP TABLE IF EXISTS departments;');
      alasql(`
        CREATE TABLE departments (
          dept_id INT PRIMARY KEY,
          dept_name STRING,
          floor INT,
          budget INT,
          manager_name STRING
        );
      `);
      DATABASE_SCHEMA.departments.sampleRows.forEach(row => {
        alasql('INSERT INTO departments VALUES (?, ?, ?, ?, ?);', [
          row.dept_id,
          row.dept_name,
          row.floor,
          row.budget,
          row.manager_name
        ]);
      });

      // Create and populate employees table
      alasql('DROP TABLE IF EXISTS employees;');
      alasql(`
        CREATE TABLE employees (
          emp_id INT PRIMARY KEY,
          first_name STRING,
          last_name STRING,
          dept_id INT,
          role STRING,
          salary INT,
          hire_year INT
        );
      `);
      DATABASE_SCHEMA.employees.sampleRows.forEach(row => {
        alasql('INSERT INTO employees VALUES (?, ?, ?, ?, ?, ?, ?);', [
          row.emp_id,
          row.first_name,
          row.last_name,
          row.dept_id,
          row.role,
          row.salary,
          row.hire_year
        ]);
      });

      // Create and populate orders table
      alasql('DROP TABLE IF EXISTS orders;');
      alasql(`
        CREATE TABLE orders (
          order_id INT PRIMARY KEY,
          customer_name STRING,
          product_category STRING,
          order_amount INT,
          order_status STRING,
          order_year INT
        );
      `);
      DATABASE_SCHEMA.orders.sampleRows.forEach(row => {
        alasql('INSERT INTO orders VALUES (?, ?, ?, ?, ?, ?);', [
          row.order_id,
          row.customer_name,
          row.product_category,
          row.order_amount,
          row.order_status,
          row.order_year
        ]);
      });

      this.initialized = true;
    } catch (err) {
      console.error('Failed to initialize in-browser SQL database:', err);
    }
  }

  // Execute an arbitrary SELECT query safely in browser memory
  runQuery(queryStr) {
    if (!this.initialized) {
      this.initDatabase();
    }

    if (!queryStr || !queryStr.trim()) {
      return {
        success: false,
        error: 'Query string cannot be empty.',
        data: [],
        columns: [],
        rowCount: 0
      };
    }

    const trimmed = queryStr.trim();
    // Safety check: only allow SELECT queries for assessments
    if (!/^SELECT\b/i.test(trimmed)) {
      return {
        success: false,
        error: 'Only SELECT queries are evaluated in this assessment environment.',
        data: [],
        columns: [],
        rowCount: 0
      };
    }

    try {
      const startTime = performance.now();
      const rawResult = alasql(trimmed);
      const executionTimeMs = (performance.now() - startTime).toFixed(2);

      const data = Array.isArray(rawResult) ? rawResult : [rawResult];
      const columns = data.length > 0 && typeof data[0] === 'object' && data[0] !== null 
        ? Object.keys(data[0]) 
        : [];

      return {
        success: true,
        data,
        columns,
        rowCount: data.length,
        executionTimeMs,
        executionEngine: 'Client-side AlaSQL In-Memory Engine'
      };
    } catch (err) {
      return {
        success: false,
        error: err.message || 'Syntax error or invalid table reference.',
        data: [],
        columns: [],
        rowCount: 0
      };
    }
  }

  // Evaluate student query against target task
  evaluateTask(task, userQuery) {
    const userExec = this.runQuery(userQuery);
    if (!userExec.success) {
      return {
        passed: false,
        score: 0,
        feedback: `SQL Execution Error: ${userExec.error}`,
        userExec,
        expectedExec: null
      };
    }

    const expectedExec = this.runQuery(task.expectedQuery);
    if (!expectedExec.success) {
      return {
        passed: false,
        score: 0,
        feedback: `Baseline query error: ${expectedExec.error}`,
        userExec,
        expectedExec
      };
    }

    // Compare row count
    const userRows = userExec.data;
    const expRows = expectedExec.data;

    if (userRows.length !== expRows.length) {
      let advice = `Expected ${expRows.length} rows, but your query returned ${userRows.length} rows.`;
      const upperQuery = userQuery.toUpperCase();

      if (task.id === 'task-1' && !upperQuery.includes('AND')) {
        advice += ' Hint: Ensure all criteria (dept, salary, hire_year) are joined with AND.';
      } else if (task.id === 'task-2' && !upperQuery.includes('HAVING')) {
        advice += ' Hint: Did you filter groups with HAVING COUNT(*) >= 2?';
      } else if (task.id === 'task-4' && !upperQuery.includes('WHERE')) {
        advice += ' Hint: Did you filter for completed orders using WHERE order_status = \'Completed\' before grouping?';
      } else if (task.id === 'task-5' && !upperQuery.includes('LEFT JOIN')) {
        advice += ' Hint: Remember to use a LEFT JOIN from departments to employees with WHERE e.emp_id IS NULL.';
      }

      return {
        passed: false,
        score: Math.max(25, Math.round((Math.min(userRows.length, expRows.length) / Math.max(userRows.length, expRows.length)) * 50)),
        feedback: advice,
        userExec,
        expectedExec
      };
    }

    // Deep compare rows by values (ignoring minor alias differences or column ordering if values match)
    const normalizeRow = (row) => Object.values(row).map(v => typeof v === 'number' ? Math.round(v) : String(v).trim().toLowerCase()).sort().join('|');
    const userSignatures = userRows.map(normalizeRow).sort();
    const expSignatures = expRows.map(normalizeRow).sort();

    const matches = userSignatures.every((sig, idx) => sig === expSignatures[idx]);

    if (!matches) {
      return {
        passed: false,
        score: 50,
        feedback: 'Row counts match, but the returned values do not match expected records. Verify your column calculations, conditions, or join keys.',
        userExec,
        expectedExec
      };
    }

    return {
      passed: true,
      score: 100,
      feedback: 'Excellent! Your query returned the exact expected dataset with correct relational logic.',
      userExec,
      expectedExec
    };
  }
}

export const sqlEngine = new SqlEngine();
