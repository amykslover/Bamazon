var inquirer = require('inquirer');
var showItems = require('./bamazonCustomer')

var proceed = false
function userDecide() {
	inquirer.prompt([
    {
      type: 'list',
      message: 'Role?',
      choices: ['Customer', 'Manager', 'Supervisor'],
      name: "usertype"
   	}
  	]).then(function(answer){
  		console.log(answer)
		switch(answer.usertype) {
		    case 'Customer':
			    if(!proceed) {
			    	showItems()
					proceed = true;
			    } 
			    if(proceed) {
					setTimeout(function() {
					
			        	inquirer.prompt([
					    {
					      type: 'input',
					      message: 'What is the ID of the item you wish to purchase?',
					      name: "chosenitem"
					   	}
					  	]).then(function(answer){ 
					  		console.log(answer.chosenitem)
						  	inquirer.prompt([
						    {
						      type: 'input',
						      message: 'What quantity do you want to purchase?',
						      name: "itemquantity"
						   	}
						  	]).then(function(answer){ 
						  		console.log(answer.itemquantity)
						  	})
					  	})

					}, 100)
					  		console.log(answer.chosenitem)
					  		console.log(answer.itemquantity)


			    }
		        break;
		    case 'Manager':
		        break;
		   	case 'Supervisor':
		        break;
		    default:
		        
		}
  	})
};

userDecide()