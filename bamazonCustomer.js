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
      choice();
    });
  }
  function choice(){
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
    }.then(function(answer){
      switch (answer.action) {
        case "Blue-Eyes White Dragon":
          artistSearch();
          break;
  
        case "Base Set Charizard 1st Edition":
          multiSearch();
          break;
  
        case "Liliana of the Veil":
          rangeSearch();
          break;
  
        case "Dark Magician":
          songSearch();
          break;
  
        case "Base Set Blastoise":
          songAndAlbumSearch();
          break;
        
        case "Gideon Blackblade Mythic Foil":
          songAndAlbumSearch();
          break;
        
        case "Red-Eyes Black Dragon Anniversary Pack":
          songAndAlbumSearch();
          break;

        case "Base Set Venusaur":
            songAndAlbumSearch();
            break;

        case "Jace, Vryn's Prodigy":
          songAndAlbumSearch();
          break;

        case "Millenium Eyes Restrict":
          songAndAlbumSearch();
          break;
      }
    })
  ])
}

function purchase(){
  inquirer.prompt([
    {
    name: "purchase",
    message: "How many would you like to buy? (Numbers only)",
    type: "number"
    }.then(function(answer){
      connection.query("UPDATE * FROM products", function(err) {

        if (err) throw err;

      })
    })
  ])
}
