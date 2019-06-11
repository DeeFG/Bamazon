DROP DATABASE bamazon_DB;
CREATE DATABASE bamazon_DB;
USE bamazon_DB ;
CREATE TABLE products (
	item_id INT NOT NULL auto_increment,
	product_name varchar (255) NOT NULL,
	department_name varchar (255) NOT NULL,
	price INT NOT NULL,
	stock_quantity INT NOT NULL,
    Primary Key (item_id)
);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("legos","Toys",20.00,66);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Puzzle","Toys",2.99, 20);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Socks","Clothing",5.00,1000);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Shirts","Clothing",12.00,580);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Desk","Furniture",43.00,33);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Lamp","Furniture",17.50,220);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Necklace","Jewlery",100.00,25);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Braclet","Jewlery",70.80,25);