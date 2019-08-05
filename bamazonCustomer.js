var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "yourRootPassword",
  database: "bamazon_DB"
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  queryAllItems();
});
function queryAllItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(
        res[i].id +
          " | " +
          res[i].product_name +
          " | " +
          res[i].department_name +
          " | $" +
          res[i].price +
          " | " +
          res[i].stock_quantity
      );
    }
    console.log("-----------------------------------");
    purchase();
  });
}

function purchase() {
  inquirer.prompt([
    {
      name: "product",
      message: "What would you like to buy?",
      type: "list",
      choices: [
        "Blue-Eyes White Dragon",
        "Base Set Charizard 1st Edition",
        "Liliana of the Veil",
        "Dark Magician",
        "Base Set Blastoise",
        "Gideon Blackblade Mythic Foil",
        "Red-Eyes Black Dragon Anniversary Pack",
        "Base Set Venusaur",
        "Jace, Vryn's Prodigy",
        "Millenium Eyes Restrict"
      ]
    },
  
    {
      name: "quantity",
      type: "number",
      message: "How many would you like?"
    },
  ])
    .then(function(answer) {
      connection.query("SELECT * FROM products", function(err, res2) {
        if (err) throw err;
        var item = answer.product;
        console.log(item);
        if (answer.quantity <= res2[item].stock_quantity) {
          var newQuantity = (res2[item].stock_quantity - answer.quantity);

          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: newQuantity
              },
              {
                product_name: answer.product
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Order Successful!");
              var total = answer.quantity * res2[item].price;
              console.log("The total is: $" + total);
              connection.end();
            }
          );
        } else {
          console.log("Order Failed, Insufficient Quantity");
          connection.end();
        }
      });
    });
  }
