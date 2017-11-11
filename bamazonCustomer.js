function showItems() {
	//Show items available for sale
}

function purchaseItem() {
	inquirer.prompt([
	{	type: 'input',
		name: 'item',
		message: 'Item Number?'
	},
	{	type: 'input',
		name: 'quantity',
		message: 'Quantity?'
	}
	]).then(function(answer){
		console.log(answer.item)
		console.log(answer.quantity)

		//Check to see if there are enough items left for the person to buy
		//If not enough then display not enough display 'Insufficient Quantity'
		//If there is enough, fullfill the order by decrementing the quantity of the items
		//Show the customer how much their purchase totals (are we keeping track of the items in the basket?)
	})

}