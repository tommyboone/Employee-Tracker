//Create a COMPANY database
// In the company database I need three tables: Employee, Role, and Department
// In the Department table, I need two rows:  ID and name
// In the Role table, I need: ID, title, Salary, and department_id
// In the Employee Table, I need : ID, first name, last name, role_id, manager_id

// I want to build a command-line app that allows user to :
//   Add departments, roles, and employees
//   View departments, roles, and employees
//   Update employee roles

// Use inquirer prompts to determine what the user wants to do
// View Departments, Roles, and Employees
// Add Departments, Roles and Employees
// Update Employee Roles
// Update Employee Managers
// View Employees by Manager
// Delete Departments, Roles, and Employees
// View the total budget ie combined salaries of all employees in that department

const inquirer = require("inquirer");
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  PORT: 3306,
  user: "root",
  password: "",
  database: "COMPANY_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connection as id:" + connection.threadId);
  start();
});

const viewOptions = [
  "View Departments",
  "View Roles",
  "View Employees",
  "Update Employee",
  "Delete Employee",
  "Add Employee",
  "Exit"
];

const employeeOptions = [
  "Michael Scott",
  "Jim Halpert",
  "Dwight Schrute",
  "Pam Beasley",
  "Creed Bratton",
  "Kelly Kapur"
];

const roles = [
  "Junior Salesperson",
  "Senior Salesperson",
  "Junior Engineer",
  "Senior Engineer",
  "Accountant",
  "Head of Accounting",
  "Attorney",
  "Manager"
];

const updateOptions = ["First Name", "Last Name", "Role", "Department", "Exit"];

function start() {
  inquirer
    .prompt({
      name: "Start",
      type: "list",
      message: "What would you like to do?",
      choices: viewOptions
    })
    .then(function(answer) {
      switch (answer.Start) {
        case viewOptions[0]:
          viewDepartments();
          break;
        case viewOptions[1]:
          viewRoles();
          break;
        case viewOptions[2]:
          viewEmployees();
          break;
        case viewOptions[3]:
          updateEmployee();
          break;
        case viewOptions[4]:
          deleteEmployee();
          break;
        case viewOptions[5]:
            addEmployee();
            break;
        case viewOptions[6]:
          connection.end();
          break;
      }
    });

  function viewDepartments() {
    let sql = "SELECT * FROM department";
    connection.query(sql, function(err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
  }

  function viewRoles() {
    let sql = "SELECT * FROM role";
    connection.query(sql, function(err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
  }

  function viewEmployees() {
    let sql = "SELECT first_name, last_name FROM employee ";
    connection.query(sql, function(err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
  }

  const updateEmployee = () => {
    function update() {
      inquirer
        .prompt({
          name: "update",
          type: "list",
          message: "Which employee do you want to update?",
          choices: employeeOptions
        })
        .then(function() {
          inquirer
            .prompt({
              name: "updateOptions",
              type: "list",
              message: "What would like to update?",
              choices: updateOptions
            })
            .then(function(answer) {
              switch (answer.updateOptions) {
                case updateOptions[0]:
                  updatefirstName();
                  break;
              }
            });
        });
    }
    function updatefirstName() {
      let sql = "SELECT first_name FROM employees where first_name = ?";
    }
    update();
  };
}

