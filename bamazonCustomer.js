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
    connection.query("SELECT * FROM products", function (err, resInventory) {
        if (err) throw err;
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
                    console.log("Your total cost is $" + +userResponse.quantityWanted * +res[0].price); //WORKS
                    checkQuantity(res);

                });
        };




        function checkQuantity(resNewVals) {


            if (resNewVals[0].stock_quantity >= userResponse.quantityWanted) {
                let newQuantity = +resNewVals[0].stock_quantity - +userResponse.quantityWanted;

                console.log(resNewVals[0].stock_quantity);
                console.log(resNewVals[0].item_id);

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
                        console.log(newQuantity);
                        connection.end();

                    });
            }   else 
            {
                console.log("amount requiered too much"); 
                connection.end(); 
            }
        };





    });
}


// function updateQuantity(userResponse) {
//     // math first then oquery and make a const 
//     connection.query("SELECT DISTINCT stock_quantity FROM products;", function (err, res) {

//         //"UPDATE products SET stock_quantity = stock_quantity - <x> WHERE Item_id = <x>"
//         if (err) throw err;
//         console.log(res.item_id);
//         connection.end();
//     });

// };










        // connection.query("UPDATE product SET ? WHERE ?;",  {
        //      quantity: res[0].stock_quantity,
        //         id: userResponse.itemID,
        // },
        // function (err, res) {
        //         if (err) {
        //             throw err;
        //         }

        //         console.log(t +"check Quant");

        //         if (res[0].stock_quantity <= userResponse.quantityWanted) {
        //             console.log("Sorry! There are only" + res.stock_quantity + userResponse.quantityWanted + "items left")
        //         }

        //     });
        // };



        // console.log(userResponse);
        // match user input of otem to price in sql data base
        //multiply  ^^ byt  user guess quantity
        // structure data so it sanatizes using ?????? 







