//including packages used in app
const mysql = require("mysql");
const inquirer = require("inquirer");
// creating mysql database connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Piglet64",
  database: "employee_DB",
});

// connect to mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  init();
});
// function which prompts user what they would like to do
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
    // based on their answers, call their respective functions
    .then(({ userSelection }) => {
      console.log(userSelection);
      if (userSelection === "Add Departments") {
        addDepartments();
      } else if (userSelection === "Add Roles") {
        addRoles();
      } else if (userSelection === "Add Employees") {
        addEmployees();
      } else if (userSelection === "View Departments") {
        viewDepartments();
      } else if (userSelection === "View Roles") {
        viewRoles();
      } else if (userSelection === "View Employees") {
        viewEmployees();
      } else if (userSelection === "Update Employee Roles") {
        updateEmployeeRoles();
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
    .then((response) => {
      // When finished prompting, insert user input for department into the db
      const queryString = "INSERT INTO departments SET ?";
      connection.query(
        queryString,
        // response from user are stored in same name as db parameters
        { name: response.department },
        (err, data) => {
          if (err) throw err;
          console.log("Added department successfully");
          init();
        }
      );
    });
}

// Viewing Departments
function viewDepartments() {
  // Query database for all departments
  connection.query("SELECT * FROM departments", (err, data) => {
    if (err) throw err;
    console.table(data);
    init();
  });
}

// Adding Roles
function addRoles() {
  connection.query("SELECT * FROM departments", (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the role's title",
          name: "title",
        },
        {
          type: "input",
          message: "What is the role's salary?",
          name: "salary",
        },
        {
          type: "list",
          message: "What department is it in?",
          name: "department",
          // let user select role by displaying department
          choices: () => {
            // iterate through the results and push into array to be displayed
            const departmentArray = [];
            for (let i = 0; i < results.length; i++) {
              departmentArray.push(results[i].name);
            }
            return departmentArray;
          },
        },
      ])
      .then((response) => {
        console.log(response);
        let newRole;
        for (let i = 0; i < results.length; i++) {
          if (results[i].name === response.department) {
            newRole = results[i];
          }
        }
        //insert all info into the role database
        const queryString = "INSERT INTO role SET ?";
        connection.query(
          queryString,
          // response from user are stored in same name as db parameters
          {
            title: response.title,
            salary: response.salary,
            department_id: newRole.id,
          },
          (err, data) => {
            if (err) throw err;
            console.log("Added roles!!");
            init();
          }
        );
      });
  });
}

// Viewing Roles
function viewRoles() {
  //Query for displaying the roles and joining department name on role's department_id
  connection.query(
    "SELECT role.id, role.title, role.salary, departments.name FROM role INNER JOIN departments ON role.department_id = departments.id",
    (err, data) => {
      if (err) throw err;
      console.table(data);
      init();
    }
  );
}
// Adding Employees
function addEmployees() {
  connection.query("SELECT * FROM role", (err, results) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "Enter employee's first name:",
        },
        {
          type: "input",
          name: "lastName",
          message: "Enter employee's last name:",
        },
        {
          type: "list",
          name: "role",
          message: "Enter employee's role id:",
          // let user select role by displaying role
          choices: () => {
            const roleArray = [];
            // iterate through the results and push into array to be displayed
            for (let i = 0; i < results.length; i++) {
              roleArray.push(results[i].title);
            }
            return roleArray;
          },
        },
        {
          type: "input",
          name: "managerId",
          message: "Enter employee's manager id",
        },
      ])
      .then((response) => {
        // store the selected choice by user into variable which will later be assigned to role_id
        console.log(response);
        let selectedRole;
        for (let i = 0; i < results.length; i++) {
          if (results[i].title === response.role) {
            selectedRole = results[i];
          }
        }
        // insert all info into the employee database
        const queryString = "INSERT INTO employee SET ?";
        connection.query(
          queryString,
          // response from user are stored in same name as db parameters
          {
            first_name: response.firstName,
            last_name: response.lastName,
            role_id: selectedRole.id,
            manager_id: response.managerId,
          },
          (err, data) => {
            console.log("adding employees");
            init();
          }
        );
      });
  });
}

// Viewing Employees
function viewEmployees() {
  ////Query for displaying the employees and joining department & role db name and on role's department_id
  connection.query(
    `SELECT employee.id,employee.first_name, employee.last_name, role.title, role.salary, departments.name FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN departments ON role.department_id = departments.id`,
    (err, data) => {
      if (err) throw err;
      console.table(data);
      init();
    }
  );
}

// Exiting application
function exit() {
  connection.end();
}

// updating employee roles
// need to access employee tb
function updateEmployeeRoles() {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which employee role do you want to update?",
          name: "updateEmployee",
          choices: () => {
            const employeeArray = [];
            // loop through the results
            for (let i = 0; i < res.length; i++) {
              // push the titles into the employee array
              console.log(res[i].firstName)
              // using template literals to retrieve the first and last names then pushing into array
              employeeArray.push(`${res[i].first_name} ${res[i].last_name}`)
            }
            // return employee array with employee names
            return employeeArray
          },
        },
      ])
      .then((response) => {
        console.log("okay, updating");
        connection.query(
          "UPDATE employee SET role_id =? WHERE id=?",
          [response.role, response.employee],
          (err, data) => {
            if (err) throw err;
            console.log(res.affectedRows + " employee's role updated");
          }
        );
      });
  });
}
// error:cannot read type of undefined