// We will use complicated ledger data for this application

document.addEventListener("DOMContentLoaded", async function () {
	try {

		// Fetching transactions from complicated_ledger.json
		const response = await fetch('complicated_ledger.json');
    const data = await response.json();

			// Sorting and filtering complicated ledger data
			const filteredData = filterLedger(data);

			// Get table element by ID
			const tableBody = document.getElementById('ledger-table-body');

			// Looping through reach transaction and appending it to the table body
			filteredData.forEach((item) => {

				// Create a new table row
				const row = document.createElement('tr');
			
				// Create table cells for each property in the object
				const dateCell = document.createElement('td');
				dateCell.textContent = formateDate(item.date);
			
				const typeCell = document.createElement('td');
				typeCell.textContent = item.type;
			
				const descriptionCell = document.createElement('td');
				descriptionCell.textContent = writeDescription(item);
			
				const amountCell = document.createElement('td');
				amountCell.textContent = item.amount;
			
				const balanceCell = document.createElement('td');
				balanceCell.textContent = item.balance;
			
				// Append the cells to the row
				row.appendChild(dateCell);
				row.appendChild(typeCell);
				row.appendChild(descriptionCell);
				row.appendChild(amountCell);
				row.appendChild(balanceCell);
			
				// Append the row to the table body
				tableBody.appendChild(row);
			});

			// Showing final balance
			const finalBalance = filteredData[0].balance;
			const balanceH1 = document.getElementById("account-balance");
			balanceH1.textContent = `$${finalBalance}`

			// Showing statement period
			const statementPeriod = document.getElementById("statement-period");
			statementPeriod.textContent = `${moment(filteredData.pop().date).format('DD/MM/YYYY')} to ${moment(filteredData[0].date).format('DD/MM/YYYY')}`

	} catch (error) {
		console.error('Error fetching ledger data', error);
	}
})

// Format transaction date
function formateDate(date){
	return moment(date).format("DD/MM/YYYY HH:mm");
}

// Return transaction description based on transaction type
function writeDescription(data){
	switch (data.type) {
		case "INVESTMENT":
			return `${data.destination.description}`
		case "DEPOSIT":
			return `${data.method} - ${data.source.description || "External"}`
			case "WITHDRAWAL":
			return `${data.method} - ${data.destination.description}`
			case "REFUND":
			return `${data.source.description}`
			case "TRANSFER":
			return `${data.source.description}`
		default:
			return ""
	}
}

// Filter transactions based on activity_id and order then based on transaction time
function filterLedger(arr) {
	let result = uniqueByActivity(arr)
	result = orderByTransactionDate(result)
	return result
}

// Filter ledger by removing duplicate transactions, it should be unique by activity_id
function uniqueByActivity(arr){
	let ids = [];
	let result = [];
	arr.forEach(e => {
		if (ids.indexOf(e.activity_id) === -1) {
			result.push(e);
			ids.push(e.activity_id);
		}
	});
	return result;
}

// Apply correct order to transactions
// Ordering based on transaction time
// In case if transaction time is same then order by correct entry (validating based on amount and balance with last transaction)
function orderByTransactionDate(arr) {
	let result = arr.sort((a, b) => Number(b.activity_id) - Number(a.activity_id))
	return result.sort((a, b) => {
		const dateA = new Date(a.date);
		const dateB = new Date(b.date);

		if (a.date === b.date) {
			if (b.balance + a.amount === a.balance) return -1
			else 1
		}
		return dateB - dateA;
	});
}