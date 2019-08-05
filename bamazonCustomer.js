var mysql = require("mysql");
var inquirer = require("inquirer")

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
    queryAllItems()
});
function queryAllItems() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | $" + res[i].price + " | " + res[i].stock_quantity);
      }
      console.log("-----------------------------------");
      purchase();
    });
  }

function purchase(){
  inquirer.prompt([
    {
    name: "product",
    message: "What would you like to buy?",
    type: "list"
    },
    {
      name: "quantity",
      type: "number",
      message: "How many would you like?"
    }.then(function(answer){
      connection.query("SELECT * FROM products", function(err, resDB) {
      if (err) throw err;
      var item = ans.product
      if(ans.quantity <= resDB[item].stock_quantity){
        var newQuantity = (resDB[item].stock_quantity - ans.quantity)

        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: newQuantity
            },
            {
              product_name: ans.item
            }
          ],
          function(error){
            if(error) throw err;
            console.log("Order Successful!");
            var total = (ans.quantity * resDB[item].price)
            console.log("The total is: $" + total)
            connection.end();
          }
        )
      }else{
        console.log("Order Failed, Insufficient Quantity")
        connection.end()
      }

      })
    })
  ])
}
