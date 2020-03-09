//Create a COMPANY database
// In the company database I need three tables: Employee, Role, and Department
// In the Department table, I need two rows:  ID and name
// In the Role table, I need: ID, title, Salary, and department_id
// In the Employee Table, I need : ID, first name, last name, role_id, manager_id

// I want to build a command-line app that allows user to :
//   Add departments, roles, and employees
//   View departments, roles, and employees
//   Update employee roles

const inquirer = require('inquirer');
const mysql = require('mysql');