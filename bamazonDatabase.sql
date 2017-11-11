DROP DATABASE IF EXISTS bamazon;

CREATE TABLE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(40),
	department_name VARCHAR(40),
	price DECIMAL(15,2),
	stock_quantity INTEGER,
	PRIMAY KEY(item_id)
);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES
	('product1','department1',1,10),
	('product2','department2',1,10),
	('product3','department2',1,10),
	('product4','department4',1,10),
	('product5','department5',1,10),
	('product6','department5',1,10),
	('product7','department1',1,10),
	('product8','department4',1,10),
	('product9','department1',1,10),
	('product10','department1',1,10),
	('product11','department7',1,10);

CREATE TABLE departments (
	department_id INTEGER NOT NULL AUTO_INCREMENT,
	department_name VARCHAR(40),
	over_head_costs DECIMAL(15,2),
	PRIMAY KEY(item_id)
);

INSERT INTO departments (department_name,over_head_costs)
VALUES
	('department1',1234),
	('department2',1234),
	('department3',1234),
	('department4',1234),
	('department5',1234);
