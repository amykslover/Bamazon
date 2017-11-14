
var inquirer = require('inquirer');
var connection = require('./bamazonDatabaseConnect')
connection.connect();

function showItems() {
var Table = require('cli-table');
var queryString = 'SELECT p.item_id, p.product_name, d.department_name, p.stock_quantity, p.price '; 
    queryString+= 'FROM products as p INNER JOIN departments as d '
    queryString+= 'ON d.department_id = p.department_id';

connection.query(queryString, function(error, rows, fields) {
    if (error) {
      throw error;      
    }
    else {
      var table = new Table({
          head: ['ID', 'NAME', 'DEPARTMENT','QUANTITY','PRICE'], 
          colWidths: [10, 40, 20, 10, 10]
      });

      for (var i in rows) {
        // table is an Array, so you can `push`, `unshift`, `splice` and friends
        table.push([rows[i].item_id,rows[i].product_name,rows[i].department_name, rows[i].stock_quantity, rows[i].price]);
      } 
      console.log(table.toString());
    }
});
// connection.end();
}

function purchaseItem() {
	inquirer.prompt([
	{	type: 'input',
		name: 'itemid',
		message: 'What item do you want to purchase?'
	},
	{	type: 'input',
		name: 'itemquantity',
		message: 'Quantity?'
	}
	]).then(function(answer){
		console.log(answer.itemid)
		console.log(answer.itemquantity)

		var queryString = 'SELECT stock_quantity FROM products WHERE ?';

		connection.query(queryString, { item_id: answer.itemid }, function(error, rows, fields) {
		    if (error) {
		      throw error;      
		    }
		    else {
			    var actualQuantity = rows[0].stock_quantity
			    if(actualQuantity - answer.itemquantity > 0) {
			    	connection.query(
			            "UPDATE products SET ? WHERE ?",
			            [
			              {
			                stock_quantity: actualQuantity - answer.itemquantity
			              },
			              {
			                item_id: answer.itemid
			              }
			            ],
			            function(error) {
			              if (error) throw error;
			            }
			          );
			    	showItems();
			    }
		 		else{
		 			console.log('There is not enough quantity in stock to fullfill your request.')
		 		}
		    }
		});
		//Check to see if there are enough items left for the person to buy
		//Show the customer how much their purchase totals (are we keeping track of the items in the basket?)
	})

}

// function quantityCheck(id) {
// }

purchaseItem();

// purchaseItem()
// module.exports = showItems
