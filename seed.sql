
INSERT INTO departments(name)
VALUES ("Engineering"),("Business"),("Sales"),("Finance"),("Operations"),("Advertising");

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
