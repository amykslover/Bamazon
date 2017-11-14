
var inquirer = require('inquirer');
var bamazonCustomer = require('./bamazonCustomer')
var bamazonManager = require('./bamazonManager')

let { purchaseItem } = bamazonCustomer
let { displayRecent } = bamazonCustomer
let { initiatePurchase } = bamazonCustomer
let { showItems } = bamazonCustomer

let { managerActions } = bamazonManager
let { addNewItem } = bamazonManager
let { updateQuantity } = bamazonManager
let { viewLowInventory } = bamazonManager


userDecide()

function userDecide() {
	showItems()
	setTimeout(userPrompt, 1000);
}


function userPrompt() {
	inquirer.prompt([
    {
      type: 'list',
      message: 'PLEASE SELECT YOUR ROLE:',
      choices: ['Customer', 'Manager', 'Supervisor'],
      name: "usertype"
   	}
  	]).then(function(answer){

		switch(answer.usertype) {
		    case 'Customer':
			    initiatePurchase()
		        break;
		    case 'Manager':
		   		console.log('No manager functionality established yet!')
		   		userPrompt()
		    	// managerActions()
		        break;
		   	case 'Supervisor':
		   		console.log('No supervisor functionality established yet!')
		   		userPrompt()
		        break;
		    default:
		    	initiatePurchase()
		    	break;
		}
  	})
}
