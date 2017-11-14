var inquirer = require('inquirer');
var Table = require('cli-table');

function managerActions () {
	inquirer.prompt([
		{	type: 'list',
			name: 'action',
			choices: [
			'View Low Inventory',
			'Add New Item',
			'Update Quantity'
			],
			message: 'What do you want to do?'
		}
	]).then(function(answer){
		console.log(answer.action)
		switch(answer.action) {
		    case 'View Low Inventory':
			    viewLowInventory()
		        break;
		    case 'Add New Item':
		    	addNewItem()
		        break;
		   	case 'Update Quantity':
		   		updateQuantity()
		        break;
		}

	})
}

function addNewItem() {
	//Add items to the store
	inquirer.prompt([
		{	type: 'input',
			name: 'title',
			message: 'What is the description of the item you want to add?'
		},
		{	type: 'list',
			name: 'department',
			message: 'Item Department',
			choices: [
			'Fashion',
			'Electronics',
			'Jewelry & Watches',
			'Home & Garden',
			'Sporting Goods',
			'Music',
			'Motors',
			'Toys',
			'Travel'
			]
		},
		{	type: 'input',
			name: 'inventory',
			message: 'Quantity'
		},
		{	type: 'input',
			name: 'price',
			message: 'Sales Price'
		}
	]).then(function(answer){
		console.log(answer.title)
		console.log(answer.department)
		console.log(answer.inventory)
		console.log(answer.price)
	})
}

function updateQuantity() {
//Inquirer function to select item, then see the inventory for the item
//Inquirer function to add quantity of selected item or to choose another item

managerActions()

}

function viewLowInventory() {
//Simple query to view all items that have less than 3 items
	var queryString = 'SELECT * FROM products WHERE stock_quantity < 5';

	connection.query(queryString, function(error, rows, fields) { 
	    if (error) {
	      throw error;      
	    }
			else {
	    	console.log('--------------------------------------------------------------------------------------------------------')	
			console.log('LOW INVENTORY LIST:')
	    	console.log('--------------------------------------------------------------------------------------------------------')	
		    var table = new Table({
		        head: ['ID', 'NAME','QUANTITY','PRICE'], 
		        colWidths: [10, 35, 10, 10]
		    });

		    for (var i in rows) {
		    	table.push([rows[i].item_id,rows[i].product_name, rows[i].stock_quantity, rows[i].price]);
		    } 
		    console.log(table.toString());
		    }
	})
}

module.exports = {viewLowInventory, updateQuantity, addNewItem, managerActions}
