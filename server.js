const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Piglet64",
  database: "employee_DB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  init();
});

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userSelection",
        message: "What would you like to do next?",
        choices: [
          "Add Departments",
          "Add Roles",
          "Add Employees",
          "View Departments",
          "View Roles",
          "View Employees",
          "Update Employee Roles",
          "Exit",
        ],
      },
    ])
    .then(({ userSelection }) => {
      console.log(userSelection);
      if (userSelection === "Add Departments") {
        addDepartments();
      } else if (userSelection === "Add Roles") {
        addRoles();
      } else if (userSelection === "Add Employees") {
        addEmployees();
      } else if (userSelection === "View Departments") {
        viewEmployees();
      } else if (userSelection === "View Roles") {
        viewRoles();
      } else if (userSelection === "View Employees") {
        viewEmployees();
      } else if (userSelection === "Update Employee Roles") {
        updateEmployees();
      } else if (userSelection === "Exit") {
        exit();
      }
    });
}
// Adding Department
function addDepartments() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What department would you like to add?",
      },
    ])
    .then(({ department }) => {
      console.log(department);

      console.log("Added department successfully");
      init();
    });
}
// Adding Roles
function addRoles() {
  console.log("adding roles")
  init();
}
// Adding Employees
function addEmployees() {
  console.log("adding employees")
  init();
}
// Viewing Employees
function viewEmployees() {
  console.log("viewing employees")
  init();
}
// Viewing Roles
function viewRoles() {
  console.log("viewing roles")
  init();
}
// Viewing Employees
function viewEmployees() {
  console.log("viewing employees")
  init();
}
// Updating Employees
function updateEmployees() {
  console.log("updating employees")
  init();
}
// Exiting application
function exit() {
  connection.end();
}
