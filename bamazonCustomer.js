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
    console.log("YOU ARE CONNECTED " + connection.threadId);
    console.log(Enter);
    viewAll();
});


function viewAll() {
    //displays every item
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
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

        function priceCheck() {
            connection.query("SELECT * FROM products WHERE ? ", {
                item_id: userResponse.itemID
            }, function (err, res) {

                if (err) {
                    throw err;
                }
                console.log("Your total cost is $" + +userResponse.quantityWanted * +res[0].price); //WORKS
            });

        };


        function checkQuantity() {
            connection.query("SELECT DISTINCT stock_quantity, price FROM products WHERE item_id=1;", function (err, res) {
                console.log(res);
            

                if (res.stock_quantity <= userResponse.quantityWanted) {
                    console.log("Sorry! There are only" + res.stock_quantity + userResponse.quantityWanted + "items left")

                }

            });
        };

        priceCheck();
        // console.log(userResponse);
        // match user input of otem to price in sql data base
        //multiply  ^^ byt  user guess quantity
        // structure data so it sanatizes using ?????? 


    });
}





function updateQuantity(userResponse) {

    // math first then oquery and make a const 
    connection.query("SELECT DISTINCT stock_quantity FROM products;", function (err, res) {

        //"UPDATE products SET stock_quantity = stock_quantity - <x> WHERE Item_id = <x>"
        if (err) throw err;
        console.log(res.item_id);
        connection.end();
    });

};








