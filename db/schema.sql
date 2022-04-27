-- create a database
DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;
-- schema sql
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

CREATE TABLE department (
  department_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL,
  CONSTRAINT UC_Department UNIQUE(department_name)
);

CREATE TABLE role (
    role_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    CONSTRAINT UC_role UNIQUE(title)
);

CREATE TABLE employee (
    employee_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,   
    manager_id INTEGER NULL

);

-- seeds.sql
INSERT INTO department (department_name)
VALUES ('Sales'),('Engineering'),('Finance'),('Legal'),('Human Resources');

INSERT INTO role (title, salary, department_id )
VALUES('Salesperson','80000',1),
      ('Software Engineer','100000',2),
      ('Lead Engineer','150000',2),
      ('Account Manager','190000',3),
      ('Accountant', '85000',3),
      ('Lawyer','120000',4),
      ('Lead Lawyer','180000',4),
      ('Benefit Counselor','70000',5),
      ('Human Resource Manager','90000',5),
      ('Electrical Engineer', '160000',2);

INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES ('Josh','Huynh',3,NULL),
       ('Sarah','Watson',4,NULL),
       ('Emily','Smith',5,2),
       ('Aaron','Johnson',6,7),
       ('Jorge','Hernandez',2,1),
       ('Michael','Jefferson',2,1),
       ('Alexis','Foster',7,NULL);