DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR (100) NOT NULL,
  department_name VARCHAR (100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT(11) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, price, stock_quantity, department_name)
VALUES 
("CTS-V", 70000.00, 120, "Cadillac"),
("GT-R", 130000.00, 120, "Nissan"),
("Impreza WRX STI", 40000.00, 75, "Subaru"),
("Lancer Evolution X", 40000.00, 75, "Mitsibishi"),
("R8", 200000.00, 75, "Audi"),
("Challenger Demon", 90000.00, 75, "Dodge");