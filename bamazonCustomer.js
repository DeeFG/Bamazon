var mysql = require("mysql");
var inquirer = require('inquirer');
var fs = require('fs');
var chalk = require('chalk');
const Enter = "\n*[$̲̅(̲̅ιοο̲̅)̲̅$̲̅]___WELCOME to BAMAZON, LETS GET STARTED___[$̲̅(̲̅ιοο̲̅)̲̅$̲̅]**\n\n "

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});

function greetCustomer() {
    console.log(chalk.yellow(Enter));
};

connection.connect(function (err) {
    if (err) throw err;
    viewAll();

});


function viewAll() {
    //displays every item
    connection.query("SELECT * FROM products", function (err, resInventory) {
        if (err) throw err;
        greetCustomer();
        console.log(resInventory);
        userPrompt();
    });
}



function userPrompt() {

    function validateitemID(itemNum) {
        return itemNum !== '';
    }

    inquirer.prompt([
        {
            type: "input",
            name: "itemID",
            message: "Please type the item id number you'd like to buy",
            validate: validateitemID

        },
        {
            type: "input",
            name: "quantityWanted",
            message: "How many would you like to buy?",

        }

    ]).then(function (userResponse) {


        priceCheck();

        function priceCheck() {
            connection.query("SELECT * FROM products WHERE ? ", {
                item_id: userResponse.itemID
            },
                function (err, res) {
                    if (err) {
                        throw err;
                    }
                    console.log(chalk.blue("\nYour total cost is $" + +userResponse.quantityWanted * +res[0].price + ".00")); //WORKS
                    checkQuantity(res);

                });
        };


        function checkQuantity(resNewVals) {


            if (resNewVals[0].stock_quantity >= userResponse.quantityWanted) {
                let newQuantity = +resNewVals[0].stock_quantity - +userResponse.quantityWanted;
                // console.log(resNewVals[0].stock_quantity);
                connection.query("UPDATE products SET ? WHERE ?;", [{
                    stock_quantity: newQuantity,
                },
                {
                    item_id: userResponse.itemID,
                }],
                    function (err, res) {

                        if (err) {
                            throw err;
                        }
                        console.log(chalk.blue("\nOnly " + newQuantity + " left in stock!  Get them while there're HOT!\n"));
                        connection.end();

                    });
            } else {
                console.log(chalk.red("\nSorry! There are only " + resNewVals[0].stock_quantity + " items left, your order will be back ordered. \n"));
                connection.end();
            }
        };
    });
}










