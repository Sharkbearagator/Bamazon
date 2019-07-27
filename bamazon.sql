DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

use bamazon_db;

CREATE table products(
    id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL (65,2) NULL,
    stock_quantity INTEGER(100)
    PRIMARY KEY (id)
)
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("Blue-Eyes White Dragon","Toys & Games",5.00,50);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("Base Set Charizard 1st Edition","Toys & Games",92.33,1);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("Liliana of the Veil","Toys & Games",79.00,5);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("Dark Magician","Toys & Games",10.00,20);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("Base Set Blastoise","Toys & Games",43.75,1);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("Gideon Blackblade Mythic Foil","Toys & Games",45.00,3);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("Red-Eyes Black Dragon Anniversary Pack","Toys & Games",30.00,10);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("Base Set Venusaur","Toys & Games",45.00,15);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("Jace, Vryn's Prodigy","Toys & Games",23.00,1);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("Millenium Eyes Restrict","Toys & Games",30.00,25);