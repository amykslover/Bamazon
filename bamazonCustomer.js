
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
			console.log('INVENTORY LIST:')
			console.log('-----------------------------------------------------------------------------------------------')	
		    var table = new Table({
		        head: ['ID', 'NAME', 'DEPARTMENT','QUANTITY','PRICE'], 
		        colWidths: [10, 40, 20, 10, 10]
		    });

		    for (var i in rows) {
		    	table.push([rows[i].item_id,rows[i].product_name,rows[i].department_name, rows[i].stock_quantity, rows[i].price]);
		    } 
		    console.log(table.toString());
		}
	});
}

function initiatePurchase() {
	
	inquirer.prompt([
	{	type: 'confirm',
		name: 'purchase',
		message: 'Do you want to make a purchase?'
	}
	]).then(function(answer){
		if(!answer.purchase) {
			connection.end();
		}
		if(answer.purchase) {
			purchaseItem()
		}
	})
};


function purchaseItem() {
	inquirer.prompt([	
			{	type: 'input',
				name: 'itemid',
				message: 'What item do you want to purchase?'
			},
			{	type: 'input',
				name: 'itemquantity',
				message: 'How many items do you want to purchase?'
			}
	]).then(function(answer){
			//Get the quantity of the selected product to check if there is enough
		var queryString = 'SELECT stock_quantity FROM products WHERE ?';
		
		connection.query(queryString, { item_id: answer.itemid }, function(error, rows, fields) { 
		    if (error) {
		      throw error;      
		    }
 			else {
			    var actualQuantity = rows[0].stock_quantity
				    //Check to see if there is enough of the product to fulfill the order
			    if(actualQuantity - answer.itemquantity >= 0) {
			    	//Update the quantity to decrease by the amount of the order if there is enough
			    	connection.query(
			            "UPDATE products SET ? WHERE ?",
			            [
			              {stock_quantity: actualQuantity - answer.itemquantity},
			              {item_id: answer.itemid}
			            ],
			            function(error) {
			              if (error) throw error;
			            }
			        );
			        displayRecent(answer.itemid, answer.itemquantity);		        
			        setTimeout(showItems, 1000);
			    }
		 		else{
		 			console.log('There is not enough quantity in stock to fullfill your request.')
		 		}
			}
		})
	    //Go through the purchase process again.
	    setTimeout(initiatePurchase, 2000);
	})
}	  




function displayRecent(id, quantity) {
	var Table = require('cli-table');
	var queryString = 'SELECT p.item_id, p.product_name, d.department_name, p.stock_quantity, p.price '; 
	    queryString+= 'FROM products as p INNER JOIN departments as d '
	    queryString+= 'ON d.department_id = p.department_id WHERE ?';

	connection.query(queryString, { item_id: id }, function(error, rows, fields) {
	    
	    if (error) {
	    	throw error;      
	    }
	    else {
	    	console.log('THE TABLE BELOW IS YOUR RECEIPT OF PURCHASE:')
			console.log('-------------------------------------------------------------------------------------------------------------')	

    	  	var table = new Table({
		        head: ['ID', 'NAME', 'DEPARTMENT','QUANTITY','PRICE','TOTAL OWED'], 
		        colWidths: [10, 40, 20, 10, 10, 12]
	      	});

		    for (var i in rows) {
		        table.push([rows[0].item_id,rows[0].product_name, rows[0].department_name, rows[0].price, quantity,(quantity*rows[0].price)]);
		     } 
		    console.log(table.toString());
	    }
	})
}

module.exports = {showItems, purchaseItem, displayRecent, initiatePurchase}
