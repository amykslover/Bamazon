DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE departments (
	department_id INTEGER,
	department_name VARCHAR(40),
	over_head_costs DECIMAL(15,2) DEFAULT 0,
	PRIMARY KEY(department_id)
);

INSERT INTO departments (department_id, department_name)
VALUES
	(1, 'Fashion'),
	(2, 'Electronics'),
	(3, 'Jewelry & Watches'),
	(4, 'Home & Garden'),
	(5, 'Sporting Goods'),
	(6, 'Music'),
	(7, 'Motors'),
	(8, 'Toys'),
	(9, 'Travel');

CREATE TABLE products (
	item_id INTEGER AUTO_INCREMENT,
	product_name VARCHAR(40),
	department_id INTEGER,
	price DECIMAL(15,2),
	stock_quantity INTEGER,
	PRIMARY KEY(item_id),
	FOREIGN KEY(department_id) REFERENCES departments(department_id)
);

INSERT INTO products (product_name,department_id,price,stock_quantity)
VALUES
	('Samsonite Luggage - 3 Piece Set',9,99.99,10),
	('Tumi Tegra-Lite Carry-On',9,350.00,10),
	('Travelers Club Luggage',9,124.99,10),
	('Wall Mount Magnetic Knife Storage',4,12.99,10),
	('Kitchen Island Cart',4,408.78,10),
	('KitchenAid Stand Mixer',4,199.99,10),
	('Diesel Watch',3,79.99,10),
	('1970 Honda CB',7,6999.00,10),
	('Black Asher Cutout Sweater',1,196.80,10),
	('Current Elliott Overalls',1,14.128,10),
	('Ella Velvet Pant Suit',1,394.00,10),
	('Sloane Cashmere Sweater',1,268.00,10),
	('Clementine Honey Candle',4,14.99,10),
	('Taupe Marbled Glass Candle',4,19.99,10);