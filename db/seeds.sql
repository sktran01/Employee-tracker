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

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES (1,'Josh','Huynh',2),
       (2,'Sarah','Watson',2),
       (3,'Emily','Smith',5),
       (4,'Aaron','Johnson',4),
       (5,'Jorge','Hernandez',4),
       (6,'Michael','Jefferson',3);