var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    viewAll();
});

function viewAll() {
    //displays every item
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });


}



function updateQuantity() {
    connection.query("UPDATE products SET stock_quantity = stock_quantity - <x> WHERE Item_id = <x>", function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });

};

function totalCost(){
    connection.query(SELECT sale.quantity*item.price as TOTAL FROM item,sale WHERE item.product_id=sale.product_id;  function(err,res){ LOGIC});

};

function checkQuantity(){
    connection.query( function(err,res){
        if(quantity < x )
        console.log("Sorry! There are only" + row.stock_quantity +"items left")
    });
};

