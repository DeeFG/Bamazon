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
    viewAll();
    // checkQuantity();
    // updateQuantity();   
    userPrompt();
});

function userPrompt() {
    function validateItemWanted(itemNum) {
        return itemNum !== '';
    }


    inquirer.prompt([
        {
            type: "input",
            name: "itemWanted",
            message: "Please type the item id number you'd like to buy",
            validate: validateItemWanted

        },
        {
            type: "input",
            name: "quantityWanted",
            message: "How many would you like to buy?",

        }

    ]).then(function (userResponse) {


        function checkQuantity() {
            connection.query("SELECT DISTINCT stock_quantity, price FROM products WHERE item_id=1;", function (err, res) {
               
                console.log(res);
                console.log("Your total cost is $" + userResponse );
        
                if (res.stock_quantity < userResponse.quantityWanted) {
                    console.log("Sorry! There are only" + res.stock_quantity + userResponse.quantityWanted + "items left")
        
                    // } else {
                    //     if (res > quantityWanted) {
                    //         console.log("Your total is: " + quantityWanted * price);
                    //     }
                }
        
            });
        };


        console.log(userResponse);
        console.log(userResponse.itemWanted.price);

        console.log("Your total cost is $" + userResponse.quantityWanted * userResponse.itemWanted.price);


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


function updateQuantity(userResponse) {
    connection.query("SELECT DISTINCT stock_quantity FROM products;", function (err, res) {

        //"UPDATE products SET stock_quantity = stock_quantity - <x> WHERE Item_id = <x>"
        if (err) throw err;
        console.log(res.item_id);
        connection.end();
    });

};




function totalCost() {
    // console.log("YOut total is $" + userResponse.quantityWanted * userResponse.itemWanted +);

};



