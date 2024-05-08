-- Drop the database if it exists
DROP DATABASE IF EXISTS defaultdb;

-- Create the database
CREATE DATABASE defaultdb
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
  
USE defaultdb;

CREATE TABLE patients
(
  PRIMARY KEY (id),
  id VARCHAR(30) NOT NULL,
  name VARCHAR(30) NOT NULL,
  city VARCHAR(30) NOT NULL,
  address VARCHAR(50) NOT NULL,
  birth_date DATE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  mobile_phone VARCHAR(20) NOT NULL,
  positive_result_date DATE,
  recovery_date DATE
);

CREATE TABLE vaccinations
(
  id INT AUTO_INCREMENT PRIMARY KEY,
  vac_date DATE NOT NULL,
  vac_manufacturer VARCHAR(50) NOT NULL,
  p_id VARCHAR(30) NOT NULL,
  FOREIGN KEY (p_id) REFERENCES patients(p_id)
);