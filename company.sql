DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
	id INTEGER(10) NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
	id INTEGER(10) NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(7,2) NOT NULL,
    department_id INTEGER(10) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) references department (id)
);

CREATE TABLE employee (
	id INTEGER(10) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER(10) NOT NULL,
    manager_id INTEGER(30) NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) references role (id),
    FOREIGN KEY (manager_id) references role (id)
);

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");


INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 70000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Person", 50000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 90000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 90000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 95000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Bookkeeper", 60000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 99000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Secretary", 50000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("John", "Doe", 1, null); 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Mike", "Chan", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Ashley", "Rodriguez", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Kevin", "Tupik", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Melany", "Brown", 4, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Sarah", "Lorna", 5, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Tom", "Allen", 6, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Kelly", "Shoe", 7, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Jay", "Hart", 8, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Stacey", "Dash", 8, 4)