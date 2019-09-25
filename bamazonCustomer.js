const mysql = require("mysql");
const inquirer = require("inquirer");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Prof8ymichi",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
})

function start() {
 
  const queryString = "SELECT * FROM products";
  connection.query(queryString, function(err, products) {
    if (err) throw err;
    console.log(`\nITEMS FOR SALE`)
    products.forEach(product => console.log(`${product.product_name} || ID: ${product.item_id} || Price: $${product.price}`));
    console.log(`\n`);

    
    inquirer
      .prompt([
        {
          type: "input",
          message: "Which product would you like to buy? Please enter ID number",
          name: "choice",
          validate: function(value) {
            if (!isNaN(value)) {
              return true;
            };
            return false;
          }
        },
        {
          type: "input",
          message: "How many would you like to buy?",
          name: "amount",
          validate: function(value) {
            if (!isNaN(value)) {
              return true;
            }
            return false;
          }
        },
        {
          type: "confirm",
          message: "Would you like to place the order?",
          name: "confirm",
          default: true
        }
      ]).then(function(res) {
        
        if (!res.confirm) {
          start();
        };

        const chosenProduct = products.find(product => product.item_id === parseInt(res.choice))
        
        if (chosenProduct.stock_quantity >= parseInt(res.amount)) {
          const queryString = "UPDATE products SET ? WHERE?";
          connection.query(queryString,
            [
              {
                stock_quantity: (chosenProduct.stock_quantity - parseInt(res.amount))
              },
              {
                product_name: chosenProduct.product_name
              }
            ],
            function(err) {
              if (err) throw err;
              const total = chosenProduct.price * res.amount;
              console.log(`Your total is: $${total}`)
            }
          );
        }
        else {
          console.log(`Insufficient Quantity!`);
          start();
        };
      });
  });
};
