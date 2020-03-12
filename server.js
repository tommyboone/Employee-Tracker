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
  "Add Department",
  "Add Role",
  "Exit"
];

// const employeeOptions = [
//   "Michael Scott",
//   "Jim Halpert",
//   "Dwight Schrute",
//   "Pam Beasley",
//   "Toby Flenderson",
//   "Kelly Kapur"
// ];

// const roles = [
//   "Salesperson",
//   "Customer Service",
//   "Accountant",
//   "Office Administrator",
//   "HR Rep",
//   "Manager"
// ];

// const updateOptions = [
//   "First Name",
//   "Last Name",
//   "Role",
//   "Department",
//   "Manager",
//   "Exit"
// ];

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
          addDepartment();
          break;
        case viewOptions[7]:
          addRole();
          break;
        case viewOptions[8]:
          console.log("Goodbye!");
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
    let sql =
      "SELECT id, first_name, last_name, role_id, manager_id FROM employee ";
    connection.query(sql, function(err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
  }

  function updateEmployee() {
    function update() {
      connection.query("SELECT * FROM employee", function(err, res) {
        console.log(res);
        var employeeList = [];
        for (var i = 0; i < res.length; i++) {
          employeeList.push(res[i].first_name);
        }
        inquirer
          .prompt([
            {
              name: "update",
              type: "list",
              message: "Which employee do you want to update?",
              choices: employeeList
            },
            {
              name: "updateOptions",
              type: "list",
              message: "What would you like to update?",
              choices: ["Role", "Manager"]
            }
          ])
          .then(function(answer) {
            connection.query("SELECT * FROM role", function(err, resRole) {
              console.log(resRole);
              var roleList = [];
              for (var i = 0; i < resRole.length; i++) {
                roleList.push(resRole[i].title);
              }
              inquirer
                .prompt({
                  name: "roleUpdate",
                  type: "list",
                  message: "what is the new role",
                  choices: roleList
                })
                .then(function(roleAnswer) {
                  console.log(roleAnswer);

                  var roleID;
                  var empID;

                  for (var i = 0; i < res.length; i++) {
                    if (answer.update === res[i].first_name) {
                      empID = res[i].first_name;
                    }
                  }

                  for (var i = 0; i < resRole.length; i++) {
                    if (answer.updateOptions === resRole[i].id) {
                      roleID = resRole[i].role_id;
                    }
                  }
                  connection.query(
                    "UPDATE employee SET role_id = ? WHERE first_name = ?",
                    [roleID, empID],
                    function(err, res) {
                      console.log(err, res);
                    }
                  );
                });
            });
            // console.log(answer);
          });
      });
    }

    update();
  }

  function deleteEmployee() {
    connection.query("SELECT * FROM employee", function(err, res) {
      console.log(err, res);
      var employeeList = [];
      for (var i = 0; i < res.length; i++) {
        employeeList.push(res[i].first_name);
      }
      inquirer
        .prompt({
          name: "deletedEmployee",
          type: "list",
          message: "Which employee would you like to remove?",
          choices: employeeList
        })
        .then(function(response) {
          console.log(response);
          var deleteID;
          for (var i = 0; i < res.length; i++) {
            if (response.deletedEmployee === res[i].first_name) {
              deleteID = res[i].id;
            }
          }
          connection.query(
            `DELETE FROM employee where id = ${deleteID}`,
            function(err, res) {
              console.log(err, res);
              start();
            }
          );
        });
    });
  }

  // function deleteRole() {
  //   connection.query("SELECT * FROM role", function(err, res) {
  //     console.log(err, res);
  //     var roleList = [];
  //     for (var i = 0; i < res.length; i++) {
  //       roleList.push(res[i].title);
  //     }
  //     inquirer
  //       .prompt({
  //         name: "deletedRole",
  //         type: "list",
  //         message: "Which Rolewould you like to remove?",
  //         choices: roleList
  //       })
  //       .then(function(response) {
  //         console.log(response);
  //         var deleteRole;
  //         for (var i = 0; i < res.length; i++) {
  //           if (response.deletedRole === res[i].title) {
  //             deleteRole = res[i].id;
  //           }
  //         }
  //         connection.query(
  //           `DELETE FROM role where id = ${deleteRole}`,
  //           function(err, res) {
  //             console.log(err, res);
  //             start();
  //           }
  //         );
  //       });

  //   });
  // }

  function addEmployee() {
    connection.query("SELECT * FROM role", function(err, res) {
      console.log(err, res);
      var selectRole = [];
      for (var i = 0; i < res.length; i++) {
        selectRole.push(res[i].title);
      }
      inquirer
        .prompt([
          {
            name: "firstName",
            type: "input",
            message: "What's your employees' first name?"
          },
          {
            name: "lastName",
            type: "input",
            message: "What's your employees' last name?"
          },
          {
            name: "employeeRole",
            type: "list",
            message: "What is this employees' role?",
            choices: selectRole
          }
        ])
        .then(function(answer) {
          console.log(answer);
          var roleid;
          for (var i = 0; i < res.length; i++) {
            if (answer.employeeRole === res[i].title) {
              roleid = res[i].id;
            }
          }
          connection.query(
            "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)",
            [answer.firstName, answer.lastName, roleid, 1],
            function(err, res) {
              console.table(err, res);
              start();
            }
          );
        });
    });
  }
}
