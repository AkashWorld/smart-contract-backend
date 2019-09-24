import fs from 'fs';
import { UserDescriptorService } from './services/user-descriptor-service';

interface IContractAddress {
	name: string;
	address: string;
}

async function main() {
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

	const userDescClient = new UserDescriptorService(
		userDescriptorAddress,
		7545
	);
	const account = await userDescClient.getAccountAtIndex(0);
	userDescClient.insertValue(account, 'lb', 250);
	userDescClient.insertValue(account, 'lb', 10);
	userDescClient.insertValue(account, 'lb', 50);
	userDescClient.insertValue(account, 'cm', 20);
	userDescClient.insertValue(account, 'miles', 25);
	userDescClient.insertValue(account, 'km', 10);
	userDescClient.insertValue(account, 'm/ph', 60);
	setTimeout(async () => {
		const units = await userDescClient.getAllAvailableUnitsForUser(account);
		console.log(units);
		const lbvals = await userDescClient.getAllValuesRecordedForUnit(
			account,
			'lb'
		);
		console.log(lbvals);
	}, 5000);
}

main();
