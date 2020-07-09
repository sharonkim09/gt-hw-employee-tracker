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
VALUES ("Sales"),("Finance");

SELECT * FROM departments;

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Harry","Potter",2,1);

SELECT * FROM employee;

INSERT INTO role(title,salary, department_id)
VALUES("Intern", 20,4);

SELECT * FROM role;