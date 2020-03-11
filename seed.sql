-- DROP DATABASE IF EXISTS COMPANY_DB;
-- CREATE DATABASE COMPANY_DB;

-- USE COMPANY_DB;

-- CREATE TABLE department(
-- id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- name VARCHAR(30) NOT NULL
-- );

-- CREATE TABLE role(
-- id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
-- title VARCHAR(50) NOT NULL,
-- salary DECIMAL(7,2) NOT NULL,
-- department_id INTEGER NOT NULL,
-- CONSTRAINT fk_department_id FOREIGN KEY (department_id) REFERENCES department(id)
-- );

-- CREATE TABLE employee(
-- id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- first_name VARCHAR (50) NOT NULL,
-- last_name VARCHAR (50) NOT NULL,
-- role_id INT NOT NULL,
-- CONSTRAINT  fk_role_id FOREIGN KEY (role_id) REFERENCES role(id),
-- manager_id integer ,
-- CONSTRAINT fk_manager_id FOREIGN KEY (manager_id) REFERENCES employee(id)
-- );

-- INSERT INTO department (name)
-- VALUES 
-- 	("Sales"),
-- 	("Engineering"), 
-- 	("Finance"), 
--  ("Legal"), 
--  ("Manager");

-- INSERT INTO role (title, salary, department_id)
-- VALUES 
-- 	("Junior Salesperson", 55000, 1),
-- 	("Senior Salesperson", 70000, 1), 
-- 	("Junior Engineer", 60000, 2), 
-- 	("Senior Engineer", 75000, 2),
-- 	("Accountant", 65000, 3),
-- 	("Head of Accounting", 80000, 3), 
-- 	("Attorney", 80000, 4), 
-- 	("Manager", 75000, 5);

-- INSERT INTO employee (first_name, last_name, role_id)
-- VALUES 
-- 	("Michael", "Scott", 3), 
-- 	("Jim", "Halpert", 4), 
-- 	("Dwight", "Schrute", 5), 
--  ("Pam", "Beasley", 6), 
--  ("Creed", "Bratton", 7), 
--  ("Kelly", "Kapur",8); 