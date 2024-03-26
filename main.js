const { Web3 } = require('web3');

const web3 = new Web3('wss://goerli.infura.io/ws/v3/XXX');

async function main() {
	// Subscribe to new block headers
	const subscription = await web3.eth.subscribe('pendingTransactions');

	subscription.on('data', async blockhead => {
		console.log('New block header: ', blockhead);

		// You do not need the next line if you like to keep being notified for every new block
		await subscription.unsubscribe();
		console.log('Unsubscribed from new block headers.');

		// Get the list of accounts in the connected node which is in this case: Ganache.
		// const accounts = await web3.eth.getAccounts();
		// // Send a transaction to the network
		// const transactionReceipt = await web3.eth.sendTransaction({
		// 	from: accounts[0],
		// 	to: accounts[1],
		// 	value: web3.utils.toWei('0.001', 'ether'),
		// });
		// console.log('Transaction Receipt:', transactionReceipt);
	});

	subscription.on('error', error =>
		console.log('Error when subscribing to New block header: ', error),
	);
}

//main();
async function main1() {
	(await web3.eth.subscribe('pendingTransactions')).on('data', console.log);

	// const address = '0x0E8441Ec4b36eD44369887ae4c94dd2df43b8628';

	// const subscription = web3.eth.subscribe('pendingTransactions', {
	// 	address: address
	//   }, (error, result) => {
	// 	if (!error) {
	// 	  console.log(result);
	// 	} else {
	// 	  console.error(error);
	// 	}
	//   });
}

main1()