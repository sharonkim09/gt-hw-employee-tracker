DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

-- Database for department
CREATE TABLE departments(
    id INTEGER AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL, 
            PRIMARY KEY(id)
);
-- Database for role
CREATE TABLE role(
    id INTEGER AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
      salary DECIMAL(10,2) NOT NULL,
  department_id INTEGER NOT NULL, 
            PRIMARY KEY(id)
);
-- Database for employee
CREATE TABLE employee(
    id INTEGER AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
      last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL, 
   manager_id INTEGER NULL, 
            PRIMARY KEY(id)
);
INSERT INTO departments(name)
VALUES ("Engineering"),("Business"),("Sales"),("Finance"),("Operations"),("Advertising");

SELECT * FROM departments;

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Pam","Beesly",1,2);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Michael","Scott",2,4);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Dwight","Schrute",3,5);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Jim","Halpert",4,5);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Roy","Anderson",5,5);

SELECT * FROM employee;

INSERT INTO role(title,salary, department_id)
VALUES("Lead Accountant", 40000,2);
INSERT INTO role(title,salary, department_id)
VALUES("Accountant", 504.90,4);
INSERT INTO role(title,salary, department_id)
VALUES("Jr Web Dev", 50000,1);
INSERT INTO role(title,salary, department_id)
VALUES("Clerk", 50000,5);
INSERT INTO role(title,salary, department_id)
VALUES("Financial Analyst", 50000,1);
SELECT * FROM role;