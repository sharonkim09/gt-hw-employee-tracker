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
      // console.log(department);
      // console.log(response.department);
      const queryString = "INSERT INTO departments SET ?";
      connection.query(
        queryString,
        { name: response.department },
        (err, data) => {
            if(err) throw err;
          console.log("Added department successfully");
          init();
        }
      );
    });
}

// Viewing Departments
function viewDepartments() {
  // console.log("viewing departments");
  connection.query("SELECT * FROM departments", (err, data) => {
    if (err) throw err;
    console.table(data);
    init();
  });
}

// Adding Roles
function addRoles() {
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
        type: "input",
        message: "What department?",
        name: "department",
      },
    ])
    .then((response) => {
      // console.log(response.title);
      // console.log(response.salary);
      // console.log(response.department);
      const queryString = "INSERT INTO role SET ?";
      connection.query(
        queryString,
        {
          title: response.title,
          salary: response.salary,
          department_id: response.department,
        },
        (err, data) => {
          if (err) throw err;
          console.log("Added roles!!");
          init();
        }
      );
    });
}
// Viewing Roles
function viewRoles() {
  // console.log("viewing roles");
  connection.query("SELECT * FROM role", (err, data) => {
    if (err) throw err;
    console.table(data);
    init();
  });
}
// Adding Employees
function addEmployees() {
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
        type: "input",
        name: "roleId",
        message: "Enter employee's role id:",
      },
      {
        type: "input",
        name: "managerId",
        message: "Enter employee's manager id",
      },
    ])
    .then((response) => {
      // console.log(response.firstName);
      // console.log(response.lastName);
      // console.log(response.roleId);
      // console.log(response.managerId);
      // first_name, last_name, role_id, manager_id
      const queryString = "INSERT INTO employee SET ?";
      connection.query(
        queryString,
        {
          first_name: response.firstName,
          last_name: response.lastName,
          role_id: response.roleId,
          manager_id: response.managerId,
        },
        (err, data) => {
          console.log("adding employees");
          init();
        }
      );
    });
}

// Viewing Employees
function viewEmployees() {
  // console.log("viewing employees");
  connection.query(`SELECT employee.id,employee.first_name, employee.last_name, role.title, role.salary, departments.name FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN departments ON role.department_id = departments.id`, (err, data) => {
    if (err) throw err;
    console.table(data);
    init();
  });
}
// Exiting application
function exit() {
  connection.end();
}
// Updating Employees
function updateEmployeeRoles() {
  inquirer.prompt([
    {
      type:"input",
      name:"currentRoleId",
      message:"What is employee's role id you wish to change?"
    },
    {
      type:"input",
      message:"what is employee's new role id?",
      name:"newRoleId"
    }
  ]).then((response)=>{
    console.log("updating employee role id")
    connection.query("UPDATE employee SET ?",
    {
      role_id:response.newRoleId
    },(err,data)=>{
      if(err) throw err;
      console.log("Successfully updated role");
    })
  })
}
// next steps that are REQUIRED.....
// need to somehow use JOIN

// BONUS steps
// 1. Updating employee managers
// 2. View employees by manager
// 3. Delete departments, roles, and employees
// 4. total budget in that department...


