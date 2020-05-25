USE employment_db;
SELECT NAME FROM department;

INSERT INTO department (name) 
VALUES('HR Department');
INSERT INTO department (name) 
VALUES('Sales Department');
INSERT INTO department (name) 
VALUES('Production Department');
INSERT INTO department (name) 
VALUES('IT Department');
INSERT INTO department (name) 
VALUES('Financial Department');
INSERT INTO department (name) 
VALUES('Marketing Department');


INSERT INTO roles (title, salary, department_id) -- 1
VALUES("HR Head", 15000.00, 1);
INSERT INTO roles (title, salary, department_id) -- 2
VALUES("HR Assistant", 5000.00, 1);
INSERT INTO roles (title, salary, department_id) -- 3
VALUES("Sales Manager", 10000.00, 2);
INSERT INTO roles (title, salary, department_id) -- 4
VALUES("Sales Assistant", 5000.00, 2);
INSERT INTO roles (title, salary, department_id) -- 5
VALUES("Production Head", 15000.00, 3);
INSERT INTO roles (title, salary, department_id) -- 6
VALUES("Production Manager", 10000.00, 3);
INSERT INTO roles (title, salary, department_id) -- 7
VALUES("Production Assistant", 5000.00, 3);
INSERT INTO roles (title, salary, department_id) -- 8
VALUES("IT Team Leader", 15000.00, 4);
INSERT INTO roles (title, salary, department_id) -- 9
VALUES("IT Front-End Developer", 10000.00, 4);
INSERT INTO roles (title, salary, department_id) -- 10
VALUES("IT Back-End Developer", 10000.00, 4);
INSERT INTO roles (title, salary, department_id) -- 11
VALUES("Financial Head", 15000.00, 5);
INSERT INTO roles (title, salary, department_id) -- 12
VALUES("Financial Assistant", 5000.00, 5);
INSERT INTO roles (title, salary, department_id) -- 13
VALUES("Marketing Head", 15000.00, 6);
INSERT INTO roles (title, salary, department_id) -- 14
VALUES("Marketing Manager", 10000.00, 6);
INSERT INTO roles (title, salary, department_id) -- 15
VALUES("Marketing Assistant", 5000.00, 6);


INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES("Hoyeon", "Kim", 8, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES("John", "Fisher", 6, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES("James", "Choo", 7, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES("Moon", "Doe", 14, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES("Danny", "Joe", 15, 2);
