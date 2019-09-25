/**
 * This is an entry point of a JavaScript program to invoke smart contract methods on the Blockchain.
 * The purpose of this is to demonstrate how to interact with the blockchain from a Javascript service
 *
 * IMPORTANT: You must make sure three things happen for this program to work
 *
 * 1. Ensure all relevant things are compiled, generated. Run 'npm run build'.
 * 2. Ensure that a local blockchain is running either buy running the GUi version of Ganache, or CLI
 * version of Ganache by running the following script that is in package.json `npm run deploy:local` in the command line
 *
 * 3. Ensure that once the local blockchain is deployed, that you run the script written in ./bin/deploy-contracts.ts. This
 * can be done by executing `npx ts-node ./bin/deploy-cotnracts.ts'. That script will deploy all contracts in ./contracts directory
 * to the blockchain and write it's addresses in a JSON in ./build/deployed-contracts.json. This program loads that file and extracts
 * the addresses to establish a connection to the contracts (UserDescriptors.sol contract to be specific here)
 */
import fs from 'fs';
import { UserDescriptorService } from './services/user-descriptor-service';

/**
 * This is the 'shape' of the object in ./bin/deployed-contracts.json. This allows typescript to easily identify the object loaded and allows
 * us to use autocompletion and static typeschecking in VSCode or other editors.
 * https://www.typescriptlang.org/docs/handbook/interfaces.html
 */
interface IContractAddress {
	name: string;
	address: string;
}

async function main() {
	/**
	 * Load contract address (UserDescriptors) inside the blockchain from the filesystem (see above for explanation)
	 * Can also manually input the address from something like the Ganache GUI (which is what I originally did)
	 */
	const deployedContracts: IContractAddress[] = JSON.parse(
		fs.readFileSync('./build/deployed-contracts.json').toString()
	);
	let userDescriptorAddress;
	deployedContracts.forEach(val => {
		if (val.name === 'UserDescriptors') {
			console.log(val);
			userDescriptorAddress = val.address;
		}
	});
	if (!userDescriptorAddress) {
		return;
	}

	/**
	 * Initialize the UserDescriptors service class. CTRL-Click on the class name to read what it does.
	 */
	const userDescriptorService = new UserDescriptorService(
		userDescriptorAddress,
		7545
	);
	// Get a random account thats avaialble in the node to test
	const account = await userDescriptorService.getAccountAtIndex(0);
	// Insert a bunch of random units and values
	userDescriptorService.insertValue(account, 'lb', 250);
	userDescriptorService.insertValue(account, 'lb', 10);
	userDescriptorService.insertValue(account, 'lb', 50);
	userDescriptorService.insertValue(account, 'cm', 20);
	userDescriptorService.insertValue(account, 'miles', 25);
	userDescriptorService.insertValue(account, 'km', 10);
	userDescriptorService.insertValue(account, 'm/ph', 60);

	// This is a global JS function that waits for a set amount of time before executing the function passed to it
	// In this case, its 5000 ms (5 seconds)
	// This is so the blockchain has time to digest and create the new blocks for every transaction above
	setTimeout(async () => {
		// Get all types of units the user entered
		const units = await userDescriptorService.getAllAvailableUnitsForUser(
			account
		);
		console.log(units);
		// Get all values entered for the unit 'lb'
		const lbvals = await userDescriptorService.getAllValuesRecordedForUnit(
			account,
			'lb'
		);
		console.log(lbvals);
	}, 5000);
}

main();
