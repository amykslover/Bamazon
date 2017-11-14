var inquirer = require('inquirer');
var bamazonCustomer = require('./bamazonCustomer')

let { purchaseItem } = bamazonCustomer
let { displayRecent } = bamazonCustomer
let { initiatePurchase } = bamazonCustomer
let { showItems } = bamazonCustomer

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
		    	console.log('No manager role established yet!')
		        break;
		   	case 'Supervisor':
		   		console.log('No manager role established yet!')
		        break;
		    default:
		    	initiatePurchase()
		    	break;
		}
  	})
}
