var mysql = require("mysql");
var inquirer = require('inquirer');
var fs = require('fs')
const Enter = "\n\n***[$̲̅(̲̅ιοο̲̅)̲̅$̲̅]***[$̲̅(̲̅ιοο̲̅)̲̅$̲̅]***[$̲̅(̲̅ιοο̲̅)̲̅$̲̅]___WELCOME to BAMAZON, LETS GET STARTED___[$̲̅(̲̅ιοο̲̅)̲̅$̲̅]***[$̲̅(̲̅ιοο̲̅)̲̅$̲̅]***[$̲̅(̲̅ιοο̲̅)̲̅$̲̅]***\n\n "

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
    console.log(Enter);
     // viewAll();
    // updateQuantity();   
    userPrompt();
});

function userPrompt() {

    inquirer.prompt([
        {
            type: "input",
            name: "itemWanted",
            message: "Please type the item id number you'd like to buy",

            //   type: "list",
            //   name: "itemWanted",
            //   message: "What item would you like to buy? [1-10]",
            //   choices: ["1", "2", "3", "4", "5","6","7","8","9","10"]
        },
        {
            type: "input",
            name: "quantityWanted",
            message: "How many would you like to buy?",

        }

    ]).then(function (userResponse) {

        console.log(userResponse);
    });
}


function viewAll() {
    //displays every item
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });


}


function updateQuantity() {
    connection.query("SELECT DISTINCT stock_quantity FROM products;", function (err, res) {

        //"UPDATE products SET stock_quantity = stock_quantity - <x> WHERE Item_id = <x>"
        if (err) throw err;
        console.log(res.item_id);
        connection.end();
    });

};


function checkQuantity() {
    connection.query("SELECT DISTINCT stock_quantity, price FROM products WHERE item_id=?;", function (err, res) {

        if (res < quantityWanted) {
            console.log("Sorry! There are only" + row.stock_quantity + "items left")

        } else {
            if (res > quantityWanted) {
                console.log("Your total is: " + quantityWanted * price);
            }
        }

    });
};

function totalCost() {

};



