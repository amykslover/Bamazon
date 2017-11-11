var inquirer = require('inquirer');
addItem();

function addNewItem() {
	//Add items to the store
	inquirer.prompt([
		{	type: 'input',
			name: 'title',
			message: 'Item Title'
		},
		{	type: 'list',
			name: 'department',
			message: 'Item Department',
			choices: [
			'Household',
			'Automobile',
			'Office',
			'Pet'
			]
		},
		{	type: 'input',
			name: 'inventory',
			message: 'Inventory Amount'
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



}

function viewLowInventory() {


}